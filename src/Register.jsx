import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loadingGif from "./assets/loading.gif";

const Register = () => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user_data"));
  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, []);
  //
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //

  // handle post user
  const handlePostUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        "http://localhost:2500/api/auth/register-employer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            password,
          }),
        }
      );
      const data = await res.json();
      if (res) setIsLoading(false);
      if (res.ok) {
        localStorage.setItem("user_data", JSON.stringify(data));
        navigate("/");
      }
      if (!res.ok) {
        setError(data.msg);
        setTimeout(() => {
          setError("");
        }, [4000]);
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
      <div className="register_context">Register</div>
      {error && (
        <p style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}
      <form className="register_form" onSubmit={handlePostUser}>
        <input
          type="text"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="mobile"
          placeholder="phone no."
          onChange={(e) => setPhone(e.target.value)}
        />
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
        <input
          type="confirm password"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="register_btn">Register</button>
        <p className="register_footer">
          Already have an account?
          <Link to="/login" className="register_link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
