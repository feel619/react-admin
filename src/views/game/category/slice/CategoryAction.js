import {CategoryConstants} from "./CategoryConstants";
import {CommonService} from "../../../../redux/_services/CommonService";
import {history} from "../../../../redux/_helpers";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: CategoryConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: CategoryConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CategoryConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/game/category/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Category  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Category FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: CategoryConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: CategoryConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CategoryConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPRequest('/auth/game/category/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("CategoryListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("CategoryListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddCategory = (reqData,from) => {
    const request = (result) => {
        return {type: CategoryConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: CategoryConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CategoryConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/category','POST',reqData)
            .then(
                response => {
                    console.log(" AddCategory SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddCategory FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateCategory = (id,reqData,from) => {
    const request = (result) => {
        return {type: CategoryConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: CategoryConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CategoryConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/category/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateCategory SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateCategory FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

//Get Active game category List For Other Modules
const getListCategory = (reqData) => {
    const request = (result) => {
        return {type: CategoryConstants.GET_ALL_REQUEST, result}
    };
    const success = (result) => {
        return {type: CategoryConstants.GET_ALL_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: CategoryConstants.GET_ALL_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/category/all/config','GET',reqData)
            .then(
                response => {
                    console.log(" getListCategory SUCCESS", response);
                    dispatch(success(response));
                },
                error => {
                    console.log(" getListCategory FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const CategoryAction = {
    Listing,
    getRecord,
    AddCategory,
    UpdateCategory,
    getListCategory
};
