import React, { FC, useContext, useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import "./Login.scss";
import AuthContext from "../../context/auth-context";
import { LoginType, setLoginType } from "../../utils/localstorage.helper";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AuthContext);
  const validateForm = () => {
    return email.length > 0 && password.length > 6;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoginType(LoginType.Local);
    context.onLogin(email, password);
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control
            autoFocus
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              context.clearError();
            }}
            onClick={() => {
              context.error && setPassword("");
            }}
          />
        </FloatingLabel>
        <Form.Group>
          {context.error && <p className="error-text">Email or password is wrong</p>}
          <Button type="submit" className="button" disabled={!validateForm()}>
            Login
          </Button>
        </Form.Group>
        <Form.Group>
          {/* <TextLink
            startText="Not a User. Click"
            link="/signup"
            linkText="here"
            endText=" to signup"
          /> */}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
