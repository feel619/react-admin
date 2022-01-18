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
    Col, InputGroup, InputGroupAddon, InputGroupText, CustomInput
} from "reactstrap";
import {Field, FormikProvider, Form as FormikForm, Formik, useFormik} from "formik";
import {UserRoleAction} from "../slice/UserRoleAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../../redux/_helpers';
import {CommonService} from "../../../../redux/_services/CommonService";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";

const validationSchema = Yup.object({
    role: Yup.string().trim().required('Role Name is required'),
    privileges: Yup.array().test({
        name: "privileges",
        exclusive: true,
        message: "At least select one",
        test: (value) => value.length > 0,
    })
});
const AddUserRole = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/role"}};
    const dispatch = useDispatch(null);
    const [editUserRole, setEditUserRole] = useState({role: '', privileges: []});
    const UserRolePrivileges = useSelector(state => state.UserRoleReducers);
    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            role: '',
            type: '',
            privileges: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const reqData = {
                role: values.role,
                privileges: values.privileges.toString()
            };
            if (id) {
                reqData['type'] = (values.type ? 'SUBMIT_APPLY' : 'SUBMIT');
                dispatch(UserRoleAction.UpdateUserRole(id, reqData, from))
            } else {
                dispatch(UserRoleAction.AddUserRole(reqData, from))
            }
        },
    });

    const editUserRolePrivileges = () => {
        CommonService.getRecord('/auth/user_role/', id, (response) => {
            formik.initialValues.role = response.role;
            formik.initialValues.privileges = response.privileges.split(",");
            setEditUserRole({
                role: response.role,
                privileges: response.privileges.split(",")
            });
            setLoading(false);
            console.log(response, "getRecord", formik.initialValues.privileges);
        });
    };
    useEffect(() => {
        if (id) {
            editUserRolePrivileges();
        } else {
            setLoading(false);
        }
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
                            <FormikForm role="form" onSubmit={formik.handleSubmit} className="mx7">
                                <FormGroup className={` mb-3`}>
                                    <Field type={'role'} className="form-control" placeholder="Role" name={`role`}
                                           onChange={formik.handleChange} value={formik.values.role}/>
                                    {formik.touched.role && formik.errors.role ? (
                                        <div className="text-danger input-error">{formik.errors.role}</div>) : null}
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormikProvider value={formik}>
                                        <ListGroup className="listHover">
                                            {
                                                UserRolePrivileges.UserRolePrivileges?.success ?
                                                    <>
                                                        {
                                                            UserRolePrivileges.UserRolePrivileges.response.map((prop, key) => {
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
                                                                                            let checked = (formik.values?.privileges.indexOf(priProp.id.toString()) !== -1);
                                                                                            return (
                                                                                                <>
                                                                                                    <FormGroup
                                                                                                        key={`subList${priKey}`}
                                                                                                        check>
                                                                                                        <Label check
                                                                                                               className="d-flex"
                                                                                                               key={`Privileges_${priKey}`}
                                                                                                               id={`privileges_${priProp.id}`}>
                                                                                                            <Input
                                                                                                                type="checkbox"
                                                                                                                name="privileges"
                                                                                                                id={`privileges_${priProp.id}`}
                                                                                                                value={priProp.id}
                                                                                                                onChange={(event) => {
                                                                                                                    let value = `${priProp.id}`;
                                                                                                                    let findIndex = formik.values?.privileges.indexOf(priProp.id.toString());
                                                                                                                    if (findIndex !== -1) {
                                                                                                                        formik.values?.privileges.splice(findIndex, 1);
                                                                                                                    } else {
                                                                                                                        formik.values?.privileges.push(value);
                                                                                                                    }
                                                                                                                    formik.setFieldValue(`privileges`, formik.values?.privileges);
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
                                        {formik.touched.privileges && formik.errors.privileges ? (
                                            <div className="text-danger input-error">{formik.errors.privileges}</div>
                                        ) : null}
                                    </FormikProvider>
                                </FormGroup>
                                {
                                    id && <>
                                        <FormGroup className="mb-3">
                                            <CustomInput type="switch" id="type" name="type"
                                                         label="Apply on all user"
                                                         value={formik.values.type}
                                                         onChange={formik.handleChange}
                                                         checked={formik.values.type}
                                            />
                                        </FormGroup>
                                    </>
                                }

                                <div className="btnList">
                                    <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                        <i className="ti-check" /><span>Submit</span>
                                    </Button>
                                    <Button onClick={() => history.push(from)} variant="contained" type="button"
                                            className="btn-icon btn-light2">
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

export default IsLoadingHOC(AddUserRole, 'loading');
