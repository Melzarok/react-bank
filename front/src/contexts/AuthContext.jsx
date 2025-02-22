import { createContext } from "react";

const initialState = {
  token: null,
  user: null,
};

export const AuthContext = createContext(null);
