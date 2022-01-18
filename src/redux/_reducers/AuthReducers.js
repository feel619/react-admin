import {AuthConstants} from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
//const initialState = user ? {success: true, user} : {};
const initialState = {
    user: user ? {success: true, response:user} : {}
};

export function AuthReducers(state = initialState, action) {
    console.log(action, " AuthReducersCall  ",state)
    switch (action.type) {
        case AuthConstants.LOGIN_REQUEST:
            return {
                ...state,
            };
        case AuthConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    success: true,
                    response: action.user
                }
            };
        case AuthConstants.LOGIN_FAILURE:
            return {
                ...state,
                user: {
                    success: false,
                    response: action.user
                }
            };
        case AuthConstants.WEB_STATIC_REQUEST:
            return {
                ...state,
            };
        case AuthConstants.WEB_STATIC_SUCCESS:
            return {
                ...state,
                static: {
                    success: true,
                    response: action.result
                }
            };
        case AuthConstants.WEB_STATIC_FAILURE:
            return {
                ...state,
                static: {
                    success: false,
                    response: action.result
                }
            };
        case AuthConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
