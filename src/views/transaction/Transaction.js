import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {TransactionAction} from "./slice/TransactionAction";
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
import {
    convertTZ,
    convertTZDate, nFormatter,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox
} from "../formComponent/FilterFormFiled";
import {PlayerAction} from "../player/slice/PlayerAction";

const Transaction = () => {
    const addRecordURL = `transaction/add`;
    const updateRecordURL = `transaction/edit`;
    const playerRecordURL = `player-transaction`;
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
    const transactionReducers = useSelector(state => state.TransactionReducers);
    const playerReducers = useSelector(state => state.PlayerReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('27') < 0;

    const getTransactionList = () => {
        dispatch(TransactionAction.Listing(dataTable));
        dispatch(TransactionAction.getStatusList());
        dispatch(PlayerAction.GetAllPlayer());
    };

    useEffect(() => {
        getTransactionList();
    }, [dataTable]);


    const addOrEditRecord = (id) => {
        if (id) {
            history.push(updateRecordURL + '/' + id);
        } else {
            history.push(addRecordURL);
        }
    };

    const columns = useMemo(
        () =>[

        {
            name: "Account No",
            selector: row => row?.player?.account_no,
            sortable: true,
            classNames: ["my_class"],
        },
        {
            name: "Username",
            selector: row => row?.player?.username,
            sortable: true,
        },
        {
            name: "Name",
            selector: row => row?.type?.name,
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
            name: "Before transaction",
            sortable: true,
            selector: row => row?.before_transaction,
            cell: row => {
                return <>
                    {nFormatter(row?.before_transaction,1)}
                </>
            }
        },
        {
            name: "After transaction",
            sortable: true,
            selector: row => row?.after_transaction,
            cell: row => {
                return <>
                    {nFormatter(row?.after_transaction,1)}
                </>
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
            cell: row => <>
                <span onClick={() => history.push(playerRecordURL + '/' + row?.user_id)}
                      className="btn-icon btn-light2 btn btn-sm"><i
                    className="ti-eye"/></span>
            </>
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
            type: '',
            player_id: '',
            transaction_no: '',
            fx_status: '',
            fx_start_date: '',
            fx_end_date: '',
        },
        onSubmit: (values) => {
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
                        "field": "player_id",
                        "operator": "is",
                        "value": values.player_id
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
                <div className="main-content-body p-0">
                    <div className="bg-light2 filters">
                        <Container className="" fluid>
                            <Form className="gutSm row align-items-end" onSubmit={formik.handleSubmit}
                                  onReset={handleReset}>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "type", name: "type", label: "Type"}}/>
                                </Col>
                                <Col sm="2">
                                    <SelectBox onSelect={formik} result={playerReducers?.GetAllPlayer}
                                               resultRender={{id: "id", name: "username"}}
                                               prop={{id: "player_id", name: "player_id", label: "Player"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "transaction_no", name: "transaction_no", label: "Transaction_no"}}/>
                                </Col>
                                <Col sm="2">
                                    <SelectBox onSelect={formik} result={transactionReducers?.statusTransaction}
                                               resultRender={{id: "id", name: "name"}}
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
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                              //  console.log('transactionReducers--',transactionReducers)
                                transactionReducers?.TransactionListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={transactionReducers.TransactionListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={transactionReducers.TransactionListing.response.recordsTotal}
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

export default Transaction;
