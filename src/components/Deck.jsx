import React from "react";
import { useDispatch } from "react-redux";
import { fetchGetCards } from "../store/features/card/cardSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/configure";
import trash from "../images/trash.svg";
import {
  fetchDeleteCard,
  fetchGetLessons,
} from "../store/features/lesson/lessonSlice";

function Deck({ deck }) {
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
    navigate("lesson/" + deck._id);
  };

  return (
    <>
      <div
        onClick={clickHandler}
        className="w-64 h-96 mx-2 my-2 cursor-pointer  justify-center hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 flex flex-col rounded-lg border border-gray-200 shadow-md p-4"
      >
        <img
          src={BASE_URL + "/" + deck.preview}
          alt={deck.lessonName}
          className="w-full h-48 mb-4 object-cover rounded-t-lg"
        />
        <div className="flex flex-col">
          <h2 className="w-40 text-xl font-semibold mb-2">{deck.lessonName}</h2>
          <p className="text-gray-600 mb-2">Language: {deck.language}</p>
          <p className="text-gray-600 mb-2">
            Private: {deck.isPrivate ? "Yes" : "No"}
          </p>
        </div>
        <img
          onClick={deleteDeck}
          className="w-6 z-10 m-auto"
          src={trash}
          alt=""
        />
      </div>
    </>
  );
}

export default Deck;
