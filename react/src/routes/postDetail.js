import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import Navi from "../components/Navi";

function PostDetail() {
  const { id } = useParams();
  const username = sessionStorage.getItem("username");
  const [postDetail, setPostDetail] = useState({});
  const [postLikes, setPostLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const getPostDetail = async () => {
    const futurePosts = (await axios.get(`/postdetail/${id}`)).data;
    const futureComments = (await axios.get(`/comments/post/${id}`)).data;
    setPostDetail(futurePosts);
    setPostLikes(futurePosts.likes);
    setComments(futureComments);
    setLoading(false);
  };
  const handleLikes = async () => {
    const response = (await axios.post(`/postdetail/${id}/likes`)).data;
    setPostLikes(response[0].likes);
  };
  const changeNewComment = (event) => {
    setNewComment(event.target.value);
  };
  const submitNewComment = async () => {
    const futureComments = (
      await axios.post(`/comments/post/${id}`, {
        username: username,
        content: newComment,
        localdate: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
    ).data;
    setNewComment("");
    setComments(futureComments);
  };
  useEffect(() => getPostDetail(), []);
  return (
    <div>
      <Navi />
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <div
          style={{
            margin: "20px",
            width: "calc(100% - 240px)",
          }}
        >
          <h5
            style={{
              paddingBottom: "15px",
              borderBottomStyle: "solid",
              borderBottomWidth: "3px",
              width: "100%",
            }}
          >
            {postDetail.kname}
          </h5>
          <br></br>
          <div
            style={{
              float: "left",
              paddingBottom: "10px",
              borderBottomStyle: "solid",
              borderBottomWidth: "1.5px",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <h5
              style={{
                float: "left",
              }}
            >
              {postDetail.title}
            </h5>
            <h5
              style={{
                float: "right",
              }}
            >
              {postDetail.username}
            </h5>
          </div>

          <p
            style={{
              paddingBottom: "20px",
              borderBottomStyle: "solid",
              borderBottomWidth: "1.5px",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            {postDetail.content}
          </p>
          <div style={{ height: "30px" }}></div>
          <Button
            onClick={handleLikes}
            variant="info"
          >{`좋아요 ${postLikes}`}</Button>
          <div style={{ height: "30px" }}></div>
          <div>
            <h5
              style={{
                paddingBottom: "15px",
                borderBottomStyle: "solid",
                borderBottomWidth: "3px",
                width: "100%",
              }}
            >
              {`댓글 수: ${comments.length}`}
            </h5>
            {comments.map((comment) => (
              <div
                style={{
                  margin: "5px",
                }}
              >
                <p style={{ width: "10%", float: "left" }}>
                  {comment.username}
                </p>
                <p style={{ width: "90%", float: "right" }}>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
          <div style={{ padding: "20px 0px 20px 0px" }}>
            <textarea
              style={{
                lineHeight: "20px",
                padding: "0 5px",
                resize: "none",
                width: "calc(100% - 60px)",
                float: "left",
                height: "70px",
              }}
              value={newComment}
              onChange={changeNewComment}
              type="text"
              class="form-control"
              id="newComment"
              maxLength="120"
            ></textarea>
            <Button
              onClick={submitNewComment}
              style={{ height: "70px", width: "60px", float: "right" }}
              class="w-100 btn btn-lg btn-secondary"
            >
              댓글 등록
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
