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
import {SubGameAction} from "../slice/SubGameAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../../redux/_helpers';
import {CommonService} from "../../../../redux/_services/CommonService";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";

const validationSchema = Yup.object({
    game_id: Yup.string('').required('Game is required'),
    name: Yup.string().trim().required('Name is required'),
    price_odd: Yup.number().required('Price is required').positive('Must be greater than zero').integer(),
    game_win_no: Yup.number().required('Game win no is required').positive('Must be greater than zero').integer(),
    game_type:Yup.string('').required('Game is required'),
    game_no: Yup.number().when("game_type", {
        is: value => value && value === 'PERM',
        then:Yup.number().required('Game no is required').truncate().moreThan(Yup.ref("game_win_no"), "Must be more than game win no"),
        otherwise: Yup.number().required('Game no is required').positive('Must be greater than zero').integer()
    }),
    description: Yup.string().trim().required('Description code is required'),
});
const AddUpdateSubGame = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/sub-game"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();
    const GameMasterReducers = useSelector(state => state.GameMasterReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const formik = useFormik({
        initialValues: {
            game_id:'',
            name:'',
            price_odd:'',
            game_no:'',
            game_win_no:'',
            description:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (id) {
                dispatch(SubGameAction.UpdateSubGame(id, values, from))
            } else {
                dispatch(SubGameAction.AddSubGame(values, from))
            }
        },
    });
    const getRecord = () => {
        CommonService.getRecord('/auth/game/sub/', id, (response) => {
            formik.initialValues.game_id = response.game_id;
            formik.initialValues.name = response.name;
            formik.initialValues.price_odd = response.price_odd;
            formik.initialValues.game_no = response.game_no;
            formik.initialValues.game_type = response.game_type;
            formik.initialValues.game_win_no = response.game_win_no;
            formik.initialValues.description = response.description;
            setLoading(false);
        });
    };
    useEffect(() => {
        if (id) {
            getRecord();
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
                                    <FormGroup className={` mb-3`}>
                                        <Field className="form-control" id={'game_id'} name="game_id" as="select"
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleChange}
                                               value={formik.values.game_id}
                                        >
                                            <option data-privileges={''} value="">Select Game</option>
                                            {
                                                GameMasterReducers?.GetAllGameMaster?.success
                                                && GameMasterReducers?.GetAllGameMaster?.response.map((allData, index) => (
                                                    <option key={`role-opt-${index}`} data-privileges={allData.id}
                                                            value={allData.id}>{allData.name}</option>
                                                ))
                                            }
                                        </Field>
                                        {formik.errors?.game_id ? (
                                            <div className="text-danger input-error">{formik.errors?.game_id}</div>) : null}
                                    </FormGroup>
                                    <FormGroup className={` mb-3`}>
                                        <Field type={'text'} className="form-control" placeholder="Name" name={`name`} onChange={formik.handleChange} value={formik.values.name}/>
                                        {formik.touched.name && formik.errors.name ? (<div className="text-danger input-error">{formik.errors.name}</div>) : null}
                                    </FormGroup>
                                    <FormGroup className={` mb-3`}>
                                        <Field type={'number'} className="form-control" placeholder="Price" name={`price_odd`} onChange={formik.handleChange} value={formik.values.price_odd}/>
                                        {formik.touched.price_odd && formik.errors.price_odd ? (<div className="text-danger input-error">{formik.errors.price_odd}</div>) : null}
                                    </FormGroup>
                                    <FormGroup className={` mb-3`}>
                                        <Field className="form-control" id={'game_type'} name="game_type" as="select"
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleChange}
                                               value={formik.values.game_type}
                                        >
                                            <option data-privileges={''} value="">Select Game Type</option>
                                            {
                                                AuthReducers?.static?.success
                                                && AuthReducers?.static?.response?.sub_game_type.map((allData, index) => (
                                                    <option key={`game-type-opt-${index}`} data-privileges={allData.key}
                                                            value={allData.key}>{allData.value}</option>
                                                ))
                                            }
                                        </Field>
                                        {formik.errors?.game_type ? (
                                            <div className="text-danger input-error">{formik.errors?.game_type}</div>) : null}
                                    </FormGroup>
                                    <FormGroup className={` mb-3`}>
                                        <Field type={'number'} className="form-control" placeholder="Game No" name={`game_no`} onChange={formik.handleChange} value={formik.values.game_no}/>
                                        {formik.touched.game_no && formik.errors.game_no ? (<div className="text-danger input-error">{formik.errors.game_no}</div>) : null}
                                    </FormGroup>
                                    <FormGroup className={` mb-3`}>
                                        <Field type={'number'} className="form-control" placeholder="Game win no" name={`game_win_no`} onChange={formik.handleChange} value={formik.values.game_win_no}/>
                                        {formik.touched.game_win_no && formik.errors.game_win_no ? (<div className="text-danger input-error">{formik.errors.game_win_no}</div>) : null}
                                    </FormGroup>
                                    <FormGroup className={` mb-3`}>
                                        <textarea className="form-control" placeholder="Description" name={`description`} onChange={formik.handleChange} value={formik.values.description} />
                                        {formik.touched.description && formik.errors.description ? (<div className="text-danger input-error">{formik.errors.description}</div>) : null}
                                    </FormGroup>
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

export default IsLoadingHOC(AddUpdateSubGame, 'loading');
