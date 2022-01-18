import {LogsConstants} from "./LogsConstants";
import {CommonService} from "../../../redux/_services/CommonService";

const Listing = (modules, reqData) => {
    const request = (result) => {
        return {type: LogsConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: LogsConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: LogsConstants.LISTING_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {
            "id": reqData.id,
            "draw": 1,
            "columns": [],
            "start": reqData.start,
            "length": reqData.total,
            "search": {
                "value": "",
                "regex": false
            },
            "order": [
                reqData.order
            ],
            "searchList": reqData.searchList
        };
        console.log('requestData', requestData);
        if (modules === 'player' || modules === 'deposit') {
            CommonService.sendHTTPCrossRequest('/cross/logs/' + modules, 'POST', requestData)
                .then(
                    response => {
                        dispatch(success(response));
                    },
                    error => {
                        dispatch(failure(error.toString()));
                    }
                );
        } else {
            CommonService.sendHTTPRequest('/auth/logs/' + modules, 'POST', requestData)
                .then(
                    response => {
                        dispatch(success(response));
                    },
                    error => {
                        dispatch(failure(error.toString()));
                    }
                );
        }

    };
};

const showModal = ({modalProps, modalType, modalId}) => {
    return dispatch => {
        console.log(dispatch, " dispatch action ");
        dispatch({
            type: LogsConstants.LOGS_SHOW_MODAL,
            modalProps,
            modalType,
            modalId
        });
    }
};

const hideModal = () => {
    console.log("hideModal");
    return dispatch => {
        dispatch({
            type: LogsConstants.LOGS_HIDE_MODAL
        })
    }
};

export const LogsAction = {
    Listing,
    showModal,
    hideModal
};
