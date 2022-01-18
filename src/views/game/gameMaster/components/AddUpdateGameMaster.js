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
import {GameMasterAction} from "../slice/GameMasterAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import {history} from '../../../../redux/_helpers';
import {CommonService} from "../../../../redux/_services/CommonService";
import IsLoadingHOC from "../../../formComponent/IsLoadingHOC";

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'];
const SUPPORTED_IMG_FORMATS = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
const validationSchema = Yup.object({
    category_id: Yup.string('').required('category is required'),
    name: Yup.string().trim().required('name is required'),
    min_no: Yup.number().required('Min no is required').positive('Must be greater than zero').integer(),
    max_no: Yup.number().required('Max no is required').truncate().moreThan(Yup.ref("min_no"), "Must be more than Minimum No"),
    min_stake: Yup.number().required('Min stake is required').positive('Must be greater than zero').integer(),
    max_stake: Yup.number().required('Max stake is required').truncate().moreThan(Yup.ref("min_stake"), "Must be more than Minimum stake"),
    web_image: Yup.mixed().required('Web image is required')
        //  .test('fileSize', 'File too large', (value) => value === null || (value && value.size <= 1024))
        .test(
            'fileFormat',
            'Unsupported file type',
            (value) => {
                console.log(value?.type, "value?.type");
                if (value?.type === undefined) {
                    let imageType = (value) ? value.split('.').pop() : '';
                    console.log(imageType, "imageType");
                    return SUPPORTED_IMG_FORMATS.includes(imageType);
                } else {
                    console.log(value?.type);
                    console.log(value === null, "value === null", (value && SUPPORTED_FORMATS.includes(value.type)));
                    return value === null || (value && SUPPORTED_FORMATS.includes(value.type))
                }
            }
        ),
    mobile_image: Yup.mixed().required('Mobile image is required')
        //  .test('fileSize', 'File too large', (value) => value === null || (value && value.size <= 1024))
        .test(
            'fileFormat',
            'Unsupported file type',
            (value) => {
                if (value?.type === undefined) {
                    let imageType = (value) ? value.split('.').pop() : '';
                    return SUPPORTED_IMG_FORMATS.includes(imageType);
                } else {
                    return value === null || (value && SUPPORTED_FORMATS.includes(value.type))
                }
            }
        ),
});
const AddUpdateGameMaster = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/game-master"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();
    const defaultImg = require("../../../../assets/img/no-image.png").default;
    const AuthReducers = useSelector(state => state.AuthReducers);
    const CategoryReducers = useSelector(state => state.CategoryReducers);
    console.log(CategoryReducers, "CategoryReducers");

    const formik = useFormik({
        initialValues: {
            category_id: '',
            name: '',
            min_no: '',
            max_no: '',
            min_stake: '',
            max_stake: '',
            web_image: '',
            mobile_image: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values, "vaa");
            let formData = new FormData();
            formData.append('category_id', values.category_id);
            formData.append('name', values.name);
            formData.append('min_no', values.min_no);
            formData.append('max_no', values.max_no);
            formData.append('min_stake', values.min_stake);
            formData.append('max_stake', values.max_stake);
            formData.append('web_image', values.web_image);
            formData.append('mobile_image', values.mobile_image);
            if (id) {
                dispatch(GameMasterAction.UpdateGameMaster(id, formData, from))
            } else {
                dispatch(GameMasterAction.AddGameMaster(formData, from))
            }
        },
    });
    const getRecord = () => {
        CommonService.getRecord('/auth/game/', id, (response) => {
            formik.initialValues.category_id = response.category_id;
            formik.initialValues.name = response.name;
            formik.initialValues.min_no = response.min_no;
            formik.initialValues.max_no = response.max_no;
            formik.initialValues.min_stake = response.min_stake;
            formik.initialValues.max_stake = response.max_stake;
            formik.initialValues.web_image = response.web_image;
            formik.initialValues.mobile_image = response.mobile_image;
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
    const handleImageChange = (e) => {
        const imageId = e.currentTarget.id;
        const file = e.currentTarget.files[0];
        console.log(file, " d ");
        if (file) {
            const reader = new FileReader();
            const imgTag = document.getElementById(imageId + '_img');
            imgTag.title = file.name;
            reader.onload = function (event) {
                imgTag.src = event.target.result;
            };
            reader.readAsDataURL(file);
            formik.setFieldValue(imageId, file);
        }
    };
    const addDefaultSrc = (ev) => {
        ev.target.src = defaultImg
    };
    const onErrorImgLoad = (e) => {
        //no-image.png
        console.log("onErrorImgLoad", e);
    };
    const handleImageLoaded = (e) => {
        console.log("onErrorImgLoad---", e);
    };

    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.push(from)} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left"/>
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
                                    <Field className="form-control" id={'category_id'} name="category_id" as="select"
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleChange}
                                           value={formik.values.category_id}
                                    >
                                        <option data-privileges={''} value="">Select Category</option>
                                        {
                                            CategoryReducers?.GetAllCategory?.success
                                            && CategoryReducers?.GetAllCategory?.response.map((allData, index) => (
                                                <option key={`role-opt-${index}`} data-privileges={allData.id}
                                                        value={allData.id}>{allData.category}</option>
                                            ))
                                        }
                                    </Field>
                                    {formik.errors?.category_id ? (
                                        <div
                                            className="text-danger input-error">{formik.errors?.category_id}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'text'} className="form-control" placeholder="name" name={`name`}
                                           onChange={formik.handleChange} value={formik.values.name}/>
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-danger input-error">{formik.errors.name}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Min no" name={`min_no`}
                                           onChange={formik.handleChange} value={formik.values.min_no}/>
                                    {formik.touched.min_no && formik.errors.min_no ? (
                                        <div className="text-danger input-error">{formik.errors.min_no}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Max no" name={`max_no`}
                                           onChange={formik.handleChange} value={formik.values.max_no}/>
                                    {formik.touched.max_no && formik.errors.max_no ? (
                                        <div className="text-danger input-error">{formik.errors.max_no}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Min stake"
                                           name={`min_stake`} onChange={formik.handleChange}
                                           value={formik.values.min_stake}/>
                                    {formik.touched.min_stake && formik.errors.min_stake ? (
                                        <div
                                            className="text-danger input-error">{formik.errors.min_stake}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Max stake"
                                           name={`max_stake`} onChange={formik.handleChange}
                                           value={formik.values.max_stake}/>
                                    {formik.touched.max_stake && formik.errors.max_stake ? (
                                        <div
                                            className="text-danger input-error">{formik.errors.max_stake}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <input type={'file'} className={'form-control'} id={'web_image'} name={'web_image'}
                                           onChange={handleImageChange}/>
                                    <img
                                        onError={(e)=>addDefaultSrc(e)}
                                        src={formik.values?.web_image ? `${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.game}/${formik.values?.web_image}`: defaultImg}
                                        width={100} height={100} alt={"No File chosen"} id={'web_image_img'}/>
                                    {formik.touched.web_image && formik.errors.web_image ? (
                                        <div
                                            className="text-danger input-error">{formik.errors.web_image}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'file'} className="form-control" placeholder="Mobile image"
                                           id={'mobile_image'} name={`mobile_image`}
                                           onChange={handleImageChange}/>
                                    <img
                                        onError={(e)=>addDefaultSrc(e)}
                                        src={formik.values?.mobile_image ? `${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.game}/${formik.values?.mobile_image}`: defaultImg}
                                        width={100} height={100} alt={"No File chosen"} id={'mobile_image_img'}/>
                                    {formik.touched.mobile_image && formik.errors.mobile_image ? (
                                        <div
                                            className="text-danger input-error">{formik.errors.mobile_image}</div>) : null}
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

export default IsLoadingHOC(AddUpdateGameMaster, 'loading');
