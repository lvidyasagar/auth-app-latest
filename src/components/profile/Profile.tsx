import React,{ FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../header/Header";
import AuthContext from "../../context/auth-context";

const Profile: FC = () => {
  const context = useContext(AuthContext);
  return (
    <Container fluid>
      <Header></Header>
      <div>Welcome</div>
      {context.isAdmin && <Link to="/dashboard">click here to go admin dashboard </Link>}
    </Container>
  );
};

export default Profile;
