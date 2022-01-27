import axios from "axios";
import { useEffect, useState } from "react";
import Navi from "../components/Navi";
import { Button } from "react-bootstrap";

function EveryBoardList() {
  const username = sessionStorage.getItem("username");
  const universityname = sessionStorage.getItem("universityname");
  if (username === null || universityname === null) {
    alert("로그인 해주세요");
    document.location.href = "/";
  }
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const getBoards = async () => {
    const response = (await axios.get(`/everyboards/${universityname}`)).data;
    setBoards(response);
    setLoading(false);
  };
  const buttonListStyle = {
    width: "400px",
    border: "1px solid",
    borderColor: "rgba(240, 240, 240)",
    borderRadius: "30px",
    padding: "5px",
    margin: "30px 0px 30px 0px",
  };
  const buttonStyle = { margin: "5px 20% 5px 20%" };
  useEffect(() => getBoards(), []);
  return (
    <div>
      <Navi />
      {loading ? null : (
        <div
          style={{
            marginLeft: "calc(50% - 200px)",
            marginRight: "calc(50% - 200px)",
          }}
        >
          {username !== null ? (
            <div style={buttonListStyle}>
              <Button
                href={`/mypost/${username}`}
                variant="light"
                style={buttonStyle}
              >
                내가 쓴 글
              </Button>
              <Button
                href={`/mycomment/${username}`}
                variant="light"
                style={buttonStyle}
              >
                내가 쓴 댓글
              </Button>
              <Button variant="light" style={buttonStyle}>
                스크랩
              </Button>
            </div>
          ) : null}
          <div style={buttonListStyle}>
            {boards.map((board) => (
              <Button
                href={`/everyboard/${board.ename}`}
                variant="light"
                style={buttonStyle}
              >
                {board.kname}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EveryBoardList;
