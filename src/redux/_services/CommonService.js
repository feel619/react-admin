import {Url, Api, FormApi, Version, FrontUrl, FrontVersion} from "../_helpers/config";
import {AuthAction} from "../_actions/AuthAction";
import {toast} from "react-toastify";
import Swal from 'sweetalert2'
import axios from "axios";

const putStatus = (api, id, status) => {
    sendHTTPRequest(api + id + '/status', 'PUT', {
        "status": status
    }).then(response => {
        console.log(response, "putStatus");
        return response;
    });
};

const getRecord = (api, id, callback) => {
    sendHTTPRequest(api + id, 'GET').then(response => {
        return callback(response);
    });
};

const postStatus = (api, data, callback) => {
    sendHTTPRequest(api, 'POST', data).then(response => {
        return callback(response);
    });
};

const sendHTTPCallBack = (api, method, data, callback) => {
    sendHTTPRequest(api, method, data).then(response => {
        return callback(response);
    });
};

const deleteRecord = (api, id, data, callback) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Once deleted, you will not be able to recover this Record!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            sendHTTPRequest(api + id + '/delete', 'DELETE', data).then(response => {
                return callback(true);
            });
        } else {
            return callback(false);
        }
    });
};

function sendHTTPRequest(api, method, data) {
    let token = localStorage.getItem('token');
    let url = Url + Api + Version + api;
    let requestOptions = {
        method: method,
        url: url,
        headers: {
            //    'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    };
    if (token) requestOptions.headers.Authorization = 'Bearer ' + token;
    if (method !== 'GET') requestOptions.data = JSON.stringify(data);

    console.log(requestOptions, " sendHTTPRequest requestOptions  ");
    return axios(requestOptions)
        .then(function (response) {
            if (!api.includes("web")) responseCodeHandler(response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error.response, "putStatusResponse");
            console.log(api.includes("web"), "api.includes()");
            if (!api.includes("web")) responseCodeHandler(error.response);
            return Promise.reject(error);
        });

    /* let requestOptions = {
         method: method,
         headers: {
             'Authorization': 'Bearer ' + token,
             'Content-Type': 'application/json'
         },
     };
     return fetch(url, requestOptions)
         .then(handleResponse)
         .then(response => {
             return response;
         });*/
}

const sendHTTPCrossCallBack = (api, method, data, callback) => {
    sendHTTPCrossRequest(api, method, data).then(response => {
        return callback(response);
    });
};

function sendHTTPCrossRequest(api, method, data) {
    let token = localStorage.getItem('token');
    let url = FrontUrl + Api + FrontVersion + api;
    let requestOptions = {
        method: method,
        url: url,
        headers: {
            //    'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    };
    if (token) requestOptions.headers.Authorization = 'Bearer ' + token;
    if (method !== 'GET') requestOptions.data = JSON.stringify(data);
    console.log(requestOptions, " sendHTTPCrossRequest requestOptions  ");
    return axios(requestOptions)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(api.includes("web"), "api.includes()");
            if (!api.includes("web")) responseCodeHandler(error.response);
            return Promise.reject(error);
        });
}

function sendHTTPFormRequest(api, method, data) {
    let token = localStorage.getItem('token');
    let url = Url + FormApi + Version + api;
    let requestOptions = {
        method: method,
        url: url,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    if (token) requestOptions.headers.Authorization = 'Bearer ' + token;

    console.log(requestOptions, " sendHTTPFormRequest requestOptions  ");
    return axios(requestOptions)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (!api.includes("web")) responseCodeHandler(error.response);
            return Promise.reject(error);
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            responseCodeHandler(response.status);
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

const responseCodeHandler = (responseStatus) => {
    const {status, headers} = responseStatus;
    console.log(status, "responseStats", responseStatus);
    if (status === 401) {
        // auto logout if 401 response returned from api
        AuthAction.logout()
    }
    switch (status) {
        case 200:

            break;
        case 201:
            toast.success("Created!", {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        case 204:
            toast.success("Updated!", {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        case 401:
            // auto logout if 401 response returned from api
            AuthAction.logout();
            break;
        case 409:
            console.log(headers,"Error-Code-Message");
            if (headers['error-code'] === "100025") {
                toast.error(headers['error-code-message'], {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.error("Conflict Record!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            break;
        case 406:
            toast.error("Not Exit Record!", {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        case 424:
            toast.error("The Module you are trying to change its status is used in one or more Dependent module.", {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        default:
            toast.error("Internal server error!", {
                position: toast.POSITION.TOP_RIGHT
            });
    }
};

const responseErrorCodeHandler = (responseStatus, message) => {
    if (responseStatus === 401) {
        AuthAction.logout()
    }
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });
};

export const CommonService = {
    sendHTTPRequest,
    sendHTTPCrossRequest,
    sendHTTPCrossCallBack,
    sendHTTPFormRequest,
    sendHTTPCallBack,
    putStatus,
    deleteRecord,
    getRecord,
    postStatus,
    responseErrorCodeHandler
};
