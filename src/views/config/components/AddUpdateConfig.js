import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Card,
    CardHeader,
    Container,
    CardBody,
    Row,
    Form,
    FormGroup,
    Button,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Col, InputGroup, InputGroupAddon, InputGroupText, CustomInput,
    TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText
} from "reactstrap";
import {Field, FormikProvider, Form as FormikForm, Formik, useFormik, FieldArray, ErrorMessage} from "formik";
import classnames from 'classnames';
import { Country, State, City }  from 'country-state-city';
import ct from 'countries-and-timezones';

import {ConfigAction} from "../slice/ConfigAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import {history} from '../../../redux/_helpers';
import {CommonService} from "../../../redux/_services/CommonService";
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";
import PhoneInput, {getCountryCallingCode, isValidPhoneNumber} from "react-phone-number-input";
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'];
const SUPPORTED_IMG_FORMATS = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
const validationSchema = Yup.object({
    company_name: Yup.string().trim().required('Name is required'),
    company_address: Yup.string('').trim().required('Address is required'),
    company_state: Yup.string('').required('State is required'),
    company_city: Yup.string('').required('City is required'),
    company_country: Yup.string('').required('Country is required'),
    company_domain: Yup.string('').trim().required('Domain is required'),
    company_email: Yup.string().required('Email is required').email("Enter valid email"),
    company_meta_title: Yup.string('').trim().required('Title is required'),
    company_registerd_address: Yup.string('').required('Registered Address is required'),
    company_meta_description: Yup.string('').trim().required('Description is required'),
    company_phone: Yup.string().required('Phone is required').test('test-name', 'Enter valid phone number',
        function (value) {
            return (value) ? isValidPhoneNumber(value) : true;
        }),
    company_zip_code: Yup.number().required('Zip code is required').positive('Must be greater than zero').integer(),
    company_logo: Yup.mixed().required('Logo is required')
        //  .test('fileSize', 'File too large', (value) => value === null || (value && value.size <= 1024))
        .test(
            'fileFormat',
            'Unsupported file type',
            (value) => {
                if (value?.type === undefined) {
                    let imageType = (value) ? value.split('.').pop() : '';
                    return SUPPORTED_IMG_FORMATS.includes(imageType);
                } else {
                    return value === null || (value && SUPPORTED_FORMATS.includes(value.type))
                }
            }
        ),
});
const mobSetValidationSchema = Yup.object({
    android: Yup.object().shape({
        appVersion: Yup.string().trim().required('App Version is required'),
        isMandatory: Yup.boolean(),
    }),
    ios: Yup.object().shape({
        appVersion: Yup.string().trim().required('App Version is required'),
        isMandatory: Yup.boolean(),
    })
});
const withdrawalValidationSchema = Yup.object({
    min_amount: Yup.number().required('amount is required').positive('Must be greater than zero').integer(),
    withdrawal_restrictions: Yup.string('').trim().required('Withdrawal restrictions is required'),
});
const otherValidationSchema = Yup.object({
    timezone: Yup.string('').required('Timezone is required'),
});
const AddUpdateConfig = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/config"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('9') < 0;

    const formik = useFormik({
        initialValues: {
            company_name: '',
            company_logo: '',
            company_address: '',
            company_city: '',
            company_country: '',
            company_domain: '',
            company_email: '',
            company_meta_description: '',
            company_meta_title: '',
            company_phone: '',
            company_registerd_address: '',
            company_state: '',
            company_zip_code: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let formData = new FormData();
            if (values.company_phone_code && values.company_phone) {
                let reqEx = "+" + values.company_phone_code;
                values.company_phone = values.company_phone.split(reqEx).pop("");
            }
            formData.append('company_name', values.company_name);
            formData.append('company_logo', values.company_logo);
            formData.append('company_address', values.company_address);
            formData.append('company_city', values.company_city);
            formData.append('company_country', values.company_country);
            formData.append('company_country_code', values.company_country_code);
            formData.append('company_domain', values.company_domain);
            formData.append('company_email', values.company_email);
            formData.append('company_meta_description', values.company_meta_description);
            formData.append('company_meta_title', values.company_meta_title);
            formData.append('company_phone_code', values.company_phone_code);
            formData.append('company_phone', values.company_phone);
            formData.append('company_registerd_address', values.company_registerd_address);
            formData.append('company_state', values.company_state);
            formData.append('company_state_code', values.company_state_code);
            formData.append('company_zip_code', values.company_zip_code);
            if (id) {
                dispatch(ConfigAction.UpdateConfig(id, formData, from))
            } else {
                dispatch(ConfigAction.AddConfig(formData, from))
            }
        },
    });
    const mobSetFormik = useFormik({
        initialValues: {
            android: {
                appVersion: '',
                isMandatory: false
            },
            ios: {
                appVersion: '',
                isMandatory: false
            },
        },
        validationSchema: mobSetValidationSchema,
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('android', JSON.stringify({'appVersion':values?.android?.appVersion,'isMandatory':values?.android?.isMandatory}));
            formData.append('ios', JSON.stringify({'appVersion':values?.ios?.appVersion,'isMandatory':values?.ios?.isMandatory}));
            CommonService.sendHTTPFormRequest('/config/mobile_app_setting', 'POST', formData)
                .then(
                    response => {
                        console.log(" mobile_app_setting SUCCESS", response);
                    },
                    error => {
                        console.log(" mobile_app_setting FAILURE ", error);
                    }
                );
        },
    });
    const withdrawalFormik = useFormik({
        initialValues: {
            min_amount: '',
            withdrawal_restrictions: ''
        },
        validationSchema: withdrawalValidationSchema,
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('min_amount', parseInt(values?.min_amount));
            formData.append('withdrawal_restrictions',values?.withdrawal_restrictions);
            CommonService.sendHTTPFormRequest('/config/withdrawal_rules', 'POST', formData)
                .then(
                    response => {
                        console.log(" mobile_app_setting SUCCESS", response);
                    },
                    error => {
                        console.log(" mobile_app_setting FAILURE ", error);
                    }
                );
        },
    });
    let objTimeZone = ct.getAllTimezones();
    const otherFormik = useFormik({
        initialValues: {
            timezone: '',
            timezone_name: '',
        },
        validationSchema: otherValidationSchema,
        onSubmit: (values) => {
            console.log("getOtherRecord===",values);
            let formData = new FormData();
            formData.append('timezone', values?.timezone);
            formData.append('timezone_name', values?.timezone_name);
            CommonService.sendHTTPFormRequest('/config/other', 'POST', formData)
                .then(
                    response => {
                        console.log(" otherFormik SUCCESS", response);
                    },
                    error => {
                        console.log(" otherFormik FAILURE ", error);
                    }
                );
        },
    });
    const getRecord = () => {
        setLoading(true);
        CommonService.getRecord('/auth/config/company', '', (response) => {
            formik.initialValues.company_name = response.company_name;
            formik.initialValues.company_logo = response.company_logo;
            formik.initialValues.company_address = response.company_address;
            formik.initialValues.company_country = response.company_country;
            formik.initialValues.company_country_code = response?.company_country_code;
            formik.initialValues.company_state = response.company_state;
            formik.initialValues.company_state_code = response?.company_state_code;
            setStateList(State.getStatesOfCountry(response?.company_country_code));
            setCityList(City.getCitiesOfState(response?.company_country_code,response?.company_state_code));
            formik.initialValues.company_city = response.company_city;
            formik.initialValues.company_domain = response.company_domain;
            formik.initialValues.company_email = response.company_email;
            formik.initialValues.company_meta_description = response.company_meta_description;
            formik.initialValues.company_meta_title = response.company_meta_title;
            formik.initialValues.company_phone_code = response?.company_phone_code;
            formik.initialValues.company_phone = '+'+response?.company_phone_code+response.company_phone;
            formik.initialValues.company_registerd_address = response.company_registerd_address;
            formik.initialValues.company_zip_code = response.company_zip_code;
            setLoading(false);
        });

    };
    const getMobileRecord = () => {
        setLoading(true);
        CommonService.getRecord('/auth/config/mobile_app_setting', '', (response) => {
            mobSetFormik.initialValues.android.appVersion = response?.android?.appVersion;
            mobSetFormik.initialValues.android.isMandatory = response?.android?.isMandatory;
            mobSetFormik.initialValues.ios.appVersion = response?.ios?.appVersion;
            mobSetFormik.initialValues.ios.isMandatory = response?.ios?.isMandatory;
            console.log("mobile_app_setting",mobSetFormik.initialValues);
            setLoading(false);
        });
    };
    const getWithdrawalRecord = () => {
        setLoading(true);
        CommonService.getRecord('/auth/config/withdrawal_rules', '', (response) => {
            withdrawalFormik.initialValues.min_amount = parseInt(response?.min_amount);
            withdrawalFormik.initialValues.withdrawal_restrictions = response?.withdrawal_restrictions;
            console.log("getWithdrawalRecord",withdrawalFormik.initialValues);
            setLoading(false);
        });
    };
    const getOtherRecord = () => {
        setLoading(true);
        CommonService.getRecord('/auth/config/other', '', (response) => {
            otherFormik.initialValues.timezone = response?.timezone;
            console.log("getOtherRecord",otherFormik.initialValues);
            setLoading(false);
        });
    };
    useEffect(() => {
        getRecord();
    }, []);

    const [activeTab, setActiveTab] = useState('company');
    const [subActiveTab, setSubActiveTab] = useState('1');
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const toggle = tab => {
        if(tab === 'company'){
            getRecord();
        } else if(tab === 'mobile_settings'){
            getMobileRecord();
        } else if(tab === 'withdrawal'){
            getWithdrawalRecord();
        } else if(tab === 'other'){
            getOtherRecord();
        }
        if (activeTab !== tab) setActiveTab(tab);
    };
    const subToggle = tab => {
        if (subActiveTab !== tab) setSubActiveTab(tab);
    };
    const handleImageChange = (e) => {
        const imageId = e.currentTarget.id;
        const file = e.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            const imgTag = document.getElementById(imageId + '_img');
            imgTag.title = file.name;
            reader.onload = function (event) {
                imgTag.src = event.target.result;
            };
            reader.readAsDataURL(file);
            formik.setFieldValue(imageId, file);
        }
    };

    const handleCountryChange = (event) =>{
        let countryCode = event.target.options[event.target.selectedIndex].dataset.id;
        setStateList(State.getStatesOfCountry(countryCode));
        formik.setFieldValue('company_country_code',countryCode);
    };
    const handleStateChange = (event) =>{
        let stateCode = event.target.options[event.target.selectedIndex].dataset.id;
        let countryCode = event.target.options[event.target.selectedIndex].dataset.country;
        setCityList(City.getCitiesOfState(countryCode,stateCode));
        formik.setFieldValue('company_state_code',stateCode);
    };
    const defaultImg = require("../../../assets/img/no-image.png").default;
    const addDefaultSrc = (ev) => {
        ev.target.src = defaultImg
    };

    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>

                        <Nav tabs className="tabsview1">
                            <div className="back">
                                <Button onClick={() => history.goBack()} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left" />
                                </Button>
                            </div>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === 'company'})}
                                    onClick={() => {
                                        toggle('company');
                                    }}
                                >
                                    <div className="child">{props.data.name}</div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === 'mobile_settings'})}
                                    onClick={() => {
                                        toggle('mobile_settings');
                                    }}
                                >
                                    Mobile settings
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === 'withdrawal'})}
                                    onClick={() => {
                                        toggle('withdrawal');
                                    }}
                                >
                                    Withdrawal settings
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === 'other'})}
                                    onClick={() => {
                                        toggle('other');
                                    }}
                                >
                                    Other
                                </NavLink>
                            </NavItem>
                        </Nav>

                    </Container>
                </div>
                <div className="main-content-body">
                    <Container className="" fluid>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="mobile_settings">
                                <Formik>
                                    <FormikForm role="form" onSubmit={mobSetFormik.handleSubmit} className="mx7">
                                        <div>
                                            <div className="border px-3 pt-3 rounded mb-3">
                                                <div className="child">Android</div>
                                                <hr className="mt-0 mb-3"/>
                                                <FormGroup className={` mb-3`}>
                                                    <Field type={'text'} className="form-control"
                                                           placeholder="App Version" name={`android.appVersion`}
                                                           onChange={mobSetFormik.handleChange}
                                                           value={mobSetFormik.values?.android?.appVersion}/>
                                                        {mobSetFormik.touched?.android?.appVersion && mobSetFormik.errors?.android?.appVersion ? (
                                                        <div
                                                            className="text-danger input-error">{mobSetFormik.errors?.android?.appVersion}</div>) : null}
                                                </FormGroup>
                                                <FormGroup className="mb-2">
                                                    <CustomInput type="switch" id="android_isMandatory" name={`android.isMandatory`}
                                                                 label="is Mandatory"
                                                                 value={mobSetFormik.values?.android?.isMandatory}
                                                                 onChange={(event) => {
                                                                     mobSetFormik.setFieldValue(`android.isMandatory`, event.target.checked)
                                                                 }}
                                                                 checked={mobSetFormik.values?.android?.isMandatory}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className="border px-3 pt-3 rounded mb-3">
                                                <div className="child">Ios</div>
                                                <hr className="mt-0 mb-3"/>
                                                <FormGroup className={` mb-3`}>
                                                    <Field type={'text'} className="form-control"
                                                           placeholder="App Version" name={`ios.appVersion`}
                                                           onChange={mobSetFormik.handleChange}
                                                           value={mobSetFormik.values?.ios?.appVersion}/>
                                                    {mobSetFormik.touched?.ios?.appVersion && mobSetFormik.errors?.ios?.appVersion ? (
                                                        <div
                                                            className="text-danger input-error">{mobSetFormik.errors?.ios?.appVersion}</div>) : null}
                                                </FormGroup>
                                                <FormGroup className="mb-2">
                                                    <CustomInput type="switch" id="Ios_isMandatory" name={`ios.isMandatory`}
                                                                 label="is Mandatory"
                                                                 value={mobSetFormik.values?.ios?.isMandatory}
                                                                 onChange={(event) => {
                                                                     mobSetFormik.setFieldValue(`ios.isMandatory`, event.target.checked)
                                                                 }}
                                                                 checked={mobSetFormik.values?.ios?.isMandatory}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div hidden={hiddenPrivileges} className="btnList">
                                                <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                                    <i className="ti-check" /><span>Submit</span>
                                                </Button>
                                                <Button onClick={() => history.goBack()} variant="contained" type="button"
                                                        className="btn-icon btn-light2">
                                                    <i className="ti-close" /><span>Cancel</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </FormikForm>
                                </Formik>
                            </TabPane>
                            <TabPane tabId="withdrawal">
                                <Formik>
                                    <FormikForm role="form" onSubmit={withdrawalFormik.handleSubmit} className="mx7">
                                        <div>
                                            <FormGroup className={` mb-3`}>
                                                <Field type={'number'} className="form-control" placeholder="Min Amount" name={`min_amount`}
                                                       onChange={withdrawalFormik.handleChange} value={withdrawalFormik.values.min_amount}/>
                                                {withdrawalFormik.touched?.min_amount && withdrawalFormik.errors?.min_amount ? (
                                                    <div className="text-danger input-error">{withdrawalFormik.errors?.min_amount}</div>) : null}
                                            </FormGroup>
                                            <FormGroup className={` mb-3`}>
                                                <Field type={'text'} className="form-control"
                                                       placeholder="withdrawal restrictions" name={`withdrawal_restrictions`}
                                                       onChange={withdrawalFormik.handleChange}
                                                       value={withdrawalFormik.values?.withdrawal_restrictions}/>
                                                {withdrawalFormik.touched?.withdrawal_restrictions && withdrawalFormik.errors?.withdrawal_restrictions ? (
                                                    <div
                                                        className="text-danger input-error">{withdrawalFormik.errors?.withdrawal_restrictions}</div>) : null}
                                            </FormGroup>
                                            <div hidden={hiddenPrivileges} className="btnList">
                                                <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                                    <i className="ti-check" /><span>Submit</span>
                                                </Button>
                                                <Button onClick={() => history.goBack()} variant="contained" type="button"
                                                        className="btn-icon btn-light2">
                                                    <i className="ti-close" /><span>Cancel</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </FormikForm>
                                </Formik>
                            </TabPane>
                            <TabPane tabId="other">
                                <Formik>
                                    <FormikForm role="form" onSubmit={otherFormik.handleSubmit} className="mx7">
                                        <div>
                                            <FormGroup className={` mb-3`}>
                                                <Field className="form-control"
                                                       id={`timezone`}
                                                       name={`timezone`} as="select"
                                                       onChange={(event) => {
                                                           console.log(event.target.options,event.target.selectedIndex,"getOtherRecord event.target.value",event.target.options[event.target.selectedIndex].dataset.id);
                                                           otherFormik.setFieldValue(`timezone`, event.target.value);
                                                           otherFormik.setFieldValue(`timezone_name`, event.target.options[event.target.selectedIndex].dataset.id);
                                                       }}
                                                       onBlur={otherFormik.handleChange}
                                                       value={otherFormik.values.timezone}
                                                >
                                                    <option data-id={''} value="">Select timezone</option>
                                                    {
                                                        objTimeZone
                                                        && Object.keys(objTimeZone).map((k,index) => (
                                                            <option key={`country-opt-${index}`} title={objTimeZone[k].name} data-id={objTimeZone[k].name}
                                                                    value={objTimeZone[k].utcOffsetStr}>{objTimeZone[k].name} {objTimeZone[k].utcOffsetStr}</option>
                                                        ))
                                                    }
                                                </Field>
                                                {otherFormik.touched.timezone && otherFormik.errors.timezone ? (<div
                                                    className="text-danger input-error">{otherFormik.errors.timezone}</div>) : null}
                                            </FormGroup>
                                            <div hidden={hiddenPrivileges} className="btnList">
                                                <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                                    <i className="ti-check" /><span>Submit</span>
                                                </Button>
                                                <Button onClick={() => history.goBack()} variant="contained" type="button"
                                                        className="btn-icon btn-light2">
                                                    <i className="ti-close" /><span>Cancel</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </FormikForm>
                                </Formik>
                            </TabPane>
                            <TabPane tabId="company">
                                <Formik>
                                    <FormikForm role="form" onSubmit={formik.handleSubmit} className="mx7">
                                        <div>
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({active: subActiveTab === '1'})}
                                                        onClick={() => {
                                                            subToggle('1');
                                                        }}
                                                    >
                                                        Company
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({active: subActiveTab === '2'})}
                                                        onClick={() => {
                                                            subToggle('2');
                                                        }}
                                                    >
                                                        Company info
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({active: subActiveTab === '3'})}
                                                        onClick={() => {
                                                            subToggle('3');
                                                        }}
                                                    >
                                                        Company Address
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({active: subActiveTab === '4'})}
                                                        onClick={() => {
                                                            subToggle('4');
                                                        }}
                                                    >
                                                        Company info
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={subActiveTab}>
                                                <TabPane tabId="1">
                                                    <Row>
                                                        <Col sm="12" className={`mt-3`}>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field type={'text'} className="form-control"
                                                                       placeholder="Company name" name={`company_name`}
                                                                       onChange={formik.handleChange}
                                                                       value={formik.values.company_name}/>
                                                                {formik.touched.company_name && formik.errors.company_name ? (
                                                                    <div
                                                                        className="text-danger input-error">{formik.errors.company_name}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                                <input type={'file'} className={'form-control'}
                                                                       id={'company_logo'} name={'company_logo'}
                                                                       onChange={handleImageChange}/>
                                                                <img
                                                                    onError={(e)=>addDefaultSrc(e)}
                                                                    src={formik.values?.company_logo ? `${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.company}/${formik.values?.company_logo}`: defaultImg}
                                                                    //src={`${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.company}/${formik.values?.company_logo}`}
                                                                    width={100} height={100} alt="" id={'company_logo_img'}/>
                                                                {formik.touched.company_logo && formik.errors.company_logo ? (
                                                                    <div
                                                                        className="text-danger input-error">{formik.errors.company_logo}</div>) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <Row>
                                                        <Col sm="12" className={`mt-3`}>
                                                            <FormGroup className={` mb-3`}>
                                                            <textarea className="form-control" placeholder="Company address"
                                                                      name={`company_address`} onChange={formik.handleChange}
                                                                      value={formik.values.company_address}/>
                                                                {formik.touched.company_address && formik.errors.company_address ? (<div
                                                                    className="text-danger input-error">{formik.errors.company_address}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                            <textarea className="form-control" placeholder="company registered address"
                                                                      name={`company_registerd_address`} onChange={formik.handleChange}
                                                                      value={formik.values.company_registerd_address}/>
                                                                {formik.touched.company_registerd_address && formik.errors.company_registerd_address ? (<div
                                                                    className="text-danger input-error">{formik.errors.company_registerd_address}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field className="form-control"
                                                                       id={`company_country`}
                                                                       name={`company_country`} as="select"
                                                                       onChange={(event) => {
                                                                           handleCountryChange(event);
                                                                           formik.setFieldValue(`company_country`, event.target.value);
                                                                       }}
                                                                       onBlur={formik.handleChange}
                                                                       value={formik.values.company_country}
                                                                >
                                                                    <option data-id={''} value="">Select country</option>
                                                                    {
                                                                        Country.getAllCountries()
                                                                        && Country.getAllCountries().map((allData, index) => (
                                                                            <option key={`country-opt-${index}`} title={allData.isoCode} data-id={allData.isoCode}
                                                                                    value={allData.name}>{allData.name}</option>
                                                                        ))
                                                                    }
                                                                </Field>
                                                                {formik.touched.company_country && formik.errors.company_country ? (<div
                                                                    className="text-danger input-error">{formik.errors.company_country}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field className="form-control"
                                                                       id={`company_state`}
                                                                       name={`company_state`} as="select"
                                                                       onChange={(event) => {
                                                                           handleStateChange(event);
                                                                           formik.setFieldValue(`company_state`, event.target.value);
                                                                       }}
                                                                       onBlur={formik.handleChange}
                                                                       value={formik.values.company_state}
                                                                >
                                                                    <option data-id={''} value="">Select State</option>
                                                                    {
                                                                        stateList
                                                                        && stateList.map((allData, index) => (
                                                                            <option key={`state-opt-${index}`} title={allData.isoCode} data-id={allData.isoCode} data-country={allData.countryCode}
                                                                                    value={allData.name}>{allData.name}</option>
                                                                        ))
                                                                    }
                                                                </Field>
                                                                {formik.touched.company_state && formik.errors.company_state ? (
                                                                    <div
                                                                        className="text-danger input-error">{formik.errors.company_state}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field className="form-control"
                                                                       id={`company_city`}
                                                                       name={`company_city`} as="select"
                                                                       onChange={formik.handleChange}
                                                                       onBlur={formik.handleChange}
                                                                       value={formik.values.company_city}
                                                                >
                                                                    <option data-id={''} value="">Select City</option>
                                                                    {
                                                                        cityList
                                                                        && cityList.map((allData, index) => (
                                                                            <option key={`state-opt-${index}`} title={allData.isoCode} data-id={allData.isoCode}
                                                                                    value={allData.name}>{allData.name}</option>
                                                                        ))
                                                                    }
                                                                </Field>
                                                                {formik.touched.company_city && formik.errors.company_city ? (
                                                                    <div
                                                                        className="text-danger input-error">{formik.errors.company_city}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field type={'number'} className="form-control" placeholder="Game No" name={`company_zip_code`} onChange={formik.handleChange} value={formik.values.company_zip_code}/>
                                                                {formik.touched.company_zip_code && formik.errors.company_zip_code ? (<div className="text-danger input-error">{formik.errors.company_zip_code}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                                <PhoneInput
                                                                    withCountryCallingCode={true}
                                                                    className={"form-control"}
                                                                    placeholder="Enter phone number"
                                                                    name={`phone`}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.company_phone}
                                                                    onCountryChange={(phone_code) => {
                                                                        if (phone_code) {
                                                                            formik.setFieldValue(`company_phone_code`, getCountryCallingCode(phone_code))
                                                                        }
                                                                    }}
                                                                    onChange={e => formik.setFieldValue(`company_phone`, e)}
                                                                />
                                                                <Field className="form-control" placeholder="Phone" hidden={true} name={`company_phone_code`} onChange={formik.handleChange} value={formik.values.company_phone_code}  />
                                                                {formik.errors?.company_phone ? (<div className="text-danger input-error">{formik.errors?.company_phone}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field className="form-control" placeholder="Company email"
                                                                       name={`company_email`} onChange={formik.handleChange} value={formik.values?.company_email}  />
                                                                {formik.errors?.company_email ? (<div className="text-danger input-error">{formik.errors?.company_email}</div>) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    <Row>
                                                        <Col sm="12" className={`mt-3`}>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field type={'text'} className="form-control"
                                                                       placeholder="Company Domain" name={`company_domain`}
                                                                       onChange={formik.handleChange}
                                                                       value={formik.values.company_domain}/>
                                                                {formik.touched.company_domain && formik.errors.company_domain ? (
                                                                    <div
                                                                        className="text-danger input-error">{formik.errors.company_domain}</div>) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane tabId="4">
                                                    <Row>
                                                        <Col sm="12" className={`mt-3`}>
                                                            <FormGroup className={` mb-3`}>
                                                                <Field type={'text'} className="form-control"
                                                                       placeholder="Company meta title" name={`company_meta_title`}
                                                                       onChange={formik.handleChange}
                                                                       value={formik.values.company_meta_title}/>
                                                                {formik.touched.company_meta_title && formik.errors.company_meta_title ? (
                                                                    <div
                                                                        className="text-danger input-error">{formik.errors.company_meta_title}</div>) : null}
                                                            </FormGroup>
                                                            <FormGroup className={` mb-3`}>
                                                            <textarea className="form-control" placeholder="Company meta description"
                                                                      name={`company_meta_description`} onChange={formik.handleChange}
                                                                      value={formik.values.company_meta_description}/>
                                                                {formik.touched.company_meta_description && formik.errors.company_meta_description ? (<div
                                                                    className="text-danger input-error">{formik.errors.company_meta_description}</div>) : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                            </TabContent>
                                        </div>
                                        <div hidden={hiddenPrivileges} className="btnList">
                                            <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                                <i className="ti-check" /><span>Submit</span>
                                            </Button>
                                            <Button onClick={() => history.goBack()} variant="contained" type="button"
                                                    className="btn-icon btn-light2">
                                                <i className="ti-close" /><span>Cancel</span>
                                            </Button>
                                        </div>
                                    </FormikForm>
                                </Formik>
                            </TabPane>
                        </TabContent>

                    </Container>
                </div>
            </div>
        </>
    );
};

export default IsLoadingHOC(AddUpdateConfig, 'loading');
