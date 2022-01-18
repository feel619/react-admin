import {CategoryConstants} from "./CategoryConstants";

const initialState =[];
export function CategoryReducers(state = initialState, action) {
    console.log(action," CategoryReducers ");
    switch (action.type) {
        case CategoryConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case CategoryConstants.LISTING_SUCCESS:
            return {
                ...state,
                CategoryListing:{
                    success: true,
                    response:action.result
                }
            };
        case CategoryConstants.LISTING_FAILURE:
            return {
                ...state,
                CategoryListing:{
                    success: false,
                    response:action.result
                }
            };
        case CategoryConstants.GET_REQUEST:
            return {
                ...state,
            };
        case CategoryConstants.GET_SUCCESS:
            return {
                ...state,
                CategoryRecord:{
                    success: true,
                    response:action.result
                }
            };
        case CategoryConstants.GET_FAILURE:
            return {
                ...state,
                CategoryRecord:{
                    success: false,
                    response:action.result
                }
            };
        case CategoryConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case CategoryConstants.ADD_SUCCESS:
            return {
                ...state,
                AddCategory:{
                    success: true,
                    response:action.result
                }
            };
        case CategoryConstants.ADD_FAILURE:
            return {
                ...state,
                AddCategory:{
                    success: false,
                    response:action.result
                }
            };
        case CategoryConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case CategoryConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateCategory:{
                    success: true,
                    response:action.result
                }
            };
        case CategoryConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateCategory:{
                    success: false,
                    response:action.result
                }
            };
        case CategoryConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case CategoryConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllCategory:{
                    success: true,
                    response:action.result
                }
            };
        case CategoryConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllCategory:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
