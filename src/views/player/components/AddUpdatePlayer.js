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
    Col, InputGroup, InputGroupAddon, InputGroupText, CardTitle, CardSubtitle, CardText
} from "reactstrap";
import {PlayerAction} from "../slice/PlayerAction";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../redux/_helpers';
import {CommonService} from "../../../redux/_services/CommonService";
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";

const AddUpdatePlayer = (props) => {
    const {setLoading} = props;
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/admin/player"}};
    const dispatch = useDispatch(null);
    const {id} = useParams();
    const playerReducers = useSelector(state => state.PlayerReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('29') < 0;
    const playerBankPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('31') < 0;
    const playerInfoPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('30') < 0;

    console.log(playerReducers," playerReducers..playerReducers ")
    const getRecord = () => {
        dispatch(PlayerAction.getRecord(id));
        dispatch(PlayerAction.getBankRecord(id));
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
                    <Row className="gut secGap pt-0">
                        <Col hidden={playerInfoPrivileges} className="mb-5 mb-xl-0" xl="8">
                            <Card className=" shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Overview
                                            </h6>
                                            <h2 className="text-dark mb-0">Player</h2>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="gut secGap pt-0">
                                        <Col className="" xl="6" lg={'6'}>
                                            <CardTitle tag="h5">
                                                {playerReducers?.playerRecord?.response?.username}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                Account {playerReducers?.playerRecord?.response?.account_no}
                                            </CardSubtitle>
                                            <CardText>
                                                {playerReducers?.playerRecord?.response?.first_name}-{playerReducers?.playerRecord?.response?.last_name}
                                            </CardText>
                                            <CardText>
                                                Email : {playerReducers?.playerRecord?.response?.email}
                                            </CardText>
                                            <CardText>
                                                Phone : {playerReducers?.playerRecord?.response?.phone_code}{playerReducers?.playerRecord?.response?.phone}
                                            </CardText>
                                            <CardText>
                                                BirthDate : {playerReducers?.playerRecord?.response?.birthdate}
                                            </CardText>
                                            <CardText>
                                                Ip :{playerReducers?.playerRecord?.response?.register_ip}
                                            </CardText>
                                            <CardText>
                                                wallet no : {playerReducers?.playerRecord?.response?.account?.wallet_no}
                                            </CardText>
                                        </Col>
                                        <Col className="mb-5 mb-xl-0" xl="6" lg={`6`}>
                                            <CardText>
                                                Address 1: {playerReducers?.playerRecord?.response?.address1}
                                            </CardText>
                                            <CardText>
                                                Address 2: {playerReducers?.playerRecord?.response?.address2}
                                            </CardText>
                                            <CardText>
                                                Zip Code :{playerReducers?.playerRecord?.response?.zip}
                                            </CardText>
                                            <CardText>
                                                Is bank account : {playerReducers?.playerRecord?.response?.is_bank_account ? 'Yes':'No'}
                                            </CardText>
                                            <CardText>
                                                Is verify : {playerReducers?.playerRecord?.response?.is_verify ? 'Yes':'No'}
                                            </CardText>
                                            <CardText>
                                                Last login time : {playerReducers?.playerRecord?.response?.last_login_time}
                                            </CardText>
                                            <CardText>
                                                balance : {playerReducers?.playerRecord?.response?.account?.balance}
                                            </CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col hidden={playerBankPrivileges} className="mb-5 mb-xl-0" xl="4">
                            <Card className=" shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Overview
                                            </h6>
                                            <h2 className="text-dark mb-0">Bank</h2>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="gut secGap pt-0">
                                        <Col className="" xl="12" lg={'12'}>
                                            <CardTitle tag="h5">
                                                {console.log(playerReducers,"PlayerBankListing")}
                                                {playerReducers?.PlayerBankListing?.response?.bank?.bank}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                Bank id {playerReducers?.PlayerBankListing?.response?.bank_id}
                                            </CardSubtitle>
                                            <CardText>
                                                {playerReducers?.PlayerBankListing?.response?.acc_first_name}-{playerReducers?.playerRecord?.response?.acc_last_name}
                                            </CardText>
                                            <CardText>
                                                Routing codes: {playerReducers?.PlayerBankListing?.response?.routing_codes}
                                            </CardText>
                                            <CardText>
                                                Account : {playerReducers?.PlayerBankListing?.response?.bank_account_number}
                                            </CardText>
                                            <CardText>
                                                Branch : {playerReducers?.PlayerBankListing?.response?.branch_name}
                                            </CardText>
                                            <CardText>
                                                Status : {playerReducers?.PlayerBankListing?.response?.status_obj?.status}
                                            </CardText>
                                            <CardText>
                                                Create Date : {playerReducers?.PlayerBankListing?.response?.created_at}
                                            </CardText>
                                        </Col>
                                    </Row>
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

export default IsLoadingHOC(AddUpdatePlayer,'loading');
