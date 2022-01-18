import {UserRoleConstants} from "./UserRoleConstants";
import {CommonService} from "../../../../redux/_services/CommonService";
import {history} from "../../../../redux/_helpers";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: UserRoleConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: UserRoleConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UserRoleConstants.LISTING_FAILURE, error}
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
        CommonService.sendHTTPRequest('/auth/user_role/listing','POST',requestData)
            .then(
                response => {
                    console.log("Listing  UserRole  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing UserRole FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UserRolePrivilegesListing = (reqData) => {
    const request = (result) => {
        return {type: UserRoleConstants.PRIVILEGES_LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: UserRoleConstants.PRIVILEGES_LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UserRoleConstants.PRIVILEGES_LISTING_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPRequest('/auth/user_role/privileges','GET',requestData)
            .then(
                response => {
                    console.log("UserRolePrivilegesListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("UserRolePrivilegesListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddUserRole = (reqData,from) => {
    const request = (result) => {
        return {type: UserRoleConstants.ADD_USER_ROLE_REQUEST, result}
    };
    const success = (result) => {
        return {type: UserRoleConstants.ADD_USER_ROLE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UserRoleConstants.ADD_USER_ROLE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/user_role/','POST',reqData)
            .then(
                response => {
                    console.log(" AddUserRole SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" AddUserRole FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateUserRole = (id,reqData,from) => {
    const request = (result) => {
        return {type: UserRoleConstants.UPDATE_USER_ROLE_REQUEST, result}
    };
    const success = (result) => {
        return {type: UserRoleConstants.UPDATE_USER_ROLE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UserRoleConstants.UPDATE_USER_ROLE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/user_role/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateUserRole SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateUserRole FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const RoleListing = () => {
    const request = (result) => {
        return {type: UserRoleConstants.ROLE_LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: UserRoleConstants.ROLE_LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: UserRoleConstants.ROLE_LISTING_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPRequest('/auth/user_role','GET',requestData)
            .then(
                response => {
                    console.log("UserRoleListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("UserRoleListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const UserRoleAction = {
    Listing,
    UserRolePrivilegesListing,
    AddUserRole,
    UpdateUserRole,
    RoleListing
};
