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
    Col, InputGroup, InputGroupAddon, InputGroupText,
    Table,
    CardTitle,
    CardSubtitle,
    CardText, Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";
import {Field, FormikProvider, Form as FormikForm, Formik, useFormik} from "formik";
import {WithdrawalAction} from "../slice/WithdrawalAction";
import * as Yup from "yup";
import {useLocation, useParams} from "react-router-dom";
import {history} from '../../../redux/_helpers';
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";

const validationSchema = Yup.object({
    status: Yup.string('').required('Status is required'),
    remarks: Yup.string('').trim().required('Remark is required'),
});
const AddUpdateWithdrawal = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/withdrawal"}};
    const dispatch = useDispatch(null);
    const {id, playerId} = useParams();
    const withdrawalReducers = useSelector(state => state.WithdrawalReducers);
    const formik = useFormik({
        initialValues: {
            status: '',
            remarks: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
                values.status = parseInt(values.status);
            if (id) {
                dispatch(WithdrawalAction.UpdateWithdrawal(id, values, from))
            } else {
                dispatch(WithdrawalAction.AddWithdrawal(values, from))
            }
        },
    });

    const getRecord = () => {
        dispatch(WithdrawalAction.getRecord({
            id:id,
            playerId:playerId
        }));
        formik.initialValues.status = withdrawalReducers?.withdrawalRecord?.response?.status;
        formik.initialValues.remarks = withdrawalReducers?.withdrawalRecord?.response?.remarks;
        setLoading(false);
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
            <Container className="" fluid>

            </Container>
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

                        <Row className="gut secGap pt-0">
                            <Col className="mb-5 mb-xl-0" xl="8">
                                <Card className=" shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h6 className="text-uppercase text-light ls-1 mb-1">
                                                    Overview
                                                </h6>
                                                <h2 className="text-dark mb-0">player</h2>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row className="gut secGap pt-0">
                                        <Col className="" xl="6" lg={'6'}>
                                            <CardTitle tag="h5">
                                                {withdrawalReducers?.withdrawalRecord?.response?.player?.username}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                Account {withdrawalReducers?.withdrawalRecord?.response?.player?.account_no}
                                            </CardSubtitle>
                                            <CardText>
                                                {withdrawalReducers?.withdrawalRecord?.response?.player?.first_name}-{withdrawalReducers?.withdrawalRecord?.response?.player?.last_name}
                                            </CardText>
                                            <CardText>
                                                Email : {withdrawalReducers?.withdrawalRecord?.response?.player?.email}
                                            </CardText>
                                            <CardText>
                                                Phone : {withdrawalReducers?.withdrawalRecord?.response?.player?.phone_code}{withdrawalReducers?.withdrawalRecord?.response?.player?.phone}
                                            </CardText>
                                            <CardText>
                                                BirthDate : {withdrawalReducers?.withdrawalRecord?.response?.player?.birthdate}
                                            </CardText>
                                            <CardText>
                                                Ip :{withdrawalReducers?.withdrawalRecord?.response?.player?.register_ip}
                                            </CardText>
                                        </Col>
                                        <Col className="mb-5 mb-xl-0" xl="6" lg={`6`}>
                                            <CardText>
                                                Address 1: {withdrawalReducers?.withdrawalRecord?.response?.player?.address1}
                                            </CardText>
                                            <CardText>
                                                Address 2: {withdrawalReducers?.withdrawalRecord?.response?.player?.address2}
                                            </CardText>
                                            <CardText>
                                                Zip Code :{withdrawalReducers?.withdrawalRecord?.response?.player?.zip}
                                            </CardText>
                                            <CardText>
                                                Is bank account : {withdrawalReducers?.withdrawalRecord?.response?.player?.is_bank_account ? 'Yes':'No'}
                                            </CardText>
                                            <CardText>
                                                Is verify : {withdrawalReducers?.withdrawalRecord?.response?.player?.is_verify ? 'Yes':'No'}
                                            </CardText>
                                            <CardText>
                                                Last login time : {withdrawalReducers?.withdrawalRecord?.response?.player?.last_login_time}
                                            </CardText>
                                        </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="mb-5 mb-xl-0" xl="4">
                                <Formik>
                                    <FormikForm role="form" onSubmit={formik.handleSubmit} className="mx7">
                                        <FormGroup className={` mb-3`}>
                                            <Field className="form-control" name="status" as="select"
                                                   onChange={formik.handleChange}
                                                   value={formik.values.status}
                                            >
                                                <option data-privileges={''} value="">Select Status</option>
                                                {
                                                    withdrawalReducers?.statusWithdrawal?.success
                                                    && withdrawalReducers?.statusWithdrawal?.response.map((roleData, index) => (
                                                        <option key={`player-opt-${index}`}
                                                                data-privileges={roleData.id}
                                                                value={roleData.id}>{roleData.status}</option>
                                                    ))
                                                }
                                            </Field>
                                            {formik.errors?.status ? (
                                                <div
                                                    className="text-danger input-error">{formik.errors?.status}</div>) : null}
                                        </FormGroup>

                                        <FormGroup className={` mb-3`}>
                                            <Field type={'text'} className="form-control" placeholder="Remarks"
                                                   name={`remarks`}
                                                   onChange={formik.handleChange} value={formik.values.remarks}/>
                                            {formik.touched.remarks && formik.errors.remarks ? (
                                                <div
                                                    className="text-danger input-error">{formik.errors.remarks}</div>) : null}
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
                            </Col>
                            <Col className="mb-5 mb-xl-0" xl="8">
                                <Card className=" shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h6 className="text-uppercase text-light ls-1 mb-1">
                                                    Overview
                                                </h6>
                                                <h2 className="text-dark mb-0">Withdrawal Remarks</h2>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Table borderless responsive hover>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>status</th>
                                                <th>remarks</th>
                                                <th>created at</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                withdrawalReducers?.withdrawalRecord?.success
                                                && withdrawalReducers?.withdrawalRecord?.response?.request_details.map((prop, key) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <th scope="row">{prop?.withdrawal_id}</th>
                                                                <td>{prop?.status_obj?.status}</td>
                                                                <td>{prop?.remarks}</td>
                                                                <td>{`${prop?.created_at}  ${prop?.created_by_name}`}</td>
                                                            </tr>
                                                        </>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default IsLoadingHOC(AddUpdateWithdrawal, 'loading');
