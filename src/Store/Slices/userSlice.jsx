import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    loginUser(state, action) {
       state.push(action.payload);
       console.log(action.payload); 
    },
    logoutUser(state, action) {},
  },
});

export default userSlice.reducer;
export const {loginUser} = userSlice.actions;

