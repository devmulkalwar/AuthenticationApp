import { createContext, useContext } from "react";
// Create a Context for the global state
export const GlobalContext = createContext();
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};