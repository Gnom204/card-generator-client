import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, registerUser } from "../store/features/auth/authSlice";
import {
  clearError,
  getErrorStatus,
  setError,
} from "../store/features/error/errorSlice";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const error = useSelector(getErrorStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      setErrMsg("Все поля являются обязательными");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g.test(email)) {
      setErrMsg("Email указан неправильно");
      return;
    }
    if (password.length < 8) {
      setErrMsg("Пароль должен быть не менее 8 символов");
      return;
    }
    dispatch(registerUser(userData))
      .unwrap()
      .then((action) => {
        console.log(action);
        if (action) {
          localStorage.setItem("token", action.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-primary font-bold mb-4">Регистрация</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[300px]">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Имя
          </label>
          <input
            id="name"
            type="name"
            placeholder="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Зарегистрироваться
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Уже есть аккаунт?{" "}
          <NavLink
            to="/login"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Вход
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
