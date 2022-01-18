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
import {Field, FormikProvider, Form as FormikForm, Formik, useFormik} from "formik";
import {CmsBannerAction} from "../slice/CmsBannerAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import {history} from '../../../redux/_helpers';
import {CommonService} from "../../../redux/_services/CommonService";
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'];
const SUPPORTED_IMG_FORMATS = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;
    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
            callback(true);
        };
        img.onerror = () => {
            callback(false);
        };
    }
}
const AddUpdateCmsBanner = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/cms-banner"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();
    const [showingIpView, setShowingIpView] = useState(true);
    const defaultImg = require("../../../assets/img/no-image.png").default;
    const AuthReducers = useSelector(state => state.AuthReducers);
    const CmsBannerReducers = useSelector(state => state.CmsBannerReducers);
    const cmsReducers = useSelector(state => state.CmsReducers);
    console.log(cmsReducers, " MVCMC ");
    const addDefaultSrc = (ev) => {
        ev.target.src = defaultImg
    };
    const validationSchema = Yup.object({
        title: Yup.string('').trim().required('Title is required'),
        sort_order: Yup.number().required('sort order is required').positive('Must be greater than zero').integer(),
        type: Yup.string('').required('type is required'),
        mapping_id: Yup.string().when("type", {
            is: value => value && value === 'URL',
            then: Yup.string()
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    'Enter correct url!'
                )
                .required('Please enter website'),
            otherwise: Yup.string().required('Please enter mapping id')
        }),
        is_clickable: Yup.boolean(),
        web_image: Yup.mixed().required('Web image is required')
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
        mobile_image: Yup.mixed().required('Mobile image is required')
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
    const formik = useFormik({
        initialValues: {
            title: '',
            mapping_id: '',
            sort_order: '',
            type: '',
            is_clickable: showingIpView,
            web_image: '',
            mobile_image: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('mapping_id', values.mapping_id);
            formData.append('sort_order', values.sort_order);
            formData.append('type', values.type);
            formData.append('is_clickable', values.is_clickable);
            // if (values.is_clickable) {
            formData.append('web_image', values.web_image);
            formData.append('mobile_image', values.mobile_image);
            // }
            if (id) {
                dispatch(CmsBannerAction.UpdateCmsBanner(id, formData, from))
            } else {
                dispatch(CmsBannerAction.AddCmsBanner(formData, from))
            }
        },
    });

    const getRecord = () => {
        CommonService.getRecord('/auth/cms_banner/', id, (response) => {
            console.log(response,"res")
            formik.initialValues.title = response.title;
            formik.initialValues.mapping_id = response.mapping_id;
            formik.initialValues.sort_order = response.sort_order;
            formik.initialValues.type = response.type;
            formik.initialValues.is_clickable = response.is_clickable;
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
                                    <Field type={'text'} className="form-control" placeholder="Title" name={`title`}
                                           onChange={formik.handleChange} value={formik.values.title}/>
                                    {formik.touched.title && formik.errors.title ? (
                                        <div className="text-danger input-error">{formik.errors.title}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="Sort order"
                                           name={`sort_order`} onChange={formik.handleChange}
                                           value={formik.values.sort_order}/>
                                    {formik.touched.sort_order && formik.errors.sort_order ? (<div
                                        className="text-danger input-error">{formik.errors.sort_order}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" id={'type'} name="type" as="select"
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleChange}
                                           value={formik.values.type}
                                    >
                                        <option data-privileges={''} value="">Select type</option>
                                        {
                                            CmsBannerReducers?.cmsBannerTypeRecord?.success
                                            && CmsBannerReducers?.cmsBannerTypeRecord?.response.map((allData, index) => (
                                                <option key={`role-opt-${index}`} data-privileges={allData.key}
                                                        value={allData.value}>{allData.key}</option>
                                            ))
                                        }
                                    </Field>
                                    {formik.errors?.type ? (
                                        <div className="text-danger input-error">{formik.errors?.type}</div>) : null}
                                </FormGroup>
                                {
                                    formik.values.type === 'URL' ?
                                        <>
                                            <FormGroup className={` mb-3`}>
                                                <Field type={'text'} className="form-control" placeholder="Mapping id"
                                                       name={`mapping_id`} onChange={formik.handleChange}
                                                       value={formik.values.mapping_id}/>
                                                {formik.touched.mapping_id && formik.errors.mapping_id ? (<div
                                                    className="text-danger input-error">{formik.errors.mapping_id}</div>) : null}
                                            </FormGroup>
                                        </>
                                        :
                                        <>
                                            <FormGroup className={` mb-3`}>
                                                <Field className="form-control" id={'mapping_id'} name="mapping_id"
                                                       as="select"
                                                       onChange={formik.handleChange}
                                                       onBlur={formik.handleChange}
                                                       value={formik.values.mapping_id}
                                                >
                                                    <option data-privileges={''} value="">Select Cms</option>
                                                    {
                                                        cmsReducers?.cmsListRecord?.success
                                                        && cmsReducers?.cmsListRecord?.response.map((allData, index) => (
                                                            <option key={`cms-page-opt-${index}`}
                                                                    data-privileges={allData.slug}
                                                                    value={allData.slug}>{allData.page}</option>
                                                        ))
                                                    }
                                                </Field>
                                                {formik.errors?.mapping_id ? (
                                                    <div
                                                        className="text-danger input-error">{formik.errors?.mapping_id}</div>) : null}
                                            </FormGroup>
                                        </>
                                }
                                <FormGroup className="mb-0">
                                    <CustomInput type="switch" id="is_clickable" name="is_clickable"
                                                 label="is clickable"
                                                 value={formik.values.is_clickable}
                                                 onChange={(event) => {
                                                     setShowingIpView(!showingIpView)
                                                     formik.setFieldValue(`is_clickable`, event.target.checked)
                                                 }}
                                                 checked={formik.values.is_clickable}
                                    />
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <input type={'file'} className={'form-control'} id={'web_image'}
                                           name={'web_image'}
                                           onChange={handleImageChange}/>
                                    <img
                                        onError={(e)=>addDefaultSrc(e)}
                                        src={formik.values?.web_image ? `${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.banner}/${formik.values?.web_image}`: defaultImg}
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
                                        // src={checkIfImageExists(`${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.banner}/${formik.values?.mobile_image}`,(exists) => {
                                        //     return exists ? 'No File chosen': 'd'
                                        // })}
                                        onError={(e)=>addDefaultSrc(e)}
                                        src={formik.values?.mobile_image ? `${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.banner}/${formik.values?.mobile_image}`: defaultImg}
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

export default IsLoadingHOC(AddUpdateCmsBanner, 'loading');
