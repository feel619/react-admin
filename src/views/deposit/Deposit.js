import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {DepositAction} from "./slice/DepositAction";
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
    convertTZDate, nFormatter,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox
} from "../formComponent/FilterFormFiled";
import Swal from 'sweetalert2'
import {toast} from "react-toastify";
import {PlayerAction} from "../player/slice/PlayerAction";

const Deposit = () => {
    const addRecordURL = `deposit/add`;
    const updateRecordURL = `deposit/edit`;
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
    const depositReducers = useSelector(state => state.DepositReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('24') < 0;

    const getDepositList = () => {
        dispatch(DepositAction.Listing(dataTable));
        dispatch(DepositAction.getStatusList());
        dispatch(PlayerAction.GetAllPlayer());
    };

    useEffect(() => {
        getDepositList();
    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        CommonService.putStatus('/cross/deposit/', isCheck.target.value, status);
        getDepositList();
    };
    const removeRecord = (id, userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this Record!",
            icon: 'warning',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            preConfirm: (result) => {
                if (result === '') {
                    Swal.showValidationMessage(
                        `Request failed: Please add reason why you delete record?`
                    )
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                let removeData = {
                    "description": result.value,
                    "user_id": userId
                };
                CommonService.sendHTTPCrossCallBack('/cross/deposit/' + id + '/delete', 'DELETE', removeData, () => {
                    getDepositList();
                });
            }
        });
    };
    const addOrEditRecord = (id,playerId) => {
        if (id) {
            history.push(updateRecordURL + '/' + id + '/' + playerId);
        } else {
            history.push(addRecordURL);
        }
    };
    const openLogsModal = (id) => {
        history.push('logs/deposit/'+id);
    };
    const columns = useMemo(
        () =>[
        {
            name: " Account No",
            selector: row => row?.player?.account_no,
            sortable: true,
        },
        {
            name: " Username",
            selector: row => row?.player?.username,
            sortable: true,
        },
        {
            name: " Transaction No",
            selector: row => row?.transaction?.transaction_no,
            sortable: true,
        },
        {
            name: "Amount",
            sortable: true,
            selector: row => row.amount,
            cell: row => {
                return <>
                    {nFormatter(row?.amount,1)}
                </>
            }
        },
        {
            name: "Status",
            sortable: true,
            selector: row => row?.status_obj?.status,
            cell: row => {
                return <>
                    {row?.status_obj?.status}
                </>
            }
        },
        {
            name: "Type",
            sortable: true,
            selector: row => row?.type,
            cell: (row) => {
                return <>
                    <div>
                        <span>{row?.type?.name}</span>
                    </div>
                </>;
            }
        },
        {
            name: "Transaction At",
            sortable: true,
            selector: row => row?.transaction_at,
            cell: (row) => {
                let myDate = row?.transaction_at ? new Date(row.transaction_at) : '';
                let str = row.transaction_at ? myDate.toISOString().split('T')[0] : '';
                return <>
                    <div>
                        <span>{convertTZDate(myDate)}</span>
                        <br/>
                    </div>
                </>;
            }
        },
        {
            name: "Action",
            button: true,
            omit:hiddenPrivileges,
            cell: row => {
                if (row?.status !== 6) {
                    let isVisibleDeleted = row?.type?.id === 4;
                    return <>
                        <div className="btnList icon-only" hidden={hiddenPrivileges}>
                            <span  onClick={() => addOrEditRecord(row?.id, row?.user_id)}
                                   className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-eye"/></span>
                            <span hidden={!isVisibleDeleted} onClick={() => removeRecord(row.id, row.user_id)}
                                  className="btn-icon btn-light2 btn btn-sm"><i
                                className="ti-trash"/></span>
                        </div>
                    </>
                }
                return '';
            }
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
            type: '',
            transaction_no: '',
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
                        "operator": "contains",
                        "value": values.type
                    },
                    {
                        "field": "transaction_no",
                        "operator": "contains",
                        "value": values.transaction_no
                    },
                    {
                        "field": "status",
                        "operator": "is",
                        "value": values.fx_status
                    },
                    {
                        "field": "transaction_at",
                        "operator": "sdate",
                        "value": values.fx_start_date
                    },
                    {
                        "field": "transaction_at",
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
                                             prop={{id: "type", name: "type", label: "type"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{
                                                 id: "transaction_no",
                                                 name: "transaction_no",
                                                 label: "transaction no"
                                             }}/>
                                </Col>
                                <Col sm="2">
                                    {console.log(depositReducers, "depositReducers.statusDeposit ")}
                                    <SelectBox onSelect={formik} result={depositReducers?.statusDeposit}
                                               resultRender={{id: "id", name: "status"}}
                                               prop={{id: "fx_status", name: "fx_status", label: "Status"}}/>
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
                                        <Button className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload"></i><span>Reset</span></Button>
                                        <Button hidden={hiddenPrivileges} className="btn-icon btn-light2" onClick={() => addOrEditRecord(null,null)}><i
                                            className="ti-plus"></i><span>Add</span></Button>
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //console.log('depositReducers--',depositReducers)
                                depositReducers?.DepositListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={depositReducers.DepositListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={depositReducers.DepositListing.response.recordsTotal}
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

export default Deposit;
