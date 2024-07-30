import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetLessons,
  getDeck,
  getIsLoading,
} from "../store/features/lesson/lessonSlice";
import Deck from "./Deck";
import Loader from "./Loader";
import AddCard from "./AddCard";

function ListOfLessons() {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.lessons.deck);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchGetLessons())
      .then((action) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);
  return (
    <>
      {decks && (
        <ul className="flex items-center justify-center flex-wrap w-11З/12">
          {decks.cardsWithLang.map((deck) => (
            <Deck key={deck._id} deck={deck} />
          ))}{" "}
          <AddCard />
        </ul>
      )}
    </>
  );
}

export default ListOfLessons;
