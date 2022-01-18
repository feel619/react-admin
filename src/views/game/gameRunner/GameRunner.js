import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {GameRunnerAction} from "./slice/GameRunnerAction";
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
import {Field, useFormik} from "formik";
import {history} from "../../../redux/_helpers";
import {CommonService} from "../../../redux/_services/CommonService";
import {
    convertTZ,
    convertTZDate,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox
} from "../../formComponent/FilterFormFiled";
import {CategoryAction} from "../category/slice/CategoryAction";

const GameRunner = () => {
    console.log("GameRunner");
    const addRecordURL = `game-runner/add`;
    const updateRecordURL = `game-runner/edit`;
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
    const GameRunnerReducers = useSelector(state => state.GameRunnerReducers);
    const CategoryReducers = useSelector(state => state.CategoryReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('15') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') < 0;

    const getGameRunnerList = () => {
        dispatch(GameRunnerAction.Listing(dataTable));
        dispatch(CategoryAction.getListCategory(dataTable));
    };

    useEffect(() => {
        getGameRunnerList();

    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        CommonService.putStatus('/auth/game_runner/', isCheck.target.value, status);
        getGameRunnerList();
    };
    const removeRecord = (id) => {
        CommonService.deleteRecord('/auth/game_runner/', id, '',() => {
            console.log("deleteData");
            getGameRunnerList();
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
        history.push('logs/game_runner/'+id);
    };
    const columns = useMemo(
        () =>[
        {
            name: "Draw id",
            selector: row => row.draw_id,
            sortable: true,
        },
        {
            name: "Category",
            selector: row => row.category?.category,
            sortable: true,
            cell: row => {
                return <>
                    <div>
                        <span>{row.category?.category}</span>
                    </div>
                </>
            }
        },
        {
            name: "Name",
            selector: row => row.game?.name,
            sortable: true,
            cell: row => {
                return <>
                    <div>
                        <span>{row.game?.name}</span>
                    </div>
                </>
            }
        },
        {
            name: "Draw date time",
            selector: row => row.draw_date_time,
            sortable: true,
        },
        {
            name: "Bet close date time",
            selector: row => row.bet_close_date_time,
            sortable: true,
        },
        {
            name: "Status",
            sortable: true,
            omit:hiddenPrivileges,
            selector: row => row.status,
            cell: row => {
                let checked = row.status === 1 ? 'checked' : '';
                return <>
                    <div hidden={hiddenPrivileges} className="material-switch">
                        <input id={row.id} checked={checked} onChange={check => updateStatus(check)}
                               name="someSwitchOption001" className="checked-box" type="checkbox" value={row.id}/>
                        <label htmlFor={row.id} className="label-primary"/>
                    </div>
                </>
            }
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
                        <span>{row.created_by.username}</span>
                    </div>
                </>;
            }
        },
        {
            name: "Action",
            button: true,
            omit:hiddenPrivileges,
            cell: row => <>
                <div className="btnList icon-only" hidden={hiddenPrivileges}>
                    <span onClick={() => removeRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-trash"/></span>
                    <span hidden={hiddenLogsPrivileges} onClick={() => openLogsModal(row.id) } className="btn-icon btn-light2 btn btn-sm"><i
                        className="ti-eye"/></span>
                </div>
            </>
        }
    ],[]);
    const formik = useFormik({
        initialValues: {
            year: '',
            is_game_close: '',
            is_result: '',
            game_id: '',
            category_id: '',
            fx_status: '',
            created_start_at: '',
            created_end_at: '',
            draw_start_at: '',
            draw_end_at: '',
            bet_over_start_at: '',
            bet_over_end_at: '',
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
                        "value": values.year
                    },
                    {
                        "field": "is_game_close",
                        "operator": "contains",
                        "value": values.is_game_close
                    },
                    {
                        "field": "is_result",
                        "operator": "contains",
                        "value": values.is_result
                    },
                    {
                        "field": "game_id",
                        "operator": "contains",
                        "value": values.game_id
                    },
                    {
                        "field": "category_id",
                        "operator": "contains",
                        "value": values.category_id
                    },
                    {
                        "field": "status",
                        "operator": "is",
                        "value": values.fx_status
                    },
                    {
                        "field": "created_at",
                        "operator": "sdate",
                        "value": values.created_start_at
                    },
                    {
                        "field": "created_at",
                        "operator": "edate",
                        "value": values.created_end_at
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
                        "value": values.bet_over_start_at
                    },
                    {
                        "field": "bet_over_at",
                        "operator": "edate",
                        "value": values.bet_over_end_at
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
    const [CategoryGames, setCategoryGames] = useState([]);
    const handleCategoryChange = (event, index) => {
        if (event.target.value) {
            CommonService.getRecord('/auth/game/', event.target.value + '/category', (response) => {
                setCategoryGames(response);
            });
        } else {
            setCategoryGames([]);
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
                                             prop={{id: "year", name: "year", label: "Year"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "is_game_close", name: "is_game_close", label: "Game close"}}/>
                                </Col>
                                <Col sm="2">
                                    <TextBox onChangeTextName={formik}
                                             prop={{id: "is_result", name: "is_result", label: "Result"}}/>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for={`category_id`}>Category</Label>
                                        <Input type="select" className="form-control"
                                               id={`category_id`}
                                               name={`category_id`} as="select"
                                               onChange={(event) => {
                                                   handleCategoryChange(event)
                                                   formik.setFieldValue(`category_id`, event.target.value);
                                               }}
                                               onBlur={formik.handleChange}
                                               value={formik.values.category_id}
                                        >
                                            <option data-privileges={''} value="">Select All</option>
                                            {
                                                CategoryReducers?.GetAllCategory?.success
                                                && CategoryReducers?.GetAllCategory?.response.map((allData, index) => (
                                                    <option key={`category-opt-${index}`} data-privileges={allData.id}
                                                            value={allData.id}>{allData.category}</option>
                                                ))
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    {console.log(CategoryGames, "CategoryGamesCategoryGames")}
                                    <FormGroup>
                                        <Label for={`game_id`}>Game</Label>
                                        <Input type="select" className="form-control"
                                               id={`game_id`}
                                               name={`game_id`} as="select"
                                               onChange={(event) => {
                                                   formik.setFieldValue(`game_id`, event.target.value);
                                               }}
                                               onBlur={formik.handleChange}
                                               value={formik.values.game_id}
                                        >
                                            <option data-privileges={''} value="">Select All</option>
                                            {
                                                CategoryGames?.length > 0
                                                && CategoryGames?.map((allData, index) => (
                                                    <option key={`game-opt-${index}`} data-privileges={allData.id}
                                                            value={allData.id}>{allData.name}</option>
                                                ))
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <StatusPicker onSelectStatus={formik}/>
                                </Col>
                                <Col sm="2">
                                    <RangeDatePicker onChangeTextName={formik} prop={{
                                        fx_start_date: "created_start_at",
                                        fx_end_date: "created_end_at",
                                        label: "Create At"
                                    }}/>
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
                                        fx_start_date: "bet_over_start_at",
                                        fx_end_date: "bet_over_end_at",
                                        label: "Bet over At"
                                    }}/>
                                </Col>
                                <Col xs="auto" className="ml-auto">
                                    <div className="btnList">
                                        <Button className="btn-icon btn-primary2"><i
                                            className="ti-check" /><span>Submit</span></Button>
                                        <Button className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload" /><span>Reset</span></Button>
                                        <Button hidden={hiddenPrivileges} className="btn-icon btn-light2" onClick={() => addOrEditRecord(null)}><i
                                            className="ti-plus" /><span>Add</span></Button>
                                        <Button hidden={hiddenLogsPrivileges} className="btn-icon btn-light2" onClick={() => openLogsModal('')}><i
                                            className="ti-eye" /><span>Logs</span></Button>
                                    </div>
                                </Col>
                            </Form>
                        </Container>
                    </div>
                    <div className="main-content-table">
                        <Container fluid>
                            {
                                //console.log('GameRunnerReducers--',GameRunnerReducers)
                                GameRunnerReducers?.GameRunnerListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={GameRunnerReducers?.GameRunnerListing?.response?.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={GameRunnerReducers?.GameRunnerListing?.response?.recordsTotal}
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

export default GameRunner;
