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
import 'react-phone-number-input/style.css'
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";

const UpdateUsersPassword = (props) => {
    console.log(props, " UpdateUsersPassword ");
    const {id} = useParams();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/user"}};
    const {setLoading} = props;
    setLoading(false);
    const dispatch = useDispatch(null);
    const initialValues = {
        password: '',
        cnfrm_password: ''
    };
    const validationSchema = Yup.object({
        password: Yup.string().required("Password is required").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        cnfrm_password: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (id) {
                CommonService.sendHTTPRequest('/auth/user/'+id+'/reset_password', 'PUT', values)
                    .then(
                        response => {
                            console.log("Listing reset_password  SUCCESS ", response);
                            history.push(from);
                        },
                        error => {
                            console.log("Listing reset_password  error ",error);
                            CommonService.responseErrorCodeHandler(error.response.status, 'Internal server error');
                        }
                    );
            }
        },
    });
    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.push(from)} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left"></i>
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

                                <FormGroup className={` mb-3`}>
                                    <Field type={'password'} className="form-control" placeholder="Password" name={`password`} onChange={formik.handleChange} value={formik.values.password}/>
                                    <div className="text-danger input-error">{formik.errors?.password}</div>
                                </FormGroup>

                                <FormGroup className={` mb-3`}>
                                    <Field type={'password'} className="form-control" placeholder="Confirm password" name={`cnfrm_password`} onChange={formik.handleChange}  value={formik.values.cnfrm_password} />
                                    <div className="text-danger input-error">{formik.errors?.cnfrm_password}</div>
                                </FormGroup>

                                <div className="btnList">
                                    <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                                <i className="ti-check"></i><span>Submit</span>
                                    </Button>
                                    <Button onClick={() => history.push(from)} variant="contained" type="button" className="btn-icon btn-light2">
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
export default IsLoadingHOC(UpdateUsersPassword,'loading');

//export default UpdateUsersPassword;
