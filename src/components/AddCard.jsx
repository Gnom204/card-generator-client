import React from "react";
import { NavLink } from "react-router-dom";

function AddCard() {
  return (
    <NavLink className={"cursor-pointer"} to="/create-card">
      <div className="rounded-2xl shadow-lg w-[250px] h-[300px] flex bg-primary text-secondary flex-1 flex-col items-center justify-center">
        <div className="text-8xl font-bold text-secondary">+</div>
        <p>Создайте свою карточку</p>
      </div>
    </NavLink>
  );
}

export default AddCard;
