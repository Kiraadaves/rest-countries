import { configureStore } from "@reduxjs/toolkit";
import changeThemeSlice from "./slice/themeswitcherslice"
const store = configureStore({
  reducer: {
    changeTheme: changeThemeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
