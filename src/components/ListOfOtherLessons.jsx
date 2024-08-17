import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherLessons } from "../store/features/otherLesson/otherLesson";
import Deck from "./Deck";

function ListOfOtherLessons() {
  const dispatch = useDispatch();

  const otherLessons = useSelector((state) => state.otherLessons.otherLessons);

  console.log(otherLessons);
  useEffect(() => {
    dispatch(fetchOtherLessons())
      .then((card) => {
        console.log(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div></div>
      {otherLessons && (
        <ul className="flex items-center justify-center flex-wrap w-11З/12">
          {otherLessons.cards.map((deck) => (
            <Deck key={deck._id} deck={deck} />
          ))}{" "}
        </ul>
      )}
    </>
  );
}

export default ListOfOtherLessons;
