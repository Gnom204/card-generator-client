import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setError } from "../error/errorSlice";
import { BASE_URL } from "../../../utils/configure";

export const fetchCreateCard = createAsyncThunk(
  "cards/fetchCreateCard",
  (cardData, thunkAPI) => {
    return fetch(BASE_URL + "/api/cards/cardId/" + cardData.lessonId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(cardData),
    });
  }
);

export const fetchGetCards = createAsyncThunk(
  "cards/fetchGetCards",
  (deckId, thunkAPI) => {
    return fetch(BASE_URL + "/api/cards/lesson/" + deckId, {
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
export const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGetCards.rejected, (state, action) => {
        state.cards = [];
        state.isLoading = false;
      })
      .addCase(fetchGetCards.pending, (state, action) => {
        state.cards = [];
        state.isLoading = true;
      })
      .addCase(fetchCreateCard.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchCreateCard.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchCreateCard.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const getCards = (state) => state.cards.cards;
