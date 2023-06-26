import React, { useContext, useEffect, useState } from "react";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import { Context } from "./Context";

const UpdateEmployee = () => {
  //
  const navigate = useNavigate();

  //
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    preData,
    setPreData,
    firstNameUpdateHandle,
    lastNameUpdateHandle,
    phoneUpdateHandle,
    emailUpdateHandle,
  } = useContext(Context);
  const [favorite, setFavorite] = useState();
  //
  const { id } = useParams();
  // pre-fetch
  useEffect(() => {
    const handlePretch = async () => {
      // const res = await fetch(
      //   `https://employees-api-kmv5.onrender.com/api/employees/get-employee/${id}`
      // );
      const res = await fetch(
        `http://localhost:2500/api/employees/get-employee/${id}`
      );
      const data = await res.json();
      setPreData(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      setEmail(data.email);
      setFavorite(data.favorite);
    };
    handlePretch();
  }, []);

  // handle update
  const handleUpdateEmployeeInfo = async (e) => {
    e.preventDefault();
    try {
      // const res = await fetch(
      //   `https://employees-api-kmv5.onrender.com/api/employees/update-employee/${id}`,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ firstName, lastName, phone, email }),
      //   }
      const res = await fetch(
        `http://localhost:2500/api/employees/update-employee/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, phone, email, favorite }),
        }
      );
      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateFavorite = async (e) => {
    setFavorite(!favorite);
  };

  //
  return (
    <div className="new_employee_section">
      {preData && (
        <Link to="/" className="back_to_home">
          <i className="bx bx-chevron-left bx_back_icon"></i>
        </Link>
      )}
      {preData && <h3 className="new_employee_header">Update Employee</h3>}
      {preData && (
        <form className="new_employee_form">
          <div className="form_group">
            <i className="bx bx-user"></i>
            <input
              type="text"
              placeholder="first name"
              className="new_employee_input"
              value={firstName}
              onChange={firstNameUpdateHandle}
            />
          </div>
          <div className="form_group">
            <i className="bx bx-checkbox"></i>
            <input
              type="text"
              placeholder="last name"
              className="new_employee_input"
              value={lastName}
              onChange={lastNameUpdateHandle}
            />
          </div>
          <div className="form_group">
            <i className="bx bx-phone"></i>
            <input
              type="mobile"
              placeholder="mobile"
              className="new_employee_input"
              value={phone}
              onChange={phoneUpdateHandle}
            />
          </div>
          <div className="form_group">
            <i className="bx bx-envelope"></i>
            <input
              type="email"
              placeholder="email"
              className="new_employee_input"
              value={email}
              onChange={emailUpdateHandle}
            />
          </div>
          {preData && favorite ? (
            <i className="bx bxs-heart" onClick={updateFavorite}></i>
          ) : (
            <i className="bx bx-heart" onClick={updateFavorite}></i>
          )}
          <button
            className="new_employee_btn"
            onClick={handleUpdateEmployeeInfo}
          >
            Update Employee
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateEmployee;
