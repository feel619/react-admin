import {SubGameConstants} from "./SubGameConstants";

const initialState =[];
export function SubGameReducers(state = initialState, action) {
    console.log(action," SubGameReducers ");
    switch (action.type) {
        case SubGameConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case SubGameConstants.LISTING_SUCCESS:
            return {
                ...state,
                SubGameListing:{
                    success: true,
                    response:action.result
                }
            };
        case SubGameConstants.LISTING_FAILURE:
            return {
                ...state,
                SubGameListing:{
                    success: false,
                    response:action.result
                }
            };
        case SubGameConstants.GET_REQUEST:
            return {
                ...state,
            };
        case SubGameConstants.GET_SUCCESS:
            return {
                ...state,
                SubGameRecord:{
                    success: true,
                    response:action.result
                }
            };
        case SubGameConstants.GET_FAILURE:
            return {
                ...state,
                SubGameRecord:{
                    success: false,
                    response:action.result
                }
            };
        case SubGameConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case SubGameConstants.ADD_SUCCESS:
            return {
                ...state,
                AddSubGame:{
                    success: true,
                    response:action.result
                }
            };
        case SubGameConstants.ADD_FAILURE:
            return {
                ...state,
                AddSubGame:{
                    success: false,
                    response:action.result
                }
            };
        case SubGameConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case SubGameConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateSubGame:{
                    success: true,
                    response:action.result
                }
            };
        case SubGameConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateSubGame:{
                    success: false,
                    response:action.result
                }
            };
        case SubGameConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case SubGameConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllSubGame:{
                    success: true,
                    response:action.result
                }
            };
        case SubGameConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllSubGame:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
