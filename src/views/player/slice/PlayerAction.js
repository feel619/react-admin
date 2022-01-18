import {PlayerConstants} from "./PlayerConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";
import {DepositConstants} from "../../deposit/slice/DepositConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/player/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Player  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Player FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPCrossRequest('/cross/player/'+reqData+'/info','GET',requestData)
            .then(
                response => {
                    console.log("PlayerListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("PlayerListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};
const getBankRecord = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.GET_PLAYER_BANK_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.GET_PLAYER_BANK_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.GET_PLAYER_BANK_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPCrossRequest('/cross/player/'+reqData+'/bank','GET',requestData)
            .then(
                response => {
                    console.log("getBankRecord SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("getBankRecord FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddPlayer = (reqData,from) => {
    const request = (result) => {
        return {type: PlayerConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('cross/player/add','POST',reqData)
            .then(
                response => {
                    console.log(" AddPlayer SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddPlayer FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdatePlayer = (id,reqData,from) => {
    const request = (result) => {
        return {type: PlayerConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/player/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdatePlayer SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdatePlayer FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const GetAllPlayer = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.GET_ALL_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.GET_ALL_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.GET_ALL_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPCrossRequest('/cross/player','GET',requestData)
            .then(
                response => {
                    console.log("GetAllPlayer SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("GetAllPlayer FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const PlayerDepositListing = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.PLAYER_DEPOSIT_LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.PLAYER_DEPOSIT_LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.PLAYER_DEPOSIT_LISTING_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/player/deposit/listing','POST',requestData)
            .then(
                response => {
                    console.log("PlayerDepositListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("PlayerDepositListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const PlayerWithdrawalListing = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.PLAYER_WITHDRAWAL_LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.PLAYER_WITHDRAWAL_LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.PLAYER_WITHDRAWAL_LISTING_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/player/withdrawal/listing','POST',requestData)
            .then(
                response => {
                    console.log("PlayerWITHDRAWALListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("PlayerWITHDRAWALListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const PlayerLoginHistoryListing = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.PLAYER_LOGIN_LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.PLAYER_LOGIN_LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.PLAYER_LOGIN_LISTING_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {
            "draw": 1,
            "columns": [],
            "start": reqData.start,
            "length": reqData.total,
            "id":reqData?.id ? reqData.id : '',
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
        CommonService.sendHTTPCrossRequest('/cross/player/login/listing','POST',requestData)
            .then(
                response => {
                    console.log("PlayerLoginListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("PlayerLoginListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const PlayerBetListing = (reqData) => {
    const request = (result) => {
        return {type: PlayerConstants.PLAYER_LOGIN_LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: PlayerConstants.PLAYER_LOGIN_LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: PlayerConstants.PLAYER_LOGIN_LISTING_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/player/bet/listing','POST',requestData)
            .then(
                response => {
                    console.log("PlayerBetListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("PlayerBetListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};
export const PlayerAction = {
    Listing,
    AddPlayer,
    getRecord,
    getBankRecord,
    UpdatePlayer,
    GetAllPlayer,
    PlayerDepositListing,
    PlayerWithdrawalListing,
    PlayerLoginHistoryListing,
    PlayerBetListing,
};
