import {GameRunnerConstants} from "./GameRunnerConstants";
import {CommonService} from "../../../../redux/_services/CommonService";
import {history} from "../../../../redux/_helpers";
import {CmsConstants} from "../../../cms/slice/CmsConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: GameRunnerConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: GameRunnerConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: GameRunnerConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/game/runner/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  GameRunner  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing GameRunner FAILURE ", error);
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
                    console.log("CmsPrivilegesListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("CmsPrivilegesListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddGameRunner = (reqData,from) => {
    const request = (result) => {
        return {type: GameRunnerConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: GameRunnerConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: GameRunnerConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/runner','POST',reqData)
            .then(
                response => {
                    console.log(" AddGameRunner SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddGameRunner FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateGameRunner = (id,reqData,from) => {
    const request = (result) => {
        return {type: GameRunnerConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: GameRunnerConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: GameRunnerConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game/runner/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateGameRunner SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateGameRunner FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const GameRunnerAction = {
    Listing,
    getRecord,
    AddGameRunner,
    UpdateGameRunner,
};
