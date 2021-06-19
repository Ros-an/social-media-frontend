import React, { useState, useRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import DefaultAvatar from "../../assets/avatar.jpg";
import ImageIcon from "@material-ui/icons/Image";
import { userInfo } from "../../utils/authrelated";
import "./CreatePostModal.css";

export default function TransitionsModal() {
  const [modalToggle, setModalToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileRef = useRef();
  const formData = new FormData();
  const [data, setData] = useState({
    post: "",
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
  const uploadFile = () => {
    fileRef.current.click();
  };
  const handleSubmit = () => {
    console.log("submit button");
    const { post, postphoto } = data;
    formData.set("post", post);
    if (postphoto) {
      if (postphoto.size < 500000) {
        formData.set("postphoto", postphoto);
      } else {
        console.log("this is error segment");
        return setErrorMessage("image size < 500KB");
      }
    }
    for (let [name, value] of formData) {
      console.log(name, value);
    }
  };

  return (
    <div>
      <div className="transition-modal-button">
        <img
          src={`${process.env.REACT_APP_API_URL}/user/photo/${
            userInfo().user._id
          }`}
          alt={"user"}
          className="avatar-img"
          onError={(i) => (i.target.src = `${DefaultAvatar}`)}
        />
        <button
          onClick={() => setModalToggle(!modalToggle)}
          className="write-a-post"
        >
          write a post.{" "}
        </button>
      </div>
      {modalToggle && (
        <div className="modal-position">
          <div className="transition-modal">
            <div className="modal-header">
              <h2 id="transition-modal-title">Create a post</h2>
              <CloseIcon
                onClick={() => setModalToggle(!modalToggle)}
                className="pointer-cursor"
              />
            </div>
            <div id="transition-modal-description">
              <div className="transition-modal-user">
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${
                    userInfo().user._id
                  }`}
                  alt={"user"}
                  className="avatar-img"
                  onError={(i) => (i.target.src = `${DefaultAvatar}`)}
                />
                <h3>User name will be here</h3>
              </div>
              <textarea
                type="text"
                name="post"
                value={data.post}
                onChange={handleChange}
                placeholder="What do you want to talk about ?"
              />
            </div>
            <div className="transition-modal-submit">
              <input
                type="file"
                name="postphoto"
                style={{ display: "none" }}
                accept="images/*"
                ref={fileRef}
                onChange={handleChange}
              />
              <div className="image-upload">
                <ImageIcon
                  className="pointer-cursor image-upload-btn"
                  onClick={uploadFile}
                />
                <small>
                  <span style={{ color: "red" }}>
                    {errorMessage && `${errorMessage}`}
                  </span>
                  {data.postphoto &&
                    !errorMessage &&
                    `${data.postphoto.name.substring(0, 20)}...`}
                </small>
              </div>
              <button
                disabled={data.post.length === 0 && true}
                type="button"
                className="post-btn pointer-cursor"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
