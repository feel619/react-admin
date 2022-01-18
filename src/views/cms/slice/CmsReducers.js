import {CmsConstants} from "./CmsConstants";

const initialState =[];
export function CmsReducers(state = initialState, action) {
    console.log(action," CmsReducers ");
    switch (action.type) {
        case CmsConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case CmsConstants.LISTING_SUCCESS:
            return {
                ...state,
                CmsListing:{
                    success: true,
                    response:action.result
                }
            };
        case CmsConstants.LISTING_FAILURE:
            return {
                ...state,
                CmsListing:{
                    success: false,
                    response:action.result
                }
            };
        case CmsConstants.GET_REQUEST:
            return {
                ...state,
            };
        case CmsConstants.GET_SUCCESS:
            return {
                ...state,
                cmsRecord:{
                    success: true,
                    response:action.result
                }
            };
        case CmsConstants.GET_FAILURE:
            return {
                ...state,
                cmsRecord:{
                    success: false,
                    response:action.result
                }
            };
        case CmsConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case CmsConstants.ADD_SUCCESS:
            return {
                ...state,
                AddCms:{
                    success: true,
                    response:action.result
                }
            };
        case CmsConstants.ADD_FAILURE:
            return {
                ...state,
                AddCms:{
                    success: false,
                    response:action.result
                }
            };
        case CmsConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case CmsConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateCms:{
                    success: true,
                    response:action.result
                }
            };
        case CmsConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateCms:{
                    success: false,
                    response:action.result
                }
            };
        case CmsConstants.GET_CMS_LIST_REQUEST:
            return {
                ...state,
            };
        case CmsConstants.GET_CMS_LIST_SUCCESS:
            return {
                ...state,
                cmsListRecord:{
                    success: true,
                    response:action.result
                }
            };
        case CmsConstants.GET_CMS_LIST_FAILURE:
            return {
                ...state,
                cmsListRecord:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
