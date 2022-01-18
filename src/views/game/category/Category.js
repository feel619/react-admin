import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {CategoryAction} from "./slice/CategoryAction";
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
    convertTZ,
    convertTZDate,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox
} from "../../formComponent/FilterFormFiled";

const Category = () => {
    console.log("Category");
    const addRecordURL = `category/add`;
    const updateRecordURL = `category/edit`;
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
    const CategoryReducers = useSelector(state => state.CategoryReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('13') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') < 0;
    const getCategoryList = () => {
        dispatch(CategoryAction.Listing(dataTable));
    };

    useEffect(() => {
        getCategoryList();

    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        CommonService.putStatus('/auth/game_category/', isCheck.target.value, status);
        getCategoryList();
    };
    const removeRecord = (id) => {
        CommonService.deleteRecord('/auth/game_category/', id, '', () => {
            console.log("deleteData");
            getCategoryList();
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
        CommonService.sendHTTPCallBack('/auth/game_category/' + id + '/sort', 'PUT', {'sort_order': sortOrder}, () => {
            getCategoryList();
            handleSort({id:2},'asc');
        });
    };
    const openLogsModal = (id) => {
        history.push('logs/game_category/' + id);
    };
    const columns = [
            {
                name: "Category",
                selector: row => row.category,
                sortable: true,

            },
            {
                name: "Sort Order",
                selector: row => row.sort_code,
                sortable: true,
                omit: hiddenPrivileges,
                cell: (row, index, column, id) => {
                    /*
                        var sort = '';
                        var row = row;
                        if (row == 0 && meta.settings.json.data.length != 1) {
                            var next = meta.settings.json.data[row + 1];
                            sort += '<a onclick="updownSorting(' + full.id + ', ' + next['sort_order'] + ')"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>';
                        } else if (meta.settings.json.data.length == (row + 1) && meta.settings.json.data.length != 1) {
                            var prev = meta.settings.json.data[row - 1];
                            sort += '<a onclick="updownSorting(' + full.id + ', ' + prev['sort_order'] + ')" style="margin-right: 10px;"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>';
                        } else if (meta.settings.json.data.length != 1) {
                            var next = meta.settings.json.data[row + 1];
                            var prev = meta.settings.json.data[row - 1];
                            sort += '<a onclick="updownSorting(' + full.id + ', ' + prev['sort_order'] + ')" style="margin-right: 10px;"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>';
                            sort += '<a onclick="updownSorting(' + full.id + ', ' + next['sort_order'] + ')"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>';
                        }
                        return sort;

                        */
                    console.log(row, " Row ", index, column, id);
                    if (index === 0 && CategoryReducers?.CategoryListing?.response?.recordsTotal !== 1) {
                        var next = CategoryReducers?.CategoryListing?.response?.data[index + 1];
                        var next_sort_order = next['sort_code'];
                        return <span sortOrder={next_sort_order} onClick={() => sortOrder(row.id, next_sort_order)}
                                     className="btn-icon btn-light2 btn btn-sm"><i className="ti-arrow-down"/></span>;
                    } else if (CategoryReducers?.CategoryListing?.response?.recordsTotal === (index + 1) && CategoryReducers?.CategoryListing?.response?.recordsTotal !== 1) {
                        var prev = CategoryReducers?.CategoryListing?.response?.data[index - 1];
                        var prev_sort_order = prev['sort_code'];
                        return <span sortOrder={prev_sort_order} onClick={() => sortOrder(row.id, prev_sort_order)}
                                     className="btn-icon btn-light2 btn btn-sm"><i className="ti-arrow-up"/></span>;
                    } else if (CategoryReducers?.CategoryListing?.response?.recordsTotal !== 1) {
                        var next_order = CategoryReducers?.CategoryListing?.response?.data[index + 1];
                        var prev_order = CategoryReducers?.CategoryListing?.response?.data[index - 1];
                        var nextSortOrder = next_order['sort_code'];
                        var prevSortOrder = prev_order['sort_code'];
                        return <>
                        <span sortOrder={prevSortOrder} onClick={() => sortOrder(row.id, (prevSortOrder))}
                              className="btn-icon btn-light2 btn btn-sm"><i
                            className="ti-arrow-up"/></span>
                            <span  sortOrder={nextSortOrder} onClick={() => sortOrder(row.id, (nextSortOrder))}
                                  className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-arrow-down"/></span>
                        </>
                    }
                    /* return <>
                         <span hidden={(row.sort_code === 1)} onClick={() => sortOrder(row.id,(row.sort_code - 1))} className="btn-icon btn-light2 btn btn-sm"><i
                             className="ti-arrow-up"/></span>
                         <span hidden={(row.sort_code === CategoryReducers?.CategoryListing?.response?.recordsTotal)} onClick={() => sortOrder(row.id,(row.sort_code + 1))} className="btn-icon btn-light2 btn btn-sm"><i
                             className="ti-arrow-down"/></span>
                     </>*/
                }
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
                cell: row => <>
                    <div className="btnList icon-only" hidden={hiddenPrivileges}>
                     <span onClick={() => addOrEditRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                         className="ti-pencil"/></span>
                        <span onClick={() => removeRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                            className="ti-trash"/></span>
                        <span hidden={hiddenLogsPrivileges} onClick={() => openLogsModal(row.id)}
                              className="btn-icon btn-light2 btn btn-sm"><i
                            className="ti-eye"/></span>
                    </div>
                </>
            }
        ];
    const formik = useFormik({
        initialValues: {
            category: '',
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
                        "field": "category",
                        "operator": "contains",
                        "value": values.category
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
                                             prop={{id: "category", name: "category", label: "Category"}}/>
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
                                            className="ti-check"/><span>Submit</span></Button>
                                        <Button className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload"/><span>Reset</span></Button>
                                        <Button hidden={hiddenPrivileges} className="btn-icon btn-light2"
                                                onClick={() => addOrEditRecord(null)}><i
                                            className="ti-plus"/><span>Add</span></Button>
                                        <Button hidden={hiddenLogsPrivileges} className="btn-icon btn-light2"
                                                onClick={() => openLogsModal('')}><i
                                            className="ti-eye"/><span>Logs</span></Button>
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //console.log('CategoryReducers--',CategoryReducers)
                                CategoryReducers?.CategoryListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={CategoryReducers?.CategoryListing?.response?.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={CategoryReducers?.CategoryListing?.response?.recordsTotal}
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

export default Category;
