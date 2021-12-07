import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decodedUser, getUser } from "../../utils/localStorage";

const initialState: {
  value: Promise<decodedUser | null> | decodedUser | null;
} = { value: getUser() };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<decodedUser>) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeUser, setUser } = userSlice.actions;

export default userSlice.reducer;
