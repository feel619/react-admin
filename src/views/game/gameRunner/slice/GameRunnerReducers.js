import {GameRunnerConstants} from "./GameRunnerConstants";

const initialState =[];
export function GameRunnerReducers(state = initialState, action) {
    console.log(action," GameRunnerReducers ");
    switch (action.type) {
        case GameRunnerConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case GameRunnerConstants.LISTING_SUCCESS:
            return {
                ...state,
                GameRunnerListing:{
                    success: true,
                    response:action.result
                }
            };
        case GameRunnerConstants.LISTING_FAILURE:
            return {
                ...state,
                GameRunnerListing:{
                    success: false,
                    response:action.result
                }
            };
        case GameRunnerConstants.GET_REQUEST:
            return {
                ...state,
            };
        case GameRunnerConstants.GET_SUCCESS:
            return {
                ...state,
                GameRunnerRecord:{
                    success: true,
                    response:action.result
                }
            };
        case GameRunnerConstants.GET_FAILURE:
            return {
                ...state,
                GameRunnerRecord:{
                    success: false,
                    response:action.result
                }
            };
        case GameRunnerConstants.ADD_REQUEST:
            return {
                ...state,
            };
        case GameRunnerConstants.ADD_SUCCESS:
            return {
                ...state,
                AddGameRunner:{
                    success: true,
                    response:action.result
                }
            };
        case GameRunnerConstants.ADD_FAILURE:
            return {
                ...state,
                AddGameRunner:{
                    success: false,
                    response:action.result
                }
            };
        case GameRunnerConstants.UPDATE_REQUEST:
            return {
                ...state,
            };
        case GameRunnerConstants.UPDATE_SUCCESS:
            return {
                ...state,
                UpdateGameRunner:{
                    success: true,
                    response:action.result
                }
            };
        case GameRunnerConstants.UPDATE_FAILURE:
            return {
                ...state,
                UpdateGameRunner:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
