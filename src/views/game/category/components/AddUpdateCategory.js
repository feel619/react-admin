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
import {CategoryAction} from "../slice/CategoryAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../../redux/_helpers';
import {CommonService} from "../../../../redux/_services/CommonService";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";

const validationSchema = Yup.object({
    category: Yup.string().trim().required('Category is required'),
    sort_code: Yup.number().required('Sort Order is required'),
});
const AddUpdateCategory = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/category"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            category: '',
            sort_code: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (id) {
                dispatch(CategoryAction.UpdateCategory(id, values, from))
            } else {
                dispatch(CategoryAction.AddCategory(values, from))
            }
        },
    });
    const getRecord = () => {
        CommonService.getRecord('/auth/game/category/', id, (response) => {
            formik.initialValues.category = response.category;
            formik.initialValues.sort_code = response.sort_code;
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
                                    <i className="ti-arrow-left" />
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
                                    <Field type={'text'} className="form-control" placeholder="Category" name={`category`} onChange={formik.handleChange} value={formik.values.category}/>
                                    {formik.touched.category && formik.errors.category ? (<div className="text-danger input-error">{formik.errors.category}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Sort Order" name={`sort_code`} onChange={formik.handleChange} value={formik.values.sort_code}/>
                                    {formik.touched.sort_code && formik.errors.sort_code ? (<div className="text-danger input-error">{formik.errors.sort_code}</div>) : null}
                                </FormGroup>
                                <div className="btnList">
                                    <Button variant="contained" type="submit" className="btn-icon btn-primary2">
                                        <i className="ti-check" /><span>Submit</span>
                                    </Button>
                                    <Button onClick={() => history.push(from)} variant="contained" type="button"
                                            className="btn-icon btn-light2">
                                        <i className="ti-close" /><span>Cancel</span>
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

export default IsLoadingHOC(AddUpdateCategory, 'loading');
