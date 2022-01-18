import {BetConstants} from "./BetConstants";
import {DepositConstants} from "../../deposit/slice/DepositConstants";

const initialState =[];
export function BetReducers(state = initialState, action) {
    console.log(action," BetReducers ");
    switch (action.type) {
        case BetConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case BetConstants.LISTING_SUCCESS:
            return {
                ...state,
                BetListing:{
                    success: true,
                    response:action.result
                }
            };
        case BetConstants.LISTING_FAILURE:
            return {
                ...state,
                BetListing:{
                    success: false,
                    response:action.result
                }
            };
        case BetConstants.GET_REQUEST:
            return {
                ...state,
            };
        case BetConstants.GET_SUCCESS:
            return {
                ...state,
                betRecord:{
                    success: true,
                    response:action.result
                }
            };
        case BetConstants.GET_FAILURE:
            return {
                ...state,
                betRecord:{
                    success: false,
                    response:action.result
                }
            };
        case BetConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case BetConstants.ADD_SUCCESS:
            return {
                ...state,
                AddBet:{
                    success: true,
                    response:action.result
                }
            };
        case BetConstants.ADD_FAILURE:
            return {
                ...state,
                AddBet:{
                    success: false,
                    response:action.result
                }
            };
        case BetConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case BetConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateBet:{
                    success: true,
                    response:action.result
                }
            };
        case BetConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateBet:{
                    success: false,
                    response:action.result
                }
            };
        case BetConstants.GET_STATUS_REQUEST:
            return {
                ...state,
            };
        case BetConstants.GET_STATUS_SUCCESS:
            return {
                ...state,
                statusBet:{
                    success: true,
                    response:action.result
                }
            };
        case BetConstants.GET_STATUS_FAILURE:
            return {
                ...state,
                statusBet:{
                    success: false,
                    response:action.result
                }
            };
        case BetConstants.PLAYER_BET_REQUEST:
            return {
                ...state,
            };
        case BetConstants.PLAYER_BET_SUCCESS:
            return {
                ...state,
                PlayerBetListing:{
                    success: true,
                    response:action.result
                }
            };
        case BetConstants.PLAYER_BET_FAILURE:
            return {
                ...state,
                PlayerBetListing:{
                    success: false,
                    response:action.result
                }
            };

        default:
            return state
    }
}
