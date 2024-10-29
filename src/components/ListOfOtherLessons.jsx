import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherLessons } from "../store/features/otherLesson/otherLesson";
import Deck from "./Deck";
import { languages } from "../utils/configure";

function ListOfOtherLessons({currentLanguage}) {
  const dispatch = useDispatch();
  const otherLessons = useSelector((state) => state.otherLessons.otherLessons);
  const [filteredCards, setFilteredCards] = useState(otherLessons);

  useEffect(() => {
    dispatch(fetchOtherLessons())
      .then((card) => {
        console.log(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if(currentLanguage !== '') {
      filterCards(currentLanguage)
      console.log(currentLanguage)
    } else {
      setFilteredCards(otherLessons.cards)
    }
  }, [currentLanguage])

function filterCards(language) {
  console.log(language)
if(otherLessons){  setFilteredCards(otherLessons.cards.filter((card) => card.language.toLowerCase() === language.toLowerCase()));
}}

  return (
    <>
    {/* {
        <select
              onChange={(e) => {
                filterCards(e.target.value)               
                console.log(filteredCards)
              }}
              id="language"
              className="w-30 mt-1 block text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Выберите язык</option>
             {languageList}
            </select>} */}
      <div>  
            </div>
      {filteredCards ? (
        <ul className="mx-0 flex items-center justify-center flex-wrap w-11З/12">
          {filteredCards.length > 0 ? filteredCards.map((deck) => (
            <Deck other={true} key={deck._id} deck={deck} />
          )) : (<p>Ничего не найдено</p>)}
        </ul>
      ) :
      otherLessons && (<ul className="mx-0 flex items-center justify-center flex-wrap w-11З/12">
      {otherLessons.cards.map((deck) => (
        <Deck other={true} key={deck._id} deck={deck} />
      ))}{" "}
    </ul>)
    }
    </>
  );
}

export default ListOfOtherLessons;
