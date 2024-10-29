import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../store/features/auth/authSlice";
import { clearError, getErrorStatus } from "../store/features/error/errorSlice";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const error = useSelector(getErrorStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const { email, password } = userData;
    if (!email || !password) {
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
    dispatch(loginUser(userData))
      .unwrap()
      .then((action) => {
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
      <h1 className="text-3xl text-primary font-bold mb-4">Авторизация</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[300px]">
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
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Войти
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Нет аккаунта?{" "}
          <NavLink
            to="/register"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Создать
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
