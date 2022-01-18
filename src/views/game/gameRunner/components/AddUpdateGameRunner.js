import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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
    ListGroup,
    ListGroupItem,
    Col, InputGroup, InputGroupAddon, InputGroupText, CustomInput
} from "reactstrap";
import {Field, FormikProvider, Form as FormikForm, Formik, useFormik, FieldArray, ErrorMessage} from "formik";
import {GameRunnerAction} from "../slice/GameRunnerAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../../redux/_helpers';
import {CommonService} from "../../../../redux/_services/CommonService";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {toast} from "react-toastify";

const validationSchema = Yup.object({
    req: Yup.array().of(
        Yup.object().shape({
            category_id: Yup.string('').required('Category is required'),
            game_id: Yup.string('').required('Game is required'),
            draw_date_time: Yup.string('').required('Draw is required'),
            bet_close_date_time: Yup.string('').required('bet is required'),
        })
    )

});
const AddUpdateGameRunner = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/game-runner"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();
    const CategoryReducers = useSelector(state => state.CategoryReducers);
    const [CategoryGames, setCategoryGames] = useState([]);
    let dt = new Date();
    dt.setHours( dt.getHours() + 1 );
    const formik = useFormik({
        initialValues: {
            req:[]
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values," AddUpdateGameRunner ",values.req.length);
            if (values.req.length > 0) {
                if (id) {
                    dispatch(GameRunnerAction.UpdateGameRunner(id, values, from))
                } else {
                    dispatch(GameRunnerAction.AddGameRunner(values, from))
                }
            } else {
                toast.error("Please Add Record!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        },
    });

    const handleCategoryChange = (event,index) => {
        CommonService.getRecord('/auth/game/', event.target.value+'/category', (response) => {
            let items = [...CategoryGames];
            items[index] = response;
            setCategoryGames(items);
        });
    };
    const removeCategoryGame = (key) => {
        let items = [...CategoryGames];
        items.splice(key, 1);
        setCategoryGames(items);
    };

    useEffect(() => {
        if (id) {
            //getRecord();
        } else {
            setLoading(false);
        }
    }, []);

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
                <div className="main-content-body">
                    <Container className="" fluid>
                        <Formik>
                            <FormikForm role="form" onSubmit={formik.handleSubmit} className="mx7">
                                <div className="border px-3 pt-3 rounded mb-3">
                                    <div className="my-3">
                                            <h5>Game</h5>
                                            <>
                                                <hr className="mt-0 mb-3"/>
                                                <FormikProvider value={formik}>
                                                    <FieldArray
                                                        name="req"
                                                        render={arrayHelpers => {
                                                            const req = formik.values.req;
                                                            console.log(req, "req");
                                                            return (
                                                                <div>
                                                                    <Button className="btn-icon btn-primary2"
                                                                            onClick={() =>
                                                                                arrayHelpers.push({
                                                                                    category_id: '',
                                                                                    game_id: '',
                                                                                    draw_date: '',
                                                                                    draw_time: '',
                                                                                    draw_date_time: '',
                                                                                    bet_close_date: '',
                                                                                    bet_close_time:'',
                                                                                    bet_close_date_time:''
                                                                                })
                                                                            }><i className="ti-plus"></i><span>Add</span></Button>
                                                                    {req && req.length > 0
                                                                        ? req.map((ipArrayValue, index) => (
                                                                            <div key={index}>
                                                                                <div className="mt-2">
                                                                                    <Row className="gutSm">
                                                                                        <Col>
                                                                                            <FormGroup className={` mb-3`}>
                                                                                                <Field className="form-control"
                                                                                                       id={`req_${index}_category_id`}
                                                                                                       name={`req.${index}.category_id`} as="select"
                                                                                                       onChange={(event) => {
                                                                                                           handleCategoryChange(event,index)
                                                                                                           formik.setFieldValue(`req.${index}.category_id`, event.target.value);
                                                                                                       }}
                                                                                                       onBlur={formik.handleChange}
                                                                                                       value={ipArrayValue.category_id}
                                                                                                >
                                                                                                    <option data-privileges={''} value="">Select Category</option>
                                                                                                    {
                                                                                                        CategoryReducers?.GetAllCategory?.success
                                                                                                        && CategoryReducers?.GetAllCategory?.response.map((allData, index) => (
                                                                                                            <option key={`category-opt-${index}`} data-privileges={allData.id}
                                                                                                                    value={allData.id}>{allData.category}</option>
                                                                                                        ))
                                                                                                    }
                                                                                                </Field>
                                                                                                <div className="text-danger input-error">
                                                                                                    {formik.errors?.req?.[formik.errors?.req?.findIndex((x, key) => key === index)]?.category_id}
                                                                                                </div>
                                                                                            </FormGroup>
                                                                                            <FormGroup className={` mb-3`}>
                                                                                                <Field className="form-control"
                                                                                                       id={`req_${index}_game_id`}
                                                                                                       name={`req.${index}.game_id`} as="select"
                                                                                                       onChange={formik.handleChange}
                                                                                                       onBlur={formik.handleChange}
                                                                                                       value={ipArrayValue.game_id}
                                                                                                >
                                                                                                    <option data-privileges={''} value="">Select Game</option>
                                                                                                    {
                                                                                                       // console.log(CategoryGames," CategoryGames ",CategoryGames[index]?.length," index -- ",index  )
                                                                                                        CategoryGames[index]?.length > 0
                                                                                                        && CategoryGames[index].map((allData, index) => (
                                                                                                        <option key={`game-opt-${index}`} data-privileges={allData.id}
                                                                                                        value={allData.id}>{allData.name}</option>
                                                                                                        ))
                                                                                                    }
                                                                                                </Field>
                                                                                                <div className="text-danger input-error">
                                                                                                    {formik.errors?.req?.[formik.errors?.req?.findIndex((x, key) => key === index)]?.game_id}
                                                                                                </div>
                                                                                            </FormGroup>
                                                                                            <FormGroup className={` mb-3`}>
                                                                                                <DateRangePicker onCallback={(start, end, label) => {
                                                                                                    let startDate = start.format('YYYY-MM-DD HH:mm:ss');
                                                                                                    let betEndDate = start.format('YYYY-MM-DD');
                                                                                                    let betEndTime = start.format('HH:mm:ss');
                                                                                                    let endDate = end.format('YYYY-MM-DD HH:mm:ss');
                                                                                                    let betDrawDate = end.format('YYYY-MM-DD');
                                                                                                    let betDrawTime = end.format('HH:mm:ss');
                                                                                                    formik.setFieldValue(`req.${index}.bet_close_date_time`, startDate);
                                                                                                    formik.setFieldValue(`req.${index}.bet_close_date`, betEndDate);
                                                                                                    formik.setFieldValue(`req.${index}.bet_close_time`, betEndTime);
                                                                                                    formik.setFieldValue(`req.${index}.draw_date_time`, endDate);
                                                                                                    formik.setFieldValue(`req.${index}.draw_date`, betDrawDate);
                                                                                                    formik.setFieldValue(`req.${index}.draw_time`, betDrawTime);
                                                                                                }}
                                                                                                                 initialSettings={{
                                                                                                                     timePicker: true,
                                                                                                                     autoUpdateInput: false,
                                                                                                                     minDate: dt
                                                                                                                 }}
                                                                                                >
                                                                                                    <input type="text"
                                                                                                           id={`req_${index}_draw_date_time`}
                                                                                                           name={`req.${index}.draw_date_time`}
                                                                                                           className="form-control"
                                                                                                           placeholder="Draw Date" readOnly={true}
                                                                                                           onChange={formik.handleChange}
                                                                                                           value={(ipArrayValue.draw_date_time) ? ipArrayValue.bet_close_date_time+'-'+ipArrayValue.draw_date_time : ''}
                                                                                                           />
                                                                                                </DateRangePicker>
                                                                                                <div className="text-danger input-error">
                                                                                                    {formik.errors?.req?.[formik.errors?.req?.findIndex((x, key) => key === index)]?.draw_date_time}
                                                                                                </div>
                                                                                            </FormGroup>
                                                                                            <hr className="mt-0 mb-3"/>
                                                                                        </Col>
                                                                                        <Col className="col-auto">
                                                                                            <Button
                                                                                                className="btn-icon btn-light2"
                                                                                                onClick={() => {
                                                                                                    arrayHelpers.remove(index)
                                                                                                    removeCategoryGame(index)
                                                                                                }}><i className="ti-trash"></i><span>Delete</span></Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                        : null}
                                                                </div>
                                                            );
                                                        }}
                                                    />
                                                </FormikProvider>
                                            </>

                                    </div>
                                </div>

                                <div className="btnList">
                                    <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                        <i className="ti-check"></i><span>Submit</span>
                                    </Button>
                                    <Button onClick={() => history.push(from)} variant="contained" type="button"
                                            className="btn-icon btn-light2">
                                        <i className="ti-close"></i><span>Cancel</span>
                                    </Button>
                                </div>
                            </FormikForm>
                        </Formik>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default IsLoadingHOC(AddUpdateGameRunner, 'loading');
