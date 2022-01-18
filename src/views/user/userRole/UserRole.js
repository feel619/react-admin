import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {UserRoleAction} from "./slice/UserRoleAction";
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
    SelectBox,
    StatusPicker,
    TextBox,
    convertTZ,
    convertTZDate
} from "../../formComponent/FilterFormFiled";
import Logs from "../../logs/Logs";

const UserRole = () => {
    const addRecordURL = `role/add`;
    const updateRecordURL = `role/edit`;
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
    const currentUserRole = useSelector(state => state.UserRoleReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('3') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') < 0;

    const getUserRoleList = () => {
        dispatch(UserRoleAction.Listing(dataTable));
    };
    const getRoleList = () => {
        dispatch(UserRoleAction.RoleListing());
        dispatch(UserRoleAction.UserRolePrivilegesListing());
    };
    useEffect(() => {
        getUserRoleList();
        getRoleList();
    }, [dataTable]);
    const updateStatus = (isCheck) => {
        if (!hiddenPrivileges) {
            const status = (isCheck.target.checked) ? 1 : 2;
            CommonService.putStatus('/auth/user_role/', isCheck.target.value, status);
            getUserRoleList();
        }
    };
    const removeRecord = (id) => {
        if (!hiddenPrivileges) {
            CommonService.deleteRecord('/auth/user_role/', id, '', () => {
                console.log("deleteData");
                getUserRoleList();
            });
        }
    };
    const addOrEditRecord = (id) => {
        if (!hiddenPrivileges) {
            if (id) {
                history.push(updateRecordURL + '/' + id);
            } else {
                history.push(addRecordURL);
            }
        }
    };
    const columns = useMemo(
        () =>[
        {
            name: "Role",
            selector: row => row.role,
            sortable: true,
        },
        {
            name: "Status",
            sortable: true,
            selector: row => row.status,
            omit: hiddenPrivileges,
            cell: row => {
                let checked = row.status === 1 ? 'checked' : '';
                return <>
                    <div className="material-switch">
                        <input id={row.id} checked={checked} onChange={check => updateStatus(check)}
                               name="someSwitchOption001" className="checked-box" type="checkbox" value={row.id}/>
                        <label htmlFor={row.id} className="label-primary"/>
                    </div>
                </>
            }
        },
        {
            name: "Created at",
            sortable: true,
            selector: row => row.created_by?.username,
            cell: (row) => {
                let myDate = new Date(row.created_at);
                return <>
                    <div>
                        <span>{convertTZDate(myDate)}</span>
                        <br/>
                        <span>{row.created_by.username}</span>
                    </div>
                </>;
            }
        },
        {
            name: "Action",
            button: true,
            omit: hiddenPrivileges,
            cell: row => {
                return (row.id !== AuthReducers.user?.response?.user_role_id &&
                    <>
                        <div className="btnList icon-only">
                            <span hidden={hiddenPrivileges} onClick={() => addOrEditRecord(row.id)}
                                  className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-pencil"/></span>
                            <span hidden={hiddenPrivileges} onClick={() => removeRecord(row.id)}
                                  className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-trash"/></span>
                            <span hidden={hiddenLogsPrivileges} onClick={() => openLogsModal(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
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
            fx_status: '',
            fx_start_date: '',
            fx_end_date: '',
        },
        onSubmit: (values) => {
            console.log(values, "va ");
            //formik.initialValues.fx_created_date= values.fx_created_date;
            setDataTable({
                ...dataTable,
                searchList: [{
                    "field": "role",
                    "operator": "contains",
                    "value": values.fx_role
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
        setDataTable({
            ...dataTable,
            order: {
                "column": column.id,
                "dir": direction
            }
        });
    };
    const openLogsModal = (id) => {
        history.push('logs/user_role/' + id);
    };
    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-body p-0">
                    <div className="bg-light2 filters">
                        <Container className="" fluid>
                            <Form className="gutSm row align-items-end" onSubmit={formik.handleSubmit}
                                  onReset={handleReset}>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "fx_role", name: "fx_role", label: "Role"}}/>
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
                                        <Button hidden={hiddenPrivileges} className="btn-icon btn-light2"
                                                onClick={() => addOrEditRecord(null)}><i
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
                                //console.log('currentUserRole--',currentUserRole)
                                currentUserRole?.UserRoleListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={currentUserRole.UserRoleListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={currentUserRole.UserRoleListing.response.recordsTotal}
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

export default UserRole;
