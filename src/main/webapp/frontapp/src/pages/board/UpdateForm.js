import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateForm = (props) => {
  const { id } = useParams();
  const jwt = useSelector((state) => state.jwt);
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    title: "",
    content: "",
  });

  async function updateSubmit(e) {
    e.preventDefault();

    try {
      await axios("http://localhost:8080/api/boards/" + id, {
        method: "PUT",
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json; charset=utf-8",
        },
        data: board,
      });
      navigate("/board/" + id);
    } catch (error) {
      console.log(error);
    }
  }

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  async function fetchUserInfo() {
    let response = await axios("http://localhost:8080/api/boards/" + id, {
      method: "GET",
      headers: {
        Authorization: jwt,
      },
    });
    setBoard(response.data.body);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>글수정</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={board.title}
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={changeValue}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            row={5}
            value={board.content}
            name="content"
            onChange={changeValue}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={updateSubmit}>
          글수정
        </Button>
      </Form>
    </div>
  );
};

export default UpdateForm;
