import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {ConfigAction} from "./slice/ConfigAction";
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
import {RangeDatePicker, SelectBox, StatusPicker, TextBox} from "../../formComponent/FilterFormFiled";

const Config = () => {
    console.log("Config");
    const addRecordURL = `config/add`;
    const updateRecordURL = `config/edit`;
    const initPage = 0;
    const countPerPage = 10;
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
    const ConfigReducers = useSelector(state => state.ConfigReducers);
    const getConfigList = () => {
        dispatch(ConfigAction.Listing(dataTable));
    };

    useEffect(() => {
        getConfigList();

    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        CommonService.putStatus('/auth/config/', isCheck.target.value, status);
        getConfigList();
    };
    const removeRecord = (id) => {
        CommonService.deleteRecord('/auth/config/', id, '', () => {
            console.log("deleteData");
            getConfigList();
        });
    };
    const addOrEditRecord = (id) => {
        if (id) {
            history.push(updateRecordURL + '/' + id);
        } else {
            history.push(addRecordURL);
        }
    };
    const columns = [
        {
            name: "config",
            selector: row => row.config,
            sortable: true,
        },
        {
            name: "sort code",
            selector: row => row.sort_code,
            sortable: true,
        },
        {
            name: "status",
            sortable: true,
            selector: row => row.status,
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
            name: "created_by",
            sortable: true,
            selector: row => row.created_by?.username,
            cell: (row) => {
                let myDate = new Date(row.created_at);
                let str = myDate.toISOString().split('T')[0];
                return <>
                    <div>
                        <span>{str}</span>
                        <br/>
                        <span>{row.created_by.username}</span>
                    </div>
                </>;
            }
        },
        {
            name: "Action",
            button: true,
            cell: row => <>
                <span onClick={() => addOrEditRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                    className="ti-pencil"/></span>
                <span onClick={() => removeRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                    className="ti-trash"/></span>
            </>
        }
    ];
    const formik = useFormik({
        initialValues: {
            config: '',
            fx_status: '',
            created_start_at: '',
            created_end_at: '',
        },
        onSubmit: (values) => {
            console.log(values, "va ");
            //formik.initialValues.fx_created_date= values.fx_created_date;
            setDataTable({
                ...dataTable,
                searchList: [
                    {
                        "field": "config",
                        "operator": "contains",
                        "value": values.config
                    },
                    {
                        "field": "status",
                        "operator": "is",
                        "value": values.fx_status
                    },
                    {
                        "field": "created_at",
                        "operator": "sdate",
                        "value": values.created_start_at
                    },
                    {
                        "field": "created_at",
                        "operator": "edate",
                        "value": values.created_end_at
                    },
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
                <div className="main-content-body p-0">
                    <div className="bg-light2 filters">
                        <Container className="" fluid>
                            <Form className="gutSm row align-items-end" onSubmit={formik.handleSubmit}
                                  onReset={handleReset}>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "config", name: "config", label: "Config"}}/>
                                </Col>
                                <Col sm="2">
                                    <StatusPicker onSelectStatus={formik}/>
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
                                        <Button className="btn-icon btn-light2" onClick={() => addOrEditRecord(null)}><i
                                            className="ti-plus"></i><span>Add</span></Button>
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //console.log('ConfigReducers--',ConfigReducers)
                                ConfigReducers?.ConfigListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={ConfigReducers?.ConfigListing?.response?.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={ConfigReducers?.ConfigListing?.response?.recordsTotal}
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

export default Config;
