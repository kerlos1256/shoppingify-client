import categories from "./slices/categories";
import currentList from "./slices/listSlice";
import sidebarSlice from "./slices/sidebarSlice";
import userSlice from "./slices/userSlice";

export const reducer = {
  categories: categories,
  currentList: currentList,
  userSlice: userSlice,
  sidebarSlice: sidebarSlice,
};
