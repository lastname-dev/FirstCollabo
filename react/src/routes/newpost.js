import { useState } from "react";
import { useParams } from "react-router";
import Navi from "../components/Navi";
import axios from "axios";
import { Button } from "react-bootstrap";

function NewPost() {
  const { name } = useParams();
  const username = sessionStorage.getItem("username");
  const universityname = sessionStorage.getItem("universityname");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    for (let i = 1; i < 100; i++) {
      await axios.post(`/newpost`, {
        boardname: name,
        title: title + i.toString(),
        content: content + i.toString(),
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        universityname: universityname,
        username: username,
      });
    }

    document.location.href = `/everyboard/${name}`;
  };
  return (
    <div>
      <Navi />
      {username === null || universityname === null ? (
        <h2>먼저 로그인 해주세요</h2>
      ) : (
        <form
          onSubmit={onSubmit}
          style={{
            width: "70%",
            height: "300px",
            margin: "100px",
          }}
        >
          <div class="form-floating" style={{ width: "100%" }}>
            <h5>제목</h5>
            <textarea
              style={{
                lineHeight: "20px",
                height: "20px",
                padding: "0 5px",
                resize: "none",
              }}
              value={title}
              onChange={handleTitle}
              type="text"
              class="form-control"
              id="title"
              maxLength="40"
            ></textarea>
          </div>
          <div class="form-floating" style={{ width: "100%" }}>
            <h5>내용</h5>
            <textarea
              style={{ minHeight: "200px", resize: "none" }}
              value={content}
              onChange={handleContent}
              type="text"
              class="form-control"
              id="content"
            ></textarea>
          </div>
          <Button class="w-100 btn btn-lg btn-secondary" type="submit">
            완료
          </Button>
        </form>
      )}
    </div>
  );
}

export default NewPost;
