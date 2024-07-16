import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchGetCards, getCards } from "../store/features/card/cardSlice";
import Loader from "../components/Loader";
import Deck from "../components/Deck";
import DefaultCardWithInput from "../components/DefaultCardWithInput";

function CardAfterLesson() {
  const { lessonId } = useParams();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const [addedCards, setAddedCards] = useState([]);

  const clickHandler = () => {
    setAddedCards([
      ...addedCards,
      { name: "Без названия", translate: "Without name", image: "" },
    ]);
    console.log(addedCards);
  };

  useEffect(() => {
    dispatch(fetchGetCards(lessonId))
      .then((action) => {
        console.log(action.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center flex-col min-h-36 py-8">
      {cards.cards.cards &&
        cards.cards.cards.map((card) => (
          <>
            <DefaultCardWithInput card={card} key={card._id} />
            {console.log({ card })}
          </>
        ))}
      {addedCards ? (
        addedCards.map((card, index) => (
          <>
            <DefaultCardWithInput card={card} key={index} />
            {console.log({ card })}
          </>
        ))
      ) : (
        <p>Добавьте карточки</p>
      )}
      {/* {cards.cards.cards &&
        cards.cards.cards.map((card) => (
          <>
            <DefaultCardWithInput card={card} key={card._id} />
            {console.log({ card })}
          </>
        ))} */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={clickHandler}
          className="px-4 py-2 bg-sky-600 rounded-md text-white transition-colors hover:bg-sky-700"
        >
          Добавить карточки
        </button>
        <NavLink to={"/learn-room/" + lessonId}>
          <button className="px-4 py-2 bg-green-600 rounded-md text-white transition-colors hover:bg-green-700">
            Запустить Изучение
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default CardAfterLesson;
