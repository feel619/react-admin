import {SmsTemplateConstants} from "./SmsTemplateConstants";

const initialState =[];
export function SmsTemplateReducers(state = initialState, action) {
    console.log(action," SmsTemplateReducers ");
    switch (action.type) {
        case SmsTemplateConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case SmsTemplateConstants.LISTING_SUCCESS:
            return {
                ...state,
                SmsTemplateListing:{
                    success: true,
                    response:action.result
                }
            };
        case SmsTemplateConstants.LISTING_FAILURE:
            return {
                ...state,
                SmsTemplateListing:{
                    success: false,
                    response:action.result
                }
            };
        case SmsTemplateConstants.GET_REQUEST:
            return {
                ...state,
            };
        case SmsTemplateConstants.GET_SUCCESS:
            return {
                ...state,
                SmsTemplateRecord:{
                    success: true,
                    response:action.result
                }
            };
        case SmsTemplateConstants.GET_FAILURE:
            return {
                ...state,
                SmsTemplateRecord:{
                    success: false,
                    response:action.result
                }
            };
        case SmsTemplateConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case SmsTemplateConstants.ADD_SUCCESS:
            return {
                ...state,
                AddSmsTemplate:{
                    success: true,
                    response:action.result
                }
            };
        case SmsTemplateConstants.ADD_FAILURE:
            return {
                ...state,
                AddSmsTemplate:{
                    success: false,
                    response:action.result
                }
            };
        case SmsTemplateConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case SmsTemplateConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateSmsTemplate:{
                    success: true,
                    response:action.result
                }
            };
        case SmsTemplateConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateSmsTemplate:{
                    success: false,
                    response:action.result
                }
            };
        case SmsTemplateConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case SmsTemplateConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllSmsTemplate:{
                    success: true,
                    response:action.result
                }
            };
        case SmsTemplateConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllSmsTemplate:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
