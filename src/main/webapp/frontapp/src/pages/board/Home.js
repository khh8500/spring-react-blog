import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, Pagination } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";

const Home = () => {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [model, setModel] = useState({
    totalPage: undefined,
    number: undefined,
    isFirst: true,
    isLast: false,
    boards: [],
  });

  // http://localhost:8080 -> http://localhost:8080?page=0
  // 실행시점 : 최초 렌더링
  // 변경 : page가 바뀌면 useEffect 실행되게 할 예정
  useEffect(() => {
    console.log("useEffect 실행");
    apiHome();
  }, [page, keyword]);

  async function apiHome() {
    let response = await axios({
      url: `http://localhost:8080?page=${page}&keyword=${keyword}`,
      method: "get",
    });

    setModel(response.data.body);
  }

  function prev() {
    setPage(page - 1);
  }
  function next() {
    setPage(page + 1);
  }

  function changeValue(e) {
    setKeyword(e.target.value);
    console.log("keyword", keyword);
  }

  return (
    <div>
      <Form className="d-flex mb-4" onSubmit={""}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={keyword}
          onChange={changeValue}
        />
      </Form>

            {model.boards.map((board) => (
        <BoardItem
          key={board.id}
          id={board.id}
          title={board.title}
          page={page}
        />
      ))}

      <br />
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Item onClick={prev} disabled={model.isFirst}>
            Prev
          </Pagination.Item>

          <Pagination.Item onClick={next} disabled={model.isLast}>
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;