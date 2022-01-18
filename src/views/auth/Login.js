import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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

const validationSchema = Yup.object({
  username: Yup
    .string('Enter your username')
    .required('Username is required'),
  password: Yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch(null);
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { from } = location.state || { from: { pathname: `/admin/index` } };
      dispatch(AuthAction.login(values.username,values.password, from));
    },
  });
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-1">

            <div className="btn-wrapper text-center">
                <span className="btn-inner--icon">
                  { <img
                    alt="..."
                    width="150px"
                    src={
                      require("../../assets/img/logo_black.svg")
                        .default
                    }
                  /> }
                </span>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-1">
            <div className="text-center text-muted mb-4">
              <small>Sign in</small>
            </div>
            <Form role="form" onSubmit={formik.handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ti-email" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Username"
                  />
                </InputGroup>
                {formik.touched.username && formik.errors.username ? (
                    <div className="text-danger input-error">{formik.errors.username}</div>
                  ) : null}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ti-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Password"
                  />
                </InputGroup>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger input-error">{formik.errors.password}</div>
                  ) : null}
              </FormGroup>
             {/*  <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-danger" />
              <div className="text-center">
                <Button variant="contained" type="submit" className="my-4" color="primary" >
                  Sign in
                </Button>
              </div>
            </Form>
            <Row className="mt-3 mb-3">
              <Col xs="6">
                {/* <a
              className="text-light"
              href="/admin/index"
              onClick={(e) => e.preventDefault()}
            >
              <small className={"text-black-50"}>Forgot password?</small>
            </a>*/}
              </Col>
              <Col className="text-right" xs="6">
                <Link  className="text-light" to="/auth/forgot">
                  <h4 className={"text-black-50"}>Forgot password?</h4>
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
