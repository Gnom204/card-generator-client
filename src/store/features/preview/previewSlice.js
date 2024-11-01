import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setError } from "../error/errorSlice";
import { BASE_URL } from "../../../utils/configure";

export const generatePreview = createAsyncThunk(
  "preview/generatePreview",
  (prompt, thunkAPI) => {
    return fetch(BASE_URL + "/api/cards/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ prompt }),
      timeout: 220000,
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

const previewSlice = createSlice({
  name: "preview",
  initialState: {
    preview: null,
    isLoading: false,
  },
  reducers: {
    clearState: (state) => {
      state.preview = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePreview.fulfilled, (state, action) => {
        state.preview = action.payload;
        state.isLoading = false;
      })
      .addCase(generatePreview.rejected, (state, action) => {
        state.preview = null;
        state.isLoading = false;
      })
      .addCase(generatePreview.pending, (state, action) => {
        state.preview = null;
        state.isLoading = true;
      });
  },
});

export const getloading = (state) => state.isLoading;
export const getPreview = (state) => state.preview;
export const { clearState } = previewSlice.actions;
export default previewSlice.reducer;
