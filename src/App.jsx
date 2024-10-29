import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getMe, getUser } from "./store/features/auth/authSlice";
import { useEffect, useState } from "react";
import AddCard from "./components/AddCard";
import ListOfLessons from "./components/ListOfLessons";
import ListOfOtherLessons from "./components/ListOfOtherLessons";
import { languages } from "./utils/configure";

function App() {
  const user = useSelector(getUser);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  const languageList =  languages.map((language) => (
    <option key={language} value={language}>
      {language}
    </option>
  ))

  const [currentLanguage, setCurrentLanguage] = useState('');

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getMe());
    }
  }, []);

  return (
    <div className="z-10 px-4 text-primary flex-grow">
      {isAuth ? (
        <>
          {user && <p className="text-xl">Здравствуйте, {user.name}👋</p>}
          <h2 className="text-2xl font-medium">Ваши Колоды</h2>
          <div className="flex items-center space-x-4 flex-wrap mb-36">
            <ListOfLessons />
          </div>
          <h2 className="text-2xl font-medium">Колоды работяг</h2>
          
          {<select
              onChange={(e) => {
               setCurrentLanguage(e.target.value);
              }}
              id="language"
              className="z-10 w-30 mt-1 block text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Выберите язык</option>
             {languageList}
            </select>}
            <button onClick={() => setCurrentLanguage('')} className="text-xs font-medium text-white bg-gray-700 px-2 py-1 rounded-md hover:bg-gray-800">Сбросить</button>
          <div className="flex items-center space-x-4 flex-wrap">
            <ListOfOtherLessons currentLanguage={currentLanguage} />
          </div>
        </>
      ) : (
        <p>Войдите или зарегистрируйтесь</p>
      )}
    </div>
  );
}

export default App;
