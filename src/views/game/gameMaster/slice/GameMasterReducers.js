import {GameMasterConstants} from "./GameMasterConstants";

const initialState =[];
export function GameMasterReducers(state = initialState, action) {
    console.log(action," GameMasterReducers ");
    switch (action.type) {
        case GameMasterConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case GameMasterConstants.LISTING_SUCCESS:
            return {
                ...state,
                GameMasterListing:{
                    success: true,
                    response:action.result
                }
            };
        case GameMasterConstants.LISTING_FAILURE:
            return {
                ...state,
                GameMasterListing:{
                    success: false,
                    response:action.result
                }
            };
        case GameMasterConstants.GET_REQUEST:
            return {
                ...state,
            };
        case GameMasterConstants.GET_SUCCESS:
            return {
                ...state,
                GameMasterRecord:{
                    success: true,
                    response:action.result
                }
            };
        case GameMasterConstants.GET_FAILURE:
            return {
                ...state,
                GameMasterRecord:{
                    success: false,
                    response:action.result
                }
            };
        case GameMasterConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case GameMasterConstants.ADD_SUCCESS:
            return {
                ...state,
                AddGameMaster:{
                    success: true,
                    response:action.result
                }
            };
        case GameMasterConstants.ADD_FAILURE:
            return {
                ...state,
                AddGameMaster:{
                    success: false,
                    response:action.result
                }
            };
        case GameMasterConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case GameMasterConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateGameMaster:{
                    success: true,
                    response:action.result
                }
            };
        case GameMasterConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateGameMaster:{
                    success: false,
                    response:action.result
                }
            };
        case GameMasterConstants.GET_ALL_REQUEST:
            return {
                ...state,
            };
        case GameMasterConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                GetAllGameMaster:{
                    success: true,
                    response:action.result
                }
            };
        case GameMasterConstants.GET_ALL_FAILURE:
            return {
                ...state,
                GetAllGameMaster:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
