import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup} from 'reactstrap';
import * as Yup from "yup";
import {Field, Formik, Form as FormikForm, useFormik} from "formik";
import {CommonService} from "../../redux/_services/CommonService";

const ResetPassword = (props) => {
    const {
        buttonLabel,
        className
    } = props;
    console.log(buttonLabel, "dd", className);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

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
        onSubmit: (values, {setSubmitting, resetForm}) => {
            CommonService.sendHTTPRequest('/auth/reset_pwd', 'PUT', values)
                .then(
                    response => {
                        console.log("reset_password_success", response);
                        resetForm(initialValues);
                        setModal(false);
                    },
                    error => {
                        console.log("reset_password_error", error);
                    }
                );
        },
    });
    return (
        <div>
            {/*<Button
                className="float-right"
                color="default"
                onClick={toggle}
                size="sm"
            >
                {buttonLabel}
            </Button>*/}
            <span onClick={toggle}><i className="ti-user"/> {buttonLabel}</span>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} close={closeBtn}>Reset Password</ModalHeader>
                <Formik>
                    <FormikForm onSubmit={formik.handleSubmit} className="mx7">
                        {console.log(formik," fprf ")}
                        <ModalBody>
                            <div className="main-content-body">
                                <Container className="" fluid>

                                    <FormGroup className={` mb-3`}>
                                        <Field type={'password'} className="form-control" placeholder="Password"
                                               name={`password`} onChange={formik.handleChange}
                                               value={formik.values.password}/>
                                        <div className="text-danger input-error">{formik.errors?.password}</div>
                                    </FormGroup>

                                    <FormGroup className={` mb-3`}>
                                        <Field type={'password'} className="form-control" placeholder="Confirm password"
                                               name={`cnfrm_password`} onChange={formik.handleChange}
                                               value={formik.values.cnfrm_password}/>
                                        <div className="text-danger input-error">{formik.errors?.cnfrm_password}</div>
                                    </FormGroup>
                                </Container>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="btnList">
                                <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                    <i className="ti-check"></i><span>Submit</span>
                                </Button>
                                <Button variant="contained" type="button" onClick={toggle}
                                        className="btn-icon btn-light2">
                                    <i className="ti-close"></i><span>Cancel</span>
                                </Button>
                            </div>
                        </ModalFooter>
                    </FormikForm>
                </Formik>
            </Modal>
        </div>
    );
}

export default ResetPassword;
