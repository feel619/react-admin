import {UsersConstants} from "./UsersConstants";

const initialState =[];
export function UsersReducers(state = initialState, action) {
    console.log(action," UsersReducers ");
    switch (action.type) {
        case UsersConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case UsersConstants.LISTING_SUCCESS:
            return {
                ...state,
                UsersListing:{
                    success: true,
                    response:action.result
                }
            };
        case UsersConstants.LISTING_FAILURE:
            return {
                ...state,
                UsersListing:{
                    success: false,
                    response:action.result
                }
            };
        case UsersConstants.PRIVILEGES_LISTING_REQUEST:
            return {
                ...state,
            };
        case UsersConstants.PRIVILEGES_LISTING_SUCCESS:
            return {
                ...state,
                UsersPrivileges:{
                    success: true,
                    response:action.result
                }
            };
        case UsersConstants.PRIVILEGES_LISTING_FAILURE:
            return {
                ...state,
                AddUsersPrivileges:{
                    success: false,
                    response:action.result
                }
            };
        case UsersConstants.ADD_USER_ROLE_REQUEST:
            return {
                ...state,
            };
        case UsersConstants.ADD_USER_ROLE_SUCCESS:
            return {
                ...state,
                AddUsersPrivileges:{
                    success: true,
                    response:action.result
                }
            };
        case UsersConstants.ADD_USER_ROLE_FAILURE:
            return {
                ...state,
                AddUsersPrivileges:{
                    success: false,
                    response:action.result
                }
            };
        case UsersConstants.UPDATE_USER_ROLE_REQUEST:
            return {
                ...state,
            };
        case UsersConstants.UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                UpdateUsersPrivileges:{
                    success: true,
                    response:action.result
                }
            };
        case UsersConstants.UPDATE_USER_ROLE_FAILURE:
            return {
                ...state,
                UpdateUsersPrivileges:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
