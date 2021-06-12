import React, { useState, useEffect } from "react";
import { userInfo } from "../../utils/authrelated";
import { useParams } from "react-router-dom";
import { userDataForEdit, updateProfile } from "../index";
import { Navigate } from "react-router-dom";
import { Loader } from "../../shared/components/Loader";

import "./EditProfileForm.css";
function EditProfileForm() {
  const { userId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [navigation, setNavigation] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = data;
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setErrorMessage("");
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (name.length < 3) {
      return setErrorMessage("username length atleast 3");
    }
    if (password.length > 0) {
      if (password.length < 8) {
        return setErrorMessage("password must be of atleast 8 characters");
      }
    }
    console.log(data);
    if (name && email) {
      let user;
      if (!password) {
        user = { name, email };
      } else {
        user = { name, email, password };
      }
      updateProfile({
        userInfo,
        userId,
        user,
        setNavigation,
        setErrorMessage,
        setLoading,
      });
    }
  };
  useEffect(() => {
    userDataForEdit({ setData, userId, userInfo });
  }, [userId]);
  if (navigation) {
    return <Navigate to={`/${userInfo().user.name}/${userId}`} />;
  }
  return (
    <div className="container edit-form">
      <h2>Edit Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          type="text"
          name="name"
          placeholder="FullName"
          value={data.name}
          onChange={handleOnChange}
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleOnChange}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="update password"
          value={data.password}
          onChange={handleOnChange}
        />
        <p className="error">{errorMessage}</p>
        <button className="update">{isLoading ? <Loader /> : "UPDATE"}</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
