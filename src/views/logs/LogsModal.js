import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';
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
    Col, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import DataTable from "react-data-table-component";
import {Field, Formik, useFormik} from "formik";
import {RangeDatePicker, SelectBox, StatusPicker, TextBox} from "../formComponent/FilterFormFiled";
import {LogsAction} from "./slice/LogsAction";
import IsLoadingHOC from "../formComponent/IsLoadingHOC";

const Logs = (props) => {
    console.log("LogsLogs",props);
    const {
        buttonLabel,
        className,
        id,
        modules
    } = props;
    const dispatch = useDispatch(null);
    const LogsReducers = useSelector(state => state.LogsReducers);
    console.log('Logs - LogsReducers',LogsReducers);
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
        dispatch(LogsAction.hideModal({}));
    };
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    const initPage = 0;
    const countPerPage = 10;
    const [dataTable, setDataTable] = useState({
        id: LogsReducers?.LogsModalDetails?.modalId,
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
        if (LogsReducers?.LogsModalDetails?.status) {
            setModal(true);
            getLogsList(LogsReducers?.LogsModalDetails?.modalType);
        }
    }, [dataTable,LogsReducers?.LogsModalDetails?.modalType,LogsReducers?.LogsModalDetails?.status,LogsReducers?.LogsModalDetails?.modalId]);

    const columns = [
        {
            name: "object",
            selector: row => row.object,
            sortable: true,
        },
        {
            name: "operation",
            sortable: true,
            selector: row => row.operation,
        },
        {
            name: "data",
            sortable: true,
            selector: row => row.data,
        },
        {
            name: "userName",
            sortable: true,
            selector: row => row.userName,
        },
        {
            name: "ip",
            sortable: true,
            selector: row => row.ip,
        },
        {
            name: "datetime",
            sortable: true,
            selector: row => row.datetime,
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
        <div>
            <Modal isOpen={modal} toggle={toggle} className={`${className} modal-xl modal-fluid`} >
                <ModalHeader toggle={toggle}  close={closeBtn}><h3>Logs</h3></ModalHeader>
                <ModalBody className={`p-0`}>
                    <div className="main-content-white secGapBM">
                        <div className="main-content-body p-0">
                            <div className="bg-light2 filters">
                                <div className=""  >
                                    <Form className="gutSm row align-items-end" onSubmit={formik.handleSubmit}
                                          onReset={handleReset}>
                                        <Col sm="2">
                                            <TextBox onChangeTextName={formik}
                                                     prop={{id: "userId", name: "userId", label: "userId"}}/>
                                        </Col>
                                        <Col sm="2">
                                            <TextBox onChangeTextName={formik}
                                                     prop={{id: "ip", name: "ip", label: "ip"}}/>
                                        </Col>
                                        <Col sm="2">
                                            <TextBox onChangeTextName={formik}
                                                     prop={{id: "operation", name: "operation", label: "operation"}}/>
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
                                                    className="ti-check"></i><span>Submit</span></Button>
                                                <Button className="btn-icon btn-light2" type={'reset'}><i
                                                    className="ti-reload"></i><span>Reset</span></Button>
                                            </div>
                                        </Col>
                                    </Form>
                                </div>
                            </div>
                            <div className="main-content-table">
                                <div  >
                                    {
                                        //console.log('LogsReducers--',LogsReducers)
                                        LogsReducers?.LogsListing?.success ?
                                            <>
                                                <DataTable
                                                    title=""
                                                    columns={columns}
                                                    data={LogsReducers?.LogsListing?.response?.data}
                                                    highlightOnHover
                                                    pagination
                                                    paginationServer
                                                    paginationTotalRows={LogsReducers?.LogsListing?.response?.recordsTotal}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Logs;
