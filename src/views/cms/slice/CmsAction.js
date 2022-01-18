import {CmsConstants} from "./CmsConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";
import {CmsBannerConstants} from "../../cmsBanner/slice/CmsBannerConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: CmsConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/cms/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Cms  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Cms FAILURE ", error);
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
        CommonService.sendHTTPRequest('/auth/cms/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("CmsListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("CmsListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddCms = (reqData,from) => {
    const request = (result) => {
        return {type: CmsConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/cms/','POST',reqData)
            .then(
                response => {
                    console.log(" AddCms SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddCms FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateCms = (id,reqData,from) => {
    const request = (result) => {
        return {type: CmsConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/cms/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateCms SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateCms FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getCmsList = (reqData) => {
    const request = (result) => {
        return {type: CmsConstants.GET_CMS_LIST_REQUEST, result}
    };
    const success = (result) => {
        return {type: CmsConstants.GET_CMS_LIST_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CmsConstants.GET_CMS_LIST_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPRequest('/auth/cms/', 'GET', requestData)
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

export const CmsAction = {
    Listing,
    AddCms,
    getRecord,
    UpdateCms,
    getCmsList
};
