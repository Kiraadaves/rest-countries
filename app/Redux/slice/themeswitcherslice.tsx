import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const countryDetails = createAsyncThunk(
  "countryDetails",
  async (capital, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/capital/${capital}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export interface ThemeState {
  theme: string;
  countries: string[];
  loading: boolean;
  error: boolean;
}

const initialState: ThemeState = {
  theme: "light",
  countries: [],
  loading: false,
  error: false,
};

const changeThemeSlice = createSlice({
  name: "changeTheme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(countryDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(countryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.error = false;
      })
      .addCase(countryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setTheme } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
