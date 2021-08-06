import { useContext, createContext, useReducer } from "react";
import React, { useEffect, useCallback } from "react";
import axios from "axios";

const PostContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_POST_DATA":
      return {
        ...state,
        posts: action.payload,
      };
    case "ADD_POST":
      state.posts.splice(0, 0, action.payload);
      return {
        ...state,
      };
    case "UPDATE":
      const updatePost = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return {
        ...state,
        posts: updatePost,
      };
    case "RELOAD":
      return {
        ...state,
        load: !state.load,
      };
    case "REMOVE":
      const newPosts = state.posts.filter(
        (post) => post._id !== action.payload
      );
      return {
        ...state,
        posts: newPosts,
      };

    default:
      return state;
  }
};

const initialState = {
  posts: [],
  load: false,
};
export const PostProvider = ({ children }) => {
  const [state, postDispatch] = useReducer(reducer, initialState);
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
    <PostContext.Provider value={{ ...state, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
