import React, { useEffect } from "react";

import { useState } from "react";
import { BASE_URL, languages } from "../utils/configure";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  generatePreview,
  getloading,
  getPreview,
} from "../store/features/preview/previewSlice";
import Loader from "../components/Loader";
import { fetchCreateDeck } from "../store/features/lesson/lessonSlice";
import { useNavigate } from "react-router-dom";

function CreateCard() {
  const [lessonName, setlessonName] = useState("");
  const [empty, setEmpty] = useState(false);
  const [isPrivate, setisPrivate] = useState(false);
  const [language, setLanguage] = useState(languages[0]);

  const [languageNull, setLanguageNull] = useState(false);
  const preview = useSelector((state) => state.preview);
  const isLoading = useSelector((state) => state.preview.isLoading);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    if (lessonName === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
      dispatch(generatePreview(lessonName))
        .unwrap()
        .then((action) => {
          console.log({ action });
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (lessonName === "") {
      setEmpty(true);
    } else {
      dispatch(
        fetchCreateDeck({
          lessonName,
          language,
          isPrivate,
          preview: preview.preview.preview,
        })
      )
        .then((action) => {
          navigate("/");
          dispatch(clearState());
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(clearState());
    }
  };

  return (
    <div className="max-w-md mx-auto flex-grow">
      <h1 className="text-3xl font-bold mb-4">Создание карточки</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex flex-col items-center justify-center border-4 p-10 border-dashed">
          {isLoading ? (
            <Loader />
          ) : preview.preview !== null ? (
            <div className="relative">
              <img
                className="max-w-full relative"
                src={`${BASE_URL}/${preview.preview.preview}`}
                alt="Превью"
              />
              <button
                onClick={clickHandler}
                className="bg-sky-600 text-white px-4 py-2 rounded-md absolute bottom-0 right-5 margin-auto"
                type="click"
              >
                Сгенерировать новое превью
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={clickHandler}
                className="bg-sky-600 text-white px-4 py-2 rounded-md"
                type="click"
              >
                Сгенерировать превью
              </button>
              <div className="mt-2 flex flex-col items-center justify-center text-center">
                <p>
                  <a
                    className="text-sky-600"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://fusionbrain.ai/?utm_source=kandinsky&utm_medium=web&utm_campaign=promo"
                  >
                    Kandinsky AI
                  </a>
                </p>{" "}
                {empty && (
                  <p className="text-red-600">
                    Чтобы сгенерировать картинку, нужно заполнить поле
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold my-2"
            htmlFor="lessonName"
          >
            Название колоды
          </label>
          <input
            onChange={(e) => {
              setlessonName(e.target.value);
              if (e.target.value === "") {
                setEmpty(true);
              } else {
                setEmpty(false);
              }
            }}
            value={lessonName}
            type="text"
            id="lessonName"
            placeholder="Название колоды"
            className={
              empty
                ? "shadow appearance-none border border-red-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <label
              className="block text-gray-700 text-sm font-bold my-2"
              htmlFor="isPrivate"
            >
              Публичная
            </label>
            <input
              value={isPrivate}
              onChange={(e) => setisPrivate(e.target.checked)}
              type="checkbox"
              id="isPrivate"
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col items-center">
            <label
              className="block text-gray-700 text-sm font-bold my-2"
              htmlFor="language"
            >
              Язык
            </label>
            <select
              onChange={(e) => {
                setLanguage(e.target.value);
                setLanguageNull(false);
                console.log({ language });
              }}
              id="language"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Выберите язык</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            {languageNull && <p className="text-red-600">Выберите язык</p>}
          </div>
        </div>
        <button
          onSubmit={handleSubmit}
          className="bg-sky-600 text-white px-4 py-2 rounded-md"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default CreateCard;
