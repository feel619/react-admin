import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap-daterangepicker/daterangepicker.css';
import {
    Card,
    CardHeader,
    Container,
    CardBody,
    Row,
    Form,
    FormGroup,
    Button,
    Input,
    Label,
    UncontrolledCollapse,
    ListGroup,
    ListGroupItem,
    Col, NavItem, NavLink, Nav, TabPane, TabContent
} from "reactstrap";
import {history} from "../../redux/_helpers";
import {CommonService} from "../../redux/_services/CommonService";
import classnames from "classnames";
import {EmailTemplateAction} from "./slice/EmailTemplateAction";
import {SmsTemplateAction} from "./slice/SmsTemplateAction";

const Template = () => {
    console.log("Template");
    const addRecordURL = `template/add`;
    const updateRecordURL = `template/edit`;
    const dispatch = useDispatch(null);
    const [activeTab, setActiveTab] = useState('email');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const EmailTemplateReducers = useSelector(state => state.EmailTemplateReducers);
    const SmsTemplateReducers = useSelector(state => state.SmsTemplateReducers);
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('7') < 0;
    const getTemplateList = () => {
        dispatch(EmailTemplateAction.Listing());
        dispatch(SmsTemplateAction.Listing());
    };

    useEffect(() => {
        getTemplateList();
    }, []);
    const updateStatus = (id, isCheck) => {
        if (!hiddenPrivileges) {
            const status = (isCheck === 1) ? 2 : 1;
            CommonService.putStatus('/auth/template/' + activeTab + '/', id, status);
            getTemplateList();
        }
    };
    const removeRecord = (id) => {
        if (!hiddenPrivileges) {
            CommonService.deleteRecord('/auth/template/' + activeTab + '/', id, '', () => {
                console.log("deleteData");
                getTemplateList();
            });
        }
    };
    const addOrEditRecord = (id) => {
        if (id) {
            history.push(updateRecordURL + '/' + activeTab + '/' + id);
        } else {
            history.push(addRecordURL + '/' + activeTab);
        }
    };

    return (
        <>
            <div className="main-content-white secGapBM">
                <div className="main-content-head">
                    <Container className="" fluid>
                        <Nav tabs className="tabsview1">
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === 'email'})}
                                    onClick={() => {
                                        toggle('email');
                                    }}
                                >
                                    Email
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === 'sms'})}
                                    onClick={() => {
                                        toggle('sms');
                                    }}
                                >
                                    SMS
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Container>
                </div>
                <div className="main-content-body">
                    <div className="main-content-table">
                        <Container fluid>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="email">
                                    <div className="mx7">
                                        <div className="btnList mb-1 justify-content-end">
                                            <Button hidden={hiddenPrivileges} className="btn-icon btn-primary2 btn-sm"
                                                    onClick={() => addOrEditRecord()}><i
                                                className="ti-plus"></i><span>Add</span></Button>
                                        </div>
                                        <ListGroup className="listHover">
                                            {
                                                // console.log('EmailTemplateReducers--',EmailTemplateReducers)
                                                EmailTemplateReducers?.EmailTemplateListing?.success
                                                && EmailTemplateReducers?.EmailTemplateListing?.response.map((allData, index) => (
                                                    <>
                                                        <ListGroupItem className="justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="d-flex mr-auto">
                                                                    <div
                                                                        className="mr-2 fw7 text-capitalize">{allData.name}</div>
                                                                </div>
                                                                <div className="btnList align-items-center">
                                                                <span
                                                                    onClick={() => updateStatus(allData.id, allData.status)}
                                                                    className={`btn btn-sm ${allData.status === 1 ? 'text-success' : 'text-danger'}`}>{allData.status === 1 ? 'Active' : 'In-active'}</span>
                                                                    <span hidden={hiddenPrivileges}
                                                                          onClick={() => addOrEditRecord(allData.id)}
                                                                          className="btn-icon btn-light2 btn btn-sm"><i
                                                                        className="ti-pencil"/></span>
                                                                    <span hidden={hiddenPrivileges}
                                                                          onClick={() => removeRecord(allData.id)}
                                                                          className="btn-icon btn-light2 btn btn-sm"><i
                                                                        className="ti-trash"/></span>
                                                                    <span id={allData.id}
                                                                          className="btn-icon btn-light2 btn btn-sm"><i
                                                                        className="ti-angle-down"/> <span>Show</span></span>
                                                                </div>
                                                            </div>
                                                            <UncontrolledCollapse toggler={`#${allData.id}`}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <div className="main-content-body">
                                                                            <Container className="" fluid>
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{__html: allData.template}}/>
                                                                            </Container>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </UncontrolledCollapse>
                                                        </ListGroupItem>
                                                    </>
                                                ))
                                            }
                                        </ListGroup>
                                    </div>
                                </TabPane>
                                <TabPane tabId="sms">
                                    <div className="mx7">
                                        <div className="btnList mb-1 justify-content-end">
                                            <Button hidden={hiddenPrivileges} className="btn-icon btn-primary2 btn-sm"
                                                    onClick={() => addOrEditRecord()}><i
                                                className="ti-plus"></i><span>Add</span></Button>
                                        </div>
                                        <ListGroup className="listHover">
                                            {
                                                // console.log('SmsTemplateReducers--',SmsTemplateReducers)
                                                SmsTemplateReducers?.SmsTemplateListing?.success
                                                && SmsTemplateReducers?.SmsTemplateListing?.response.map((allData, index) => (
                                                    <>
                                                        <ListGroupItem className="justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="d-flex mr-auto">
                                                                    <div
                                                                        className="mr-2 fw7 text-capitalize">{allData.name}</div>
                                                                </div>
                                                                <div className="btnList align-items-center">
                                                                    <span
                                                                        onClick={() => updateStatus(allData.id, allData.status)}
                                                                        className={`btn btn-sm ${allData.status === 1 ? 'text-success' : 'text-danger'}`}>{allData.status === 1 ? 'Active' : 'In-active'}</span>
                                                                    <span hidden={hiddenPrivileges}
                                                                          onClick={() => addOrEditRecord(allData.id)}
                                                                          className="btn-icon btn-light2 btn btn-sm"><i
                                                                        className="ti-pencil"/></span>
                                                                    <span hidden={hiddenPrivileges}
                                                                          onClick={() => removeRecord(allData.id)}
                                                                          className="btn-icon btn-light2 btn btn-sm"><i
                                                                        className="ti-trash"/></span>
                                                                    <span id={allData.id}
                                                                          className="btn-icon btn-light2 btn btn-sm"><i
                                                                        className="ti-angle-down"/> <span>Show</span></span>
                                                                </div>
                                                            </div>
                                                            <UncontrolledCollapse toggler={`#${allData.id}`}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <div className="main-content-body">
                                                                            <Container className="" fluid>
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{__html: allData.template}}/>
                                                                            </Container>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </UncontrolledCollapse>
                                                        </ListGroupItem>
                                                    </>
                                                ))
                                            }
                                        </ListGroup>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Template;
