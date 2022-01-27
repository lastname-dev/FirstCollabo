import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import EveryBoardList from "./routes/EveryBoardList";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signin from "./routes/Signin";
import EveryBoardPage from "./routes/EveryBoardPage";
import NewPost from "./routes/newpost";
import PostDetail from "./routes/postDetail";
import MyPost from "./routes/MyPosts";
import MyComments from "./routes/MyComment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route method="get" path="/" element={<Home />} />
        <Route method="get" path="/login" element={<Login />} />
        <Route method="get" path="/logout" element={<Logout />} />
        <Route method="get" path="/signin" element={<Signin />} />
        <Route
          method="get"
          path="/everyboardlist"
          element={<EveryBoardList />}
        />
        <Route
          method="get"
          path="/everyboard/:name"
          element={<EveryBoardPage />}
        />
        <Route method="get" path="/:name/newpost" element={<NewPost />} />
        <Route method="get" path="/post/:id" element={<PostDetail />} />
        <Route method="get" path="/mypost/:username" element={<MyPost />} />
        <Route
          method="get"
          path="/mycomment/:username"
          element={<MyComments />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
