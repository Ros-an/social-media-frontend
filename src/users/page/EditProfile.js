import React, { useState, useEffect } from "react";
import { userInfo, updateLocalData } from "../../utils/authrelated";
import { useParams } from "react-router-dom";
import { userDataForEdit, updateProfile } from "../index";
import { Navigate } from "react-router-dom";
import { Loader } from "../../shared/components/Loader";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import "./EditProfile.css";

function EditProfile() {
  const formData = new FormData(); //we send this to backend
  const { userId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [navigation, setNavigation] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const handleOnChange = (event) => {
    errorMessage && setErrorMessage("");
    const { name, files } = event.target;

    const value =
      name === "userphoto" || name === "background"
        ? files[0]
        : event.target.value;
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    const { name, email, password } = data;
    event.preventDefault();

    if (name.length < 3) {
      return setErrorMessage("Name length atleast 3");
    }
    if (email.length < 1) {
      return setErrorMessage("Email is required!");
    }
    if (password.length > 0 && password.length < 8) {
      return setErrorMessage("password must be of atleast 8 characters");
    }

    if (name && email) {
      formData.set("name", name);
      formData.set("email", email);
      formData.set("about", data.about);
      if (data.userphoto) {
        if (data.userphoto.size < 120000) {
          formData.set("userphoto", data.userphoto);
        } else {
          return setErrorMessage("profile photo should be less than  120KB");
        }
      }
      if (data.background) {
        if (data.background.size < 250000) {
          formData.set("background", data.background);
        } else {
          return setErrorMessage("background image should be less than  250KB");
        }
      }
      data.background && formData.set("background", data.background);
      password && formData.set("password", password);

      setLoading(true);
      updateProfile({
        userInfo,
        userId,
        formData,
        setNavigation,
        setErrorMessage,
        setLoading,
        updateLocalData,
      });
    }
  };

  useEffect(() => {
    userDataForEdit({ setData, userId, userInfo });
  }, [userId]);

  if (navigation) {
    return <Navigate to={`/${userInfo().user.name.split(" ")[0]}/${userId}`} />;
  }

  return (
    <>
      <div className="container edit-form">
        <button className="icontype-btn" onClick={() => setNavigation(true)}>
        <ArrowBackIcon/>
        </button>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <p className="error">{errorMessage}</p>
          <label>Background Image</label>
          <input
            type="file"
            name="background"
            accept="images/*"
            onChange={handleOnChange}
          />
          <label>Profile Pic</label>
          <input
            type="file"
            name="userphoto"
            accept="images/*"
            onChange={handleOnChange}
          />
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="FullName"
            value={data.name}
            onChange={handleOnChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleOnChange}
          />
          <label>About</label>
          <textarea
            type="text"
            name="about"
            value={data.about}
            placeholder="write about yourself"
            onChange={handleOnChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="update password"
            value={data.password}
            onChange={handleOnChange}
          />
          <button className="update">
            {isLoading ? <Loader /> : "UPDATE"}
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
