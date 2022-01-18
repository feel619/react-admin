import {EmailTemplateConstants} from "./EmailTemplateConstants";

const initialState =[];
export function EmailTemplateReducers(state = initialState, action) {
    console.log(action," EmailTemplateReducers ");
    switch (action.type) {
        case EmailTemplateConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case EmailTemplateConstants.LISTING_SUCCESS:
            return {
                ...state,
                EmailTemplateListing:{
                    success: true,
                    response:action.result
                }
            };
        case EmailTemplateConstants.LISTING_FAILURE:
            return {
                ...state,
                EmailTemplateListing:{
                    success: false,
                    response:action.result
                }
            };
        case EmailTemplateConstants.GET_REQUEST:
            return {
                ...state,
            };
        case EmailTemplateConstants.GET_SUCCESS:
            return {
                ...state,
                EmailTemplateRecord:{
                    success: true,
                    response:action.result
                }
            };
        case EmailTemplateConstants.GET_FAILURE:
            return {
                ...state,
                EmailTemplateRecord:{
                    success: false,
                    response:action.result
                }
            };
        case EmailTemplateConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case EmailTemplateConstants.ADD_SUCCESS:
            return {
                ...state,
                AddEmailTemplate:{
                    success: true,
                    response:action.result
                }
            };
        case EmailTemplateConstants.ADD_FAILURE:
            return {
                ...state,
                AddEmailTemplate:{
                    success: false,
                    response:action.result
                }
            };
        case EmailTemplateConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case EmailTemplateConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateEmailTemplate:{
                    success: true,
                    response:action.result
                }
            };
        case EmailTemplateConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateEmailTemplate:{
                    success: false,
                    response:action.result
                }
            };
        case EmailTemplateConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case EmailTemplateConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllEmailTemplate:{
                    success: true,
                    response:action.result
                }
            };
        case EmailTemplateConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllEmailTemplate:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
