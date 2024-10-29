import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGetCards } from "../store/features/card/cardSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/configure";
import trash from "../images/trash.svg";
import {
  fetchDeleteCard,
  fetchGetLessons,
} from "../store/features/lesson/lessonSlice";

function Deck({ deck, other }) {
  const [isHidden, setIsHidden] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteDeck = (e) => {
    e.stopPropagation();
    dispatch(fetchDeleteCard(deck._id));
  };

  const clickHandler = (e) => {
    e.preventDefault();
    console.log(deck);
    dispatch(fetchGetCards(deck._id))
      .then((action) => {
        console.log({ action });
      })
      .catch((error) => {
        console.log({ error });
      });
    navigate("lesson/" + deck._id + (other ? "/other" : ""));
  };

  return (
    <>
      <div
        onClick={clickHandler}
        className="z-10 bg-primary text-secondary min-w-64 min-h-[22rem] mx-2 my-2 cursor-pointer  justify-center hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 flex flex-col rounded-lg border border-gray-200 shadow-md p-4"
      >
        <img
          src={
            BASE_URL +
            (process.env.NODE_ENV === "production" ? "/uploads/" : "/") +
            deck.preview
          }
          alt={"Картинка с названием: " + deck.lessonName}
          className="w-full h-44 mb-3 object-cover rounded-t-lg"
        />
        <div className="flex flex-col">
          <h2 className="w-40 text-ellipsis text-xl font-semibold mb-2">
            {deck.lessonName.length > 10 && isHidden
              ? deck.lessonName.slice(0, 10) + "..."
              : deck.lessonName}
          </h2>
          <p
            className="text-blue-400 underline"
            onClick={(e) => {
              e.stopPropagation();
              setIsHidden(!isHidden);
            }}
          >
            {deck.lessonName.length > 10 && (isHidden ? "Подробнее" : "Скрыть")}
          </p>
          <p className="text-gray-600 mb-2 w-40">Язык: {deck.language}</p>
          <p className="text-gray-600 mb-2">
            {deck.isPrivate ? "Приватная" : "Публичная"}
          </p>
        </div>
        {!other && (
          <img
            onClick={deleteDeck}
            className="w-6 z-10 m-auto"
            src={trash}
            alt=""
          />
        )}
      </div>
    </>
  );
}

export default Deck;
