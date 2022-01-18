import {EmailTemplateConstants} from "./EmailTemplateConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: EmailTemplateConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: EmailTemplateConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: EmailTemplateConstants.LISTING_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/template/email','GET','')
            .then(
                response => {
                    console.log("Listing  EmailTemplate  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing EmailTemplate FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: EmailTemplateConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: EmailTemplateConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: EmailTemplateConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPRequest('/auth/template/email/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("EmailTemplateListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("EmailTemplateListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddEmailTemplate = (reqData,from) => {
    const request = (result) => {
        return {type: EmailTemplateConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: EmailTemplateConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: EmailTemplateConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        console.log(reqData);
        CommonService.sendHTTPRequest('/auth/template/email','POST',reqData)
            .then(
                response => {
                    console.log(" AddEmailTemplate SUCCESS", response);
                    dispatch(success(response));
                    history.goBack();
                },
                error => {
                    console.log(" AddEmailTemplate FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateEmailTemplate = (id,reqData,from) => {
    const request = (result) => {
        return {type: EmailTemplateConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: EmailTemplateConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: EmailTemplateConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/template/email/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateEmailTemplate SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateEmailTemplate FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};


export const EmailTemplateAction = {
    Listing,
    getRecord,
    AddEmailTemplate,
    UpdateEmailTemplate
};
