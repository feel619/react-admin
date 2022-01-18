import {CmsBannerConstants} from "./CmsBannerConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";
import {PlayerConstants} from "../../player/slice/PlayerConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: CmsBannerConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsBannerConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsBannerConstants.LISTING_FAILURE, error}
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
        console.log('requestData', requestData);
        CommonService.sendHTTPRequest('/auth/cms_banner/listing', 'POST', requestData)
            .then(
                response => {
                    console.log("Listing  CmsBanner  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing CmsBanner FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: CmsBannerConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsBannerConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsBannerConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData', requestData);
        CommonService.sendHTTPRequest('/auth/cms_banner/' + reqData, 'GET', requestData)
            .then(
                response => {
                    console.log("CmsBannerListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("CmsBannerListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddCmsBanner = (reqData, from) => {
    const request = (result) => {
        return {type: CmsBannerConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsBannerConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsBannerConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPFormRequest('/cms_banner', 'POST', reqData)
            .then(
                response => {
                    console.log(" AddCmsBanner SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddCmsBanner FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateCmsBanner = (id, reqData, from) => {
    const request = (result) => {
        return {type: CmsBannerConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsBannerConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsBannerConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPFormRequest('/cms_banner/' + id, 'PUT', reqData)
            .then(
                response => {
                    console.log(" UpdateCmsBanner SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateCmsBanner FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getTypeList = (reqData) => {
    const request = (result) => {
        return {type: CmsBannerConstants.GET_CMS_BANNER_TYPE_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsBannerConstants.GET_CMS_BANNER_TYPE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsBannerConstants.GET_CMS_BANNER_TYPE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPRequest('/auth/cms_banner/type/list', 'GET', requestData)
            .then(
                response => {
                    console.log("getTypeList SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("getTypeList FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const CmsBannerAction = {
    Listing,
    AddCmsBanner,
    getRecord,
    UpdateCmsBanner,
    getTypeList
};
