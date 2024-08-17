import { authSlice } from "./features/auth/authSlice";
import { errorSlice } from "./features/error/errorSlice";

import { configureStore } from "@reduxjs/toolkit";
import previewSlice from "./features/preview/previewSlice";
import { createDeck } from "./features/lesson/lessonSlice";
import { cardSlice } from "./features/card/cardSlice";
import { alertSlice } from "./features/alert/alert";
import { otherLessons } from "./features/otherLesson/otherLesson";

export const store = configureStore({
  reducer: {
    [errorSlice.name]: errorSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [otherLessons.name]: otherLessons.reducer,
    preview: previewSlice,
    lessons: createDeck.reducer,
    cards: cardSlice.reducer,
    alert: alertSlice.reducer,
  },
});
