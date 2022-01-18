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
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../redux/_helpers';
import {CommonService} from "../../../redux/_services/CommonService";
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {SmsTemplateAction} from "../slice/SmsTemplateAction";
import {EmailTemplateAction} from "../slice/EmailTemplateAction";

const validationSchema = Yup.object({
    name: Yup.string('').trim().required('Name is required'),
    sort_code: Yup.string('').trim().required('Sort code is required'),
    subject: Yup.string('').trim().required('Subject is required'),
    template: Yup.string('').trim().required('Template is required')
});
const AddUpdateTemplate = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/template"}};
    const dispatch = useDispatch(null);
    const {name,id} = useParams();

    const formik = useFormik({
        initialValues: {
            name: '',
            sort_code: '',
            subject: '',
            template: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(name === 'sms'){
                if (id) {
                    dispatch(SmsTemplateAction.UpdateSmsTemplate(id,values, from))
                } else {
                    dispatch(SmsTemplateAction.AddSmsTemplate(values, from))
                }
            } else {
                if (id) {
                    dispatch(EmailTemplateAction.UpdateEmailTemplate(id,values, from))
                } else {
                    dispatch(EmailTemplateAction.AddEmailTemplate(values, from))
                }
            }
        },
    });

    const getRecord = () => {
        CommonService.getRecord('/auth/template/'+name+'/', id, (response) => {
            formik.initialValues.name = response.name;
            formik.initialValues.sort_code = response.sort_code;
            formik.initialValues.subject = response.subject;
            formik.initialValues.template = response.template;
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
                                    <Field type={'text'} className="form-control" placeholder="Name" name={`name`} onChange={formik.handleChange} value={formik.values.name}/>
                                    {formik.touched.name && formik.errors.name ? (<div className="text-danger input-error">{formik.errors.name}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'text'} className="form-control" placeholder="Sort code" name={`sort_code`} onChange={formik.handleChange} value={formik.values.sort_code}/>
                                    {formik.touched.sort_code && formik.errors.sort_code ? (<div className="text-danger input-error">{formik.errors.sort_code}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'text'} className="form-control" placeholder="Subject" name={`subject`} onChange={formik.handleChange} value={formik.values.subject}/>
                                    {formik.touched.subject && formik.errors.subject ? (<div className="text-danger input-error">{formik.errors.subject}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        className="form-control"
                                        data={formik.values.template}
                                        onReady={ editor => {
                                            console.log( 'Editor is ready to use!', editor );
                                            //editor.data.processor = new GFMDataProcessor();
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            console.log( { event, editor, data } );
                                            formik.setFieldValue('template', data);
                                        } }
                                    />
                                    {formik.touched.template && formik.errors.template ? (<div className="text-danger input-error">{formik.errors.template}</div>) : null}
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

export default IsLoadingHOC(AddUpdateTemplate,'loading');
