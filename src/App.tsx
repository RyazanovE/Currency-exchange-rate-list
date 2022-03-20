import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setValuteArrAction } from "./components/store/reducers/valuteArrReducer";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ValutePage } from "./pages/ValutePage";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/valutepage" element={<ValutePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
