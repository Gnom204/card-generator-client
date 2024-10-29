import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePreview } from "../store/features/preview/previewSlice";
import logo from "../images/edit-4-svgrepo-com.svg";
import Loader from "./Loader";
import { BASE_URL } from "../utils/configure";
import { fetchCreateCard } from "../store/features/card/cardSlice";
import { useParams } from "react-router-dom";

function DefaultCardWithInput({ card }) {
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [trans, setTrans] = useState("");
  const [transIsDisabled, setTransIsDisabled] = useState(true);
  const [nameIsDisabled, setNameIsDisabled] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { lessonId } = useParams();

  const clickHandler = () => {
    if (name === "" || trans === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
      setIsLoading(true);
      dispatch(generatePreview(name))
        .then((action) => {
          setIsLoading(false);
          setPreview(`${BASE_URL}/uploads/${action.payload.preview}`);
          dispatch(
            fetchCreateCard({
              name,
              translate: trans,
              image: action.payload.preview,
              lessonId,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const clickNameHandler = (e) => {
    e.stopPropagation();
    setEmpty(false);
    setNameIsDisabled(!nameIsDisabled);
  };

  const clickTransHandler = (e) => {
    e.stopPropagation();
    setEmpty(false);
    setTransIsDisabled(!transIsDisabled);
  };
  return (
    <div className="z-10 flex bg-primary text-secondary gap-4 items-center shadow-md p-4 mb-6 w-">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            disabled={nameIsDisabled}
            className={empty ? "border p-2 border-red-500" : "border p-2 "}
            placeholder="Слово на вашем языке"
            value={nameIsDisabled ? (name ? name : card.name) : name}
          />
          {nameIsDisabled ? (
            <img onClick={clickNameHandler} className="w-6" src={logo} alt="" />
          ) : (
            <button onClick={clickNameHandler}>Сохранить</button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div onClick={clickTransHandler}>
            Перевод:
            <input
              onChange={(e) => setTrans(e.target.value)}
              type="text"
              disabled={nameIsDisabled}
              className={empty ? "border p-2 border-red-500" : "border p-2 "}
              placeholder="Перевод на другой"
              value={nameIsDisabled ? (trans ? trans : card.translate) : trans}
            />
          </div>
        </div>
      </div>
      <div>
        {preview || card.image ? (
          <img
            src={
              card.image
                ? BASE_URL +
                  (process.env.NODE_ENV === "production" ? "/uploads/" : "/") +
                  card.image
                : preview
            }
            alt="card"
            className="w-24 h-24"
          />
        ) : (
          <div className="animate-pulse flex items-center justify-center bg-gray-300 w-28 h-28">
            <button
              onClick={clickHandler}
              className="bg-sky-600 px-2 py-1 text-center rounded-md text-white "
            >
              {isLoading ? (
                <Loader />
              ) : (
                <span className="text-2xl font-bold text-white">+</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DefaultCardWithInput;
