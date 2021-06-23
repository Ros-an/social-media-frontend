import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import {userInfo} from "../../utils/authrelated";
import {Loader} from "../../shared/components/Loader";
import {Link} from "react-router-dom";
import "./PostByUser.css";

function PostByUser({id}) {
  const [posts, setPosts] = useState("");
  
  const getPostByUser = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/by_user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo().token}`,
          },
        }
      );
      if (data.success && status === 200) {
        console.log(data);
        setPosts(data.posts);
      }
    } catch (err) {
      console.log("found error", err.response);
    }
  }, [setPosts,id]);

  useEffect(() => {
    getPostByUser();
  }, [getPostByUser]);

  return (
    <section className="profile-tab__PostByUser">
      {!posts && <div className="loader"><Loader /></div>}
      {posts && posts.length === 0 && <div className="loader">No post</div>}
      {posts && <div className="post-by-user">
        {posts.map(post => {
          return (
            <Link to={`/${post.postedBy.name.split(" ")[0]}/post/${post._id}`} className="post-overview" key={post._id}>
              <small className="post-date">{new Date(post.createdAt).toDateString()}</small>
              <p>{`${post.post.substring(0,75)}...`}</p>
            </Link>
          )
        })}
        </div>}
    </section>
  );
}

export default PostByUser;
