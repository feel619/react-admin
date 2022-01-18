import {WithdrawalConstants} from "./WithdrawalConstants";
import {DepositConstants} from "../../deposit/slice/DepositConstants";

const initialState =[];
export function WithdrawalReducers(state = initialState, action) {
    console.log(action," WithdrawalReducers ");
    switch (action.type) {
        case WithdrawalConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case WithdrawalConstants.LISTING_SUCCESS:
            return {
                ...state,
                WithdrawalListing:{
                    success: true,
                    response:action.result
                }
            };
        case WithdrawalConstants.LISTING_FAILURE:
            return {
                ...state,
                WithdrawalListing:{
                    success: false,
                    response:action.result
                }
            };
        case WithdrawalConstants.GET_REQUEST:
            return {
                ...state,
            };
        case WithdrawalConstants.GET_SUCCESS:
            return {
                ...state,
                withdrawalRecord:{
                    success: true,
                    response:action.result
                }
            };
        case WithdrawalConstants.GET_FAILURE:
            return {
                ...state,
                withdrawalRecord:{
                    success: false,
                    response:action.result
                }
            };
        case WithdrawalConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case WithdrawalConstants.ADD_SUCCESS:
            return {
                ...state,
                AddWithdrawal:{
                    success: true,
                    response:action.result
                }
            };
        case WithdrawalConstants.ADD_FAILURE:
            return {
                ...state,
                AddWithdrawal:{
                    success: false,
                    response:action.result
                }
            };
        case WithdrawalConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case WithdrawalConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateWithdrawal:{
                    success: true,
                    response:action.result
                }
            };
        case WithdrawalConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateWithdrawal:{
                    success: false,
                    response:action.result
                }
            };
        case WithdrawalConstants.GET_STATUS_REQUEST:
            return {
                ...state,
            };
        case WithdrawalConstants.GET_STATUS_SUCCESS:
            return {
                ...state,
                statusWithdrawal:{
                    success: true,
                    response:action.result
                }
            };
        case WithdrawalConstants.GET_STATUS_FAILURE:
            return {
                ...state,
                statusWithdrawal:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
