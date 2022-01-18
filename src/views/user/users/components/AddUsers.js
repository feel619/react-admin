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
    Col, InputGroup, InputGroupAddon, InputGroupText, CustomInput, ListGroup, ListGroupItem
} from "reactstrap";
import {
    Field,
    FieldArray,
    Form as FormikForm,
    useFormikContext,
    Formik,
    useFormik,
    FormikProvider, ErrorMessage
} from "formik";
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

const AddUsers = (props) => {
    console.log(props, " AddUsers__ ");
    const location = useLocation();
    const {setLoading} = props;
    const {from} = location.state || {from: {pathname: "/admin/user"}};
    const dispatch = useDispatch(null);
    const [editUserRoles, setEditUserRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUserRolesPrivileges, setSelectedUserRolesPrivileges] = useState([]);
    const UserRoleReducers = useSelector(state => state.UserRoleReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('5') < 0;
    const [showingIpView, setShowingIpView] = useState(false);
    console.log(UserRoleReducers,"UserRoleReducers");
    const initialValues = {
        username: '',
        password: '',
        user_role_id: selectedRole,
        privileges: selectedUserRolesPrivileges,
        is_ip_config: showingIpView,
        user_profile: {
            name: '',
            phone_code: "",
            phone: "",
            birthdate: "",
            email: "",
        },
        iparr: []
    };

    const validationSchema = Yup.object({
        username: Yup.string().trim().required('Username is required'),
        password: Yup.string().trim().required('password is required'),
        user_role_id: Yup.string().required("Role is required"),
        privileges: Yup.array().test({
            name: "privileges",
            exclusive: true,
            message: "At least select one",
            test: (value) => value.length > 0,
        }),
        user_profile: Yup.object().shape({
            name: Yup.string().trim().required('Name is required'),
            //    phone_code: Yup.string().required('Phone Code is required'),
            phone: Yup.string().trim().required('Phone is required').test('test-name', 'Enter valid phone number',
                function (value) {
                    return (value) ? isValidPhoneNumber(value) : true;
                }),
            birthdate: Yup.string().trim().required('Birth date is required'),
            email: Yup.string().trim().required('Email is required').email("Enter valid email"),
        }),
        is_ip_config: Yup.boolean(),
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
            console.log("onSubmit--values", values);
            if (values.user_profile.phone_code && values.user_profile.phone) {
                let reqEx = "+" + values.user_profile.phone_code;
                values.user_profile.phone = values.user_profile.phone.split(reqEx).pop("");
            }
            const reqData = {
                "username": values.username,
                "password": values.password,
                "user_role_id": values.user_role_id,
                "privileges": values.privileges.toString(),
                "is_ip_config": values.is_ip_config,
                "iparr": values.iparr,
                "user_profile": values.user_profile
            };
            console.log("onSubmit--onSubmit", reqData);
            dispatch(UsersAction.AddUsers(reqData, from))
        },
    });
    const handleRoleChange = e => {
        const selectRole = e.target.value;
        let index = e.nativeEvent.target.selectedIndex;
        let rolePrivileges = e.nativeEvent.target[index].dataset.privileges;
        let selectedPrivileges = rolePrivileges.split(",");
        setSelectedRole(selectRole);
        setSelectedUserRolesPrivileges(selectedPrivileges);
        formik.values.user_role_id = selectRole;
        formik.values.privileges = selectedPrivileges;
        console.log(formik.values.user_role_id);
        console.log(formik.values.privileges);
    };
    const getUsersRoles = () => {
        if(UserRoleReducers.RoleListing?.success) setEditUserRoles(UserRoleReducers.RoleListing?.response);
        setLoading(false);
    };
    useEffect(() => {
        getUsersRoles();
    }, []);

    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.push(from)} className="btn-icon btn-light2" size="sm">
                                    <i class="ti-arrow-left"></i>
                                </Button>
                            </div>
                            <div className="child">{props.data.name}</div>
                        </div>
                    </Container>
                </div>
                <div className="main-content-body">
                    <Container className="" fluid>
                        <Formik>
                            <FormikForm onSubmit={formik.handleSubmit} className="mx7" >
                                <FormGroup className={` mb-3`}>
                                    <Field type={'text'} className="form-control" placeholder="username" name={`username`} onChange={formik.handleChange} value={formik.values.username}/>
                                    {formik.errors?.username ? (<div className="text-danger input-error">{formik.errors?.username}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" placeholder="password" name={`password`} onChange={formik.handleChange} value={formik.values.password} />
                                    {formik.errors?.password ? (<div className="text-danger input-error">{formik.errors?.password}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" name="user_role_id" as="select"
                                           onChange={handleRoleChange}
                                           onBlur={formik.handleChange}
                                           value={formik.values.user_role_id}
                                    >
                                        <option data-privileges={''} value="">Select Role</option>
                                        {
                                            editUserRoles.length > 0
                                            && editUserRoles.map((roleData, index) => (
                                                <option key={`role-opt-${index}`} data-privileges={roleData.privileges}
                                                        value={roleData.id}>{roleData.role}</option>
                                            ))
                                        }
                                    </Field>
                                    {formik.errors?.user_role_id ? (<div className="text-danger input-error">{formik.errors?.user_role_id}</div>) : null}
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormikProvider value={formik}>
                                        <FieldArray
                                            name="iparr"
                                            render={arrayHelpers => {
                                                const privileges = formik.values.privileges;
                                                return (
                                                    <ListGroup className="listHover">
                                                        {
                                                            UserRoleReducers.UserRolePrivileges?.success ?
                                                                <>
                                                                    {
                                                                        UserRoleReducers.UserRolePrivileges.response.map((prop, key) => {
                                                                            return (
                                                                                <>
                                                                                    <ListGroupItem key={`list${key}`}
                                                                                                   className="justify-content-between">
                                                                                        <div key={'userRoleKey_' + key}
                                                                                             className="checksList">
                                                                                            <div
                                                                                                className="font14 fw7">{prop.module}</div>
                                                                                            <div className="checkList flex flex-wrap justify-content-end">
                                                                                                {
                                                                                                    prop.privileges.map((priProp, priKey) => {
                                                                                                        let checked = (privileges.indexOf(priProp.id.toString()) !== -1);
                                                                                                        //console.log(editUserRole.privileges, " privileges ",editUserRole, checked);
                                                                                                        return (
                                                                                                            <>
                                                                                                                <FormGroup
                                                                                                                    key={`subList${priKey}`}
                                                                                                                    check>
                                                                                                                    <Label
                                                                                                                        check
                                                                                                                        className="d-flex"
                                                                                                                        key={'Privileges_' + priKey}
                                                                                                                        id={'privileges_' + priProp.id}>
                                                                                                                        <Field
                                                                                                                            className={`form-check-input`}
                                                                                                                            type="checkbox"
                                                                                                                            name={`privileges`}
                                                                                                                            id={`privileges.${priProp.id}`}
                                                                                                                            value={priProp.id}
                                                                                                                            onChange={(event) => {
                                                                                                                                let value = `${priProp.id}`;
                                                                                                                                let findIndex = privileges.indexOf(priProp.id.toString());
                                                                                                                                console.log(privileges, " -privileges_ubnchec-", priProp.id, findIndex);
                                                                                                                                if (findIndex !== -1) {
                                                                                                                                    privileges.splice(findIndex, 1);
                                                                                                                                } else {
                                                                                                                                    privileges.push(value);
                                                                                                                                }
                                                                                                                                formik.setFieldValue(`privileges`, privileges);
                                                                                                                            }}
                                                                                                                            checked={checked}
                                                                                                                        />
                                                                                                                        <span
                                                                                                                            className="font14">{priProp.privilege}</span>
                                                                                                                    </Label>
                                                                                                                </FormGroup>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </ListGroupItem>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    <ListGroupItem className="justify-content-between">
                                                                        <h1>No Privileges Found</h1>
                                                                    </ListGroupItem>
                                                                </>
                                                        }
                                                    </ListGroup>
                                                );
                                            }}
                                        />
                                    </FormikProvider>
                                    {formik.touched.privileges && formik.errors.privileges ? (<div className="text-danger input-error">{formik.errors.privileges}</div>) : null}
                                </FormGroup>

                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" placeholder="name" name={`user_profile.name`} onChange={formik.handleChange} value={formik.values.user_profile.name} />
                                    {formik.errors?.user_profile?.name ? (<div className="text-danger input-error">{formik.errors?.user_profile?.name}</div>) : null}
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
                                    <Field className="form-control" placeholder="Phone" hidden={true} name={`user_profile.phone_code`} onChange={formik.handleChange} value={formik.values.user_profile.phone}  />
                                    {formik.errors?.user_profile?.phone ? (<div className="text-danger input-error">{formik.errors?.user_profile?.phone}</div>) : null}
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
                                    {formik.errors?.user_profile?.birthdate ? (<div className="text-danger input-error">{formik.errors?.user_profile?.birthdate}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" placeholder="email"
                                           name={`user_profile.email`} onChange={formik.handleChange} value={formik.values?.user_profile?.email}  />
                                    {formik.errors?.user_profile?.email ? (<div className="text-danger input-error">{formik.errors?.user_profile?.email}</div>) : null}
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
                                                            console.log(iparr, "iparr");
                                                            return (
                                                                <div>
                                                                    <Button className="btn-icon btn-primary2"
                                                                            onClick={() =>
                                                                                arrayHelpers.push({
                                                                                    id: "",
                                                                                    ip: ""
                                                                                })
                                                                            }><i className="ti-plus"></i><span>Add</span></Button>
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
                                                                                                <div
                                                                                                    className="text-danger input-error">
                                                                                                    <ErrorMessage
                                                                                                        className="text-danger input-error"
                                                                                                        name={`iparr.${index}.id`}/>
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
                                                                                                <div
                                                                                                    className="text-danger">{formik.errors?.iparr?.[formik.errors?.iparr?.findIndex((x, key) => key === index)]?.ip}</div>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                        <Col className="col-auto">
                                                                                            <Button
                                                                                                className="btn-icon btn-light2"
                                                                                                onClick={() => {
                                                                                                    arrayHelpers.remove(index)
                                                                                                }}><i className="ti-trash"></i><span>Delete</span></Button>
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
                                <div className="btnList" hidden={hiddenPrivileges}>
                                    <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                        <i className="ti-check"></i><span>Submit</span>
                                    </Button>
                                    <Button onClick={() => history.push(from)} variant="contained" type="button"
                                            className="btn-icon btn-light2">
                                        <i className="ti-close"></i><span>Cancel</span>
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

export default IsLoadingHOC(AddUsers, 'loading');
