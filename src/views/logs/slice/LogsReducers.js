import {LogsConstants} from "./LogsConstants";

const initialState =[];
export function LogsReducers(state = initialState, action) {
    console.log(action," LogsReducers ");
    switch (action.type) {
        case LogsConstants.LISTING_REQUEST:
            return {
                ...state,
            };
        case LogsConstants.LISTING_SUCCESS:
            return {
                ...state,
                LogsListing:{
                    success: true,
                    response:action.result
                }
            };
        case LogsConstants.LISTING_FAILURE:
            return {
                ...state,
                LogsListing:{
                    success: false,
                    response:action.result
                }
            };
        case LogsConstants.LOGS_SHOW_MODAL:
            return {
                ...state,
                LogsModalDetails: {
                    modalProps: action.modalProps,
                    modalType: action.modalType,
                    modalId: action.modalId,
                    type: action.type,
                    status:true
                }
            };
        case LogsConstants.LOGS_HIDE_MODAL:
            return {
                ...state,
                LogsModalDetails: {
                    type: action.type,
                    status:false
                }
            };
        default:
            return state
    }
}
