import { useContext, createContext, useReducer } from "react";

const PostContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_POST_DATA":
      return {
        ...state,
        posts: action.payload.reverse(),
      };
    case "RELOAD":
      return {
        ...state,
        loader: !state.loader,
      };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  loader: false,
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
