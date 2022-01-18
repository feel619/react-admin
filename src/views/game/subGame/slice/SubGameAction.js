import {SubGameConstants} from "./SubGameConstants";
import {CommonService} from "../../../../redux/_services/CommonService";
import {history} from "../../../../redux/_helpers";
import {CmsConstants} from "../../../cms/slice/CmsConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: SubGameConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: SubGameConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SubGameConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/game/sub/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  SubGame  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing SubGame FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: CmsConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPRequest('/auth/game/sub/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("SubGameListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("SubGameListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddSubGame = (reqData,from) => {
    const request = (result) => {
        return {type: SubGameConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: SubGameConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SubGameConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/sub','POST',reqData)
            .then(
                response => {
                    console.log(" AddSubGame SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddSubGame FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateSubGame = (id,reqData,from) => {
    const request = (result) => {
        return {type: SubGameConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: SubGameConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SubGameConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/sub/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateSubGame SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateSubGame FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getListSubGame = (reqData) => {
    const request = (result) => {
        return {type: SubGameConstants.GET_ALL_REQUEST, result}
    };
    const success = (result) => {
        return {type: SubGameConstants.GET_ALL_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SubGameConstants.GET_ALL_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/sub/all/config','GET',reqData)
            .then(
                response => {
                    console.log(" getListSubGame SUCCESS", response);
                    dispatch(success(response));
                },
                error => {
                    console.log(" getListSubGame FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const SubGameAction = {
    Listing,
    getRecord,
    AddSubGame,
    UpdateSubGame,
    getListSubGame
};
