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
import {DrawAction} from "../slice/DrawAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import {history} from '../../../../redux/_helpers';
import {CommonService} from "../../../../redux/_services/CommonService";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";

const validationSchema = Yup.object({
    game_runner_id: Yup.string('').required('Game is required'),
    draw_no: Yup.string().required('Draw no is required'),
    w1: Yup.number().required('w1 win no is required').positive('Must be greater than zero').integer(),
    w2: Yup.number().required('w2 win no is required').positive('Must be greater than zero').integer(),
    w3: Yup.number().required('w3 win no is required').positive('Must be greater than zero').integer(),
    w4: Yup.number().required('w4 win no is required').positive('Must be greater than zero').integer(),
    w5: Yup.number().required('w5 win no is required').positive('Must be greater than zero').integer(),
});
const AddUpdateDraw = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/draw"}};
    const dispatch = useDispatch(null);
    const {id, draw_id} = useParams();

    const formik = useFormik({
        initialValues: {
            game_runner_id: id,
            draw_no: draw_id,
            w1: '',
            w2: '',
            w3: '',
            w4: '',
            w5: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.w1 = values?.w1?.toString();
            values.w2 = values?.w2?.toString();
            values.w3 = values?.w3?.toString();
            values.w4 = values?.w4?.toString();
            values.w5 = values?.w5?.toString();
            if (id) {
                dispatch(DrawAction.AddDraw(values, from))
            }
        },
    });

    useEffect(() => {
        setLoading(false);
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
                                    <Field type={'number'} className="form-control" placeholder="Winner 1" name={`w1`}
                                           onChange={formik.handleChange} value={formik.values.w1}/>
                                    {formik.touched.w1 && formik.errors.w1 ? (
                                        <div className="text-danger input-error">{formik.errors.w1}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Winner 2" name={`w2`}
                                           onChange={formik.handleChange} value={formik.values.w2}/>
                                    {formik.touched.w2 && formik.errors.w2 ? (
                                        <div className="text-danger input-error">{formik.errors.w2}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Winner 3" name={`w3`}
                                           onChange={formik.handleChange} value={formik.values.w3}/>
                                    {formik.touched.w3 && formik.errors.w3 ? (
                                        <div className="text-danger input-error">{formik.errors.w3}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Winner 4" name={`w4`}
                                           onChange={formik.handleChange} value={formik.values.w4}/>
                                    {formik.touched.w4 && formik.errors.w4 ? (
                                        <div className="text-danger input-error">{formik.errors.w4}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Winner 5" name={`w5`}
                                           onChange={formik.handleChange} value={formik.values.w5}/>
                                    {formik.touched.w5 && formik.errors.w5 ? (
                                        <div className="text-danger input-error">{formik.errors.w5}</div>) : null}
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

export default IsLoadingHOC(AddUpdateDraw, 'loading');
