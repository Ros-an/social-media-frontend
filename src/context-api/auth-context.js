import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  authorised: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NAVLINK_CONTROL":
      return {
        ...state,
        authorised: true,
      };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
