import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function submitLogin(e) {
    e.preventDefault();
    try {
      let response = await axios({
        url: "http://localhost:8080/login",
        method: "post",
        data: user,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      //console.log(response.headers.authorization);

      let jwt = response.headers.authorization;
      //console.log(typeof jwt);

      localStorage.setItem("jwt", jwt); // I/O 발생 (동기적으로 실행됨)

      dispatch(login(jwt));
      navigate("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitLogin}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;