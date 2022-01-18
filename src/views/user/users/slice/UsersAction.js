import 'react-toastify/dist/ReactToastify.css';
import {UsersConstants} from "./UsersConstants";
import {CommonService} from "../../../../redux/_services/CommonService";
import {history} from "../../../../redux/_helpers";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: UsersConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: UsersConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UsersConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/user/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  Users  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing Users FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddUsers = (reqData,from) => {
    const request = (result) => {
        return {type: UsersConstants.ADD_USERS_REQUEST, result}
    };
    const success = (result) => {
        return {type: UsersConstants.ADD_USERS_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UsersConstants.ADD_USERS_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/user/','POST',reqData)
            .then(
                response => {
                    console.log(" AddUsers SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddUsers FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateUsers = (id,reqData,from) => {
    const request = (result) => {
        return {type: UsersConstants.UPDATE_USERS_REQUEST, result}
    };
    const success = (result) => {
        return {type: UsersConstants.UPDATE_USERS_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UsersConstants.UPDATE_USERS_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/user/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateUsers SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateUsers FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const UsersAction = {
    Listing,
    AddUsers,
    UpdateUsers
};
