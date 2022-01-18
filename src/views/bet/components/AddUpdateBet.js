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
import {BetAction} from "../slice/BetAction";
import {useLocation, useParams} from "react-router-dom";
import { history } from '../../../redux/_helpers';
import IsLoadingHOC from "../../formComponent/IsLoadingHOC";

const AddUpdateBet = (props) => {
    const {setLoading} = props;
    const dispatch = useDispatch(null);
    const {id,playerId} = useParams();
    const BetReducers = useSelector(state => state.BetReducers);

    const getRecord = () => {
        dispatch(BetAction.getRecord({
            id:id,
            playerId:playerId
        }));
        setLoading(false);
    };
    useEffect(() => {
        console.log("AddUpdateBet");
        if(id) {
            getRecord();
        } else {
            setLoading(false);
        }
    }, [id,playerId]);

    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>
                        <div className="listview1">
                            <div className="back">
                                <Button onClick={() => history.goBack()} className="btn-icon btn-light2" size="sm">
                                    <i className="ti-arrow-left" />
                                </Button>
                            </div>
                            <div className="child">{props.data.name}</div>
                        </div>
                    </Container>
                </div>
                <div className="main-content-body">
                    <Container className="" fluid>
                        {id &&
                        <Row className="gut secGap pt-0">
                            <Col className="mb-5 mb-xl-0" xl="12">
                                <Card className=" shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h6 className="text-uppercase text-light ls-1 mb-1">
                                                    Overview
                                                </h6>
                                                <h2 className="text-dark mb-0">Bet</h2>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row className="gut secGap pt-0">
                                            <Col className="" xl="3" lg={'3'}>
                                                <CardTitle tag="h5">
                                                    {BetReducers?.betRecord?.response?.wallet?.bet_unk_id}
                                                </CardTitle>
                                                <CardSubtitle
                                                    className="mb-2 text-muted"
                                                    tag="h6"
                                                >
                                                    wallet_id: {BetReducers?.betRecord?.response?.wallet?.wallet_id}
                                                </CardSubtitle>
                                                <CardText>
                                                    bet_amount: {BetReducers?.betRecord?.response?.bet_amount}
                                                </CardText>
                                                <CardText>
                                                    result_amount: {BetReducers?.betRecord?.response?.result_amount}
                                                </CardText>
                                                <CardText>
                                                    win_amount: {BetReducers?.betRecord?.response?.win_amount}
                                                </CardText>
                                                <CardText>
                                                    is_win: {BetReducers?.betRecord?.response?.is_win}
                                                </CardText>
                                                <CardText>
                                                    bet_num: {BetReducers?.betRecord?.response?.bet_num}
                                                </CardText>
                                                <CardText>
                                                    result_num: {BetReducers?.betRecord?.response?.result_num}
                                                </CardText>
                                            </Col>
                                            <Col className="mb-5 mb-xl-0" xl="3" lg={`3`}>
                                                <CardText>
                                                    runner_game_id: {BetReducers?.betRecord?.response?.runner_game_id}
                                                </CardText>
                                                <CardText>
                                                    draw_no: {BetReducers?.betRecord?.response?.draw_no}
                                                </CardText>
                                                <CardText>
                                                    draw_date: {BetReducers?.betRecord?.response?.draw_date}
                                                </CardText>
                                                <CardText>
                                                    draw_time: {BetReducers?.betRecord?.response?.draw_time}
                                                </CardText>
                                                <CardText>
                                                    draw_date_time: {BetReducers?.betRecord?.response?.draw_date_time}
                                                </CardText>
                                                <CardText>
                                                    bet_close_date_time: {BetReducers?.betRecord?.response?.bet_close_date_time}
                                                </CardText>
                                            </Col>
                                            <Col className="mb-5 mb-xl-0" xl="3" lg={`3`}>
                                                <CardText>
                                                    game_id: {BetReducers?.betRecord?.response?.game_id}
                                                </CardText>
                                                <CardText>
                                                    game_name: {BetReducers?.betRecord?.response?.game_name}
                                                </CardText>
                                                <CardText>
                                                    game_no: {BetReducers?.betRecord?.response?.game_no}
                                                </CardText>
                                                <CardText>
                                                    game_win_no: {BetReducers?.betRecord?.response?.game_win_no}
                                                </CardText>
                                                <CardText>
                                                    min_no: {BetReducers?.betRecord?.response?.min_no}
                                                </CardText>
                                                <CardText>
                                                    max_no: {BetReducers?.betRecord?.response?.max_no}
                                                </CardText>
                                                <CardText>
                                                    min_stake: {BetReducers?.betRecord?.response?.min_stake}
                                                </CardText>
                                            </Col>
                                            <Col className="mb-5 mb-xl-0" xl="3" lg={`3`}>
                                                <CardText>
                                                    sub_game_type: {BetReducers?.betRecord?.response?.sub_game_type}
                                                </CardText>
                                                <CardText>
                                                    sub_game_name: {BetReducers?.betRecord?.response?.sub_game_name}
                                                </CardText>
                                                <CardText>
                                                    price_odd: {BetReducers?.betRecord?.response?.price_odd}
                                                </CardText>

                                                <CardText>
                                                    betting_at: {BetReducers?.betRecord?.response?.betting_at}
                                                </CardText>
                                                <CardText>
                                                    is_settled: {BetReducers?.betRecord?.response?.is_settled}
                                                </CardText>
                                                <CardText>
                                                    settled_at: {BetReducers?.betRecord?.response?.settled_at}
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

export default IsLoadingHOC(AddUpdateBet,'loading');
