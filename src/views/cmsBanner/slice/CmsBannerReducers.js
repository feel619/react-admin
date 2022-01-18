import {CmsBannerConstants} from "./CmsBannerConstants";

const initialState =[];
export function CmsBannerReducers(state = initialState, action) {
    console.log(action," CmsBannerReducers ");
    switch (action.type) {
        case CmsBannerConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case CmsBannerConstants.LISTING_SUCCESS:
            return {
                ...state,
                CmsBannerListing:{
                    success: true,
                    response:action.result
                }
            };
        case CmsBannerConstants.LISTING_FAILURE:
            return {
                ...state,
                CmsBannerListing:{
                    success: false,
                    response:action.result
                }
            };
        case CmsBannerConstants.GET_REQUEST:
            return {
                ...state,
            };
        case CmsBannerConstants.GET_SUCCESS:
            return {
                ...state,
                cmsBannerRecord:{
                    success: true,
                    response:action.result
                }
            };
        case CmsBannerConstants.GET_FAILURE:
            return {
                ...state,
                cmsBannerRecord:{
                    success: false,
                    response:action.result
                }
            };
        case CmsBannerConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case CmsBannerConstants.ADD_SUCCESS:
            return {
                ...state,
                AddCmsBanner:{
                    success: true,
                    response:action.result
                }
            };
        case CmsBannerConstants.ADD_FAILURE:
            return {
                ...state,
                AddCmsBanner:{
                    success: false,
                    response:action.result
                }
            };
        case CmsBannerConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case CmsBannerConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateCmsBanner:{
                    success: true,
                    response:action.result
                }
            };
        case CmsBannerConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateCmsBanner:{
                    success: false,
                    response:action.result
                }
            };
        case CmsBannerConstants.GET_CMS_BANNER_TYPE_REQUEST:
            return {
                ...state,
            };
        case CmsBannerConstants.GET_CMS_BANNER_TYPE_SUCCESS:
            return {
                ...state,
                cmsBannerTypeRecord:{
                    success: true,
                    response:action.result
                }
            };
        case CmsBannerConstants.GET_CMS_BANNER_TYPE_FAILURE:
            return {
                ...state,
                cmsBannerTypeRecord:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
