import React, { useEffect, useState } from "react";
import { ISelectedValue } from "../types/types";
import { SelValuteContent } from "../components/SelValuteContent/SelValuteContent";


export const ValutePage = () => {
  const [selectedValuteArr, setSelectedValuteArr] = useState<ISelectedValue[]>(
    []
  );
  const [isLoading, setisLoading] = useState(true)


  

  useEffect(() => {
  fetchValuteDays()
  }, []);
 
  async function fetchValuteDays() {
    
    const daysAmount = 10;
    const fetchArr: ISelectedValue[] = [];
    let url = "https://www.cbr-xml-daily.ru/daily_json.js"


    for (let i=0; i<daysAmount; i++) {
      const response = await fetch(url)
      const result = await response.json()
      url = result.PreviousURL
    
      fetchArr.push({date: new Date(Date.parse(result.Date)).toLocaleString().substr(0, 5) ,value: result.Valute[localStorage.currentCharCode]})

    }
  
    setSelectedValuteArr(fetchArr);
    setisLoading(false)
  }



  return (
    <div className="valute-page-container container">
        
        {!isLoading
        ?
        <SelValuteContent arr={selectedValuteArr}/>
        :
        <img src="/materials/images/loading-gif1.gif" className="loader"/>
        }


    </div>
  );
};
