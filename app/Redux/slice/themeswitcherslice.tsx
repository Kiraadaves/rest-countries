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

//interface Countries {
//  countries: Array<{
//    capital: string;
//    commonName: string;
//    countryName: string;
//    flag: string;
//    population: number;
//    region: string;
//  }>;
//}

export interface ThemeState {
  theme: string;
  capital: string;
  countries: Array<{}>;
  loading: boolean;
  error: boolean;
  success: boolean;
}

const initialState: ThemeState = {
  theme: "dark",
  capital: "",
  countries: [],
  loading: false,
  error: false,
  success: false,
};

const changeThemeSlice = createSlice({
  name: "changeTheme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setCapital(state, action) {
      state.capital = action.payload;
    },
    setCountriesState(state, action) {
      state.countries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(countryDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(countryDetails.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.countries = action.payload;
        state.error = false;
      })
      .addCase(countryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  },
});

export const theme = (state: { changeTheme: ThemeState }) =>
  state.changeTheme.theme;

export const { setTheme, setCapital, setCountriesState } =
  changeThemeSlice.actions;
export default changeThemeSlice.reducer;
