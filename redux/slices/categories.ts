import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PublicCategoriesData } from "../../interfaces/publicCategoriesData";

const initialState: PublicCategoriesData[] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<PublicCategoriesData[]>) => {
      action.payload.forEach((cate, index) => {
        const cateExists = state.findIndex((Cate) => Cate.id === cate.id);
        if (cateExists > -1) {
          cate.items.forEach((item, index) => {
            const itemExists = state[cateExists].items.findIndex(
              (Item) => Item.id === item.id
            );

            if (itemExists < 0) {
              state[cateExists].items.push(item);
            }
          });
        } else {
          state.push(cate);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = categoriesSlice.actions;

export default categoriesSlice.reducer;
