import {TransactionConstants} from "./TransactionConstants";
import {WithdrawalConstants} from "../../withdrawal/slice/WithdrawalConstants";

const initialState =[];
export function TransactionReducers(state = initialState, action) {
    console.log(action," TransactionReducers ");
    switch (action.type) {
        case TransactionConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case TransactionConstants.LISTING_SUCCESS:
            return {
                ...state,
                TransactionListing:{
                    success: true,
                    response:action.result
                }
            };
        case TransactionConstants.LISTING_FAILURE:
            return {
                ...state,
                TransactionListing:{
                    success: false,
                    response:action.result
                }
            };
        case TransactionConstants.GET_REQUEST:
            return {
                ...state,
            };
        case TransactionConstants.GET_SUCCESS:
            return {
                ...state,
                playerRecord:{
                    success: true,
                    response:action.result
                }
            };
        case TransactionConstants.GET_FAILURE:
            return {
                ...state,
                playerRecord:{
                    success: false,
                    response:action.result
                }
            };
        case TransactionConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case TransactionConstants.ADD_SUCCESS:
            return {
                ...state,
                AddTransaction:{
                    success: true,
                    response:action.result
                }
            };
        case TransactionConstants.ADD_FAILURE:
            return {
                ...state,
                AddTransaction:{
                    success: false,
                    response:action.result
                }
            };
        case TransactionConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case TransactionConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateTransaction:{
                    success: true,
                    response:action.result
                }
            };
        case TransactionConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateTransaction:{
                    success: false,
                    response:action.result
                }
            };
        case TransactionConstants.PLAYER_TRANSACTION_REQUEST:
            return {
                ...state,
            };
        case TransactionConstants.PLAYER_TRANSACTION_SUCCESS:
            return {
                ...state,
                PlayerTransactionListing:{
                    success: true,
                    response:action.result
                }
            };
        case TransactionConstants.PLAYER_TRANSACTION_FAILURE:
            return {
                ...state,
                PlayerTransactionListing:{
                    success: false,
                    response:action.result
                }
            };
        case TransactionConstants.GET_STATUS_REQUEST:
            return {
                ...state,
            };
        case TransactionConstants.GET_STATUS_SUCCESS:
            return {
                ...state,
                statusTransaction:{
                    success: true,
                    response:action.result
                }
            };
        case TransactionConstants.GET_STATUS_FAILURE:
            return {
                ...state,
                statusTransaction:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
