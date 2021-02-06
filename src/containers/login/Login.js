import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";

const Login = ({
    setlogin,
}) => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const masterUsername = "admin";
    const masterPassword = "admin";
    
    const validateForm = () => {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    
    if (username === masterUsername && password === masterPassword)
    {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setlogin(true);
    }
  }

  return (
      
    <div className="Login">
      <h1>Login Page</h1>
      <br/>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;