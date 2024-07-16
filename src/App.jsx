import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getMe, getUser } from "./store/features/auth/authSlice";
import { useEffect } from "react";
import AddCard from "./components/AddCard";
import ListOfLessons from "./components/ListOfLessons";

function App() {
  const user = useSelector(getUser);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getMe());
    }
  }, []);

  return (
    <div className="p-4 flex-grow">
      <h1>Card Generator</h1>
      {isAuth ? (
        <>
          {user && <p className="text-xl">Здравствуйте, {user.name}👋</p>}
          <div className="flex items-center space-x-4 flex-wrap">
            <ListOfLessons />
          </div>
        </>
      ) : (
        <p>Войдите или зарегистрируйтесь</p>
      )}
    </div>
  );
}

export default App;
