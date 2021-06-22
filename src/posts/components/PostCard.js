import React, { useState } from "react";
import DefaultAvatar from "../../assets/avatar.jpg";
import Image from "../../users/components/Image";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
function PostCard({ data }) {
  const [show, setShow] = useState(false);
  const {
    post,
    _id,
    postphoto,
    createdAt,
    postedBy: { name, userphoto },
  } = data;
  return (
    <div className="post-card">
      <div className="post-user">
        <Image
          url={"photo"}
          photo={DefaultAvatar}
          id={data.postedBy._id}
          hasImage={userphoto}
          styling="avatar-img"
        />
        <div className="user-detail">
          <p className="user-name">{name}</p>
          <small style={{ color: "gray", fontSize: "0.7rem" }}>{`${new Date(
            createdAt
          ).toDateString()}`}</small>
        </div>
      </div>
      <div className="post-detail">
        <p className="post">
          {post.length <= 120 && post}
          {post.length > 120 &&
            (show ? `${post}` : `${post.substring(0, 100)}...`)}
          {post.length > 120 && (
            <button className="show-btn" onClick={() => setShow(!show)}>
              {show ? "show less" : "show more"}
            </button>
          )}
        </p>
        {postphoto && (
          <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${_id}`}
            alt={name}
          />
        )}
      </div>
      <div className="post-like-comment">
        <small>
          <ThumbUpAltOutlinedIcon className="like" />
          <span>Like</span>
        </small>
        <small>
          <InsertCommentOutlinedIcon className="comment" />
          <span>Comment</span>
        </small>
      </div>
    </div>
  );
}

export default PostCard;
