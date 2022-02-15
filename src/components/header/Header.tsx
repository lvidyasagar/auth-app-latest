import React, { FC, useContext } from "react";
import { Col, Row } from "react-bootstrap";

import AuthContext from "../../context/auth-context";
import logo from "../../assets/images/PK-White.svg";
import "./Header.scss";

const Header: FC = () => {
  const context = useContext(AuthContext);
  return (
    <header id="auth-header">
      <Row>
        <Col sm={{ span: 2 }} lg={{ span: 1 }} xs={{ span: 3 }}>
          <img src={logo} className="pk-logo" alt="logo" />
        </Col>
        {!context.isLoggedIn ? (
          <Col sm={{ span: 2, offset: 8 }} lg={{ span: 2, offset: 9 }} xs={{ span: 5, offset: 4 }}>
            <button className="pk-button" onClick={context.onLogin}>
              Login
            </button>
          </Col>
        ) : (
          <Col sm={{ span: 2, offset: 8 }} lg={{ span: 2, offset: 9 }} xs={{ span: 5, offset: 4 }}>
            <button className="pk-button" onClick={context.onLogout}>
              Logout
            </button>
          </Col>
        )}
      </Row>
    </header>
  );
};

export default Header;
