import React, { FC, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import AuthContext from "../../context/auth-context";
import Header from "../header/Header";
import Login from "../login/Login";
import "./Home.scss";

const Home: FC = () => {
  const context = useContext(AuthContext);

  return (
    <Container fluid>
      <Header></Header>
      <main>
        <Row>
          <Col lg={{ offset: 4, span: 4 }} md={{ offset: 4, span: 4 }}>
            {context.isLoggedIn ? <Redirect to={{ pathname: "/profile" }} /> : <Login></Login>}
          </Col>
        </Row>
      </main>
    </Container>
  );
};

export default Home;
