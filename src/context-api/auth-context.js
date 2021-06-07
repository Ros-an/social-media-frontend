import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  loader: false,
  x: 0,
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
    case "ONPAGE_LOAD":
      return {
        ...state,
        loader: true,
        x: 1,
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
  if (!state.x) {
    console.log("authcontext se control");
    dispatch({ type: "ONPAGE_LOAD" });
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch, closeLoader }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
