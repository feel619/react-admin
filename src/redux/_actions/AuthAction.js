import { AuthConstants } from '../_constants';
import { userService } from '../_services';
//import { alertActions } from './';
import { history } from '../_helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from "../../routes";

const login = (username, password, from) => {
    const request = (user) =>{ return { type: AuthConstants.LOGIN_REQUEST, user } }
    const success = (user) => { return { type: AuthConstants.LOGIN_SUCCESS, user } }
    const failure = (error) => { return { type: AuthConstants.LOGIN_FAILURE, error } }
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    //if(user?.privileges.split(',').indexOf('1') > -1){
                        history.push(from);
                    /*} else {
                        routes.map((prop, key) => {
                            let moduleStatus = prop?.moduleId.every(r=>{
                                console.log(prop?.moduleId, " Login_user ", user?.privileges.split(',').indexOf(r.toString()) > -1, "user", prop.path);
                                if(user?.privileges.split(',').indexOf(r.toString()) > -1 && prop.path !== "/logs"){
                                   history.push(prop.layout + prop.path);
                                   return;
                                }
                            });
                        });
                    }*/
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error("Wrong username and password!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
};

const logout = () => {
    userService.logout();
    history.push(`/auth/login`);
    return { type: AuthConstants.LOGOUT };
};

const register = (user) => {
    const request = (user) => { return { type: AuthConstants.REGISTER_REQUEST, user } }
    const success = (user) => { return { type: AuthConstants.REGISTER_SUCCESS, user } }
    const failure = (error) => { return { type: AuthConstants.REGISTER_FAILURE, error } }
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/auth');
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
};

const webStatic = () => {
    const request = (result) =>{ return { type: AuthConstants.WEB_STATIC_REQUEST, result } }
    const success = (result) => { return { type: AuthConstants.WEB_STATIC_SUCCESS, result } }
    const failure = (error) => { return { type: AuthConstants.WEB_STATIC_FAILURE, error } }
    return dispatch => {
        dispatch(request({ }));
        userService.getWebStatic()
            .then(
                response => {
                    console.log('webStatic-d',response);
                    dispatch(success(response));
                },
                error => {
                    console.log('webStatic-d',error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};


export const AuthAction =  {
    login,
    logout,
    register,
    webStatic
};
