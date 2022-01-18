import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';

import {SubGameAction} from "./slice/SubGameAction";
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
    convertTZ,
    convertTZDate,
    RangeDatePicker,
    SelectBox,
    StatusPicker,
    TextBox
} from "../../formComponent/FilterFormFiled";
import {CategoryAction} from "../category/slice/CategoryAction";
import {GameMasterAction} from "../gameMaster/slice/GameMasterAction";
import {hideLoading} from "sweetalert2";

const SubGame = () => {
    console.log("SubGame");
    const addRecordURL = `sub-game/add`;
    const updateRecordURL = `sub-game/edit`;
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
    const SubGameReducers = useSelector(state => state.SubGameReducers);
    const CategoryReducers = useSelector(state => state.CategoryReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('26') < 0;
    const hiddenLogsPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('22') < 0;
    const getSubGameList = () => {
        dispatch(SubGameAction.Listing(dataTable));
        dispatch(CategoryAction.getListCategory(dataTable));
        dispatch(GameMasterAction.getListGameMaster());
    };

    useEffect(() => {
        getSubGameList();

    }, [dataTable]);
    const updateStatus = (isCheck) => {
        const status = (isCheck.target.checked) ? 1 : 2;
        CommonService.putStatus('/auth/game_sub/', isCheck.target.value, status);
        getSubGameList();
    };
    const removeRecord = (id) => {
        CommonService.deleteRecord('/auth/game_sub/', id, '', () => {
            console.log("deleteData");
            getSubGameList();
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
        history.push('logs/game_sub/'+id);
    };
    const columns = useMemo(
        () =>[
        {
            name: "Category",
            selector: row => row?.game?.category,
            sortable: true,
            cell: row => {
                let name = row?.game?.category.category;
                return <>
                    <div className="">
                        {name}
                    </div>
                </>
            }
        },
        {
            name: "Game name",
            selector: row => row?.game,
            sortable: true,
            cell: row => {
                let name = row?.game?.name;
                return <>
                    <div className="">
                        {name}
                    </div>
                </>
            }
        },
        {
            name: "Name",
            selector: row => row.name,
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
                     <span onClick={() => addOrEditRecord(row.id)} className="btn-icon btn-light2 btn btn-sm"><i
                         className="ti-pencil"/></span>
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
            name: '',
            game_name: '',
            category_id: '',
            fx_status: '',
            created_start_at: '',
            created_end_at: '',
        },
        onSubmit: (values) => {
            console.log(values, "va ");
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
                        "field": "game_name",
                        "operator": "contains",
                        "value": values.game_name
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
                                             prop={{id: "game_name", name: "game_name", label: "Game name"}}/>
                                </Col>
                                <Col sm="2">
                                    <SelectBox onSelect={formik} result={CategoryReducers?.GetAllCategory} resultRender={{id: "id", name: "category"}}
                                               prop={{id: "category_id", name: "category_id", label: "Category"}}/>
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
                                <Col xs="auto" className="ml-auto">
                                    <div className="btnList">
                                        <Button className="btn-icon btn-primary2"><i
                                            className="ti-check" /><span>Submit</span></Button>
                                        <Button className="btn-icon btn-light2" type={'reset'}><i
                                            className="ti-reload" /><span>Reset</span></Button>
                                        <Button hidden={hiddenPrivileges} className="btn-icon btn-light2" onClick={() => addOrEditRecord(null)}><i
                                            className="ti-plus" /><span>Add</span></Button>
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
                                //console.log('SubGameReducers--',SubGameReducers)
                                SubGameReducers?.SubGameListing?.success ?
                                    <>
                                        <DataTable
                                            title=""
                                            columns={columns}
                                            data={SubGameReducers?.SubGameListing?.response?.data}
                                            highlightOnHover
                                            pagination
                                            paginationServer
                                            paginationTotalRows={SubGameReducers?.SubGameListing?.response?.recordsTotal}
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

export default SubGame;
