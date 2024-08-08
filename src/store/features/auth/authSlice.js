import { BASE_URL } from "../../../utils/configure";
import { setError } from "../error/errorSlice";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuth: false,
};

export const getMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  return fetch(`${BASE_URL}/api/auth/me`, {
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
    .then((data) => {
      return data;
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
    });
});

export const registerUser = createAsyncThunk(
  "auth/register",
  (userData, thunkAPI) => {
    console.log({ userData });
    return fetch(BASE_URL + "/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...userData }),
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

export const loginUser = createAsyncThunk(
  "auth/login",
  (userData, thunkAPI) => {
    return fetch(BASE_URL + "/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...userData }),
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

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(getMe.pending, (state, action) => {
        state.user = null;
        state.isAuth = false;
      });
  },
});

export const { logout } = authSlice.actions;
export const getUser = (state) => state.auth.user;
export const getIsAuth = (state) => state.auth.isAuth;
