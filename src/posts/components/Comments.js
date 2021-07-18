import React, { useState } from "react";
import { userInfo } from "../../utils/authrelated";
import { addComment } from "../postApi";
import Image from "../../users/components/Image";
import DefaultAvatar from "../../assets/avatar.jpg";
import { usePostContext } from "../../context-api/PostProvider";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import "./Comments.css";
function Comments({ _id, likes, like, unlike, comments }) {
  const [update, setUpdate] = useState(comments);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);
  const { postDispatch } = usePostContext();
  const userId = userInfo()?.user?._id;
  const submitComment = (e) => {
    e.preventDefault();
    const postId = _id;
    addComment({
      userId,
      postId,
      text,
      setText,
      userInfo,
      setLoader,
      postDispatch,
      setUpdate,
    });
  };
  return (
    <section className="comments">
      <div className="post-like-comment">
        <small>
          {!likes.some((e) => e === userId) && (
            <span className="like-unlike-btn">
              <ThumbUpAltOutlinedIcon
                className="unlike pointer-cursor"
                onClick={like}
              />
            </span>
          )}
          {likes.some((e) => e === userId) && (
            <span className="like-unlike-btn">
              <ThumbUpAltRoundedIcon
                className="like pointer-cursor"
                onClick={unlike}
              />
            </span>
          )}
          <span>{likes.length === 0 ? "Like" : `${likes.length}`}</span>
        </small>
        <small onClick={() => setShow((prev) => !prev)} className="comment-btn">
          <InsertCommentOutlinedIcon className="comment-icon" />
          <span>Comment</span>
        </small>
      </div>
      <div className={`comments__body ${show ? "show" : "hide"}`}>
        <div className="comment__of-user">
          {update?.map(({ commentBy, _id, text, created }) => {
            return (
              <article className="comment" key={_id}>
                <Image
                  url={"photo"}
                  photo={DefaultAvatar}
                  id={commentBy?._id}
                  styling="avatar-img-sm"
                />
                <div className="comment__detail">
                  <h4 style={{ fontWeight: "600" }}>{commentBy?.name}</h4>
                  <p>{text}</p>
                  <p className="commented__time">{`${new Date(
                    created
                  ).toDateString()}`}</p>
                </div>
              </article>
            );
          })}
        </div>
        <form onSubmit={submitComment} className="post-comment-field">
          <input
            type="text"
            value={text}
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <button disabled={text.length <= 1 && true} type="submit">
            {loader ? "adding..." : "comment"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Comments;
