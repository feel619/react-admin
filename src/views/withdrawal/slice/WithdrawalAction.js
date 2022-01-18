import {WithdrawalConstants} from "./WithdrawalConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";
import {DepositConstants} from "../../deposit/slice/DepositConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: WithdrawalConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: WithdrawalConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: WithdrawalConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/withdrawal/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Withdrawal  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Withdrawal FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: WithdrawalConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: WithdrawalConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: WithdrawalConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPCrossRequest('/cross/withdrawal/' + reqData.id + '?player_id=' + reqData.playerId,'GET',requestData)
            .then(
                response => {
                    console.log("WithdrawalListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("WithdrawalListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddWithdrawal = (reqData,from) => {
    const request = (result) => {
        return {type: WithdrawalConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: WithdrawalConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: WithdrawalConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/withdrawal/','POST',reqData)
            .then(
                response => {
                    console.log(" AddWithdrawal SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddWithdrawal FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateWithdrawal = (id,reqData,from) => {
    const request = (result) => {
        return {type: WithdrawalConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: WithdrawalConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: WithdrawalConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/withdrawal/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateWithdrawal SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateWithdrawal FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getStatusList = (reqData) => {
    const request = (result) => {
        return {type: WithdrawalConstants.GET_STATUS_REQUEST, result}
    };
    const success = (result) => {
        return {type: WithdrawalConstants.GET_STATUS_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: WithdrawalConstants.GET_STATUS_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPCrossRequest('/cross/withdrawal/status/list','GET',requestData)
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
export const WithdrawalAction = {
    Listing,
    AddWithdrawal,
    getRecord,
    UpdateWithdrawal,
    getStatusList
};
