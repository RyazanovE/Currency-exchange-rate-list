import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { List } from "./components/List";
import { ValuteItem } from "./components/ValuteItem";
import { IValuteItem, ICoords } from "./types/types";
import { RootState } from "./components/store/store";
import {Tooltip} from "./components/Tooltip"

function App() {
  const [valute, setValute] = useState<IValuteItem[]>([]);
  const isEnter = useSelector((state: RootState) => {
    return state.isEnterReducer.isEnter;
  });
  const currentValute = useSelector(
    (state: RootState) => state.currentValuteReducer.currentValute
  );

  useEffect(() => {
    fetchValute();
  }, []);

  function fetchValute() {
    try {
      fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((resolve) => resolve.json())
        .then((data) => setValute(Object.values(data.Valute)));
       
    } catch (e) {
      console.log("Error", e);
    }
  }

    
  return (
    <div className="value-container container">
      <table className="table-wrappper__value-table value-table">
        <caption>Таблица № 1</caption>
        <List<IValuteItem>
          items={valute}
          renderItem={(value) => <ValuteItem key={value.ID} item={value} />}
        ></List>
      </table>
      {isEnter && (
        <Tooltip>
          {currentValute}
        </Tooltip>
      )}
    </div>
  );
}

export default App;
