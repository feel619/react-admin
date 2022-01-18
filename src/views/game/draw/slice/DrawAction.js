import {DrawConstants} from "./DrawConstants";
import {CommonService} from "../../../../redux/_services/CommonService";
import {history} from "../../../../redux/_helpers";
import {CmsConstants} from "../../../cms/slice/CmsConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: DrawConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: DrawConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DrawConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/game/draw/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Draw  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Draw FAILURE ", error);
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
        CommonService.sendHTTPRequest('/auth/game/draw/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("DrawListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("DrawListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddDraw = (reqData,from) => {
    const request = (result) => {
        return {type: DrawConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: DrawConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DrawConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/draw','POST',reqData)
            .then(
                response => {
                    console.log(" AddDraw SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddDraw FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateDraw = (id,reqData,from) => {
    const request = (result) => {
        return {type: DrawConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: DrawConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DrawConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/draw'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateDraw SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateDraw FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getListDraw = (reqData) => {
    const request = (result) => {
        return {type: DrawConstants.GET_ALL_REQUEST, result}
    };
    const success = (result) => {
        return {type: DrawConstants.GET_ALL_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DrawConstants.GET_ALL_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/draw/all/config','GET',reqData)
            .then(
                response => {
                    console.log(" getListDraw SUCCESS", response);
                    dispatch(success(response));
                },
                error => {
                    console.log(" getListDraw FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const DrawAction = {
    Listing,
    getRecord,
    AddDraw,
    UpdateDraw,
    getListDraw
};
