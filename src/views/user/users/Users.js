import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {UsersAction} from "./slice/UsersAction";
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
    Col
} from "reactstrap";
import DataTable from "react-data-table-component";
import {useFormik} from "formik";
import {history} from "../../../redux/_helpers";
import {CommonService} from "../../../redux/_services/CommonService";
import {
    RangeDatePicker,
    StatusPicker,
    TextBox,
    SelectBox,
    convertTZ,
    convertTZDate
} from "../../formComponent/FilterFormFiled";
import {UserRoleAction} from "../userRole/slice/UserRoleAction";
import {LogsAction} from "../../logs/slice/LogsAction";

const Users = (props) => {
    const addRecordURL = `user/add`;
    const updateRecordURL = `user/edit`;

    const initPage = 0;
    //const countPerPage = 10;
    const [countPerPage, setCountPerPage] = useState(10);
    const [dataTable, setDataTable] = useState({
        start: initPage,
        total: countPerPage,
        order: {
            "column": 0,
            "dir": "asc"
        },
        searchList: []
    });
    const dispatch = useDispatch(null);
    const UsersReducers = useSelector(state => state.UsersReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const UserRoleReducers = useSelector(state => state.UserRoleReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('5') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') < 0;
    const getUsersList = () => {
        dispatch(UsersAction.Listing(dataTable));
    };
    const getUserRolePrivileges = () => {
        dispatch(UserRoleAction.UserRolePrivilegesListing());
        dispatch(UserRoleAction.RoleListing());
    };
    useEffect(() => {
        getUserRolePrivileges();
        getUsersList();
    }, [dataTable]);
    const updateStatus = (isCheck) => {
        if(!hiddenPrivileges) {
            const status = (isCheck.target.checked) ? 1 : 2;
            CommonService.putStatus('/auth/user/', isCheck.target.value, status);
            getUsersList();
        }
    };
    const removeRecord = (id) => {
        if(!hiddenPrivileges) {
            CommonService.deleteRecord('/auth/user/', id, '', () => {
                console.log("deleteData");
                getUsersList();
            });
        }
    };
    const addOrEditRecord = (id) => {
        if (id) {
            history.push(updateRecordURL + '/' + id);
        } else {
            history.push(addRecordURL);
        }
    };
    const openLogsModal = (id) => {
        history.push('logs/user/'+id);
    };
    const columns = useMemo(
        () => [
        {
            name: "Name",
            selector: row => row.user_profile.name,
            sortable: true,
        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.user_profile.email,
            sortable: true,
        },
        {
            name: "User role",
            selector: row => row.user_role.role,
            sortable: true,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            omit:hiddenPrivileges,
            cell: row => {
                let checked = row.status === 1 ? 'checked' : '';
                return <>
                    <div className="material-switch" hidden={hiddenPrivileges}>
                        <input id={row.id} checked={checked} onChange={check => updateStatus(check)}
                               name="someSwitchOption001" className="checked-box" type="checkbox" value={row.id}/>
                        <label htmlFor={row.id} className="label-primary"/>
                    </div>
                </>
            }
        },
        {
            name: "Created at",
            selector: row => row.created_at,
            sortable: true,
            cell: (row) => {
                let myDate = new Date(row.created_at);
                return <>
                    <div>
                        <span>{convertTZDate(myDate)}</span>
                        <br/>
                        <span>{row.created_by}</span>
                    </div>
                </>;
            }
        },
        /*{
            name: "phone",
            selector: row => row.user_profile.phone,
            sortable: false,
        },
        {
            name: "birthdate",
            selector: row => row.user_profile.birthdate,
            sortable: false,
        },*/
        {
            name: "Action",
            button: true,
            isVisible: false,
            omit:hiddenPrivileges,
            cell: (row) => {
                return (row.id !== AuthReducers.user?.response?.id &&
                    <>
                        <div className="btnList sm" >
                            <span hidden={hiddenPrivileges} onClick={() => history.push(updateRecordURL + '/password/' + row.id)}
                                  className="btn-icon btn-light2 btn btn-sm"><i className="ti-lock"/></span>
                            <span hidden={hiddenPrivileges} onClick={() => history.push(updateRecordURL + '/privileges/' + row.id)}
                                  className="btn-icon btn-light2 btn btn-sm"><i className="ti-key"/></span>
                            <span hidden={hiddenPrivileges} onClick={() => addOrEditRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-pencil"/></span>
                            <span hidden={hiddenPrivileges} onClick={() => removeRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-trash"/></span>
                            <span hidden={hiddenLogsPrivileges} onClick={() => openLogsModal(row.id) } className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-eye"/></span>
                        </div>
                    </>
                )
            }
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
            fx_role: '',
            fx_name: '',
            fx_username: '',
            fx_email: '',
            fx_status: '',
            fx_start_date: '',
            fx_end_date: '',
        },
        onSubmit: (values, {setSubmitting, resetForm}) => {
            console.log(resetForm, " role_id ", formik);
            setDataTable({
                ...dataTable,
                searchList: [
                    {
                        "field": "role_id",
                        "operator": "is",
                        "value": values.fx_role
                    },
                    {
                        "field": "name",
                        "operator": "contains",
                        "value": values.fx_name
                    },
                    {
                        "field": "username",
                        "operator": "contains",
                        "value": values.fx_username
                    },
                    {
                        "field": "email",
                        "operator": "contains",
                        "value": values.fx_email
                    },
                    {
                        "field": "status",
                        "operator": "is",
                        "value": values.fx_status
                    },
                    {
                        "field": "created_at",
                        "operator": "sdate",
                        "value": values.fx_start_date
                    },
                    {
                        "field": "created_at",
                        "operator": "edate",
                        "value": values.fx_end_date
                    }]
            })
        },
    });
    const handleReset = () => {
        formik.resetForm();
        formik.submitForm();
    };
    const handleSort = (column, direction) => {
        console.log(column);
        setDataTable({
            ...dataTable,
            order: {
                "column": column.id,
                "dir": direction
            }
        });
    };

    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-body p-0">
                    <div className="bg-light2 filters">
                        <Container fluid>
                            <Form className="gutSm row align-items-end" onSubmit={formik.handleSubmit}
                                  onReset={handleReset}>
                                <Col sm="2">
                                    <SelectBox onSelect={formik} result={UserRoleReducers?.RoleListing}
                                               resultRender={{id: "id", name: "role"}}
                                               prop={{id: "fx_role", name: "fx_role", label: "Role"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "fx_name", name: "fx_name", label: "Name"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "fx_username", name: "fx_username", label: "UserName"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "fx_email", name: "fx_email", label: "Email"}}/>
                                </Col>
                                <Col sm="2">
                                    <StatusPicker onSelectStatus={formik}/>
                                </Col>
                                <Col sm="2">
                                    <RangeDatePicker onChangeTextName={formik} prop={{
                                        fx_start_date: "fx_start_date",
                                        fx_end_date: "fx_end_date",
                                        label: "Create At"
                                    }}/>
                                </Col>
                                <Col xs="auto" className="ml-auto">
                                    <div className="btnList">
                                        <Button className="btn-icon btn-primary2"><i
                                            className="ti-check"/><span>Submit</span></Button>
                                        <Button className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload"/><span>Reset</span></Button>
                                        <Button hidden={hiddenPrivileges} className="btn-icon btn-light2" onClick={() => addOrEditRecord(null)}><i
                                            className="ti-plus"/><span>Add</span></Button>
                                        <Button hidden={hiddenLogsPrivileges} className="btn-icon btn-light2" onClick={() => openLogsModal('')}><i
                                            className="ti-eye"/><span>Logs</span></Button>
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //console.log('UsersReducers--',UsersReducers)
                                UsersReducers?.UsersListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={UsersReducers.UsersListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={UsersReducers.UsersListing.response.recordsTotal}
                                            paginationPerPage={countPerPage}
                                            paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                            paginationComponentOptions={{
                                                noRowsPerPage: false,
                                            }}
                                            onChangeRowsPerPage={(currentRowsPerPage, currentRowPage) => {
                                                setCountPerPage(currentRowsPerPage);
                                                setDataTable({...dataTable, total: currentRowsPerPage})
                                            }}
                                            onChangePage={page => setDataTable({
                                                ...dataTable,
                                                start: (page - 1) * countPerPage
                                            })}
                                            onSort={handleSort}
                                            sortServer={true}
                                        />
                                    </>
                                    :
                                    <h1>No Data Found</h1>
                            }
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
