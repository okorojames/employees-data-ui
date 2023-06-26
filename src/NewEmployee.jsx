import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";

const NewEmployee = () => {
  //states and functions from context
  const {
    handleFirstNameInput,
    handleLastNameInput,
    handlePhoneInput,
    handleEmailInput,
    handlePostEmployeeInfo,
  } = useContext(Context);
  //
  return (
    <div className="new_employee_section">
      <Link to="/" className="back_to_home">
        <i className="bx bx-chevron-left bx_back_icon"></i>
      </Link>
      <h3 className="new_employee_header">Add New Employee</h3>
      <form className="new_employee_form">
        <div className="form_group">
          <i className="bx bx-user"></i>
          <input
            type="text"
            placeholder="first name"
            className="new_employee_input"
            onChange={handleFirstNameInput}
          />
        </div>
        <div className="form_group">
          <i className="bx bx-checkbox"></i>
          <input
            type="text"
            placeholder="last name"
            className="new_employee_input"
            onChange={handleLastNameInput}
          />
        </div>
        <div className="form_group">
          <i className="bx bx-phone"></i>
          <input
            type="mobile"
            placeholder="mobile"
            className="new_employee_input"
            onChange={handlePhoneInput}
          />
        </div>
        <div className="form_group">
          <i className="bx bx-envelope"></i>
          <input
            type="email"
            placeholder="email"
            className="new_employee_input"
            onChange={handleEmailInput}
          />
        </div>
        <button className="new_employee_btn" onClick={handlePostEmployeeInfo}>
          Register
        </button>
      </form>
    </div>
  );
};

export default NewEmployee;
