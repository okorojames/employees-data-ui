import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import NewEmployee from "./NewEmployee";
import UpdateEmployee from "./UpdateEmployee";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user_data"));

  // handleLogOut
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  //
  return (
    <>
      <div className="company_nav">
        <p className="nav_logo">Employee Infos</p>
        {loggedInUser ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <div className="login_btns">
            <button
              onClick={() => navigate("/register")}
              style={{ marginRight: "10px" }}
            >
              Register
            </button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
      </div>
      <main className="main_container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/new-employee" element={<NewEmployee />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/update-employee/:id"
            element={<UpdateEmployee />}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
