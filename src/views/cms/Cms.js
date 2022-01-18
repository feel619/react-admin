import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {CmsAction} from "./slice/CmsAction";
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

const Cms = () => {
    const addRecordURL = `cms/add`;
    const updateRecordURL = `cms/edit`;
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
    const cmsReducers = useSelector(state => state.CmsReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('11') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('11') < 0;
    const getCmsList = () => {
        dispatch(CmsAction.Listing(dataTable));
    };

    useEffect(() => {
        getCmsList();
    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        CommonService.putStatus('/auth/cms/', isCheck.target.value, status);
        getCmsList();
    };
    const removeRecord = (id) => {
        CommonService.deleteRecord('/auth/cms/', id, '', () => {
            getCmsList();
        });
    };
    const addOrEditRecord = (id) => {
        if (id) {
            history.push(updateRecordURL + '/' + id);
        } else {
            history.push(addRecordURL);
        }
    };
    const sortOrder = (id, sortOrder) => {
        CommonService.sendHTTPCallBack('/auth/cms/' + id + '/sort', 'PUT', {'sort_order': sortOrder}, () => {
            getCmsList();
           //handleSort({id:2},'asc');
        });
    };
    const openLogsModal = (id) => {
        history.push('logs/cms/' + id);
    };
    const columns = [
        {
            name: "Page",
            selector: row => row.page,
            sortable: true,
        },
        {
            name: "Sort code",
            selector: row => row.sort_code,
            sortable: true,
        },
        {
            name: "Sort order",
            selector: row => row.sort_order,
            sortable: true,
            omit: hiddenPrivileges,
            cell: (row, index, column, id) => {
                if (index === 0 && cmsReducers.CmsListing.response.recordsTotal !== 1) {
                    var next = cmsReducers.CmsListing.response.data[index + 1];
                    var next_sort_order = next['sort_order'];
                    return <span sortOrder={next_sort_order} onClick={() => sortOrder(row.id, next_sort_order)}
                                 className="btn-icon btn-light2 btn btn-sm"><i className="ti-arrow-down"/></span>;
                } else if (cmsReducers.CmsListing.response.recordsTotal === (index + 1) && cmsReducers.CmsListing.response.data !== 1) {
                    var prev = cmsReducers.CmsListing.response.data[index - 1];
                    var prev_sort_order = prev['sort_order'];
                    return <span sortOrder={prev_sort_order} onClick={() => sortOrder(row.id, prev_sort_order)}
                                 className="btn-icon btn-light2 btn btn-sm"><i className="ti-arrow-up"/></span>;
                } else if (cmsReducers.CmsListing.response.data !== 1) {
                    var next_order = cmsReducers.CmsListing.response.data[index + 1];
                    var prev_order = cmsReducers.CmsListing.response.data[index - 1];
                    var nextSortOrder = next_order['sort_order'];
                    var prevSortOrder = prev_order['sort_order'];
                    console.log(cmsReducers.CmsListing.response.data[index - 1],[index - 1]," cmsReducers.CmsListing.response.prevSortOrder ",index,prevSortOrder);
                    console.log(cmsReducers.CmsListing.response.data[index + 1],[index + 1]," cmsReducers.CmsListing.response.nextSortOrder ",index,nextSortOrder);
                    return <>
                        <span sortOrder={prevSortOrder} onClick={() => sortOrder(row.id, (prevSortOrder))}
                              className="btn-icon btn-light2 btn btn-sm"><i
                            className="ti-arrow-up"/></span>
                        <span sortOrder={nextSortOrder} onClick={() => sortOrder(row.id, (nextSortOrder))}
                               className="btn-icon btn-light2 btn btn-sm"><i
                            className="ti-arrow-down"/></span>
                    </>
                }

                /*return <>
                    <div className="btnList icon-only" >
                        <span hidden={(row.sort_order === 1)} onClick={() => sortOrder(row.id, (row.sort_order - 1))}
                              className="btn-icon btn-light2 btn btn-sm"><i
                            className="ti-arrow-up"/></span>
                        <span hidden={(row.sort_order === cmsReducers?.CmsListing?.response?.recordsTotal)}
                              onClick={() => sortOrder(row.id, (row.sort_order + 1))}
                              className="btn-icon btn-light2 btn btn-sm"><i
                            className="ti-arrow-down"/></span>
                    </div>
                </>*/
            }
        },
        {
            name: "Slug",
            selector: row => row.slug,
            sortable: true,
        },
        {
            name: "Status",
            sortable: true,
            omit: hiddenPrivileges,
            selector: row => row.status,
            cell: row => {
                let checked = row.status === 1 ? 'checked' : '';
                return <>
                    <div hidden={hiddenPrivileges} className="material-switch">
                        <input id={row.id} checked={checked} onChange={check => updateStatus(check)}
                               name="someSwitchOption001" className="checked-box" type="checkbox" value={row.id}/>
                        <label htmlFor={row.id} className="label-primary"/>
                    </div>
                </>
            }
        },
        {
            name: "Created  by",
            sortable: hiddenPrivileges,
            selector: row => row.created_at,
            cell: (row) => {
                let myDate = row.created_at ? new Date(row.created_at) : '';

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
            cell: row => <>
                <div className="btnList icon-only" hidden={hiddenPrivileges}>
                    <span onClick={() => addOrEditRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-pencil"/></span>
                    <span onClick={() => removeRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-trash"/></span>
                    <span hidden={hiddenLogsPrivileges} onClick={() => openLogsModal(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-eye"/></span>
                </div>
            </>
        }
    ] ;
    const formik = useFormik({
        initialValues: {
            fx_page: '',
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
                        "field": "page",
                        "operator": "contains",
                        "value": values.fx_page
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
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "fx_page", name: "fx_page", label: "Page"}}/>
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
                                //console.log('cmsReducers--',cmsReducers)
                                cmsReducers?.CmsListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={cmsReducers.CmsListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={cmsReducers.CmsListing.response.recordsTotal}
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

export default Cms;
