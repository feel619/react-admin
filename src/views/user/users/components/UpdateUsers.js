import React, {useEffect, useState, useRef} from "react";
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
    Col, InputGroup, InputGroupAddon, InputGroupText, CustomInput
} from "reactstrap";
import {ErrorMessage, Field, FieldArray, Form as FormikForm, FormikProvider, Formik, useFormik} from "formik";
import {UsersAction} from "../slice/UsersAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import {history} from "../../../../redux/_helpers";
import {CommonService} from "../../../../redux/_services/CommonService";
import {InputTextBox, InputSelectBox} from "../../../formComponent/FormFiled";
import {UserRoleAction} from "../../userRole/slice/UserRoleAction";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {isValidPhoneNumber, getCountryCallingCode} from 'react-phone-number-input'
import DateRangePicker from "react-bootstrap-daterangepicker";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";

const UpdateUsers = (props) => {
    console.log(props, " UpdateUsers ");
    const {setLoading} = props;
    const {id} = useParams();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/user"}};
    const dispatch = useDispatch(null);
    const [showingIpView, setShowingIpView] = useState(false);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('5') < 0;
    const initialValues = {
        username: '',
        is_ip_config: '',
        user_profile: {
            name: '',
            phone_code: "",
            phone: "",
            birthdate: "",
            email: "",
        },
        iparr: []
    };
    const [editValues,setEditValues] = useState(initialValues);
    const validationSchema = Yup.object({
        username: Yup.string().trim().required('Username is required'),
        user_profile: Yup.object().shape({
            name: Yup.string().trim().required('Name is required'),
            phone: Yup.string().trim().required('Phone is required').test('test-name', 'Enter valid phone number',
                function (value) {
                    console.log(value,"va");
                    return (value) ? isValidPhoneNumber(value) : true;
                }),
            birthdate: Yup.string().trim().required('Birth date is required'),
            email: Yup.string().trim().required('Email is required').email("Enter valid email"),
        }),
        iparr: Yup.array().of(
            Yup.object().shape({
                ip: Yup.string().matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
                    message: 'Invalid IP address',
                    excludeEmptyString: true
                }).test('ip', 'Invalid IP address', value => {
                    return value === undefined || value.trim() === ''
                        ? true
                        : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
                })
            })
        )
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.user_profile.phone_code && values.user_profile.phone) {
                let reqEx = "+" + values.user_profile.phone_code;
                values.user_profile.phone = values.user_profile.phone.split(reqEx).pop("");
            }
            const reqData = values;
            if (id) {
                dispatch(UsersAction.UpdateUsers(id,reqData, from))
            }
        },
    });
    const getUserInfo = () => {
        CommonService.getRecord('/auth/user/', id, (response) => {
            formik.initialValues.username = response.username;
            formik.initialValues.user_profile.name = response.user_profile.name;
            formik.initialValues.user_profile.phone_code = response.user_profile.phone_code;
            formik.initialValues.user_profile.phone = '+'+response.user_profile.phone_code+response.user_profile.phone;
            formik.initialValues.user_profile.birthdate = response.user_profile.birthdate;
            formik.initialValues.user_profile.email = response.user_profile.email;
            formik.initialValues.is_ip_config = response.is_ip_config;
            formik.initialValues.iparr = response.iparr;
            setShowingIpView(response.is_ip_config);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (id) getUserInfo();
    }, []);

    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.push(from)} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left" />
                                </Button>
                            </div>
                            <div className="child">{props.data.name}</div>
                        </div>
                    </Container>
                </div>
                <div className="main-content-body">
                    <Container className="" fluid>
                        <Formik>
                            <FormikForm onSubmit={formik.handleSubmit} className="mx7">
                                {console.log(formik," FormikForm  ",editValues)}
                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" placeholder="username" name={`username`} onChange={formik.handleChange} value={formik.values.username} />
                                    <div className="text-danger input-error">{formik.errors?.username}</div>
                                </FormGroup>

                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" placeholder="name" name={`user_profile.name`} onChange={formik.handleChange}  value={formik.values.user_profile.name} />
                                    <div className="text-danger input-error">{formik.errors?.user_profile?.name}</div>
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <PhoneInput
                                        withCountryCallingCode={true}
                                        className={"form-control"}
                                        placeholder="Enter phone number"
                                        name={`phone`}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.user_profile.phone}
                                        onCountryChange={(phone_code) => {
                                            if (phone_code) {
                                                formik.setFieldValue(`user_profile.phone_code`, getCountryCallingCode(phone_code))
                                            }
                                        }}
                                        onChange={e => formik.setFieldValue(`user_profile.phone`, e)}
                                    />
                                    <Field className="form-control" placeholder="Phone" hidden={true}
                                        name={`user_profile.phone_code`} value={formik.values.user_profile.phone_code}/>
                                    <div className="text-danger input-error">{formik.errors?.user_profile?.phone}</div>
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <DateRangePicker onCallback={(start, end, label) => {
                                        let startDate = start.format('YYYY-MM-DD');
                                        formik.setFieldValue(`user_profile.birthdate`, startDate);
                                    }}
                                                    initialSettings={{
                                                        singleDatePicker: true,
                                                        autoUpdateInput: false,
                                                        maxDate: new Date()
                                                    }}
                                    >
                                        <input type="text" name={`user_profile.birthdate`}
                                            id={`user_profile.birthdate`}
                                            className="form-control"
                                            placeholder="Birth Date" readOnly={true}
                                            onChange={formik.handleChange}
                                            value={formik.values.user_profile.birthdate}/>
                                    </DateRangePicker>
                                    <div className="text-danger input-error">{formik.errors?.user_profile?.birthdate}</div>
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" placeholder="email" name={`user_profile.email`} onChange={formik.handleChange} value={formik.values.user_profile.email}/>
                                    <div className="text-danger input-error">{formik.errors?.user_profile?.email}</div>
                                </FormGroup>
                                <div className="border px-3 pt-3 rounded mb-3">
                                    <FormGroup className="mb-0">
                                        <CustomInput type="switch" id="is_ip_config" name="is_ip_config"
                                                    label="Config Ip Addresses"
                                                    value={formik.values.is_ip_config}
                                                    onChange={(event) => {
                                                        setShowingIpView(!showingIpView)
                                                        formik.setFieldValue(`is_ip_config`, event.target.checked)
                                                    }}
                                                    checked={formik.values.is_ip_config}
                                        />
                                    </FormGroup>
                                    <div className="my-3">
                                        {
                                            showingIpView &&
                                            <>
                                            <hr className="mt-0 mb-3"/>
                                            <FormikProvider value={formik}>
                                                <FieldArray
                                                    name="iparr"
                                                    render={arrayHelpers => {
                                                        const iparr = formik.values.iparr;
                                                        console.log(iparr,"iparr");
                                                        return (
                                                            <div>
                                                                <Button className="btn-icon btn-primary2" onClick={() =>
                                                                    arrayHelpers.push({
                                                                        id: "",
                                                                        ip: ""
                                                                    })
                                                                }><i className="ti-plus" /><span>Add</span></Button>
                                                                {iparr && iparr.length > 0
                                                                    ? iparr.map((ipArrayValue, index) => (
                                                                        <div key={index}>
                                                                            <div className="mt-2">
                                                                                <Row className="gutSm">
                                                                                    <Col>
                                                                                        <FormGroup hidden>
                                                                                            <Field
                                                                                                placeholder="id"
                                                                                                name={`iparr.${index}.id`}
                                                                                                value={ipArrayValue.id}
                                                                                                className="form-control"
                                                                                            />
                                                                                            <div className="text-danger input-error">
                                                                                                <ErrorMessage className="text-danger input-error" name={`iparr.${index}.id`}/>
                                                                                            </div>
                                                                                        </FormGroup>
                                                                                        <FormGroup>
                                                                                            <Field
                                                                                                placeholder="Ip"
                                                                                                value={ipArrayValue.ip}
                                                                                                name={`iparr.${index}.ip`}
                                                                                                onChange={formik.handleChange}
                                                                                                className="form-control"
                                                                                            />
                                                                                            <div className="text-danger">{formik.errors?.iparr?.[formik.errors?.iparr?.findIndex((x,key) => key === index)]?.ip}</div>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                    <Col className="col-auto">
                                                                                        <Button className="btn-icon btn-light2"
                                                                                            onClick={() => {
                                                                                                console.log(iparr,"opp",index)
                                                                                                arrayHelpers.remove(index)
                                                                                            }}><i className="ti-trash" /><span>Delete</span></Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                    : null}
                                                            </div>
                                                        );
                                                    }}
                                                />
                                            </FormikProvider>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="btnList" hidden={hiddenPrivileges} >
                                    <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                                <i className="ti-check" /><span>Submit</span>
                                    </Button>
                                    <Button onClick={() => history.push(from)} variant="contained" type="button" className="btn-icon btn-light2">
                                        <i className="ti-close" /><span>Cancel</span>
                                    </Button>
                                </div>
                            </FormikForm>
                        </Formik>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default IsLoadingHOC(UpdateUsers,'loading');
