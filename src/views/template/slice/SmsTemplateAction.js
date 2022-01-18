import {SmsTemplateConstants} from "./SmsTemplateConstants";
import {CommonService} from "../../../redux/_services/CommonService";
import {history} from "../../../redux/_helpers";

const Listing = (reqData) => {
    const request = (result) => {
        return {type: SmsTemplateConstants.LISTING_REQUEST, result}
    };
    const success = (result) => {
        return {type: SmsTemplateConstants.LISTING_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SmsTemplateConstants.LISTING_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/template/sms','GET','')
            .then(
                response => {
                    console.log("Listing  SmsTemplate  SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("Listing SmsTemplate FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const getRecord = (reqData) => {
    const request = (result) => {
        return {type: SmsTemplateConstants.GET_REQUEST, result}
    };
    const success = (result) => {
        return {type: SmsTemplateConstants.GET_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SmsTemplateConstants.GET_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        let requestData = {};
        console.log('requestData',requestData);
        CommonService.sendHTTPRequest('/auth/template/sms/'+reqData,'GET',requestData)
            .then(
                response => {
                    console.log("SmsTemplateListing SUCCESS ", response);
                    dispatch(success(response));
                },
                error => {
                    console.log("SmsTemplateListing FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const AddSmsTemplate = (reqData,from) => {
    const request = (result) => {
        return {type: SmsTemplateConstants.ADD_REQUEST, result}
    };
    const success = (result) => {
        return {type: SmsTemplateConstants.ADD_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SmsTemplateConstants.ADD_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        console.log(reqData);
        CommonService.sendHTTPRequest('/auth/template/sms','POST',reqData)
            .then(
                response => {
                    console.log(" AddSmsTemplate SUCCESS", response);
                    dispatch(success(response));
                    history.goBack();
                },
                error => {
                    console.log(" AddSmsTemplate FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};

const UpdateSmsTemplate = (id,reqData,from) => {
    const request = (result) => {
        return {type: SmsTemplateConstants.UPDATE_REQUEST, result}
    };
    const success = (result) => {
        return {type: SmsTemplateConstants.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: SmsTemplateConstants.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request({}));
        CommonService.sendHTTPRequest('/auth/template/sms/'+id,'PUT',reqData)
            .then(
                response => {
                    console.log(" UpdateSmsTemplate SUCCESS", response);
                    dispatch(success(response));
                    history.push(from);
                },
                error => {
                    console.log(" UpdateSmsTemplate FAILURE ", error);
                    dispatch(failure(error.toString()));
                }
            );
    };
};


export const SmsTemplateAction = {
    Listing,
    getRecord,
    AddSmsTemplate,
    UpdateSmsTemplate
};
