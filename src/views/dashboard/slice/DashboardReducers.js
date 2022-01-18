import {DashboardConstants} from "./DashboardConstants";

const initialState =[];
export function DashboardReducers(state = initialState, action) {
    console.log(action," DashboardReducers ");
    switch (action.type) {
         case DashboardConstants.GET_REQUEST:
            return {
                ...state,
            };
        case DashboardConstants.GET_SUCCESS:
            return {
                ...state,
                dashboardRecord:{
                    success: true,
                    response:action.result
                }
            };
        case DashboardConstants.GET_FAILURE:
            return {
                ...state,
                dashboardRecord:{
                    success: false,
                    response:action.result
                }
            };
        case DashboardConstants.GET_GAME_ANALYTICS_REQUEST:
            return {
                ...state,
            };
        case DashboardConstants.GET_GAME_ANALYTICS_SUCCESS:
            return {
                ...state,
                dashboardGameAnalyticsRecord:{
                    success: true,
                    response:action.result
                }
            };
        case DashboardConstants.GET_GAME_ANALYTICS_FAILURE:
            return {
                ...state,
                dashboardGameAnalyticsRecord:{
                    success: false,
                    response:action.result
                }
            };
        default:
            return state
    }
}
