import {TransactionConstants} from "./TransactionConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: TransactionConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: TransactionConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: TransactionConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/transaction/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Transaction  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Transaction FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: TransactionConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: TransactionConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: TransactionConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPCrossRequest('/cross/transaction/'+reqData+'/info','GET',requestData)
            .then(
                response => {
                    console.log("TransactionListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("TransactionListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddTransaction = (reqData,from) => {
    const request = (result) => {
        return {type: TransactionConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: TransactionConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: TransactionConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('cross/transaction/add','POST',reqData)
            .then(
                response => {
                    console.log(" AddTransaction SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddTransaction FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateTransaction = (id,reqData,from) => {
    const request = (result) => {
        return {type: TransactionConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: TransactionConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: TransactionConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPCrossRequest('/cross/transaction/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateTransaction SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateTransaction FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getStatusList = (reqData) => {
    const request = (result) => {
        return {type: TransactionConstants.GET_STATUS_REQUEST, result}
    };
    const success = (result) => {
        return {type: TransactionConstants.GET_STATUS_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: TransactionConstants.GET_STATUS_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPCrossRequest('/cross/transaction/type/list','GET',requestData)
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

const PlayerTransactionListing = (reqData) => {
    const request = (result) => {
        return {type: TransactionConstants.PLAYER_TRANSACTION_REQUEST, result}
    };
    const success = (result) => {
        return {type: TransactionConstants.PLAYER_TRANSACTION_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: TransactionConstants.PLAYER_TRANSACTION_FAILURE, error}
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
        CommonService.sendHTTPCrossRequest('/cross/player/transaction/listing','POST',requestData)
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

export const TransactionAction = {
    Listing,
    AddTransaction,
    getRecord,
    UpdateTransaction,
    getStatusList,
    PlayerTransactionListing,
};
