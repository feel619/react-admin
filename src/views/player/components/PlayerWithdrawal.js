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
 import {useLocation, useParams} from "react-router-dom";
import {history} from "../../../redux/_helpers";

const PlayerWithdrawal = (props) => {
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
    const playerReducers = useSelector(state => state.PlayerReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('33') < 0;

    const getDepositList = () => {
        dispatch(PlayerAction.PlayerWithdrawalListing(dataTable));
    };

    useEffect(() => {
        getDepositList();
    }, [dataTable]);

    const columns = useMemo(
        () =>[
        {
            name: "Withdrawal No",
            selector: row => row?.withdrawal_no,
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
            name: "Created At",
            sortable: true,
            selector: row => row?.created_at,
            cell: (row) => {
                let myDate = row?.created_at ? new Date(row.created_at) : '';
                let str = row.created_at ? myDate.toISOString().split('T')[0] : '';
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
            withdrawal_no: '',
            account_no: '',
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
                        "field": "withdrawal_no",
                        "operator": "contains",
                        "value": values.withdrawal_no
                    },
                    {
                        "field": "account_no",
                        "operator": "contains",
                        "value": values.account_no
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
                                             prop={{id: "withdrawal_no", name: "withdrawal_no", label: "Withdrawal no"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{
                                                 id: "account_no",
                                                 name: "account_no",
                                                 label: "Account no"
                                             }}/>
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
                               // console.log('PlayerWithdrawalListing--',playerReducers?.PlayerWithdrawalListing)
                                playerReducers?.PlayerWithdrawalListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={playerReducers.PlayerWithdrawalListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={playerReducers.PlayerWithdrawalListing.response.recordsTotal}
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

export default PlayerWithdrawal;
