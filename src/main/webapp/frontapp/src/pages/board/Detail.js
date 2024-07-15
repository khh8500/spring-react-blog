import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const Detail = (props) => {
  const { id } = useParams();
  const jwt = useSelector((state) => state.jwt);
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    id: undefined,
    title: "",
    content: "",
    userId: undefined,
    username: "",
    owner: false,
    replies: [],
  });

  useEffect(() => {
    fetchDetail(id);
  }, []);

  async function fetchDetail(boardId) {
    let response = await axios({
      url: `http://localhost:8080/api/boards/${boardId}/detail`,
      headers: {
        Authorization: jwt,
      },
    });
    let responseBody = response.data;

    setBoard(responseBody.body);
  }

  async function fetchDelete(boardId) {
    try {
      await axios({
        url: `http://localhost:8080/api/boards/${boardId}`,
        method: "DELETE",
        headers: {
          Authorization: jwt,
        },
      });
      navigate("/");
    } catch (error) {
      // 200이 안떨어지면 catch로 온다.
      console.log(error);
      alert(error.response.data.msg);
    }
  }

  return (
    <div>
      {board.owner ? (
        <>
          <Link to={`/updateForm/${board.id}`} className="btn btn-warning">
            수정
          </Link>
          <Button
            className="btn btn-danger"
            onClick={() => fetchDelete(board.id)}
          >
            삭제
          </Button>
        </>
      ) : (
        ""
      )}

      <br />
      <br />
      <h1>{board.title}</h1>
      <hr />
      <div>{board.content}</div>
    </div>
  );
};

export default Detail;