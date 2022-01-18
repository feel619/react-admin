import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {CmsBannerAction} from "./slice/CmsBannerAction";
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
import {CommonService} from "../../redux/_services/CommonService";
import {
    convertTZ,
    convertTZDate,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox
} from "../formComponent/FilterFormFiled";
import {CmsAction} from "../cms/slice/CmsAction";

const CmsBanner = () => {
    const addRecordURL = `cms-banner/add`;
    const updateRecordURL = `cms-banner/edit`;
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
    const CmsBannerReducers = useSelector(state => state.CmsBannerReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('11') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') < 0;
    const getCmsBannerList = () => {
        dispatch(CmsBannerAction.Listing(dataTable));
        dispatch(CmsBannerAction.getTypeList());
        dispatch(CmsAction.getCmsList());
    };

    useEffect(() => {
        getCmsBannerList();
    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        CommonService.putStatus('/auth/cms_banner/', isCheck.target.value, status);
        getCmsBannerList();
    };
    const removeRecord = (id) => {
        CommonService.deleteRecord('/auth/cms_banner/', id, '', () => {
            getCmsBannerList();
        });
    };
    const addOrEditRecord = (id) => {
        if (id) {
            history.push(updateRecordURL + '/' + id);
        } else {
            history.push(addRecordURL);
        }
    };
    const sortOrder = (id,sortOrder) => {
        CommonService.sendHTTPCallBack('/auth/cms_banner/'+id+'/sort', 'PUT', {'sort_order':sortOrder},() => {
            getCmsBannerList();
        });
    };
    const openLogsModal = (id) => {
        history.push('logs/cms/'+id);
    };
    const columns = useMemo(
        () =>[
        {
            name: "Title",
            selector: row => row?.title,
            sortable: true,
        },
        {
            name: "Mapping id",
            selector: row => row?.mapping_id,
            sortable: true,
        },
        {
            name: "Sort order",
            selector: row => row?.sort_order,
            sortable: true,
            omit:hiddenPrivileges,
            cell: row => {
                return <>
                    <span hidden={(row?.sort_order === 1)} onClick={() => sortOrder(row?.id,(row?.sort_order - 1))} className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-arrow-up"/></span>
                    <span hidden={(row?.sort_order === CmsBannerReducers?.CmsBannerListing?.response?.recordsTotal)} onClick={() => sortOrder(row?.id,(row?.sort_order + 1))} className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-arrow-down"/></span>
                </>
            }
        },
        {
            name: "Slug",
            selector: row => row?.slug,
            sortable: true,
        },
        {
            name: "Type",
            selector: row => row?.type,
            sortable: true,
        },
        {
            name: "Status",
            sortable: true,
            omit:hiddenPrivileges,
            selector: row => row?.status,
            cell: row => {
                let checked = row?.status === 1 ? 'checked' : '';
                return <>
                    <div className="material-switch">
                        <input id={row?.id} checked={checked} onChange={check => updateStatus(check)}
                               name="someSwitchOption001" className="checked-box" type="checkbox" value={row?.id}/>
                        <label htmlFor={row?.id} className="label-primary"/>
                    </div>
                </>
            }
        },
        {
            name: "Created at",
            sortable: true,
            selector: row => row?.created_at,
            cell: (row) => {
                let myDate = row?.created_at ? new Date(row.created_at) : '';
                return <>
                    <div>
                        <span>{convertTZDate(myDate)}</span>
                        <br/>
                        <span>{row?.created_by?.username}</span>
                    </div>
                </>;
            }
        },
        {
            name: "Action",
            button: true,
            omit:hiddenPrivileges,
            cell: row => <>
                <span onClick={() => addOrEditRecord(row?.id)} className="btn-icon btn-light2 btn btn-sm"><i
                    className="ti-pencil"/></span>
                <span onClick={() => removeRecord(row?.id)} className="btn-icon btn-light2 btn btn-sm"><i
                    className="ti-trash"/></span>
                <span hidden={hiddenLogsPrivileges} onClick={() => openLogsModal(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                    className="ti-eye"/></span>
            </>
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
            type: '',
            title: '',
            fx_status: '',
            fx_start_date: '',
            fx_end_date: '',
        },
        onSubmit: (values) => {
            console.log(values, "va ");
            //formik.initialValues.fx_created_date= values.fx_created_date;
            setDataTable({
                ...dataTable,
                searchList: [
                    {
                        "field": "type",
                        "operator": "is",
                        "value": values.type
                    },
                    {
                        "field": "title",
                        "operator": "contains",
                        "value": values.title
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
    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-body p-0">
                    <div className="bg-light2 filters">
                        <Container className="" fluid>
                            <Form className="gutSm row align-items-end" onSubmit={formik.handleSubmit}
                                  onReset={handleReset}>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for={`type`}>Type</Label>
                                        <Input type="select" className="form-control"
                                               id={`type`}
                                               name={`type`} as="select"
                                               onChange={(event) => {
                                                   formik.setFieldValue(`type`, event.target.value);
                                               }}
                                               onBlur={formik.handleChange}
                                               value={formik.values.type}
                                        >
                                            <option data-privileges={''} value="">Select All</option>
                                            {
                                                CmsBannerReducers?.cmsBannerTypeRecord?.success
                                                && CmsBannerReducers?.cmsBannerTypeRecord?.response.map((allData, index) => (
                                                    <option key={`game-opt-${index}`} data-privileges={allData.key}
                                                            value={allData.value}>{allData.key}</option>
                                                ))
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "title", name: "title", label: "Title"}}/>
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
                                            className="ti-check"></i><span>Submit</span></Button>
                                        <Button className="btn-icon btn-light2" type={'reset'}><i className="ti-reload"></i><span>Reset</span></Button>
                                        <Button hidden={hiddenPrivileges} className="btn-icon btn-light2" onClick={() => addOrEditRecord(null)}><i
                                            className="ti-plus"></i><span>Add</span></Button>
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
                                //console.log('cmsReducers--',cmsReducers)
                                CmsBannerReducers?.CmsBannerListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={CmsBannerReducers.CmsBannerListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={CmsBannerReducers.CmsBannerListing.response.recordsTotal}
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

export default CmsBanner;
