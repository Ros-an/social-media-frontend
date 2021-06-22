import { createContext, useContext, useReducer } from "react";

const GeneralContext = createContext();

const initialState = {
  toast: false,
  loader: false,
  toastMessage: "Toast Message",
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
    case "TOAST_CLOSE":
      return {
        ...state,
        toast: false,
      };
    case "TOAST_OPEN":
      return {
        ...state,
        toast: true,
        toastMessage: action.payload,
      };
    default:
      return state;
  }
};
export const GeneralTaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeToast = () => {
    dispatch({ type: "TOAST_CLOSE" });
  };
  const closeLoader = () => {
    dispatch({ type: "CLOSE_LOADER" });
  };
  if (!state.x) {
    dispatch({ type: "ONPAGE_LOAD" });
  }
  return (
    <GeneralContext.Provider
      value={{ ...state, dispatch, closeLoader, closeToast }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
export const useGeneralContext = () => {
  return useContext(GeneralContext);
};
