import "../css/style.css";
function Navi() {
  const username = sessionStorage.getItem("username");
  const handleHome = () => {
    document.location.href = "/";
  };
  const handleBoard = () => {
    document.location.href = "/everyboardlist";
  };
  const handleLogin = () => {
    document.location.href = "/login";
  };
  const handleLogout = () => {
    document.location.href = "/logout";
  };
  return (
    <div className="nav">
      <div className="nav__list">
        <div onClick={handleHome} className="nav__btn">
          HOME
        </div>
        <div onClick={handleBoard} className="nav__btn">
          게시판
        </div>
        {username === null ? (
          <div onClick={handleLogin} className="nav__btn">
            LOG IN
          </div>
        ) : (
          <div onClick={handleLogout} className="nav__btn">
            LOG OUT
          </div>
        )}
      </div>
    </div>
  );
}

export default Navi;
