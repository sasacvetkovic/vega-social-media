import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  setIsCurrentUserLoaded: () => null,
  currentUser: null,
  isCurrentUserLoaded: false,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_IS_CURRENT_USER_LOADED: "SET_IS_CURRENT_USER_LOADED",
};

const INITIAL_STATE = {
  currentUser: null,
  isCurrentUserLoaded: false,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SET_IS_CURRENT_USER_LOADED:
      return { ...state, isCurrentUserLoaded: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser, isCurrentUserLoaded }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) =>
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

  const setIsCurrentUserLoaded = (loaded) =>
    dispatch(
      createAction(USER_ACTION_TYPES.SET_IS_CURRENT_USER_LOADED, loaded)
    );

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      setIsCurrentUserLoaded(true)
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isCurrentUserLoaded
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
