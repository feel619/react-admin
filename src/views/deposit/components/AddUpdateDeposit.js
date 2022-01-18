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
    Col, InputGroup, InputGroupAddon, InputGroupText, CardTitle, CardSubtitle, CardText, Table
} from "reactstrap";
import {Field, FormikProvider, Form as FormikForm, Formik, useFormik} from "formik";
import {DepositAction} from "../slice/DepositAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../redux/_helpers';
import {CommonService} from "../../../redux/_services/CommonService";
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const validationSchema = Yup.object({
    amount:  Yup.number().required('Amount is required').positive('Must be greater than zero').integer(),
    user_id: Yup.string('').required('Player is required'),
    description: Yup.string('').required('Content is required'),
    // transaction: Yup.object().shape({
    //     req_body: Yup.object().shape({
    //         amount:  Yup.number().required('Amount is required').positive('Must be greater than zero').integer(),
    //         tran_id: Yup.string('').required('transaction is required'),
    //     })
    // }),
});
const AddUpdateDeposit = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/deposit"}};
    const dispatch = useDispatch(null);
    const {id,playerId} = useParams();
    const playerReducers = useSelector(state => state.PlayerReducers);
    const DepositReducers = useSelector(state => state.DepositReducers);

    const formik = useFormik({
        initialValues: {
            amount: '',
            description: '',
            user_id:'',
            transaction: {
                req_body:{
                    amount:'',
                    tran_id:''
                }
            }
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (id) {
                dispatch(DepositAction.UpdateDeposit(id,values, from))
            } else {
                dispatch(DepositAction.AddDeposit(values, from))
            }
        },
    });

    const getRecord = () => {
        dispatch(DepositAction.getRecord({
            id:id,
            playerId:playerId
        }));
        setLoading(false);
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
                        { !id &&
                        <Formik>
                            <FormikForm role="form" onSubmit={formik.handleSubmit} className="mx7">
                                <FormGroup className={` mb-3`}>
                                    <Field type={'number'} className="form-control" placeholder="amount"
                                           name={`amount`} onChange={formik.handleChange}
                                           value={formik.values.amount}/>
                                    {formik.touched.amount && formik.errors.amount ? (
                                        <div className="text-danger input-error">{formik.errors.amount}</div>) : null}
                                </FormGroup>

                                <FormGroup className={` mb-3`}>
                                    <Field className="form-control" name="user_id" as="select"
                                           onChange={formik.handleChange}
                                           value={formik.values.user_id}
                                    >
                                        <option data-privileges={''} value="">Select Player</option>
                                        {
                                            playerReducers?.GetAllPlayer.success
                                            && playerReducers?.GetAllPlayer?.response.map((roleData, index) => (
                                                <option key={`player-opt-${index}`} data-privileges={roleData.id}
                                                        value={roleData.id}>{roleData.first_name +' '+ roleData.last_name}</option>
                                            ))
                                        }
                                    </Field>
                                    {formik.errors?.user_id ? (<div className="text-danger input-error">{formik.errors?.user_id}</div>) : null}
                                </FormGroup>

                                {/*<FormGroup className={` mb-3`}>
                                    <Field type={'text'} className="form-control" placeholder="Amount" name={`transaction.req_body.amount`} onChange={formik.handleChange} value={formik.values.transaction.req_body.amount}/>
                                    {formik.touched.transaction.req_body.amount && formik.errors.transaction.req_body.amount ? (<div className="text-danger">{formik.errors.transaction.req_body.amount}</div>) : null}
                                </FormGroup>
                                <FormGroup className={` mb-3`}>
                                    <Field type={'text'} className="form-control" placeholder="transaction" name={`transaction.req_body.tran_id`} onChange={formik.handleChange} value={formik.values.transaction.req_body.tran_id}/>
                                    {formik.touched.transaction.req_body.tran_id && formik.errors.transaction.req_body.tran_id ? (<div className="text-danger input-error">{formik.errors.transaction.req_body.tran_id}</div>) : null}
                                </FormGroup>*/}
                                <FormGroup className={` mb-3`}>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        className="form-control"
                                        data={formik.values.description}
                                        onReady={ editor => {
                                            console.log( 'Editor is ready to use!', editor );
                                            //editor.data.processor = new GFMDataProcessor();
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            console.log( { event, editor, data } );
                                            formik.setFieldValue('description', data);
                                        } }
                                    />
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
                        }
                        {id &&
                        <Row className="gut secGap pt-0">
                            <Col className="mb-5 mb-xl-0" xl="8">
                                <Card className=" shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h6 className="text-uppercase text-light ls-1 mb-1">
                                                    Overview
                                                </h6>
                                                <h2 className="text-dark mb-0">Deposit</h2>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row className="gut secGap pt-0">
                                            <Col className="" xl="6" lg={'6'}>
                                                <CardTitle tag="h5">
                                                    {DepositReducers?.depositRecord?.response?.wallet?.wallet_no}
                                                </CardTitle>
                                                <CardSubtitle
                                                    className="mb-2 text-muted"
                                                    tag="h6"
                                                >
                                                    balance: {DepositReducers?.depositRecord?.response?.wallet?.balance}
                                                </CardSubtitle>
                                                <CardText>
                                                    transaction no: {DepositReducers?.depositRecord?.response?.transaction?.transaction_no}
                                                </CardText>
                                                <CardText>
                                                    Amount: {DepositReducers?.depositRecord?.response?.transaction?.amount}
                                                </CardText>
                                                <CardText>
                                                    balance: {DepositReducers?.depositRecord?.response?.transaction?.balance}
                                                </CardText>

                                                <CardText>
                                                    tran_id: {DepositReducers?.depositRecord?.response?.transaction?.tran_id}
                                                </CardText>
                                                <CardText>
                                                    amount: {DepositReducers?.depositRecord?.response?.transaction?.amount}
                                                </CardText>
                                            </Col>
                                            <Col className="mb-5 mb-xl-0" xl="6" lg={`6`}>
                                                <CardText>
                                                    before transaction: {DepositReducers?.depositRecord?.response?.before_transaction}
                                                </CardText>
                                                <CardText>
                                                    after transaction: {DepositReducers?.depositRecord?.response?.after_transaction}
                                                </CardText>
                                                <CardText>
                                                    status: {DepositReducers?.depositRecord?.response?.status_obj?.status}
                                                </CardText>
                                                <CardText>
                                                    description: {DepositReducers?.depositRecord?.response?.description}
                                                </CardText>
                                                <CardText>
                                                    ip: {DepositReducers?.depositRecord?.response?.ip}
                                                </CardText>
                                                <CardText>
                                                    transaction at: {DepositReducers?.depositRecord?.response?.transaction?.transaction_at}
                                                </CardText>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        }
                    </Container>
                </div>
            </div>

        </>
    );
};

export default IsLoadingHOC(AddUpdateDeposit,'loading');
