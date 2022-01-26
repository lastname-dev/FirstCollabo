import axios from "axios";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [universityename, setUniversityename] = useState("");
  const [universitykname, setUniversitykname] = useState("");
  const [universities, setUniversities] = useState("");
  const [loading, setLoading] = useState(true);
  const getUniversities = async () => {
    const data = (await axios.get("/universities")).data;
    console.log(data);
    setUniversities(data);

    setLoading(false);
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleUniversityname = (event) => {
    setUniversitykname(event.target.value.split(" ")[0]);
    setUniversityename(event.target.value.split(" ")[1]);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post("/signin", {
      username: username,
      password: password,
      universityname: universityename,
    });
    document.location.href = "/login";
  };

  useEffect(() => getUniversities(), []);
  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      {loading ? (
        <div>loading</div>
      ) : (
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
          <div>
            <input
              value={universitykname}
              onChange={handleUniversityname}
              type="text"
              class="form-control"
              id="universityname"
              placeholder="University Name"
              list="universitylist"
            />
            <datalist id="universitylist">
              {universities.map((university) => (
                <option
                  value={`${university.kname}대학교 ${university.ename}`}
                />
              ))}
            </datalist>
          </div>
          <Button class="w-100 btn btn-lg btn-secondary" type="submit">
            Sign in
          </Button>
        </form>
      )}
    </div>
  );
}

export default Signin;
