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
    Col, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import {Field, FormikProvider, Form as FormikForm, Formik, useFormik} from "formik";
import {CmsAction} from "../slice/CmsAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../redux/_helpers';
import {CommonService} from "../../../redux/_services/CommonService";
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const validationSchema = Yup.object({
    page: Yup.string('').trim().required('Page Name is required'),
    sort_code: Yup.string('').trim().required('Sort code is required'),
    sort_order: Yup.number().required('sort order is required').positive('Must be greater than zero').integer(),
    slug: Yup.string('').trim().required('Slug is required'),
    content: Yup.string('').trim().required('Content is required'),
    icon: Yup.string('').required('Icon is required')
});
const AddUpdateCms = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/cms"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            page: '',
            sort_code: '',
            sort_order: '',
            slug: '',
            content: '',
            icon: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (id) {
                dispatch(CmsAction.UpdateCms(id,values, from))
            } else {
                dispatch(CmsAction.AddCms(values, from))
            }
        },
    });

    const getRecord = () => {
        CommonService.getRecord('/auth/cms/', id, (response) => {
            formik.initialValues.page = response.page;
            formik.initialValues.sort_code = response.sort_code;
            formik.initialValues.sort_order = response.sort_order;
            formik.initialValues.slug = response.slug;
            formik.initialValues.content = response.content;
            formik.initialValues.icon = response.icon;
            setLoading(false);
        });
    };
    useEffect(() => {
        if(id) {
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
                                <Field type={'text'} className="form-control" placeholder="Page" name={`page`} onChange={formik.handleChange} value={formik.values.page}/>
                                {formik.touched.page && formik.errors.page ? (<div className="text-danger input-error">{formik.errors.page}</div>) : null}
                            </FormGroup>
                            <FormGroup className={` mb-3`}>
                                <Field disabled={id} type={'text'} className="form-control" placeholder="Sort code" name={`sort_code`} onChange={formik.handleChange} value={formik.values.sort_code}/>
                                {formik.touched.sort_code && formik.errors.sort_code ? (<div className="text-danger input-error">{formik.errors.sort_code}</div>) : null}
                            </FormGroup>
                            <FormGroup className={` mb-3`}>
                                <Field type={'number'} className="form-control" placeholder="Sort order"
                                       name={`sort_order`} onChange={formik.handleChange}
                                       value={formik.values.sort_order}/>
                                {formik.touched.sort_order && formik.errors.sort_order ? (<div
                                    className="text-danger input-error">{formik.errors.sort_order}</div>) : null}
                            </FormGroup>
                            <FormGroup className={` mb-3`}>
                                <Field type={'text'} className="form-control" placeholder="Slug" name={`slug`} onChange={formik.handleChange} value={formik.values.slug}/>
                                {formik.touched.slug && formik.errors.slug ? (<div className="text-danger input-error">{formik.errors.slug}</div>) : null}
                            </FormGroup>
                            <FormGroup className={` mb-3`}>
                                <Field className="form-control" id={'icon'} name="icon" as="select"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleChange}
                                       value={formik.values.icon}
                                >
                                    <option data-privileges={''} value="">Select Icon</option>
                                    <option key={`icon-opt`} value={'icon_1'}>icon 1</option>
                                </Field>
                                {formik.errors?.icon ? (
                                    <div className="text-danger input-error">{formik.errors?.icon}</div>) : null}
                            </FormGroup>
                            <FormGroup className={` mb-3`}>
                               <CKEditor
                                    editor={ ClassicEditor }
                                    className="form-control"
                                    id={"editor"}
                                    data={formik.values.content}
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                        //editor.data.processor = new GFMDataProcessor();
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        console.log( { event, editor, data } );
                                        formik.setFieldValue('content', data);
                                    } }
                                />
                                {formik.touched.content && formik.errors.content ? (<div className="text-danger input-error">{formik.errors.content}</div>) : null}
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

export default IsLoadingHOC(AddUpdateCms,'loading');
