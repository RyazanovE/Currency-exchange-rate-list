import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ValutePage } from "./pages/ValutePage";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/valutepage" element={<ValutePage />} />
      </Routes>
      <Footer><a target="_blank" href="https://hh.ru/resume/dd608c68ff09baf6af0039ed1f675753617073">Made by Ryazanov E. S.</a></Footer>
    </BrowserRouter>
  );
}

export default App;
