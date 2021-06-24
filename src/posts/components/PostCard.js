import React, { useState } from "react";
import DefaultAvatar from "../../assets/avatar.jpg";
import Image from "../../users/components/Image";
import {Link} from "react-router-dom";
import {userInfo} from "../../utils/authrelated";
import { addToLikeList, removeFromLikeList } from "../postApi";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import {usePostContext} from "../../context-api/PostProvider";
function PostCard({ data }) {
  const [show, setShow] = useState(false);
  const [update,setUpdate] = useState(data);
  const { postDispatch } = usePostContext();
  const {
    post,
    _id,
    postphoto,
    likes,
    createdAt,
    postedBy: { name },
  } = update;
  const like = () => {
    const userId = userInfo().user._id;
    const postId = _id;
    addToLikeList({userInfo,
      postDispatch,
      postId,
      userId,
      setUpdate})
  }
  const unlike = () => {
    const userId = userInfo().user._id;
    const postId = _id;
    removeFromLikeList({userInfo,
      postDispatch,
      postId,
      userId,
      setUpdate})
  }
  return (
    <div className="post-card">
      <div className="post-user">
        <Image
          url={"photo"}
          photo={DefaultAvatar}
          id={update.postedBy._id}
          styling="avatar-img"
        />
        <div className="user-detail">
          <Link to={`/${name.split(" ")[0]}/${update.postedBy._id}`} className="user-name">{name}</Link>
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
          {!likes.some(e => e === userInfo().user._id) && <ThumbUpAltOutlinedIcon className="unlike pointer-cursor" onClick={like}/>}
          {likes.some(e => e === userInfo().user._id) && <ThumbUpAltRoundedIcon className="like pointer-cursor" onClick={unlike}/>}
          <span>{likes.length === 0 ? "Like": `${likes.length}`}</span>
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
