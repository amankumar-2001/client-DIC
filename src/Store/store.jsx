import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    console.log({ err });
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export default store;