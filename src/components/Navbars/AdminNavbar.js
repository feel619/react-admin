import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { AuthAction } from "../../redux/_actions/AuthAction";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import ResetPassword from "../../views/formComponent/ResetPassword";
import React from "react";

const AdminNavbar = (props) => {

  const dispatch = useDispatch(null)
  const AuthReducers = useSelector(state => state.AuthReducers);
  const Logout = () =>{
    dispatch(AuthAction.logout())
  };

  return (
    <>
      <Navbar className="navbar-top fixed-top" expand="md" id="navbar-main">
        <Container fluid>
          <div className="pageTitle">
            {props.brandText}
          </div>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {<img
                      alt="..."
                      src={
                        require("../../assets/img/logo2.png")
                          .default
                      }
                    /> }
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm text-dark font-weight-bold">
                      {AuthReducers.user?.response?.user_role?.role}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!  {AuthReducers.user?.response?.username}</h6>
                </DropdownItem>
               {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ti-user"/>
                  <span>Profile</span>
                </DropdownItem>*/}
                <div className="dropdown-item cursor-pointer"  tag="div">
                  <ResetPassword className={"danger"} buttonLabel={"Reset Password"} />
                </div>
                <DropdownItem divider />
                <DropdownItem onClick={(e) => Logout()}>
                  <i className="ti-new-window" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
