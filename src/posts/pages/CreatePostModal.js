import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import DefaultAvatar from "../../assets/avatar.jpg";
import ImageIcon from "@material-ui/icons/Image";
import "./CreatePostModal.css";

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="transition-modal-button">
        <img src={DefaultAvatar} alt={"user"} className="avatar-img" />
        <button onClick={handleOpen} className="write-a-post">
          write a post.{" "}
        </button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal-position"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="transition-modal">
            <div className="modal-header">
              <h2 id="transition-modal-title">Create a post</h2>
              <CloseIcon onClick={handleClose} className="pointer-cursor" />
            </div>
            <div id="transition-modal-description">
              <div className="transition-modal-user">
                <img src={DefaultAvatar} alt={"user"} className="avatar-img" />
                <h3>User name will be here</h3>
              </div>
              <textarea
                type="text"
                name="body"
                placeholder="What do you want to talk about ?"
              />
            </div>
            <div className="transition-modal-submit">
              <ImageIcon className="pointer-cursor" />
              <button className="post-btn pointer-cursor">Post</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
