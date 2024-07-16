import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGetCards } from "../store/features/card/cardSlice";
import { BASE_URL } from "../utils/configure";
import correct from "../images/correct.png";
import uncorrect from "../images/uncorrect.png";

function LearnRoom() {
  const { lessonId } = useParams();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isGo, setIsGo] = useState(false);
  const [translateVariant, setTranslateVariant] = useState("");
  const [currentCards, setCurrentCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [errorCounter, setErrorCounter] = useState(0);

  const navigate = useNavigate();

  let filteredCards = [];
  useEffect(() => {
    dispatch(fetchGetCards(lessonId))
      .then((action) => {
        setCurrentCards(action.payload.cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(currentCard);
    if (isGo) {
      if (currentCard == undefined) {
        setIsWin(true);
      }
    }
  }, [currentCard, isGo]);

  function getCurrentCards(card) {
    if (translateVariant === "") {
      setIsEmpty(true);
      return;
    }
    console.log(card);
    setIsDisabled(false);
    if (card.translate.toLowerCase() === translateVariant.toLowerCase()) {
      setIsGo(true);
      // console.log("correct");
      setIsCorrect(true);
      filteredCards = currentCards.filter((c) => c._id !== card._id);
      // console.log({ filteredCards });
      setCurrentCards(filteredCards);
      // console.log({ currentCards, currentCard, filteredCards });
      setTranslateVariant("");
    } else {
      setIsGo(true);
      setErrorCounter(errorCounter + 1);
      setIsError(true);
      setTranslateVariant("");
      setCurrentCards(currentCards);
    }
  }

  const getStarted = () => {
    const card = currentCards[Math.floor(Math.random() * currentCards.length)];
    // console.log(card);
    setCurrentCard(card);
    setIsStarted(true);
  };

  const getNextCard = () => {
    setIsCorrect(false);
    setIsError(false);
    setIsEmpty(false);
    setIsDisabled(true);
    filteredCards = currentCards.filter((c) => c._id !== currentCard._id);
    const newCard =
      filteredCards[Math.floor(Math.random() * filteredCards.length)];
    setCurrentCard(newCard);
    // console.log({ newCard, filteredCards });
  };

  const clickHandler = () => {
    if (currentCards.length === 0) {
      alert("Все карты изучены");
      return;
    }
    setIsStarted(true);
    getCurrentCards(currentCard);
  };
  return (
    <div className="flex items-center justify-center flex-col min-h-screen py-8 bg-gray-50">
      {isWin ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">
            Вы выучили все карточки👏👏👏
          </h1>
          <p className="text-lg">Количество ошибок: {errorCounter}</p>
          <button
            onClick={() => navigate("/")}
            className="text-lg px-6 py-3 bg-blue-600 rounded-md text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            Вернуться
          </button>
        </div>
      ) : !isStarted ? (
        <button
          onClick={getStarted}
          className="text-lg px-6 py-3 bg-blue-600 rounded-md text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
        >
          Начать изучение
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {currentCard && (
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={BASE_URL + "/" + currentCard.image}
                  alt={currentCard.name}
                  className="w-96 h-96 object-cover rounded-lg shadow-md"
                />
                {isCorrect || isError ? (
                  <>
                    <img
                      className="w-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      src={isCorrect ? correct : uncorrect}
                      alt=""
                    />{" "}
                    {isError ? (
                      <p className="text-red-500 text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-70%]">
                        Правильный ответ: {currentCard.translate}
                      </p>
                    ) : null}
                  </>
                ) : null}
              </div>
              <h2 className="text-3xl font-bold mt-4">{currentCard.name}</h2>
            </div>
          )}
          <input
            onChange={(e) => setTranslateVariant(e.target.value)}
            type="text"
            value={translateVariant}
            placeholder="Введите перевод"
            className={
              isEmpty
                ? "form-input mt-1 block w-full px-3 py-2 border border-red-400 rounded-md text-lg leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                : "form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-lg leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
            }
          />
          {isEmpty ? <p className="text-red-500">Заполните поле</p> : null}
          <div className="flex space-x-4">
            <button
              onClick={clickHandler}
              className="text-lg px-6 py-3 bg-green-600 rounded-md text-white transition duration-150 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800"
            >
              Проверить
            </button>
            <button
              disabled={isDisabled}
              onClick={getNextCard}
              className="disabled:bg-gray-400 text-lg px-6 py-3 bg-blue-600 rounded-md text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Далее
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearnRoom;