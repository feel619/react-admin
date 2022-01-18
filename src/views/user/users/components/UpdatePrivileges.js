import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Container,
    Form,
    FormGroup,
    Button,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Col, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import {ErrorMessage, Field, FieldArray, Form as FormikForm, Formik, FormikProvider, useFormik} from "formik";
import {UsersAction} from "../slice/UsersAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import {history} from "../../../../redux/_helpers";
import {CommonService} from "../../../../redux/_services/CommonService";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";
import {UserRoleAction} from "../../userRole/slice/UserRoleAction";

const validationSchema = Yup.object({
    role: Yup
        .string('Enter your Role Name')
        .required('Role Name is required'),
    privileges: Yup.array().test({
        name: "privileges",
        exclusive: true,
        message: "At least select one",
        test: (value) => value.length > 0,
    })
});
const UpdatePrivileges = (props) => {
    console.log("=d",props);
    const location = useLocation();
    const {setLoading} = props;
    const {from} = location.state || {from: {pathname: "/admin/user"}};
    const dispatch = useDispatch(null);
    const [editUserRoles, setEditUserRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUserRolesPrivileges, setSelectedUserRolesPrivileges] = useState([]);
    const [editUserRole, setEditUserRole] = useState({ role: '', privileges: []});
    const UserRoleReducers = useSelector(state => state.UserRoleReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('5') < 0;
    const {id} = useParams();
    const formik = useFormik({
        initialValues: {
            role: selectedRole,
            privileges: selectedUserRolesPrivileges,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (id) {
                const reqData = {
                    user_role_id: values.role,
                    privileges: values.privileges.toString()
                };
                CommonService.sendHTTPRequest('/auth/user/'+id+'/reset_user_role_priv', 'PUT', reqData)
                    .then(
                        response => {
                            console.log("Listing reset_user_role_priv  SUCCESS ", response);
                            history.push(from);
                        },
                        error => {
                            console.log("Listing reset_user_role_priv  error ",error);
                        }
                    );
            }
        },
    });
    const handleRoleChange = e => {
        const selectRole = e.target.value;
        let index = e.nativeEvent.target.selectedIndex;
        let rolePrivileges = e.nativeEvent.target[index].dataset.privileges;
        console.log("rolePrivileges",rolePrivileges)
        let selectedPrivileges = rolePrivileges.split(",");
        setSelectedRole(selectRole);
        setSelectedUserRolesPrivileges(selectedPrivileges);
        formik.values.role = selectRole;
        formik.values.privileges = selectedPrivileges;
    };

    const getUsersRoles = () => {
        if(UserRoleReducers.RoleListing?.success) setEditUserRoles(UserRoleReducers.RoleListing?.response);
    };
    const getUserPrivileges = () => {
        CommonService.getRecord('/auth/user/', id, (response) => {
            formik.initialValues.role = response.user_role.id;
            formik.initialValues.privileges = response.privileges.split(",");
            setEditUserRole({
                role:response.role,
                privileges:response.privileges.split(",")
            });
            setLoading(false);
        });
    };
    useEffect(() => {
        getUsersRoles();
        if(id) getUserPrivileges();
    }, []);
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
                            <FormikForm role="form" onSubmit={formik.handleSubmit} className="mx7">
                                <FormGroup className={` mb-3`}>
                                    {console.log(formik.values," values ")}
                                    <Field className="form-control" name="user_role_id" as="select"
                                           onChange={handleRoleChange}
                                           onBlur={formik.handleChange}
                                           value={formik.values.role}
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

                                    <div className="text-danger input-error"><ErrorMessage name={`user_role_id`}/></div>
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
                                                                                    <ListGroupItem key={`list${key}`} className="justify-content-between">
                                                                                        <div key={'userRoleKey_'+key} className="checksList">
                                                                                            <div className="font14 fw7">{prop.module}</div>
                                                                                            <div className="checkList flex flex-wrap justify-content-end">
                                                                                                {
                                                                                                    prop.privileges.map((priProp, priKey) => {
                                                                                                        let checked = (privileges.indexOf(priProp.id.toString()) !== -1);
                                                                                                        //console.log(editUserRole.privileges, " privileges ",editUserRole, checked);
                                                                                                        return (
                                                                                                            <>
                                                                                                                <FormGroup key={`subList${priKey}`} check>
                                                                                                                    <Label check className="d-flex" key={'Privileges_'+priKey} id={'privileges_'+priProp.id}  >
                                                                                                                        <Field
                                                                                                                            className={`form-check-input`}
                                                                                                                            type="checkbox"
                                                                                                                            name={`privileges`}
                                                                                                                            id={`privileges.${priProp.id}`}
                                                                                                                            value={priProp.id}
                                                                                                                           /* onChange={(event) => {
                                                                                                                                const value = event.target.checked ? `${priProp.id}` : '';
                                                                                                                                console.log(value," -privileges_ubnchec-",priProp.id,event.target.checked);
                                                                                                                                formik.setFieldValue(`privileges.${priProp.id}`, value);
                                                                                                                                console.log(privileges, " FORMIKprivileges ");
                                                                                                                            }}*/
                                                                                                                           // checked={formik.values.privileges.includes(`${priProp.id}`)}
                                                                                                                            onChange={(event) => {
                                                                                                                                let value = `${priProp.id}`;
                                                                                                                                let findIndex = privileges.indexOf(priProp.id.toString());
                                                                                                                                console.log(privileges," -privileges_ubnchec-",priProp.id,findIndex);
                                                                                                                                if(findIndex !== -1){
                                                                                                                                    privileges.splice(findIndex, 1);
                                                                                                                                } else {
                                                                                                                                    privileges.push(value);
                                                                                                                                }
                                                                                                                                formik.setFieldValue(`privileges`, privileges);
                                                                                                                            }}
                                                                                                                            checked={checked}
                                                                                                                        />
                                                                                                                        <span className="font14">{priProp.privilege}</span>
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
                                    {formik.touched.privileges && formik.errors.privileges ? (
                                        <div className="text-danger input-error">{formik.errors.privileges}</div>
                                    ) : null}
                                </FormGroup>
                                <div className="btnList" hidden={hiddenPrivileges}  >
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

export default IsLoadingHOC(UpdatePrivileges,'loading');
