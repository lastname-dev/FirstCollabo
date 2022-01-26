import axios from "axios";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = (
      await axios.post("/login", {
        username: username,
        password: password,
      })
    ).data;
    if (data === "none") {
      alert("ID or Password is invalid");
    } else {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("universityname", data);
      document.location.href = "/";
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <form
        onSubmit={onSubmit}
        style={{
          width: "300px",
          height: "300px",
          margin: "auto",
        }}
      >
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input
            value={username}
            onChange={handleUsername}
            type="text"
            class="form-control"
            id="username"
            placeholder="username"
          />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <Button class="w-100 btn btn-lg btn-primary" type="submit">
          Log in
        </Button>
        <Button class="w-100 btn btn-lg" variant="secondary" href="/signin">
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default Login;
