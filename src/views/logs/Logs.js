import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {LogsAction} from "./slice/LogsAction";
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
import {history} from "../../redux/_helpers";
import {RangeDatePicker, SelectBox, TextBox} from "../formComponent/FilterFormFiled";
import {useParams} from "react-router-dom";

const Logs = (props) => {
    const {module,id} = useParams();
    const dispatch = useDispatch(null);
    const logsReducers = useSelector(state => state.LogsReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') > -1;

    const initPage = 0;
    const countPerPage = 10;
    const [dataTable, setDataTable] = useState({
        id: id,
        start: initPage,
        total: countPerPage,
        order: {
            "column": 0,
            "dir": "asc"
        },
        searchList: []
    });
    const getLogsList = (modules) => {
        dispatch(LogsAction.Listing(modules,dataTable));
        //  setLoading(false);
    };

    useEffect(() => {
        if (module && hiddenLogsPrivileges) {
            getLogsList(module);
        }
    }, [dataTable,id,module]);

    const columns = [
        {
            name: "Object",
            selector: row => row?.object,
            sortable: true,
            //width:"0%",
        },
        {
            name: "Operation",
            sortable: true,
            selector: row => row?.operation,
           // width:"0%",
        },
        {
            name: "Data",
            sortable: true,
            width:"35%",
            selector: row => row?.data,
            cell: (row) => {
                return <>
                    <div>
                        <span>{row?.data}</span>
                    </div>
                </>;
            }
        },
        {
            name: "Created by",
            sortable: true,
           //width:"0%",
            selector: row => row?.userName,
        },
        {
            name: "IP",
            sortable: true,
           //width:"0%",
            selector: row => row?.ip,
        },
        {
            name: "Datetime",
            sortable: true,
            //width:"0%",
            selector: row => row?.datetime,
        }
    ];
    const formik = useFormik({
        initialValues: {
            userId: '',
            ip: '',
            operation: '',
            created_start_at: '',
            created_end_at: '',
        },
        onSubmit: (values) => {
            console.log(values, "va ");
            setDataTable({
                ...dataTable,
                searchList: [
                    {
                        "field": "userId",
                        "operator": "is",
                        "value": values.userId
                    },
                    {
                        "field": "ip",
                        "operator": "contains",
                        "value": values.ip
                    },
                    {
                        "field": "operation",
                        "operator": "contains",
                        "value": values.operation
                    },
                    {
                        "field": "datetime",
                        "operator": "sdate",
                        "value": values.created_start_at
                    },
                    {
                        "field": "datetime",
                        "operator": "edate",
                        "value": values.created_end_at
                    }
                ]
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
    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.goBack()} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left"/>
                                </Button>
                            </div>
                            <div className="child">{props.data.name}</div>
                        </div>
                    </Container>
                </div>
                <div className="main-content-body p-0">
                    <div className="bg-light2 filters">
                        <Container className="" fluid>
                            <Form className="gutSm row align-items-end" onSubmit={formik.handleSubmit}
                                  onReset={handleReset}>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "userId", name: "userId", label: "UserId"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "ip", name: "ip", label: "IP"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "operation", name: "operation", label: "Operation"}}/>
                                </Col>
                                <Col sm="2">
                                    <RangeDatePicker onChangeTextName={formik} prop={{
                                        fx_start_date: "created_start_at",
                                        fx_end_date: "created_end_at",
                                        label: "Create At"
                                    }}/>
                                </Col>
                                <Col xs="auto" className="ml-auto">
                                    <div className="btnList">
                                        <Button className="btn-icon btn-primary2"><i
                                            className="ti-check" /><span>Submit</span></Button>
                                        <Button className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload" /><span>Reset</span></Button>
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //  console.log('logsReducers--',logsReducers)
                                logsReducers?.LogsListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={logsReducers.LogsListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={logsReducers.LogsListing.response.recordsTotal}
                                            paginationPerPage={countPerPage}
                                            paginationComponentOptions={{
                                                noRowsPerPage: true
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

export default Logs;
