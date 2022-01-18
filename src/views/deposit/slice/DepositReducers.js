import {DepositConstants} from "./DepositConstants";

const initialState =[];
export function DepositReducers(state = initialState, action) {
    console.log(action," DepositReducers ");
    switch (action.type) {
        case DepositConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case DepositConstants.LISTING_SUCCESS:
            return {
                ...state,
                DepositListing:{
                    success: true,
                    response:action.result
                }
            };
        case DepositConstants.LISTING_FAILURE:
            return {
                ...state,
                DepositListing:{
                    success: false,
                    response:action.result
                }
            };
        case DepositConstants.GET_REQUEST:
            return {
                ...state,
            };
        case DepositConstants.GET_SUCCESS:
            return {
                ...state,
                depositRecord:{
                    success: true,
                    response:action.result
                }
            };
        case DepositConstants.GET_FAILURE:
            return {
                ...state,
                depositRecord:{
                    success: false,
                    response:action.result
                }
            };
        case DepositConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case DepositConstants.ADD_SUCCESS:
            return {
                ...state,
                AddDeposit:{
                    success: true,
                    response:action.result
                }
            };
        case DepositConstants.ADD_FAILURE:
            return {
                ...state,
                AddDeposit:{
                    success: false,
                    response:action.result
                }
            };
        case DepositConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case DepositConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateDeposit:{
                    success: true,
                    response:action.result
                }
            };
        case DepositConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateDeposit:{
                    success: false,
                    response:action.result
                }
            };
        case DepositConstants.GET_STATUS_REQUEST:
            return {
                ...state,
            };
        case DepositConstants.GET_STATUS_SUCCESS:
            return {
                ...state,
                statusDeposit:{
                    success: true,
                    response:action.result
                }
            };
        case DepositConstants.GET_STATUS_FAILURE:
            return {
                ...state,
                statusDeposit:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
