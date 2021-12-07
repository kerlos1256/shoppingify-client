import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentActiveList } from "../../interfaces/currentActiveList";
import { NewItemData } from "../../interfaces/newItemCurrentListData";

const initialState: { value: CurrentActiveList | undefined } = {
  value: undefined,
};

export const CurrentListSlice = createSlice({
  name: "activeList",
  initialState,
  reducers: {
    addInitalList: (state, action: PayloadAction<CurrentActiveList>) => {
      state.value = action.payload;
    },
    addItem: (state, action: PayloadAction<NewItemData>) => {
      if (!state.value) return;
      const cateIndex = state.value.items.findIndex(
        (cate) => cate.id === action.payload.categoryId
      );
      if (cateIndex > -1) {
        const otherItems = state.value.items[cateIndex].items.filter(
          (item) => item.id !== action.payload.id
        );
        const { category, ...rest } = action.payload;
        state.value.items[cateIndex].items = [...otherItems, rest];
      } else {
        const { category, ...rest } = action.payload;

        state.value.items.push({ ...category, items: [rest] });
      }
    },
    deleteItem: (
      state,
      action: PayloadAction<{ categoryId: number; itemId: number }>
    ) => {
      if (!state.value) return;
      const cateIndex = state.value.items.findIndex(
        (cate) => cate.id === action.payload.categoryId
      );
      if (cateIndex > -1) {
        state.value.items[cateIndex].items = state.value.items[
          cateIndex
        ].items.filter((item) => item.id !== action.payload.itemId);
      } else {
        console.log("category not found");
      }
    },
    incressItem: (
      state,
      action: PayloadAction<{ categoryId: number; itemId: number }>
    ) => {
      if (!state.value) return;
      const cateIndex = state.value.items.findIndex(
        (cate) => cate.id === action.payload.categoryId
      );
      if (cateIndex > -1) {
        const itemIndex = state.value.items[cateIndex].items.findIndex(
          (item) => item.id === action.payload.itemId
        );
        if (itemIndex > -1) {
          state.value.items[cateIndex].items[itemIndex].quantity += 1;
        } else {
          console.log("item not found");
        }
      } else {
        console.log("category not found");
      }
    },
    decressItem: (
      state,
      action: PayloadAction<{ categoryId: number; itemId: number }>
    ) => {
      if (!state.value) return;
      const cateIndex = state.value.items.findIndex(
        (cate) => cate.id === action.payload.categoryId
      );
      if (cateIndex > -1) {
        const itemIndex = state.value.items[cateIndex].items.findIndex(
          (item) => item.id === action.payload.itemId
        );
        if (itemIndex > -1) {
          if (state.value.items[cateIndex].items[itemIndex].quantity <= 0)
            return;
          state.value.items[cateIndex].items[itemIndex].quantity -= 1;
        } else {
          console.log("item not found");
        }
      } else {
        console.log("category not found");
      }
    },
    done: (
      state,
      action: PayloadAction<{ itemId: number; categoryId: number }>
    ) => {
      if (!state.value) return;
      const cateIndex = state.value.items.findIndex(
        (cate) => cate.id === action.payload.categoryId
      );
      if (cateIndex > -1) {
        const itemIndex = state.value.items[cateIndex].items.findIndex(
          (item) => item.id === action.payload.itemId
        );
        if (itemIndex > -1) {
          state.value.items[cateIndex].items[itemIndex].done =
            !state.value.items[cateIndex].items[itemIndex].done;
        } else {
          console.log("item not found");
        }
      } else {
        console.log("category not found");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  done,
  addInitalList,
  addItem,
  decressItem,
  deleteItem,
  incressItem,
} = CurrentListSlice.actions;

export default CurrentListSlice.reducer;
