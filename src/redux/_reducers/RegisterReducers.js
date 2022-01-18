import { AuthConstants } from '../_constants';

export function RegisterReducers(state = {}, action) {
    switch (action.type) {
        case AuthConstants.REGISTER_REQUEST:
            return { registering: true };
        case AuthConstants.REGISTER_SUCCESS:
            return {};
        case AuthConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}