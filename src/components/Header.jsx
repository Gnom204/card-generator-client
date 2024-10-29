import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsAuth, logout } from "../store/features/auth/authSlice";
function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  return (
    <header className="z-10">
      <nav className="p-4 flex justify-between items-center">
        <div className='text-xl font-bold text-primary'>
          <NavLink className="cursor-pointer" to="/">
            <h1>Карточки со словами</h1>
          </NavLink>
        </div>
        <div className="flex space-x-6">
          {isAuth ? (
            <button
              onClick={() => dispatch(logout())}
              className="px-10 py-2 bg-primary rounded-md text-secondary transition-colors  hover:bg-gray-200"
            >
              Выйти
            </button>
          ) : (
            <>
              <NavLink to="login">
                <button className="px-10 py-2 bg-primary rounded-md text-secondary transition-colors  hover:bg-gray-200">
                  Вход
                </button>
              </NavLink>
              <NavLink to="register">
                <button className="px-10 py-2 bg-primary rounded-md text-secondary transition-colors hover:bg-gray-200">
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
