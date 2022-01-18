import {DashboardConstants} from "./DashboardConstants";
import {CommonService} from "../../../redux/_services/CommonService";

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: DashboardConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: DashboardConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DashboardConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPCrossRequest('/cross/analytics?year='+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("DashboardListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("DashboardListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getGameAnalyticsRecord = (reqData) => {
    const request = (result) => {
        return {type: DashboardConstants.GET_GAME_ANALYTICS_REQUEST, result}
    };
    const success = (result) => {
        return {type: DashboardConstants.GET_GAME_ANALYTICS_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: DashboardConstants.GET_GAME_ANALYTICS_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        CommonService.sendHTTPRequest('/auth/game_analytics','GET',requestData)
            .then(
                response => {
                    console.log("getGameAnalyticsRecord SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("getGameAnalyticsRecord FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

export const DashboardAction = {
    getRecord,
    getGameAnalyticsRecord
};
