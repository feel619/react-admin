import React from "react";
import {useDispatch} from "react-redux";
import {useLocation, Route, Switch, Redirect, Router} from "react-router-dom";
// reactstrap components
import {Container, Row, Col} from "reactstrap";
// core components
import AuthFooter from "../components/Footers/AuthFooter.js";
import routes from "../routes.js";
import {ToastContainer} from "react-toastify";
import {AuthAction} from "../redux/_actions/AuthAction";
import {history} from "../redux/_helpers";

const Auth = (props) => {
    const dispatch = useDispatch(null);
    const mainContent = React.useRef(null);
    const location = useLocation();

    const getWebStatic = () => {
        dispatch(AuthAction.webStatic());
    };

    React.useEffect(() => {
        getWebStatic();
        document.body.classList.add("bg-default");
        return () => {
            document.body.classList.remove("bg-default");
        };
    }, []);
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <ToastContainer/>
                <div className="header  py-7 py-lg-6">
                    <Container>
                        <div className="header-body text-center mb-7">
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-dark">Welcome!</h1>
                                    <p className="text-lead text-black">
                                        Global lotto admin
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
                {/* Page content */}
                <Container className="mt--9 pb-5">
                    <Row className="justify-content-center">
                        <Router history={history} basename={'/global-lotto-admin/'}>
                            <Switch>
                                {getRoutes(routes)}
                                <Redirect from="*" to={`/auth/login`}/>
                            </Switch>
                        </Router>
                    </Row>
                </Container>
            </div>
            <AuthFooter/>
        </>
    );
};

export default Auth;
