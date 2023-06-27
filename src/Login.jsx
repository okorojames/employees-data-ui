import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loadingGif from "./assets/loading.gif";

const Login = () => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user_data"));
  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, []);

  //
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const handleLogin
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://employees-api-kmv5.onrender.com/api/auth/login-employer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (res) {
        setIsLoading(false);
      }
      if (!res.ok) {
        setError(data.msg);
      }
      if (res.ok) {
        localStorage.setItem("user_data", JSON.stringify(data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <div className="register_section">
      {isLoading && (
        <div className="loading_overlay">
          <img src={loadingGif} className="loading_gif" />
        </div>
      )}
      <div className="register_context">Login</div>
      {error && (
        <p style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}
      <form className="register_form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register_btn">Login</button>
        <p className="register_footer">
          Don't have an account?
          <Link to="/register" className="register_link">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
