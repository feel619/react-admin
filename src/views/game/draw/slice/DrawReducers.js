import {DrawConstants} from "./DrawConstants";

const initialState =[];
export function DrawReducers(state = initialState, action) {
    console.log(action," DrawReducers ");
    switch (action.type) {
        case DrawConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case DrawConstants.LISTING_SUCCESS:
            return {
                ...state,
                DrawListing:{
                    success: true,
                    response:action.result
                }
            };
        case DrawConstants.LISTING_FAILURE:
            return {
                ...state,
                DrawListing:{
                    success: false,
                    response:action.result
                }
            };
        case DrawConstants.GET_REQUEST:
            return {
                ...state,
            };
        case DrawConstants.GET_SUCCESS:
            return {
                ...state,
                DrawRecord:{
                    success: true,
                    response:action.result
                }
            };
        case DrawConstants.GET_FAILURE:
            return {
                ...state,
                DrawRecord:{
                    success: false,
                    response:action.result
                }
            };
        case DrawConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case DrawConstants.ADD_SUCCESS:
            return {
                ...state,
                AddDraw:{
                    success: true,
                    response:action.result
                }
            };
        case DrawConstants.ADD_FAILURE:
            return {
                ...state,
                AddDraw:{
                    success: false,
                    response:action.result
                }
            };
        case DrawConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case DrawConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateDraw:{
                    success: true,
                    response:action.result
                }
            };
        case DrawConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateDraw:{
                    success: false,
                    response:action.result
                }
            };
        case DrawConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case DrawConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllDraw:{
                    success: true,
                    response:action.result
                }
            };
        case DrawConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllDraw:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
