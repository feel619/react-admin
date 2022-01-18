import {UserRoleConstants} from "./UserRoleConstants";

const initialState =[];
export function UserRoleReducers(state = initialState, action) {
    console.log(action," UserRoleReducers ");
    switch (action.type) {
        case UserRoleConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case UserRoleConstants.LISTING_SUCCESS:
            return {
                ...state,
                UserRoleListing:{
                    success: true,
                    response:action.result
                }
            };
        case UserRoleConstants.LISTING_FAILURE:
            return {
                ...state,
                UserRoleListing:{
                    success: false,
                    response:action.result
                }
            };
        case UserRoleConstants.ROLE_LISTING_REQUEST:
            return {
                ...state,
            };
        case UserRoleConstants.ROLE_LISTING_SUCCESS:
            return {
                ...state,
                RoleListing:{
                    success: true,
                    response:action.result
                }
            };
        case UserRoleConstants.ROLE_LISTING_FAILURE:
            return {
                ...state,
                RoleListing:{
                    success: false,
                    response:action.result
                }
            };
        case UserRoleConstants.PRIVILEGES_LISTING_REQUEST:
            return {
                ...state,
            };
        case UserRoleConstants.PRIVILEGES_LISTING_SUCCESS:
            return {
                ...state,
                UserRolePrivileges:{
                    success: true,
                    response:action.result
                }
            };
        case UserRoleConstants.PRIVILEGES_LISTING_FAILURE:
            return {
                ...state,
                AddUserRolePrivileges:{
                    success: false,
                    response:action.result
                }
            };
        case UserRoleConstants.ADD_USER_ROLE_REQUEST:
            return {
                ...state,
            };
        case UserRoleConstants.ADD_USER_ROLE_SUCCESS:
            return {
                ...state,
                AddUserRolePrivileges:{
                    success: true,
                    response:action.result
                }
            };
        case UserRoleConstants.ADD_USER_ROLE_FAILURE:
            return {
                ...state,
                AddUserRolePrivileges:{
                    success: false,
                    response:action.result
                }
            };
        case UserRoleConstants.UPDATE_USER_ROLE_REQUEST:
            return {
                ...state,
            };
        case UserRoleConstants.UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                UpdateUserRolePrivileges:{
                    success: true,
                    response:action.result
                }
            };
        case UserRoleConstants.UPDATE_USER_ROLE_FAILURE:
            return {
                ...state,
                UpdateUserRolePrivileges:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
