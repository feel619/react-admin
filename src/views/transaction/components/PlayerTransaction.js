import React, {useEffect, useMemo, useState} from "react";
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
    Col
} from "reactstrap";
import DataTable from "react-data-table-component";
import {useFormik} from "formik";
import {nFormatter, RangeDatePicker, SelectBox, StatusPicker, TextBox} from "../../formComponent/FilterFormFiled";
import {TransactionAction} from "../slice/TransactionAction";
import {useLocation, useParams} from "react-router-dom";
import {history} from "../../../redux/_helpers";

const PlayerTransaction = (props) => {
    const {id} = useParams();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/transaction"}};
    const initPage = 0;
    const countPerPage = 10;
    const [dataTable, setDataTable] = useState({
        id:id,
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
    const getDepositList = () => {
        dispatch(TransactionAction.PlayerTransactionListing(dataTable));
    };

    useEffect(() => {
        getDepositList();
    }, [dataTable]);

    const columns = useMemo(
        () => [
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
            name: "Transaction at",
            sortable: false,
            selector: row => row?.transaction_at,
            cell: (row) => {
                let myDate = row?.transaction_at ? new Date(row.transaction_at) : '';
                let str = row.transaction_at ? myDate.toISOString().split('T')[0] : '';
                return <>
                    <div>
                        <span>{str}</span>
                        <br/>
                    </div>
                </>;
            }
        },
    ]
    );
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
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.push(from)} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left"></i>
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
                                    <SelectBox onSelect={formik} result={transactionReducers?.statusTransaction}
                                               resultRender={{id: "id", name: "name"}}
                                               prop={{id: "type", name: "type", label: "type"}}/>
                                </Col>
                               {/* <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "type", name: "type", label: "type"}}/>
                                </Col>*/}
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{
                                                 id: "transaction_no",
                                                 name: "transaction_no",
                                                 label: "transaction no"
                                             }}/>
                                </Col>
                                {/*<Col sm="2">
                                    <SelectBox onSelect={formik} result={transactionReducers?.statusTransaction}
                                               resultRender={{id: "id", name: "name"}}
                                               prop={{id: "fx_status", name: "fx_status", label: "Status"}}/>
                                </Col>*/}
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
                               // console.log('PlayerTransactionListing--',playerReducers)
                                transactionReducers?.PlayerTransactionListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={transactionReducers.PlayerTransactionListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={transactionReducers.PlayerTransactionListing.response.recordsTotal}
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

export default PlayerTransaction;
