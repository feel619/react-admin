import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {AuthAction} from '../../redux/_actions/AuthAction';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import {CommonService} from "../../redux/_services/CommonService";
import {useState} from "react";
import {toast} from "react-toastify";
import {history} from "../../redux/_helpers";

const sendForgotValidationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email').required('Email is required')
});
const verifyOtpValidationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    otp: Yup.string().required('Otp is required'),
});
const resetForgotValidationSchema = Yup.object({
    token: Yup.string().required('Token is required'),
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

const Forgot = () => {
    const location = useLocation();
    const [formHide, setFormHide] = useState({sendForgot: true, verificationForgot: false,resetForgot: false});
    const [resetToken, setResetToken] = useState({
      email:'',
      token:''
    });
  const resetForgotFormik = useFormik({
    initialValues: {
      token: '',
      password: '',
      cnfrm_password: ''
    },
    validationSchema: resetForgotValidationSchema,
    onSubmit: (values) => {
      console.log(values, "resetForgotFormik");
      const { from } = location.state || { from: { pathname: "/auth/login" } };
      CommonService.sendHTTPRequest('/web/forget_password/otp/reset', 'POST', values)
          .then(
              response => {
                console.log("Listing resetForgotFormik  SUCCESS ", response);
                history.push(from);
              },
              error => {
                if (error.response.status === 406) {
                  CommonService.responseErrorCodeHandler(error.response.status, 'Wrong Token!');
                } else {
                  CommonService.responseErrorCodeHandler(error.response.status, 'Internal server error');
                }
              }
          );
    },
  });
  const verifyOtpFormik = useFormik({
    initialValues: {
      email: '',
      otp: ''
    },
    validationSchema: verifyOtpValidationSchema,
    onSubmit: (values) => {
      console.log(values, "verifyOtpFormik");
      CommonService.sendHTTPRequest('/web/forget_password/otp/verify', 'POST', values)
          .then(
              response => {
                console.log("Listing  otp/verify  SUCCESS ", response);
                resetForgotFormik.values.token = response.token;
                setFormHide({sendForgot: false, verificationForgot: false, resetForgot: true});
              },
              error => {
                console.log("Listing otp/verify FAILURE ", error);
                if (error.response.status === 406) {
                  CommonService.responseErrorCodeHandler(error.response.status, 'Wrong otp!');
                } else {
                  CommonService.responseErrorCodeHandler(error.response.status, 'Internal server error');
                }
              }
          );
    },
  });

    const sendForgotFormik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: sendForgotValidationSchema,
        onSubmit: (values) => {
            CommonService.sendHTTPRequest('/web/forget_password/otp', 'POST', values)
                .then(
                    response => {
                      console.log("Listing  forget_password  SUCCESS ", response);
                      verifyOtpFormik.values.email = values.email;
                      setFormHide({sendForgot: false, verificationForgot: true, resetForgot: false});
                    },
                    error => {
                        if (error.response.status === 406) {
                            CommonService.responseErrorCodeHandler(error.response.status, 'email not exist!');
                        } else if (error.response.status === 412) {
                            CommonService.responseErrorCodeHandler(error.response.status, 'Already verified!');
                        } else if (error.response.status === 429) {
                            CommonService.responseErrorCodeHandler(error.response.status, 'More than 5 times request call ->limit exceeds!');
                        } else {
                            CommonService.responseErrorCodeHandler(error.response.status, 'Internal server error');
                        }
                    }
                );
        },
    });

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-1">
                        <div className="btn-wrapper text-center">
                <span className="btn-inner--icon">
                  {<img
                      alt="..."
                      width="150px"
                      src={
                          require("../../assets/img/reactlogo.svg")
                              .default
                      }
                  />}
                </span>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-1">
                        <div className="text-center text-muted mb-4">
                            <small>Forgot password</small>
                        </div>
                        {/*POST: Send forget password otp on email*/}
                        <Form hidden={!formHide.sendForgot} role="form" onSubmit={sendForgotFormik.handleSubmit}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ti-email"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="text"
                                        onChange={sendForgotFormik.handleChange}
                                        onBlur={sendForgotFormik.handleBlur}
                                        value={sendForgotFormik.values.email}
                                        placeholder="Email"
                                    />
                                </InputGroup>
                                {sendForgotFormik.touched.email && sendForgotFormik.errors.email ? (
                                    <div className="text-danger input-error">{sendForgotFormik.errors.email}</div>
                                ) : null}
                            </FormGroup>
                            <div className="text-center mb-4">
                                <Button variant="contained" className="mt-4" color="primary" type="submit">
                                    Continue
                                </Button>
                            </div>
                            <Col className="text-right" xs="12">
                                <Link  className="text-light" to="/auth/login">
                                    <h4 className={"text-black-50"}>Back to login?</h4>
                                </Link>
                            </Col>
                        </Form>

                        {/*POST: Verify verification of forget password otp*/}
                        <Form hidden={!formHide.verificationForgot} role="form" onSubmit={verifyOtpFormik.handleSubmit}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ti-email"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="text"
                                        onChange={verifyOtpFormik.handleChange}
                                        onBlur={verifyOtpFormik.handleBlur}
                                        value={verifyOtpFormik.values.email}
                                        placeholder="Email"
                                    />
                                </InputGroup>
                                {verifyOtpFormik.touched.email && verifyOtpFormik.errors.email ? (
                                    <div className="text-danger input-error">{verifyOtpFormik.errors.email}</div>
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ti-email"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        onChange={verifyOtpFormik.handleChange}
                                        onBlur={verifyOtpFormik.handleBlur}
                                        value={verifyOtpFormik.values.otp}
                                        placeholder="Otp"
                                    />
                                </InputGroup>
                                {verifyOtpFormik.touched.otp && verifyOtpFormik.errors.otp ? (
                                    <div className="text-danger input-error">{verifyOtpFormik.errors.otp}</div>
                                ) : null}
                            </FormGroup>
                            <div className="text-center mb-4">
                                <Button variant="contained" className="mt-4" color="primary" type="submit">
                                    Continue
                                </Button>
                            </div>
                        </Form>

                        {/*POST: Reset password*/}
                        <Form hidden={!formHide.resetForgot} role="form" onSubmit={resetForgotFormik.handleSubmit}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ti-email"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="token"
                                        name="token"
                                        type="text"
                                        onChange={resetForgotFormik.handleChange}
                                        onBlur={resetForgotFormik.handleBlur}
                                        value={resetForgotFormik.values.token}
                                        placeholder="Token"
                                    />
                                </InputGroup>
                                {resetForgotFormik.touched.token && resetForgotFormik.errors.token ? (
                                    <div className="text-danger input-error">{resetForgotFormik.errors.token}</div>
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ti-lock"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={resetForgotFormik.handleChange}
                                        onBlur={resetForgotFormik.handleBlur}
                                        value={resetForgotFormik.values.password}
                                        placeholder="Password"
                                    />
                                </InputGroup>
                                {resetForgotFormik.touched.password && resetForgotFormik.errors.password ? (
                                    <div className="text-danger input-error">{resetForgotFormik.errors.password}</div>
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ti-lock"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id="cnfrm_password"
                                        name="cnfrm_password"
                                        type="password"
                                        onChange={resetForgotFormik.handleChange}
                                        onBlur={resetForgotFormik.handleBlur}
                                        value={resetForgotFormik.values.cnfrm_password}
                                        placeholder="Confirm Password"
                                    />
                                </InputGroup>
                                {resetForgotFormik.touched.cnfrm_password && resetForgotFormik.errors.cnfrm_password ? (
                                    <div className="text-danger input-error">{resetForgotFormik.errors.cnfrm_password}</div>
                                ) : null}
                            </FormGroup>
                            <div className="text-center mb-4">
                                <Button variant="contained" className="mt-4" color="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};


export default Forgot;
