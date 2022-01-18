// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {useSelector} from "react-redux";
import {nFormatter} from "../../views/formComponent/FilterFormFiled";

const Header = () => {
  const dashboardReducers = useSelector(state => state.DashboardReducers);

  return (
    <>
      <div className="secGapB">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row className={"gut"}>
              <Col lg="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Bet
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {nFormatter(dashboardReducers?.dashboardRecord?.response?.bet?.today_total_bet,1)}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ti-bar-chart" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="ti-bar-chart" />{nFormatter(dashboardReducers?.dashboardRecord?.response?.bet?.today_total_bet_cnt,1)}
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{nFormatter(dashboardReducers?.dashboardRecord?.response?.register?.total_accounts,1)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ti-user" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="ti-user" /> {nFormatter(dashboardReducers?.dashboardRecord?.response?.register?.registered_this_week,1)}
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Deposit
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{nFormatter(dashboardReducers?.dashboardRecord?.response?.deposit?.today_total_deposit,1)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ti-package" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="ti-package" /> {nFormatter(dashboardReducers?.dashboardRecord?.response?.deposit?.deposit_this_year, 1)}
                      </span>{" "}
                      <span className="text-nowrap">Since year</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Withdrawal
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{nFormatter(dashboardReducers?.dashboardRecord?.response?.withdrawal?.today_total_withdrawal,1)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ti-dashboard" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="ti-dashboard" /> {nFormatter(dashboardReducers?.dashboardRecord?.response?.withdrawal?.withdrawal_this_year,1)}
                      </span>{" "}
                      <span className="text-nowrap">Since year</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
