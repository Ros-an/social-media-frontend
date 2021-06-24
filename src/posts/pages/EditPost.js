import React, { useState, useEffect } from "react";
import { userInfo } from "../../utils/authrelated";
import { useParams, Navigate } from "react-router-dom";
import {getPostForEdit, updatePost} from "../postApi";
import { Loader } from "../../shared/components/Loader";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import "../../users/page/EditProfile.css";

function EditProfile() {
  const formData = new FormData(); //we send this to backend
  const { postId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [navigation, setNavigation] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    post: ""
  });
  const handleChange = (event) => {
    errorMessage && setErrorMessage("");
    const { name, files } = event.target;
    const value = name === "postphoto" ? files[0] : event.target.value;
    
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { post, postphoto } = data;
    formData.set("post", post);
    if (postphoto) {
      if (postphoto.size < 500000) {
        formData.set("postphoto", postphoto);
      } else {
        return setErrorMessage("image size < 500KB");
      }
    }
    setLoading(true);
    updatePost({
      formData,
      userInfo,
      setLoading,
      postId,
      setNavigation,
      setErrorMessage
    });
  };
  useEffect(() => {
    getPostForEdit({postId, setData})
  }, [postId]);

  if (navigation) {
    return <Navigate replace to={`/${userInfo().user.name.split(" ")[0]}/post/${postId}`} />;
  }

  return (
    <>
      <div className="container edit-form">
        <button className="icontype-btn" onClick={() => setNavigation(true)}>
        <ArrowBackIcon/>
        </button>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
        <label>Post</label>
          <textarea
                type="text"
                name="post"
                value={data.post}
                onChange={handleChange}
                placeholder="What do you want to talk about ?"
                style={{height: "7rem"}}
              />
          <label>Image</label>
          <input
            type="file"
            name="postphoto"
            accept="images/*"
            onChange={handleChange}
          />
          <p className="error">{errorMessage}</p>
          <button className="update" disabled={data.post.length < 5 && true}>
            {isLoading ? <Loader /> : "UPDATE"}
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
