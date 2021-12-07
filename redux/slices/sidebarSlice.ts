import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface SideBarStateProps {
  state: "edit" | "complete" | "itemDetials" | "noActive" | "addItem";
  itemId?: number | undefined;
}

const initialState: { value: SideBarStateProps } = {
  value: { state: "complete", itemId: undefined },
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<SideBarStateProps>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeState } = sidebarSlice.actions;

export default sidebarSlice.reducer;
