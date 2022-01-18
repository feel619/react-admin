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
import {
    nFormatter,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox,
    YearDatePicker
} from "../../formComponent/FilterFormFiled";
import {BetAction} from "../slice/BetAction";
import {useLocation, useParams} from "react-router-dom";
import {history} from "../../../redux/_helpers";
import {CommonService} from "../../../redux/_services/CommonService";

const PlayerBet = (props) => {
    const updateRecordURL = `/admin/bet/view`;
    const {id} = useParams();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/bet"}};
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
    const betReducers = useSelector(state => state.BetReducers);
    const GameMasterReducers = useSelector(state => state.GameMasterReducers);

    const getDepositList = () => {
        dispatch(BetAction.PlayerBetListing(dataTable));
    };

    useEffect(() => {
        getDepositList();
    }, [dataTable]);

    const addOrEditRecord = (id, playerId) => {
        if (id) {
           history.push(updateRecordURL + '/' + id + '/' + playerId);
        }
    };
    const columns = useMemo(
        () =>[
        {
            name: "Draw no",
            sortable: true,
            selector: row => row?.draw_no,
        },
        {
            name: "Bet unk id",
            sortable: true,
            selector: row => row.bet_unk_id,
        },
        {
            name: "Bet At",
            sortable: true,
            selector: row => row?.bet_date,
            cell: (row) => {
                let myDate = row?.bet_at ? new Date(row.bet_date) : '';
                let str = row.bet_at ? myDate.toISOString().split('T')[0] : '';
                return <>
                    <div>
                        <span>{str}</span>
                        <br/>
                    </div>
                </>;
            }
        },
        {
            name: "Bet amount",
            sortable: true,
            selector: row => row?.bet_amount,
            cell: row => {
                return <>
                    {nFormatter(row?.bet_amount,1)}
                </>
            }
        },
        {
            name: "Result amount",
            sortable: true,
            selector: row => row?.result_amount,
            cell: row => {
                return <>
                    {nFormatter(row?.result_amount,1)}
                </>
            }
        },
        {
            name: "Is win",
            sortable: true,
            selector: row => row?.is_win,
        },
        {
            name: "Bet num",
            sortable: true,
            selector: row => row?.bet_num,
        },
        {
            name: "Action",
            button: true,
        //    omit:hiddenPrivileges,
            cell: row => <>
                 <span onClick={() => addOrEditRecord(row?.cid,row?.user_id)}
                       className="btn-icon btn-light2 btn btn-sm"><i
                     className="ti-info"/></span>
            </>
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
            fx_start_year: new Date(),
            bet_unk_id: '',
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
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.goBack()} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left" />
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
                               {/* <Col sm="2">
                                    <YearDatePicker onChangeTextName={formik} prop={{
                                        fx_start_year: "fx_start_year",
                                        label: "Year"
                                    }}/>
                                </Col>*/}
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik} prop={{ id: "bet_unk_id",name: "bet_unk_id", label: "bet unk id" }} />
                                </Col>
                                <Col sm="2">
                                    <SelectBox onSelect={formik} result={betReducers?.statusBet}
                                               resultRender={{id: "id", name: "is_win"}}
                                               prop={{id: "is_win", name: "is_win", label: "is_win"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik} prop={{ id: "draw_no",name: "draw_no", label: "draw no" }} />
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for={`game_id`}>Game</Label>
                                        <Input type="select" className="form-control"
                                               id={`game_id`}
                                               name={`game_id`} as="select"
                                               onChange={(event) => {
                                                   handleGameChange(event)
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
                                    <FormGroup>
                                        <Label for={`sub_game_id`}>Sub Game</Label>
                                        <Input type="select" className="form-control"
                                               id={`sub_game_id`}
                                               name={`sub_game_id`} as="select"
                                               onChange={(event) => {
                                                   formik.setFieldValue(`sub_game_id`, event.target.value);
                                               }}
                                               onBlur={formik.handleChange}
                                               value={formik.values.sub_game_id}
                                        >
                                            <option data-privileges={''} value="">Select All</option>
                                            {
                                                /* Games?.length > 0
                                                 && Games?.map((allData, index) => (
                                                     <option key={`game-opt-${index}`} data-privileges={allData.id}
                                                             value={allData.id}>{allData.name}</option>
                                                 ))*/
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
                               // console.log('PlayerBetListing--',playerReducers)
                                betReducers?.PlayerBetListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={betReducers.PlayerBetListing.response.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={betReducers.PlayerBetListing.response.recordsTotal}
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

export default PlayerBet;
