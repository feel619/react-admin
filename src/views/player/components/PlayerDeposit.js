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
import {PlayerAction} from "../slice/PlayerAction";
import {DepositAction} from "../../deposit/slice/DepositAction";
import {useLocation, useParams} from "react-router-dom";
import {history} from "../../../redux/_helpers";

const PlayerDeposit = (props) => {
    const {id} = useParams();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/player"}};
    const initPage = 0;
    //const countPerPage = 10;
    const [countPerPage, setCountPerPage] = useState(10);
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
    const depositReducers = useSelector(state => state.DepositReducers);
    const playerReducers = useSelector(state => state.PlayerReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('32') < 0;
    const getDepositList = () => {
        dispatch(PlayerAction.PlayerDepositListing(dataTable));
        dispatch(DepositAction.getStatusList());
    };

    useEffect(() => {
        getDepositList();
    }, [dataTable]);

    const columns = useMemo(
        () =>[
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
                        <span>{str}</span>
                        <br/>
                    </div>
                </>;
            }
        },
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
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "type", name: "type", label: "Type"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{
                                                 id: "transaction_no",
                                                 name: "transaction_no",
                                                 label: "Transaction no"
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
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                               // console.log('PlayerDepositListing--',playerReducers)
                                playerReducers?.PlayerDepositListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={playerReducers.PlayerDepositListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={playerReducers.PlayerDepositListing.response.recordsTotal}
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

export default PlayerDeposit;
