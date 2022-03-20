import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { ISelectedValue } from "../types/types";
import {stopLoadingAction, startLoadingAction} from "../components/store/reducers/isLoadingReducer"
import { TenDaysValuteTable } from "../components/table/TenDaysValuteTable";
import { SelectedValuteTable } from "../components/table/SelectedValuteTable";
import { Link } from "react-router-dom";


export const ValutePage = () => {
  const [selectedValuteArr, setSelectedValuteArr] = useState<ISelectedValue[]>(
    []
  );
  const isLoading = useSelector((state: RootState) => {return state.isLoadingReducer.isLoading})
  const dispatch = useDispatch()
  


  useEffect(() => {
  fetchValuteDays()
  }, []);
 
  async function fetchValuteDays() {
    dispatch(startLoadingAction())
    
    const daysAmount = 10;
    const fetchArr: ISelectedValue[] = [];
    let currDate = new Date(),
    url = "https://www.cbr-xml-daily.ru/daily_json.js"


    for (let i=0; i<daysAmount; i++) {
      const response = await fetch(url)
      const result = await response.json()
      url = result.PreviousURL
    
      fetchArr.push({date: new Date(Date.parse(result.Timestamp)).toLocaleString().substr(0, 5) ,value: result.Valute[localStorage.currentCharCode]})

    }
  
    setSelectedValuteArr(fetchArr);
    dispatch(stopLoadingAction())
  }

  return (
    <div className="valute-page-container container">
        
        {!isLoading 
        ?
        <>
        <SelectedValuteTable arr={selectedValuteArr}/> 
        <TenDaysValuteTable className="valute-table valute-page-container__valute-table" arr={selectedValuteArr}/>
        <Link to="/" className="button-back valute-page-container__button-back">На главную &#10148;</Link>
        </>
        :
        <div>Loading</div>
        }
    </div>
  );
};
