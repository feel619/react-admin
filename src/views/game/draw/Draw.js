import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {DrawAction} from "./slice/DrawAction";
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
    convertTZ, convertTZDate,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox,
    YearDatePicker
} from "../../formComponent/FilterFormFiled";
import {GameMasterAction} from "../gameMaster/slice/GameMasterAction";

const Draw = () => {
    console.log("Draw");
    const addRecordURL = `draw/add`;
    const updateRecordURL = `draw/edit`;
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
    const DrawReducers = useSelector(state => state.DrawReducers);
    const GameMasterReducers = useSelector(state => state.GameMasterReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('21') < 0;
    const getDrawList = () => {
        dispatch(DrawAction.Listing(dataTable));
        dispatch(GameMasterAction.getListGameMaster());
    };

    useEffect(() => {
        getDrawList();
    }, [dataTable]);

    const addOrEditRecord = (id, drawId) => {
        if (id) {
            history.push(updateRecordURL + '/' + id + '/' + drawId);
        } else {
            history.push(addRecordURL);
        }
    };
    const openLogsModal = (id) => {
        history.push('logs/draw/'+id);
    };
    const columns = useMemo(
        () =>[
        {
            name: "Draw id",
            selector: row => row?.draw_id,
            sortable: true,
        },
       /* {
            name: "Category",
            selector: row => row?.category,
            sortable: true,
            omit:true,
        },*/
        {
            name: "Name",
            selector: row => row?.game?.name,
            sortable: true,
        },
        {
            name: "Draw date time",
            sortable: true,
            selector: row => row?.draw_date_time,
        },
        {
            name: "Bet close date time",
            sortable: true,
            selector: row => row?.bet_close_date_time,
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
                        <span>{row.created_by?.username}</span>
                    </div>
                </>;
            }
        },
        {
            name: "Action",
            button: true,
            omit:hiddenPrivileges,
            cell: row => {
                return <>
                    {!row?.is_result_declared && <span hidden={hiddenPrivileges} onClick={() => addOrEditRecord(row?.id, row?.draw_id)}
                                                       className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-medall"/></span>}
                </>
            }
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
        //    fx_start_year: new Date(),
            is_result: '',
            game_id: '',
            draw_start_at: '',
            draw_end_at: '',
            bet_start_at: '',
            bet_end_at: '',
        },
        onSubmit: (values) => {
            console.log(values, "va ");
            //formik.initialValues.fx_created_date= values.fx_created_date;
            setDataTable({
                ...dataTable,
                searchList: [
                    // {
                    //     "field": "year",
                    //     "operator": "contains",
                    //     "value": (values?.fx_start_year) ? values?.fx_start_year?.getFullYear().toString() : ''
                    // },
                    {
                        "field": "is_result",
                        "operator": "is",
                        "value": values.is_result.toString()
                    },
                    {
                        "field": "game_id",
                        "operator": "contains",
                        "value": values.game_id
                    },
                    {
                        "field": "draw_at",
                        "operator": "sdate",
                        "value": values.draw_start_at
                    },
                    {
                        "field": "draw_at",
                        "operator": "edate",
                        "value": values.draw_end_at
                    },
                    {
                        "field": "bet_over_at",
                        "operator": "sdate",
                        "value": values.bet_start_at
                    },
                    {
                        "field": "bet_over_at",
                        "operator": "edate",
                        "value": values.bet_end_at
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
                               {/* <Col sm="2">
                                    <YearDatePicker onChangeTextName={formik} prop={{
                                        fx_start_year: "fx_start_year",
                                        label: "Year"
                                    }}/>
                                </Col>*/}
                                <Col sm="2">
                                    <SelectBox onSelect={formik} result={GameMasterReducers?.GetAllGameMaster}
                                               resultRender={{id: "id", name: "name"}}
                                               prop={{id: "game_id", name: "game_id", label: "Game"}}/>
                                </Col>
                                <Col sm="2">
                                    <RangeDatePicker onChangeTextName={formik} prop={{
                                        fx_start_date: "draw_start_at",
                                        fx_end_date: "draw_end_at",
                                        label: "Draw At"
                                    }}/>
                                </Col>
                                <Col sm="2">
                                    <RangeDatePicker onChangeTextName={formik} prop={{
                                        fx_start_date: "bet_start_at",
                                        fx_end_date: "bet_end_at",
                                        label: "Bet over at"
                                    }}/>
                                </Col>
                                <Col sm="2">
                                    <Label className="">{'Result'}</Label>
                                    <div className="material-switch">
                                        <input id={'is_result'} onChange={formik.handleChange}
                                               name="is_result" className="checked-box" type="checkbox"
                                               value={`false`}/>
                                        <label htmlFor={'is_result'} className="label-primary"></label>
                                    </div>
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
                                //console.log('DrawReducers--',DrawReducers)
                                DrawReducers?.DrawListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={DrawReducers?.DrawListing?.response?.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={DrawReducers?.DrawListing?.response?.recordsTotal}
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

export default Draw;
