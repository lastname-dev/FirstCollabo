import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router";
import Navi from "../components/Navi";

function MyPosts() {
  const { username } = useParams();
  const sessionName = sessionStorage.getItem("username");
  if (username !== sessionName) {
    alert("다시 로그인 해주세요");
    document.location.href = "/everyboardlist";
  }
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const numOfPosts = 20;
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    setScrollTop(document.documentElement.scrollTop);
  };

  const getPosts = async () => {
    const futurePosts = (
      await axios.get(`/getposts/user/${username}/${index}/${numOfPosts}`)
    ).data;
    setPosts((currentPosts) => [...currentPosts, ...futurePosts]);
    setIndex((current) => current + 1);
    setLoading(false);
    setFirstLoading(false);
  };
  useEffect(() => {
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement.scrollHeight
    ) {
      setLoading(true);
      getPosts();
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return (
    <div>
      <Navi />
      {firstLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Table style={{ margin: "0px 30px 30px 30px", width: "80%" }}>
            <thead>
              <tr>
                <th style={{ width: "60%" }}>제목</th>
                <th style={{ width: "40%" }}>좋아요</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  id={post.id}
                  onClick={() => {
                    document.location.href = `/post/${post.id}`;
                  }}
                  style={{ height: "50px" }}
                >
                  <td>{post.title}</td>
                  <td>{post.likes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {loading ? <div>loading</div> : null}
          <div style={{ height: "70px" }}></div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
