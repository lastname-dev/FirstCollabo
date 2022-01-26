function Logout() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("universityname");
  document.location.href = "/login";
}

export default Logout;
