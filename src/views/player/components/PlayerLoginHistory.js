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
import {RangeDatePicker, SelectBox, StatusPicker, TextBox} from "../../formComponent/FilterFormFiled";
import {PlayerAction} from "../slice/PlayerAction";
 import {useLocation, useParams} from "react-router-dom";
import {history} from "../../../redux/_helpers";

const PlayerLoginHistory = (props) => {
    const location = useLocation();
    const {id} = useParams();
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
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('35') < 0;

    const getDepositList = () => {
        dispatch(PlayerAction.PlayerLoginHistoryListing(dataTable));
    };

    useEffect(() => {
        getDepositList();
    }, [dataTable]);

    const columns = useMemo(
        () =>[
        {
            name: "Device type",
            selector: row => row?.device_type,
            sortable: true,
        },
        {
            name: "Location",
            sortable: true,
            selector: row => row.location,
        },
        {
            name: "Login  ip",
            sortable: true,
            selector: row => row?.login_ip,
        },
        {
            name: "Login time",
            sortable: true,
            selector: row => row?.login_time
        },
        {
            name: "Logout time",
            sortable: true,
            selector: row => row?.logout_time,
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
                searchList: []
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

                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //console.log('PlayerLoginHistoryListing--',playerReducers)
                                playerReducers?.PlayerLoginHistoryListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={playerReducers.PlayerLoginHistoryListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={playerReducers.PlayerLoginHistoryListing.response.recordsTotal}
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

export default PlayerLoginHistory;
