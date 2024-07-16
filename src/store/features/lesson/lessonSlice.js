import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setError } from "../error/errorSlice";
import { BASE_URL } from "../../../utils/configure";

export const fetchDeleteCard = createAsyncThunk(
  "cards/fetchDeleteCard",
  (cardId, thunkAPI) => {
    return fetch(BASE_URL + "/api/cards/delete/" + cardId, {
      method: "DELETE",
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

export const fetchGetLessons = createAsyncThunk(
  "cards/fetchGetLessons",
  (_, thunkAPI) => {
    return fetch("http://localhost:4000/api/cards", {
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

export const fetchCreateDeck = createAsyncThunk(
  "cards/fetchCreateDeck",
  (cardData, thunkAPI) => {
    fetch("http://localhost:4000/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(cardData),
    })
      .then((response) => {
        console.log(cardData);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        console.log(cardData);
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

export const createDeck = createSlice({
  name: "lessons",
  initialState: {
    deck: null,
    isLoading: false,
  },
  reducers: {
    deleteCard: (state, action) => {
      state.isLoading = true;
      state.deck = state.deck.filter((card) => card._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateDeck.fulfilled, (state, action) => {
        state.deck = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCreateDeck.rejected, (state, action) => {
        state.deck = null;
        state.isLoading = false;
      })
      .addCase(fetchCreateDeck.pending, (state, action) => {
        state.deck = null;
        state.isLoading = true;
      })
      .addCase(fetchGetLessons.fulfilled, (state, action) => {
        state.deck = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGetLessons.rejected, (state, action) => {
        state.deck = null;
        state.isLoading = false;
      })
      .addCase(fetchGetLessons.pending, (state, action) => {
        state.deck = null;
        state.isLoading = true;
      })
      .addCase(fetchDeleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deck = action.payload.cardWithLang;
      })
      .addCase(fetchDeleteCard.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchDeleteCard.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const getDeck = (state) => state.lessons.deck;
export const getIsLoading = (state) => state.lessons.isLoading;
export const { deleteCard } = createDeck.actions;
