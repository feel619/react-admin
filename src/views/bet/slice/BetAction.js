import {BetConstants} from "./BetConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";
import {DepositConstants} from "../../deposit/slice/DepositConstants";
import {TransactionConstants} from "../../transaction/slice/TransactionConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: BetConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: BetConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: BetConstants.LISTING_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {
            "draw": 1,
            "columns": [],
            "start": reqData.start,
            "length": reqData.total,
            "search": {
                "value": "",
                "regex": false
            },
            "order": [
                reqData.order
            ],
            "searchList": reqData.searchList
        };
        console.log('requestData',requestData);
        CommonService.sendHTTPCrossRequest('/cross/bet/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Bet  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Bet FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: BetConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: BetConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: BetConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        let year = new Date().getFullYear().toString();
        CommonService.sendHTTPCrossRequest('/cross/bet/' + reqData.id + '?player_id=' + reqData.playerId,'GET',requestData)//+'&year='+year
            .then(
                response => {
                    console.log("BetListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("BetListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddBet = (reqData,from) => {
    const request = (result) => {
        return {type: BetConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: BetConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: BetConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/bet/','POST',reqData)
            .then(
                response => {
                    console.log(" AddBet SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddBet FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateBet = (id,reqData,from) => {
    const request = (result) => {
        return {type: BetConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: BetConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: BetConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/bet/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateBet SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateBet FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getStatusList = (reqData) => {
    const request = (result) => {
        return {type: BetConstants.GET_STATUS_REQUEST, result}
    };
    const success = (result) => {
        return {type: BetConstants.GET_STATUS_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: BetConstants.GET_STATUS_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPCrossRequest('/cross/bet/status/list','GET',requestData)
            .then(
                response => {
                    console.log("getStatusList SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("getStatusList FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};
const PlayerBetListing = (reqData) => {
    const request = (result) => {
        return {type: BetConstants.PLAYER_BET_REQUEST, result}
    };
    const success = (result) => {
        return {type: BetConstants.PLAYER_BET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: BetConstants.PLAYER_BET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {
            "draw": 1,
            "columns": [],
            "start": reqData.start,
            "length": reqData.total,
            "id":reqData.id,
            "search": {
                "value": "",
                "regex": false
            },
            "order": [
                reqData.order
            ],
            "searchList": reqData.searchList
        };
        console.log('requestData',requestData);
        CommonService.sendHTTPCrossRequest('/cross/player/bet/listing','POST',requestData)
            .then(
                response => {
                    console.log("TransactionDepositListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("TransactionDepositListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};
export const BetAction = {
    Listing,
    AddBet,
    getRecord,
    UpdateBet,
    getStatusList,
    PlayerBetListing
};
