/*eslint-disable*/
import React, {useState} from "react";
import {NavLink as NavLinkRRD, Link, BrowserRouter, Router, Switch, Redirect} from "react-router-dom";
import {PropTypes} from "prop-types";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    NavbarToggler,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";
import {useSelector} from "react-redux";

const Sidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "open" : "";
    };
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    const closeCollapse = () => {
        setCollapseOpen(false);
    };

    const [checkedState, setCheckedState] = useState(
        new Array(props.routes?.length).fill('')
    );
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? (item ? '' : 'open') : item
        );
        setCheckedState(updatedCheckedState);
    };
    const AuthReducers = useSelector(state => state.AuthReducers);
    const privileges = AuthReducers?.user?.response?.privileges.split(',');

    // creates the links that appear in the left menu / Sidebar
    const createLinks = (routes) => {
        if (privileges) {
            return routes.map((prop, key) => {
                if (prop.layout === "/admin" && prop.isSidebar === true) {
                    let moduleStatus = prop?.moduleId.every(r => {
                        return privileges.indexOf(r.toString()) < 0
                    });
                    console.log(moduleStatus, privileges, "moduleStatus", prop.name, prop.moduleId);
                    return (
                        <>
                            <NavItem hidden={moduleStatus} key={`Nav_${key}`} className={`${checkedState[key]}`}>
                                {(prop.subMenuDrop && prop.subMenu) ? <>
                                    <span onClick={() => handleOnChange(key)} className={`nav-link ${collapseOpen} cursor-pointer`}>
                                        <i className={prop.icon}/><span>{prop.name}</span>
                                    </span>
                                    <Nav nav caret><SubMenu props={prop.subMenu}></SubMenu></Nav>
                                </> : <NavLink
                                    to={prop.layout + prop.path}
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                >
                                    <i className={prop.icon}/>
                                    <span>{prop.name}</span>
                                </NavLink>}
                            </NavItem>
                        </>
                    );
                }
            });
        } else {
            // return history.go(0)
        }
    };

    const SubMenu = (subMenu) => {
        console.log(subMenu.props, "props");
        return subMenu.props.map((prop, key) => {
            if (prop.layout === "/admin" && prop.isSidebar === true) {
                return (
                    <NavItem
                        hidden={AuthReducers?.user?.response?.privileges.split(',').indexOf(prop?.moduleId.toString()) < 0}>
                        <NavLink
                            to={prop.layout + prop.path}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                        >
                            <i className={prop.icon}/>
                            {prop.name}
                        </NavLink>
                    </NavItem>
                )
            }
        });
    };

    const {bgColor, routes, logo} = props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link,
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank",
        };
    }

    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-dark bg-dark"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                {/* Brand */}
                {logo ? (
                    <NavbarBrand className="pt-0" {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}
                {/* User */}
                <Nav className="align-items-center d-md-none">
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav className="nav-link-icon">
                            <i className="ti-bell"/>
                        </DropdownToggle>
                        <DropdownMenu
                            aria-labelledby="navbar-default_dropdown_1"
                            className="dropdown-menu-arrow"
                            right
                        >
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another action</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  {/* <img
                    alt="..."
                    src={
                      require("../../assets/img/theme/team-1-800x800.jpg")
                        .default
                    }
                  /> */}
                </span>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem className="noti-title" header tag="div">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-single-02"/>
                                <span>My profile</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-settings-gear-65"/>
                                <span>Settings</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-calendar-grid-58"/>
                                <span>Activity</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-support-16"/>
                                <span>Support</span>
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                <i className="ni ni-user-run"/>
                                <span>Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                {/* Collapse */}
                <Collapse navbar isOpen={collapseOpen}>
                    {/* Collapse header */}
                    <div className="navbar-collapse-header d-md-none">
                        <Row>
                            {logo ? (
                                <Col className="collapse-brand" xs="6">
                                    {logo.innerLink ? (
                                        <Link to={logo.innerLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc}/>
                                        </Link>
                                    ) : (
                                        <a href={logo.outterLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc}/>
                                        </a>
                                    )}
                                </Col>
                            ) : null}
                            <Col className="collapse-close" xs="6">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleCollapse}
                                >
                                    <span/>
                                    <span/>
                                </button>
                            </Col>
                        </Row>
                    </div>
                    {/* Navigation */}
                    <Nav navbar>{createLinks(routes)}</Nav>
                    {/* Divider */}
                    <hr className="my-3"/>
                    {/* Heading */}
                </Collapse>
            </Container>
        </Navbar>
    );
};

Sidebar.defaultProps = {
    routes: [{}],
};

Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired,
    }),
};

export default Sidebar;
