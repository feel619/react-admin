import React, {useEffect, useState} from "react";
import classnames from "classnames";
import {Chart} from "react-google-charts";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col, TabContent, TabPane,
} from "reactstrap";

import Header from "../../components/Headers/Header.js";
import {DashboardAction} from "./slice/DashboardAction";
import {useDispatch, useSelector} from "react-redux";
import routes from "../../routes";
import {history} from "../../redux/_helpers";
import {nFormatter} from "../formComponent/FilterFormFiled";
import {DashboardReducers} from "./slice/DashboardReducers";

const Dashboard = (props) => {

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const dispatch = useDispatch(null);
    const dashboardReducers = useSelector(state => state.DashboardReducers);
    const bet_amount_computed = dashboardReducers?.dashboardRecord?.response?.bet?.bet_amount_computed;
    const bet_ticket_computed = dashboardReducers?.dashboardRecord?.response?.bet?.bet_ticket_computed;
    const register_month_computed = dashboardReducers?.dashboardRecord?.response?.register?.register_month_computed;
    const deposit_month_computed = dashboardReducers?.dashboardRecord?.response?.deposit?.deposit_month_computed;
    const withdrawal_month_computed = dashboardReducers?.dashboardRecord?.response?.withdrawal?.withdrawal_month_computed;
    const AuthReducers = useSelector(state => state.AuthReducers);
    const hiddenPrivileges = AuthReducers?.user?.response?.privileges.split(',').indexOf('1') > -1;
    if (!hiddenPrivileges){
        routes.map((prop, key) => {
            let moduleStatus = prop?.moduleId.every(r=>{
                console.log(prop?.moduleId, " Login_user ", AuthReducers?.user?.response?.privileges.indexOf(r.toString()) > -1, "user", prop.path);
                if(AuthReducers?.user?.response?.privileges.split(',').indexOf(r.toString()) > -1 && prop.path !== "/logs" && prop.isSidebar){
                    history.push(prop.layout + prop.path);
                    return;
                }
            });
        });
    }
    const year = new Date().getFullYear();
    const getDashboardList = () => {
        dispatch(DashboardAction.getRecord(year));
        dispatch(DashboardAction.getGameAnalyticsRecord());
    };
    useEffect(() => {
        console.log(hiddenPrivileges,"hiddenPrivilegeshiddenPrivileges")
       if(hiddenPrivileges) getDashboardList();
    }, []);

    return (
        <>
            <Header/>
            {/* Page content */}
            <Container className="" fluid>
                <Row className="gut secGap pt-0">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className=" shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            Overview
                                        </h6>
                                        <h2 className="text-dark mb-0">{activeTab === '1' ? 'Total User' : 'Total Amount'}</h2>
                                    </div>
                                    <div className="col">
                                        <Nav className="justify-content-end" pills>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames("py-2 px-3", {
                                                        active: activeTab === '1',
                                                    })}
                                                    onClick={() => {
                                                        toggle('1');
                                                    }}
                                                >
                                                    <span className="d-none d-md-block">User</span>
                                                    <span className="d-md-none">U</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames("py-2 px-3", {
                                                        active: activeTab === '2',
                                                    })}
                                                    onClick={() => {
                                                        toggle('2');
                                                    }}
                                                >
                                                    <span className="d-none d-md-block">Bet</span>
                                                    <span className="d-md-none">B</span>
                                                </NavLink>
                                            </NavItem>
                                          <NavItem>
                                            <NavLink
                                                className={classnames("py-2 px-3", {
                                                  active: activeTab === '3',
                                                })}
                                                onClick={() => {
                                                  toggle('3');
                                                }}
                                            >
                                                <span className="d-none d-md-block">Deposit</span>
                                                <span className="d-md-none">D</span>
                                            </NavLink>
                                          </NavItem>
                                        </Nav>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <div className="chart">
                                            <Chart
                                        width={'100%'}
                                        height={'100%'}
                                        chartType="ColumnChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                          ['Month', 'User'],
                                          ['Jan', parseInt(register_month_computed?.registered_month_1_2021)],
                                          ['Feb', parseInt(register_month_computed?.registered_month_2_2021)],
                                          ['Mar', parseInt(register_month_computed?.registered_month_3_2021)],
                                          ['Apr', parseInt(register_month_computed?.registered_month_4_2021)],
                                          ['May', parseInt(register_month_computed?.registered_month_5_2021)],
                                          ['Jun', parseInt(register_month_computed?.registered_month_6_2021)],
                                          ['Jly', parseInt(register_month_computed?.registered_month_7_2021)],
                                          ['Aug', parseInt(register_month_computed?.registered_month_8_2021)],
                                          ['Sep', parseInt(register_month_computed?.registered_month_9_2021)],
                                          ['Oct', parseInt(register_month_computed?.registered_month_10_2021)],
                                          ['Nov', parseInt(register_month_computed?.registered_month_11_2021)],
                                          ['Dec', parseInt(register_month_computed?.registered_month_12_2021)],
                                        ]}
                                        options={{
                                          title: '',
                                          chartArea: {width: '80%'},
                                          hAxis: {
                                            title: 'Month',
                                            minValue: 0,
                                          },
                                          vAxis: {
                                            title: 'User',
                                          },
                                          colors: ["#da281c", "#f7c302", "#34923f"]
                                        }}
                                        legendToggle
                                    />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Chart
                                            width={'100%'}
                                            height={'100%'}
                                            chartType="ColumnChart"
                                            loader={<div>Loading Chart</div>}
                                            data={[
                                                ['Month', 'Bet Amount', 'Bet Ticket'],
                                                ['Jan', parseInt(bet_amount_computed?.bet_month_1_2021), parseInt(bet_ticket_computed?.bet_cnt_month_1_2021)],
                                                ['Feb', parseInt(bet_amount_computed?.bet_month_2_2021), parseInt(bet_ticket_computed?.bet_cnt_month_2_2021)],
                                                ['Mar', parseInt(bet_amount_computed?.bet_month_3_2021), parseInt(bet_ticket_computed?.bet_cnt_month_3_2021)],
                                                ['Apr', parseInt(bet_amount_computed?.bet_month_4_2021), parseInt(bet_ticket_computed?.bet_cnt_month_4_2021)],
                                                ['May', parseInt(bet_amount_computed?.bet_month_5_2021), parseInt(bet_ticket_computed?.bet_cnt_month_5_2021)],
                                                ['Jun', parseInt(bet_amount_computed?.bet_month_6_2021), parseInt(bet_ticket_computed?.bet_cnt_month_6_2021)],
                                                ['Jly', parseInt(bet_amount_computed?.bet_month_7_2021), parseInt(bet_ticket_computed?.bet_cnt_month_7_2021)],
                                                ['Aug', parseInt(bet_amount_computed?.bet_month_8_2021), parseInt(bet_ticket_computed?.bet_cnt_month_8_2021)],
                                                ['Sep', parseInt(bet_amount_computed?.bet_month_9_2021), parseInt(bet_ticket_computed?.bet_cnt_month_9_2021)],
                                                ['Oct', parseInt(bet_amount_computed?.bet_month_10_2021), parseInt(bet_ticket_computed?.bet_cnt_month_10_2021)],
                                                ['Nov', parseInt(bet_amount_computed?.bet_month_11_2021), parseInt(bet_ticket_computed?.bet_cnt_month_11_2021)],
                                                ['Dec', parseInt(bet_amount_computed?.bet_month_12_2021), parseInt(bet_ticket_computed?.bet_cnt_month_12_2021)],
                                            ]}
                                            options={{
                                                title: '',
                                                chartArea: {width: '80%'},
                                                hAxis: {
                                                    title: 'Month',
                                                    minValue: 0,
                                                },
                                                vAxis: {
                                                    title: 'Amount',
                                                },
                                                colors: ["#da281c", "#f7c302", "#34923f"]
                                            }}
                                            legendToggle
                                        />
                                    </TabPane>
                                  <TabPane tabId="3">
                                  <Chart
                                                width={'100%'}
                                                height={'100%'}
                                                chartType="ColumnChart"
                                                loader={<div>Loading Chart</div>}
                                                data={[
                                                    ['Month', 'Deposit', 'Withdrawal'],
                                                    ['Jan', parseInt(deposit_month_computed?.deposit_month_1_2021), parseInt(withdrawal_month_computed?.withdrawal_month_1_2021)],
                                                    ['Feb', parseInt(deposit_month_computed?.deposit_month_2_2021), parseInt(withdrawal_month_computed?.withdrawal_month_2_2021)],
                                                    ['Mar', parseInt(deposit_month_computed?.deposit_month_3_2021), parseInt(withdrawal_month_computed?.withdrawal_month_3_2021)],
                                                    ['Apr', parseInt(deposit_month_computed?.deposit_month_4_2021), parseInt(withdrawal_month_computed?.withdrawal_month_4_2021)],
                                                    ['May', parseInt(deposit_month_computed?.deposit_month_5_2021), parseInt(withdrawal_month_computed?.withdrawal_month_5_2021)],
                                                    ['Jun', parseInt(deposit_month_computed?.deposit_month_6_2021), parseInt(withdrawal_month_computed?.withdrawal_month_6_2021)],
                                                    ['Jly', parseInt(deposit_month_computed?.deposit_month_7_2021), parseInt(withdrawal_month_computed?.withdrawal_month_7_2021)],
                                                    ['Aug', parseInt(deposit_month_computed?.deposit_month_8_2021), parseInt(withdrawal_month_computed?.withdrawal_month_8_2021)],
                                                    ['Sep', parseInt(deposit_month_computed?.deposit_month_9_2021), parseInt(withdrawal_month_computed?.withdrawal_month_9_2021)],
                                                    ['Oct', parseInt(deposit_month_computed?.deposit_month_10_2021), parseInt(withdrawal_month_computed?.withdrawal_month_10_2021)],
                                                    ['Nov', parseInt(deposit_month_computed?.deposit_month_11_2021), parseInt(withdrawal_month_computed?.withdrawal_month_11_2021)],
                                                    ['Dec', parseInt(deposit_month_computed?.deposit_month_12_2021), parseInt(withdrawal_month_computed?.withdrawal_month_12_2021)],
                                                ]}
                                                options={{
                                                    title: 'Yearly deposit report',
                                                    chartArea: {width: '70%'},
                                                    hAxis: {
                                                        title: 'Month',
                                                        minValue: 0,
                                                    },
                                                    vAxis: {
                                                        title: 'Amount',
                                                    },
                                                    colors: ["#da281c", "#f7c302", "#34923f"]
                                                }}
                                                legendToggle
                                            />

                                  </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="gut secGap pt-0">
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Game visits</h3>
                                    </div>
                                    {/*<div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>*/}
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Game name</th>
                                    <th scope="col">Game Image</th>
                                    <th scope="col">Visitors</th>
                                    <th scope="col">Unique users</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dashboardReducers?.dashboardGameAnalyticsRecord?.success && dashboardReducers?.dashboardGameAnalyticsRecord?.response?.game_analytics.length
                                    ? dashboardReducers?.dashboardGameAnalyticsRecord?.response?.game_analytics.map((allData, index) => (
                                        <>
                                            <tr>
                                                <th scope="row">{allData?.game.name}</th>
                                                <td><img src={`${AuthReducers?.static?.response?.url}${AuthReducers?.static?.response?.folders?.game}/${allData?.game.web_image}`} alt={`${allData?.game.name}`} height={60} width={60} /></td>
                                                <td>{allData?.total_visitor}</td>
                                                <td>{allData?.unique_visitor}</td>
                                            </tr>
                                        </>
                                    ))
                                        : <>
                                            <tr>
                                                <td  >No Visitors</td>
                                            </tr>
                                        </>
                                }
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Visitors Report
                                        </h6>
                                        <h2 className="mb-0">Daily</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div className="chart">
                                    {
                                        dashboardReducers?.dashboardGameAnalyticsRecord?.success  ? VisitorCharts(dashboardReducers) : 'No Visitors'
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

const VisitorCharts = (dashboardReducers) => {
    return (
        <>
            <Chart
                width={'100%'}

                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Visitors'],
                    ...dashboardReducers?.dashboardGameAnalyticsRecord?.response?.game_analytics.map(d => [ d?.game?.name, d?.total_visitor ])
                ]}
                options={{
                    title: 'User Daily Activities',
                    // Just add this option
                    is3D: true,
                    chartArea: {width: '100%', height: '100%'},
                    backgroundColor: "",
                    colors: ["#da281c", "#f7c302", "#34923f"]
                }}
                rootProps={{'data-testid': '2'}}
            />
        </>
    )
};

export default Dashboard;
