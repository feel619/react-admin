import {DepositConstants} from "./DepositConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";
import {WithdrawalConstants} from "../../withdrawal/slice/WithdrawalConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: DepositConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: DepositConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DepositConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/deposit/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Deposit  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Deposit FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: DepositConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: DepositConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DepositConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPCrossRequest('/cross/deposit/' + reqData.id + '?player_id=' + reqData.playerId,'GET',requestData)
            .then(
                response => {
                    console.log("depositRecord SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("depositRecord FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddDeposit = (reqData,from) => {
    const request = (result) => {
        return {type: DepositConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: DepositConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DepositConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/deposit/add','POST',reqData)
            .then(
                response => {
                    console.log(" AddDeposit SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddDeposit FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateDeposit = (id,reqData,from) => {
    const request = (result) => {
        return {type: DepositConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: DepositConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DepositConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/deposit/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateDeposit SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateDeposit FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getStatusList = (reqData) => {
    const request = (result) => {
        return {type: DepositConstants.GET_STATUS_REQUEST, result}
    };
    const success = (result) => {
        return {type: DepositConstants.GET_STATUS_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DepositConstants.GET_STATUS_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPCrossRequest('/cross/deposit/status/list','GET',requestData)
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

export const DepositAction = {
    Listing,
    AddDeposit,
    getRecord,
    UpdateDeposit,
    getStatusList
};
