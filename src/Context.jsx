import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//
export const Context = createContext();

//
const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  // states
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // employee info inputs
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  // const preFetched Datas
  const [preData, setPreData] = useState();

  // handle change in inputs
  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value.trim());
  };
  const handleLastNameInput = (e) => {
    setLastName(e.target.value.trim());
  };
  const handlePhoneInput = (e) => {
    setPhone(e.target.value.trim());
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value.trim());
  };
  // handle change in inputs
  const firstNameUpdateHandle = (e) => {
    setFirstName(e.target.value.trimStart());
  };
  const lastNameUpdateHandle = (e) => {
    setLastName(e.target.value.trimStart());
  };
  const phoneUpdateHandle = (e) => {
    setPhone(e.target.value.trimStart());
  };
  const emailUpdateHandle = (e) => {
    setEmail(e.target.value.trimStart());
  };

  //
  const employeeInfos = { firstName, lastName, phone, email };

  // handle submit and post function
  const handlePostEmployeeInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://employees-api-kmv5.onrender.com/api/employees/post-employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeInfos),
        }
      );
      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <Context.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
        error,
        setError,
        handleFirstNameInput,
        handleLastNameInput,
        handlePhoneInput,
        handleEmailInput,
        handlePostEmployeeInfo,
        preData,
        setPreData,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phone,
        setPhone,
        email,
        setEmail,
        firstNameUpdateHandle,
        lastNameUpdateHandle,
        phoneUpdateHandle,
        emailUpdateHandle,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
