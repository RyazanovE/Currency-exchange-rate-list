import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { ISelectedValue } from "../types/types";
import {stopLoadingAction, startLoadingAction} from "../components/store/reducers/isLoadingReducer"
import { ValutePageTable } from "../components/ValutePageComponents/ValutePageTable";

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

    for (
      let i = 0, currDate = new Date();
      i < daysAmount;
      i++, currDate.setDate(currDate.getDate() - 1)
    ) {
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
            date: new Date(Date.parse(res.Date)).toLocaleString().substr(0, 5),
            value: res.Valute[localStorage.currentCharCode],
          });
        })
        .catch((e) => {
          fetchArr.push({
            date: currDate.toLocaleString().substr(0, 5),
            value: null,
          });
        });
    }

    setSelectedValuteArr(fetchArr);
    dispatch(stopLoadingAction())
  }

  return (
    <div className="valute-page-container container">
        {!isLoading 
        ? 
        <ValutePageTable className="valute-table valute-page-container__valute-table" arr={selectedValuteArr}/>
        :
        <div>Loading</div>
        }
    </div>
  );
};
