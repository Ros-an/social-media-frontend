import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  loader: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return {
        ...state,
        loader: true,
      };
    case "CLOSE_LOADER":
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const closeLoader = () => {
    dispatch({ type: "CLOSE_LOADER" });
  };
  return (
    <AuthContext.Provider value={{ ...state, dispatch, closeLoader }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
