import {PlayerConstants} from "./PlayerConstants";

const initialState =[];
export function PlayerReducers(state = initialState, action) {
    console.log(action," PlayerReducers ");
    switch (action.type) {
        case PlayerConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.LISTING_SUCCESS:
            return {
                ...state,
                PlayerListing:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.LISTING_FAILURE:
            return {
                ...state,
                PlayerListing:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.GET_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.GET_SUCCESS:
            return {
                ...state,
                playerRecord:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.GET_FAILURE:
            return {
                ...state,
                playerRecord:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.ADD_SUCCESS:
            return {
                ...state,
                AddPlayer:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.ADD_FAILURE:
            return {
                ...state,
                AddPlayer:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdatePlayer:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdatePlayer:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllPlayer:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllPlayer:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.PLAYER_DEPOSIT_LISTING_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.PLAYER_DEPOSIT_LISTING_SUCCESS:
            return {
                ...state,
                PlayerDepositListing:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.PLAYER_DEPOSIT_LISTING_FAILURE:
            return {
                ...state,
                PlayerDepositListing:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.PLAYER_WITHDRAWAL_LISTING_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.PLAYER_WITHDRAWAL_LISTING_SUCCESS:
            return {
                ...state,
                PlayerWithdrawalListing:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.PLAYER_WITHDRAWAL_LISTING_FAILURE:
            return {
                ...state,
                PlayerWithdrawalListing:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.PLAYER_LOGIN_LISTING_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.PLAYER_LOGIN_LISTING_SUCCESS:
            return {
                ...state,
                PlayerLoginHistoryListing:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.PLAYER_LOGIN_LISTING_FAILURE:
            return {
                ...state,
                PlayerLoginHistoryListing:{
                    success: false,
                    response:action.result
                }
            };
        case PlayerConstants.GET_PLAYER_BANK_REQUEST:
            return {
                ...state,
            };
        case PlayerConstants.GET_PLAYER_BANK_SUCCESS:
            return {
                ...state,
                PlayerBankListing:{
                    success: true,
                    response:action.result
                }
            };
        case PlayerConstants.GET_PLAYER_BANK_FAILURE:
            return {
                ...state,
                PlayerBankListing:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
