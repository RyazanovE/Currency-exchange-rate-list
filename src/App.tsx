import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setValuteArrAction } from "./components/store/valuteArrReducer";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import {ValutePage} from "./pages/ValutePage"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchValute();
  }, []);

  function fetchValute() {
    try {
      fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((resolve) => resolve.json())
        .then((data) =>
          dispatch(setValuteArrAction(Object.values(data.Valute)))
        );
    } catch (e) {
      console.log("Error", e);
    }
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/valutepage" element={<ValutePage/>}/>
    </Routes>
  );
}

export default App;
