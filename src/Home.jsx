import React, { useContext, useState, useEffect } from "react";
import useFetch from "./useFetch";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user_data"));
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, []);
  // fecthing data using useFetch hook

  const {
    data: employees,
    loading,
    error,
  } = useFetch(
    "https://employees-api-kmv5.onrender.com/api/employees/get-employees"
  );

  // handleRemoveEmployee
  const handleRemoveEmployee = async (id) => {
    try {
      const res = await fetch(
        `https://employees-api-kmv5.onrender.com/api/employees/delete-employee/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  //
  const [filterInput, setFilterInput] = useState("");

  // rendering data here
  return (
    <article className="nav_and_homepage">
      {/*  */}
      <nav>
        <form className="nav_form">
          <input
            type="search"
            placeholder="Search Employee"
            className="nav_input"
            onKeyUp={(e) => setFilterInput(e.target.value.toLowerCase())}
          />
          <i className="bx bx-search"></i>
        </form>
      </nav>
      {/*  */}
      <div className="home_page">
        {employees && employees.length === 0 ? (
          <p className="no_employee">No Emplyee Available</p>
        ) : (
          <table className="employees_table">
            <thead className="employees_header">
              <tr>
                <th>First-name</th>
                <th>Last-name</th>
                <th>Phone-no.</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees
                  .filter((employee) => {
                    if (employee === "") return employee;
                    else if (
                      employee.email
                        .toLowerCase()
                        .includes(filterInput.toLowerCase())
                    )
                      return employee;
                  })
                  .map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.email}</td>
                      <td className="home_icon_row">
                        <Link to={`/update-employee/${employee._id}`}>
                          <span className="home_icon_col first_one">
                            <i className="bx bx-edit"></i>
                            Edit
                          </span>
                        </Link>

                        <span
                          className="second_one"
                          onClick={() => handleRemoveEmployee(employee._id)}
                        >
                          <i className="bx bx-x-circle"></i>
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
      </div>
      <Link to="/new-employee" className="home_btn">
        <i className="bx bx-user-plus"></i>Register
      </Link>
    </article>
  );
};

export default Home;
