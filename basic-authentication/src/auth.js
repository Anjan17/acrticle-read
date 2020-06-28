import { useContext, createContext } from "react";

export const authContext = createContext();

export const useAuth = () => useContext(authContext);