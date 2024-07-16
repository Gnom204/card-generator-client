import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsAuth, logout } from "../store/features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  return (
    <header className="bg-sky-50">
      <nav className="p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-sky-600">
          <NavLink className="cursor-pointer" to="/">
            <h1>Карточки со словами</h1>
          </NavLink>
        </div>
        <div className="flex space-x-6">
          {isAuth ? (
            <button
              onClick={() => dispatch(logout())}
              className="px-4 py-2 bg-sky-600 rounded-md text-white transition-colors hover:bg-sky-700"
            >
              Выйти
            </button>
          ) : (
            <>
              <NavLink to="login">
                <button className="px-4 py-2 bg-sky-600 rounded-md text-white transition-colors hover:bg-sky-700">
                  Вход
                </button>
              </NavLink>
              <NavLink to="register">
                <button className="px-4 py-2 bg-sky-600 rounded-md text-white transition-colors hover:bg-sky-700">
                  Регистрация
                </button>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
