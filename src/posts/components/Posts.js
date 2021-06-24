import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { usePostContext } from "../../context-api/PostProvider";
import PostCard from "./PostCard";
import { ContentLoader } from "../../shared/components/Loader";

import "./Posts.css";

function Posts() {
  const { posts, postDispatch } = usePostContext();
  const getAllPosts = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`
      );
      if (data.success && status === 200) {
        const posts = data.posts.reverse()
        postDispatch({ type: "LOAD_POST_DATA", payload: posts });
      }
    } catch (err) {
      console.log(err.response);
    }
  }, [postDispatch]);
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    <>
      {posts.length === 0 && <ContentLoader />}
      {posts && posts.map((post) => <PostCard data={post} key={post._id} />)}
    </>
  );
}

export default Posts;
