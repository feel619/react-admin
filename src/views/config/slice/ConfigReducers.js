import {ConfigConstants} from "./ConfigConstants";

const initialState =[];
export function ConfigReducers(state = initialState, action) {
    console.log(action," ConfigReducers ");
    switch (action.type) {
        case ConfigConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case ConfigConstants.LISTING_SUCCESS:
            return {
                ...state,
                ConfigListing:{
                    success: true,
                    response:action.result
                }
            };
        case ConfigConstants.LISTING_FAILURE:
            return {
                ...state,
                ConfigListing:{
                    success: false,
                    response:action.result
                }
            };
        case ConfigConstants.GET_REQUEST:
            return {
                ...state,
            };
        case ConfigConstants.GET_SUCCESS:
            return {
                ...state,
                ConfigRecord:{
                    success: true,
                    response:action.result
                }
            };
        case ConfigConstants.GET_FAILURE:
            return {
                ...state,
                ConfigRecord:{
                    success: false,
                    response:action.result
                }
            };
        case ConfigConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case ConfigConstants.ADD_SUCCESS:
            return {
                ...state,
                AddConfig:{
                    success: true,
                    response:action.result
                }
            };
        case ConfigConstants.ADD_FAILURE:
            return {
                ...state,
                AddConfig:{
                    success: false,
                    response:action.result
                }
            };
        case ConfigConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case ConfigConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateConfig:{
                    success: true,
                    response:action.result
                }
            };
        case ConfigConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateConfig:{
                    success: false,
                    response:action.result
                }
            };
        case ConfigConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case ConfigConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllConfig:{
                    success: true,
                    response:action.result
                }
            };
        case ConfigConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllConfig:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
