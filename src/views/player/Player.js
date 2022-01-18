import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {PlayerAction} from "./slice/PlayerAction";
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
    nFormatter,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox
} from "../formComponent/FilterFormFiled";
import Swal from "sweetalert2";

const Player = () => {
    const addRecordURL = `player/add`;
    const updateRecordURL = `player/edit`;
    const depositRecordURL = `player/deposit`;
    const withdrawalRecordURL = `player/withdrawal`;
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
    const playerReducers = useSelector(state => state.PlayerReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('28') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') < 0;
    const playerStatusPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('29') < 0;
    const playerInfoPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('30') < 0;
    const playerBankPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('31') < 0;
    const playerDepositPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('32') < 0;
    const playerWithdrawalPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('33') < 0;
    const playerBetPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('34') < 0;
    const playerLoginHistoryPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('35') < 0;
    const playerTransactionPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('36') < 0;

    const getPlayerList = () => {
        dispatch(PlayerAction.Listing(dataTable));
    };

    useEffect(() => {
        getPlayerList();
    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        Swal.fire({
            title: 'Are you sure?',
            text: "Once disabled, player would not be able to login!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, disable it!',
        }).then((result) => {
            if (result.isConfirmed ) {
                CommonService.sendHTTPCrossCallBack('/cross/player/'+isCheck.target.value+ '/status', 'PUT', {
                    'status':status
                },() => {
                    getPlayerList();
                });
            }
        });

    };

    const addOrEditRecord = (id) => {
        if (id) {
            history.push(updateRecordURL + '/' + id);
        } else {
            history.push(addRecordURL);
        }
    };
    const openLogsModal = (id) => {
        history.push('logs/player/'+id);
    };
    const columns = useMemo(
        () =>[
        {
            name: "Account No",
            selector: row => row?.account_no,
            sortable: true,
            omit: true,
        },
        {
            name: "Username",
            selector: row => row?.username,
            sortable: true,
        },
        {
            name: "Name",
            selector: row => row?.first_name,
            sortable: false,
            cell: row => {
                return <>
                    {`${row?.first_name} ${row?.last_name}`}
                </>
            }
        },
        {
            name: "Phone",
            sortable: false,
            selector: row => row?.phone,
            cell: row => {
                return <>
                    {`${row?.phone_code} ${row?.phone}`}
                </>
            }
        },
        {
            name: "Wallet no",
            sortable: true,
            selector: row => row?.account?.wallet_no,
            omit: true,
        },
        {
            name: "Balance",
            sortable: true,
            selector: row => row?.account?.balance,
            cell: row => {
                return <>
                    {nFormatter(row?.account?.balance,1)}
                </>
            }
        },
        {
            name: "Status",
            sortable: true,
            omit: playerStatusPrivileges,
            selector: row => row.status,
            maxWidth: 70,
            minWidth: 50,
            width: 150,
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
            name: "Register ip",
            sortable: false,
            selector: row => row?.register_ip,
            omit: true,
        },
        {
            name: "Register At",
            sortable: false,
            selector: row => row?.register_at,
            cell: (row) => {
                let myDate = row?.register_at ? new Date(row.register_at) : '';
                let str = row.register_at ? myDate.toISOString().split('T')[0] : '';
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
        //    omit: hiddenPrivileges,
            cell: row => <>
                <div className="btnList sm" >
                    <span hidden={playerInfoPrivileges && playerBankPrivileges} onClick={() => addOrEditRecord(row?.id)}
                          className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-info"/></span>
                    <span hidden={playerDepositPrivileges} onClick={() => history.push(depositRecordURL + '/' + row.id)}
                          className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-import"/></span>
                    <span hidden={playerWithdrawalPrivileges} onClick={() => history.push(withdrawalRecordURL + '/' + row.id)}
                          className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-export"/></span>
                    <span hidden={hiddenLogsPrivileges} onClick={() => openLogsModal(row.id) } className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-eye"/></span>
                    <span hidden={playerBetPrivileges} onClick={() => history.push('player-bet/'+ row?.id)}
                          className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-server"/></span>
                    <span hidden={playerLoginHistoryPrivileges} onClick={() => history.push('login-history/' + row.id)}
                          className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-mobile"/></span>
                </div>
            </>
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            account_no: '',
            phone: '',
            wallet_no: '',
            register_ip: '',
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
                        "field": "name",
                        "operator": "contains",
                        "value": values.name
                    },
                    {
                        "field": "username",
                        "operator": "contains",
                        "value": values.username
                    },
                    {
                        "field": "account_no",
                        "operator": "is",
                        "value": values.account_no
                    },
                    {
                        "field": "phone",
                        "operator": "contains",
                        "value": values.phone
                    },
                    {
                        "field": "wallet_no",
                        "operator": "contains",
                        "value": values.wallet_no
                    },
                    {
                        "field": "status",
                        "operator": "is",
                        "value": values.fx_status
                    },
                    {
                        "field": "register_ip",
                        "operator": "contains",
                        "value": values.register_ip
                    },
                    {
                        "field": "register_at",
                        "operator": "sdate",
                        "value": values.fx_start_date
                    },
                    {
                        "field": "register_at",
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
                                             prop={{id: "name", name: "name", label: "Name"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "username", name: "username", label: "Username"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "account_no", name: "account_no", label: "Account no"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "phone", name: "phone",label: "Phone"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "wallet_no", name: "wallet_no",label: "Wallet no"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "register_ip", name: "register_ip",label: "Register ip"}}/>
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
                                        <Button className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload"></i><span>Reset</span></Button>

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
                              //  console.log('playerReducers--',playerReducers)
                                playerReducers?.PlayerListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={playerReducers.PlayerListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={playerReducers.PlayerListing.response.recordsTotal}
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

export default Player;
