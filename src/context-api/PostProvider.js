import { useContext, createContext, useReducer } from "react";

const PostContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {
  posts: [],
};
export const PostProvider = ({ children }) => {
  const [state, postDispatch] = useReducer(reducer, initialState);
  return (
    <PostContext.Provider value={{ ...state, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
