import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../utils/configure";
import { setError } from "../error/errorSlice";

export const fetchOtherLessons = createAsyncThunk(
  "otherLessons/fetchOtherLessons",
  (_, thunkAPI) => {
    return fetch(BASE_URL + "/api/cards/public", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        thunkAPI.dispatch(setError(message));
        return thunkAPI.rejectWithValue();
      });
  }
);

export const otherLessons = createSlice({
  name: "otherLessons",
  initialState: {
    otherLessons: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherLessons.fulfilled, (state, action) => {
        state.otherLessons = action.payload;
      })
      .addCase(fetchOtherLessons.rejected, (state, action) => {
        state.otherLessons = null;
      });
  },
});
