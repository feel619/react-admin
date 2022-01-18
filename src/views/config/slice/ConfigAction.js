import {ConfigConstants} from "./ConfigConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: ConfigConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: ConfigConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: ConfigConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/game/config/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Config  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Config FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: ConfigConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: ConfigConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: ConfigConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPRequest('/auth/game/config/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("ConfigListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("ConfigListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddConfig = (reqData,from) => {
    const request = (result) => {
        return {type: ConfigConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: ConfigConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: ConfigConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        console.log(reqData);
        CommonService.sendHTTPFormRequest('/config/company','POST',reqData)
            .then(
                response => {
                    console.log(" AddConfig SUCCESS", response);
                    dispatch(success(response));
                    history.goBack();
                },
                error => {
                    console.log(" AddConfig FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateConfig = (id,reqData,from) => {
    const request = (result) => {
        return {type: ConfigConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: ConfigConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: ConfigConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPFormRequest('/auth/game/config/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateConfig SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateConfig FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

//Get Active game config List For Other Modules
const getListConfig = (reqData) => {
    const request = (result) => {
        return {type: ConfigConstants.GET_ALL_REQUEST, result}
    };
    const success = (result) => {
        return {type: ConfigConstants.GET_ALL_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: ConfigConstants.GET_ALL_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/config/company','GET',reqData)
            .then(
                response => {
                    console.log(" getListConfig SUCCESS", response);
                    dispatch(success(response));
                },
                error => {
                    console.log(" getListConfig FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const ConfigAction = {
    Listing,
    getRecord,
    AddConfig,
    UpdateConfig,
    getListConfig
};
