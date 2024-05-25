import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: "light",
};

const changeThemeSlice = createSlice({
  name: "changeTheme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
