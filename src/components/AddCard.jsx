import React from "react";
import { NavLink } from "react-router-dom";

function AddCard() {
  return (
    <NavLink className={"cursor-pointer"} to="/create-card">
      <div className="rounded-2xl shadow-lg w-[250px] h-[300px] flex bg-slate-400 text-white flex-col items-center justify-center">
        <div className="text-8xl font-bold text-gray-200">+</div>
        <p>Создайте свою карточку</p>
      </div>
    </NavLink>
  );
}

export default AddCard;
