import React, { useEffect, useState } from "react";
import { ISelectedValue } from "../types/types";
import { SelValuteContent } from "../components/SelValuteContent/SelValuteContent";

export const ValutePage = () => {
  const [selectedValuteArr, setSelectedValuteArr] = useState<ISelectedValue[]>(
    []
  );
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchValuteDays();
  }, []);

  async function fetchValuteDays() {
   
    const series = async function () {
      const daysAmount = 10;
      let url = "https://www.cbr-xml-daily.ru/daily_json.js";
      const fetchArr: ISelectedValue[] = [];

      for (let i = 0; i < daysAmount; i++) {
      try {
      
        const response = await fetch(url);
        const result = await response.json();
        fetchArr.push({
          date: new Date(Date.parse(result.Date)).toLocaleString().substr(0, 5),
          value: result.Valute[localStorage.currentCharCode],
        });
        url = result.PreviousURL;
      
      } catch (e) {}
    }
    return fetchArr
    
  }
    const resultArr = await series()

    setSelectedValuteArr(resultArr);
    setisLoading(false);
  }

  return (
    <div className="valute-page-container container">
      {!isLoading ? (
        <SelValuteContent arr={selectedValuteArr} />
      ) : (
        <img src="/materials/images/loading-gif1.gif" className="loader" />
      )}
    </div>
  );
};
