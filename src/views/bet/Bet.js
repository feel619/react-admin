import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {BetAction} from "./slice/BetAction";
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
    convertTZDate, nFormatter,
    RangeDatePicker,
    TextBox,
    YearDatePicker
} from "../formComponent/FilterFormFiled";
import {GameMasterAction} from "../game/gameMaster/slice/GameMasterAction";
import IsLoadingHOC from "../formComponent/IsLoadingHOC";

const Bet = (props) => {
    const {setLoading} = props;
    const updateRecordURL = `bet/view`;
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
    const betReducers = useSelector(state => state.BetReducers);
    const GameMasterReducers = useSelector(state => state.GameMasterReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('37') < 0;
    const playerBetPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('34') < 0;

    const getBetList = () => {
        dispatch(BetAction.Listing(dataTable));
        dispatch(GameMasterAction.getListGameMaster());
    };

    useEffect(() => {
        getBetList();
        setLoading(false);
    }, [dataTable]);

    const addOrEditRecord = (id, playerId) => {
        if (id) {
            history.push(updateRecordURL + '/' + id + '/' + playerId);
        }
    };
    const columns = useMemo(
        () => [
            {
                id: 1,
                name: "Draw no",
                selector: row => row?.draw_no,
                sortable: true,
            },
            {
                id: 2,
                name: "Bet unk id",
                sortable: true,
                selector: row => row?.bet_unk_id,
            },
            {
                id: 3,
                name: "Bet at",
                sortable: true,
                selector: row => row?.bet_date,
                cell: (row) => {
                    let myDate = row?.bet_date ? new Date(row.bet_date) : '';
                    return <>
                        <div>
                            <span>{convertTZDate(myDate)}</span>
                            <br/>
                        </div>
                    </>;
                }
            },
            {
                id: 4,
                name: "Account no",
                sortable: true,
                selector: row => row?.player?.account_no,
            },
            {
                id: 5,
                name: "Username",
                sortable: true,
                selector: row => row.player?.username,
            },
            {
                id: 6,
                name: "Bet amount",
                sortable: true,
                selector: row => row.bet_amount,
                cell: row => {
                    return <>
                        {nFormatter(row?.bet_amount, 1)}
                    </>
                }
            },
            {
                id: 7,
                name: "Result amount",
                sortable: true,
                selector: row => row.result_amount,
                cell: row => {
                    return <>
                        {nFormatter(row?.result_amount, 1)}
                    </>
                }
            },
            {
                id: 8,
                name: "Is win",
                sortable: true,
                selector: row => row?.is_win,
                cell: row => {
                    return <>
                        {row?.is_win}
                    </>
                }
            },
            {
                id: 9,
                name: "Bet num",
                sortable: true,
                selector: row => row?.bet_num,
            },
            {
                id: 10,
                name: "Action",
                button: true,
                omit: playerBetPrivileges && hiddenPrivileges,
                cell: row => <>
                    <span hidden={hiddenPrivileges} onClick={() => addOrEditRecord(row?.cid, row?.user_id)}
                          className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-info"/></span>
                    <span hidden={playerBetPrivileges} onClick={() => history.push('player-bet/' + row?.user_id)}
                          className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-user"/></span>
                </>
            }

        ], [],
    );
    const formik = useFormik({
        initialValues: {
            fx_start_year: new Date(),
            bet_unk_id: '',
            player_id: '',
            is_win: '',
            draw_no: '',
            game_id: '',
            sub_game_id: '',
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
                        "field": "year",
                        "operator": "contains",
                        "value": (values?.fx_start_year) ? values?.fx_start_year?.getFullYear().toString() : ''
                    },
                    {
                        "field": "bet_unk_id",
                        "operator": "contains",
                        "value": values.bet_unk_id
                    },
                    {
                        "field": "player_id",
                        "operator": "is",
                        "value": values.player_id
                    },
                    {
                        "field": "is_win",
                        "operator": "is",
                        "value": values.is_win
                    },
                    {
                        "field": "draw_no",
                        "operator": "contains",
                        "value": values.draw_no
                    },
                    {
                        "field": "game_id",
                        "operator": "is",
                        "value": values.game_id
                    },
                    {
                        "field": "sub_game_id",
                        "operator": "is",
                        "value": values.sub_game_id
                    },
                    {
                        "field": "betting_at",
                        "operator": "sdate",
                        "value": values.fx_start_date
                    },
                    {
                        "field": "betting_at",
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
    const [Games, setGames] = useState([]);
    const handleGameChange = (event, index) => {
        if (event.target.value) {
            CommonService.getRecord('/auth/game/', event.target.value + '/category', (response) => {
                setGames(response);
            });
        } else {
            setGames([]);
        }
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
                                             prop={{id: "bet_unk_id", name: "bet_unk_id", label: "Bet id"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "account_no", name: "account_no", label: "Account no"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "is_win", name: "is_win", label: "Is win"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "draw_no", name: "draw_no", label: "Draw no"}}/>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for={`game_id`}>Game</Label>
                                        <Input type="select" className="form-control"
                                               id={`game_id`}
                                               name={`game_id`} as="select"
                                               onChange={(event) => {
                                                   handleGameChange(event);
                                                   formik.setFieldValue(`game_id`, event.target.value);
                                               }}
                                               onBlur={formik.handleChange}
                                               value={formik.values.game_id}
                                        >
                                            <option data-privileges={''} value="">Select All</option>
                                            {
                                                GameMasterReducers?.GetAllGameMaster?.success
                                                && GameMasterReducers?.GetAllGameMaster?.response.map((allData, index) => (
                                                    <option key={`game-opt-${index}`} data-privileges={allData.id}
                                                            value={allData.id}>{allData.name}</option>
                                                ))
                                            }
                                        </Input>
                                    </FormGroup>
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
                                        <Button id={"clock-out"} className="btn-icon btn-primary2"><i
                                            className="ti-check"/><span>Submit</span></Button>
                                        <Button id={"clock-in"} className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload"/><span>Reset</span></Button>
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //console.log('betReducers--',betReducers.BetListing.response.data)
                                betReducers?.BetListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            keyField={"keyField"}
                                            columns={columns}
                                            data={betReducers.BetListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={betReducers.BetListing.response.recordsTotal}
                                            paginationPerPage={countPerPage}
                                            onChangePage={(page, totalRows) => {
                                                setDataTable({
                                                    ...dataTable,
                                                    start: (page - 1) * countPerPage
                                                })
                                            }}
                                            paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                            paginationComponentOptions={{
                                                noRowsPerPage: false,
                                            }}
                                            onChangeRowsPerPage={(currentRowsPerPage, currentRowPage) => {
                                                setCountPerPage(currentRowsPerPage);
                                                setDataTable({...dataTable, total: currentRowsPerPage})
                                            }}
                                            onSort={handleSort}
                                            sortServer={true}
                                            progressPending={false}
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

export default IsLoadingHOC(Bet,'loading');
