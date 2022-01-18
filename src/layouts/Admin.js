import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, Route, Switch, Redirect} from "react-router-dom";
// reactstrap components
import {Container} from "reactstrap";
import {ToastContainer} from 'react-toastify';
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

import routes from "../routes";
import Header from "../components/Headers/Header";
import {AuthAction} from "../redux/_actions/AuthAction";

const Admin = (props) => {
    const dispatch = useDispatch(null);
    const mainContent = React.useRef(null);
    const location = useLocation();
    const getWebStatic = () => {
        dispatch(AuthAction.webStatic());
    };
    const AuthReducers = useSelector(state => state.AuthReducers);
    console.log("AuthReducers",AuthReducers);
    React.useEffect(() => {
        getWebStatic();
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
        console.log("locationAndUserData", location, localStorage.getItem('user'));
    }, [location]);

    const getRoutes = (routes) => {
        let Routing = [];
        routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                Routing.push(
                    <Route
                        path={prop.layout + prop.path}
                        //component={prop.component}
                        component={() => <prop.component data={prop}/>}
                        key={key}
                        exact={true}
                    />
                );
                if (prop.subMenu) {
                    return prop.subMenu.map((subCrudProps, subCrudKeys) => {
                        Routing.push(
                            <Route
                                path={prop.layout + subCrudProps.path}
                                //component={subCrudProps.component}
                                key={subCrudKeys}
                                component={() => <subCrudProps.component data={subCrudProps}/>}
                                exact={true}
                            />
                        );
                    })
                }
            }
        });
        console.log("Routing", Routing);
        return Routing;
    };

    const getBrandText = (routes,path) => {
        let name = 'Logs';
         routes.map((prop, key) => {
            if (prop.subMenu) {
                prop.subMenu.map((subCrudProps, subCrudKeys) => {
                    if (path.indexOf(prop.layout + subCrudProps.path) !== -1) {
                        console.log(path,"getBrandText ",(prop.layout + subCrudProps.path), " subCrudProps ",subCrudProps);
                        name = subCrudProps.name;
                        return name;
                    }
                });
            } else {
                if (path.indexOf(prop.layout + prop.path) !== -1) {
                    name = prop.name;
                    return name;
                }
            }
        });
        return name;
    };

    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: require("../assets/img/reactlogo.png").default,
                    imgAlt: "...",
                }}
            />
            <AdminNavbar
                {...props}
                brandText={getBrandText(routes,props.location.pathname)}
            />
            <div className="main-content" ref={mainContent}>
                <ToastContainer/>
                <Switch>
                    {
                        //console.log(getRoutes(routes)," getRoutes(routes) ")
                        getRoutes(routes)
                    }
                    <Redirect from="*" to={`/admin/index`}/>
                </Switch>
                <AdminFooter/>
            </div>
        </>
    );
};

export default Admin;
