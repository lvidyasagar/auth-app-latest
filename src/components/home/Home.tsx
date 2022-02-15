import React, { FC, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import AuthContext from "../../context/auth-context";
import Header from "../header/Header";
import "./Home.scss";
import { AuthConstants } from "../../utils/constants";

const Home: FC = () => {
  const context = useContext(AuthContext);

  return (
    <Container fluid className="pk-auth">
      <Header></Header>
      <main>
        <Row>
          <Col lg={{ offset: 4, span: 4 }} md={{ offset: 4, span: 4 }}>
            {context.isLoggedIn && (
              <Redirect to={{ pathname: AuthConstants.postAuthRedirectURI }} />
            )}
          </Col>
        </Row>
      </main>
    </Container>
  );
};

export default Home;
