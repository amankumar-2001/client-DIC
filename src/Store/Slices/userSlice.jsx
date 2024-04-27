import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
    profileImage: "",
  },
  reducers: {
    loginUser(state, action) {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        userId: action.payload.userId,
        profileImage: action.payload.profileImage,
      };
    },
    logoutUser(state, action) {
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        userId: "",
        profileImage: "",
      };
    },
  },
});

export default userSlice.reducer;

export const { loginUser, logoutUser } = userSlice.actions;
