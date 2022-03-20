import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { Tooltip } from "../components/tooltip/Tooltip";
import { MainTable } from "../components/table/MainTable";
import { setCoordAction } from "../components/store/reducers/coordReducer";
import {
  moveAction,
  stopAction,
} from "../components/store/reducers/isMovingReducer";




export const MainPage = () => {
  let timeout: any = useRef(null);
  const tooltip = document.querySelector(".tooltip");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentValute = useSelector(
    (state: RootState) => state.currentValuteReducer.Name
  );
  const [valuteArr, setValuteArr] = useState([]);

  useEffect(() => {
    dispatch(moveAction());
    fetchValute();
  }, []);

  async function fetchValute() {
    try {
      const resolve = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const result = await resolve.json();
      setValuteArr(Object.values(result.Valute));
    } catch (e) {
      console.log("Error", e);
    }
    setIsLoading(false);
  }

  function stopHandler(e: React.MouseEvent) {
    e.preventDefault();
    (() => {
      dispatch(moveAction());
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => dispatch(stopAction()), 500);
    })();
  }

  function coordHandler(e: React.MouseEvent) {
    if (!tooltip) {
      return;
    }
    const pX = e.pageX + 5;
    const pY = e.pageY + 10;

  

    const tooltipHeight = (tooltip as HTMLElement).offsetHeight;
    const tooltipWidth = (tooltip as HTMLElement).offsetWidth;
    const currentPositionY = e.pageY + tooltipHeight;
    const currentPositionX = e.pageX + tooltipWidth;
    const maxPositionY =
      document.documentElement.clientHeight +
      document.documentElement.scrollTop;
    const maxPositionX = document.documentElement.clientWidth;

    if (currentPositionX > maxPositionX && currentPositionY > maxPositionY) {
      dispatch(setCoordAction(pX - 10 - tooltipWidth, pY - tooltipHeight));
    } else if (currentPositionX > maxPositionX) {
      dispatch(setCoordAction(pX - 10 - tooltipWidth, pY));
    } else if (currentPositionY > maxPositionY) {
      dispatch(setCoordAction(pX, pY - tooltipHeight));
    } else {
      dispatch(setCoordAction(pX, pY));
    }
  }


  

  return (
    <div
      className="main-page-container container"
      onMouseMove={(e) => {
        stopHandler(e);
        coordHandler(e);
      }}
    >
      {isLoading ? (
        <img src="/materials/images/loading-gif1.gif" className="loader" />
      ) : (
        <>
          <MainTable
            valute={valuteArr}
            className="table-wrappper__valute-table valute-table"
          />
          {<Tooltip>{currentValute}</Tooltip>}
        </>
      )}
    </div>
  );
};
