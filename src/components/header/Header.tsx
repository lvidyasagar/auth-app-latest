import React, { FC, useContext } from "react";
import { Col, Row } from "react-bootstrap";

import AuthContext from "../../context/auth-context";
import { LoginType, setLoginType } from "../../utils/localstorage.helper";
import logo from "../../assets/images/PK-White.svg";
import "./Header.scss";

const Header: FC = () => {
  const context = useContext(AuthContext);
  const oktaLoginHandler = () => {
    setLoginType(LoginType.Okta);
    context.onLogin();
  };
  return (
    <header className="App-header">
      <Row>
        <Col sm={{ span: 2 }} lg={{ span: 1 }} xs={{ span: 3 }}>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
        {!context.isLoggedIn ? (
          <Col sm={{ span: 2, offset: 8 }} lg={{ span: 2, offset: 9 }} xs={{ span: 5, offset: 4 }}>
            <button onClick={oktaLoginHandler}>Okta Login</button>
          </Col>
        ) : (
          <Col sm={{ span: 2, offset: 8 }} lg={{ span: 2, offset: 9 }} xs={{ span: 5, offset: 4 }}>
            <button onClick={context.onLogout}>Logout</button>
          </Col>
        )}
      </Row>
    </header>
  );
};

export default Header;
