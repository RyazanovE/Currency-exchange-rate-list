import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../components/store/store";

export const ValutePage = () => {
  useEffect(() => {
    fetchValuteDays()
  }, []);

  async function fetchValuteDays() {
    const daysAmount = 10;
    const fetchArr: any[] = [];

    for (let i = 0, currDate = new Date(); i < daysAmount; i++, currDate.setDate(currDate.getDate()-1)) { 
      await fetch(
        `https://www.cbr-xml-daily.ru/archive/2022/03/${currDate.getDate()}/daily_json.js`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((res) => {
         
          fetchArr.push({
            date: new Date( Date.parse(res.Date)).toLocaleString().substr(0, 5) ,
            value: res.Valute[localStorage.currentCharCode],
          });
        })
        .catch((e) => {
          fetchArr.push({ date: currDate.toLocaleString().substr(0, 5), value: null });
        });
    }
  
  console.log(fetchArr)



  }

  return <div className="valute-page-container container"></div>;
};
