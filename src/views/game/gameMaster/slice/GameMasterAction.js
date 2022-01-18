import {GameMasterConstants} from "./GameMasterConstants";
import {CommonService} from "../../../../redux/_services/CommonService";
import {history} from "../../../../redux/_helpers";
import {CmsConstants} from "../../../cms/slice/CmsConstants";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: GameMasterConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: GameMasterConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: GameMasterConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/game/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  GameMaster  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing GameMaster FAILURE ", error);
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
        CommonService.sendHTTPRequest('/auth/game/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("GameMasterListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("GameMasterListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddGameMaster = (reqData,from) => {
    const request = (result) => {
        return {type: GameMasterConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: GameMasterConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: GameMasterConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPFormRequest('/game','POST',reqData)
            .then(
                response => {
                    console.log(" AddGameMaster SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddGameMaster FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateGameMaster = (id,reqData,from) => {
    const request = (result) => {
        return {type: GameMasterConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: GameMasterConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: GameMasterConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPFormRequest('/game/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateGameMaster SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateGameMaster FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

//Get Active game category List For Other Modules
const getListGameMaster = (reqData) => {
    const request = (result) => {
        return {type: GameMasterConstants.GET_ALL_REQUEST, result}
    };
    const success = (result) => {
        return {type: GameMasterConstants.GET_ALL_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: GameMasterConstants.GET_ALL_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/game','GET',reqData)
            .then(
                response => {
                    console.log(" getListGameMaster SUCCESS", response);
                    dispatch(success(response));
                },
                error => {
                    console.log(" getListGameMaster FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const GameMasterAction = {
    Listing,
    getRecord,
    AddGameMaster,
    UpdateGameMaster,
    getListGameMaster
};
