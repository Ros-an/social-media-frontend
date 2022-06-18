import { useContext, createContext, useReducer } from "react";
import React, { useEffect, useCallback } from "react";
import axios from "axios";

const PostContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "NO_MORE_POSTS": 
      return {
        ...state,
        btnLoader: false,
        postMessage: "END"
      }
    case "UPADE_PAGE_NO": 
      return {
        ...state,
        btnLoader: true,
        pageNo: state.pageNo + 1
      }
    case "LOAD_POST_DATA": {
      const newPosts = [...state.posts, ...action.payload];
      const uniquePosts = Array.from(new Set(newPosts.map(a => a._id))).map(id => {
         return newPosts.find(a => a._id === id)
      });
      return {
        ...state,
        btnLoader: false,
        posts: uniquePosts,
      };
    }
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
  pageNo: 1,
  btnLoader: false,
  postMessage: ""
};
export const PostProvider = ({ children }) => {
  const [state, postDispatch] = useReducer(reducer, initialState);
  const getAllPosts = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts?page=${state.pageNo}`
      );
      if (data.success && status === 200) {
        const posts = data.posts;
        console.log("posts", posts);
        if(posts.length){
          postDispatch({ type: "LOAD_POST_DATA", payload: posts });
        }else{
          postDispatch({
            type: "NO_MORE_POSTS"
          })
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  }, [postDispatch, state.pageNo]);
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
