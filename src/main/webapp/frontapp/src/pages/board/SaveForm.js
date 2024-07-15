import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SaveForm = (props) => {
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.jwt);

  const [board, setBoard] = useState({
    title: "",
    content: "",
  });

  async function submitPost(e) {
    e.preventDefault();

    try {
      console.log("board", board);
      console.log("jwt", jwt);
      await axios({
        url: "http://localhost:8080/api/boards",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: jwt,
        },
        data: board,
      });
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }

  function changeValue(e) {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>글쓰기</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
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
            name="content"
            onChange={changeValue}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitPost}>
          글등록
        </Button>
      </Form>
    </div>
  );
};

export default SaveForm;
