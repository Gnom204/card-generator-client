import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: null,
    type: null,
    start: false,
  },
  reducers: {
    setAlert: (state, action) => {
      state.start = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.start = false;
      state.message = null;
      state.type = null;
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
