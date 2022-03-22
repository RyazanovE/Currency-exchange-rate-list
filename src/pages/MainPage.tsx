import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { Tooltip } from "../components/tooltip/Tooltip";
import { MainTable } from "../components/table/MainTable";
import { setCoordAction } from "../components/store/reducers/coordReducer";
import {
  moveAction,
  stopAction,
} from "../components/store/reducers/isMovingReducer";
import useDebounce from "../components/hooks/useDebounce";

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentValute = useSelector(
    (state: RootState) => state.currentValuteReducer.Name
  );
  const [valuteArr, setValuteArr] = useState([]);
  const debouncedCallback = useDebounce(
    () => dispatch(moveAction()),
    () => dispatch(stopAction()),
    500
  );

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

  function coordHandler(e: React.MouseEvent) {
    const tooltip = document.querySelector(".tooltip");
    if (!tooltip) {
      return;
    }

    const pX = e.pageX + 5;
    const pY = e.pageY + 10;

    const tooltipHeight = (tooltip as HTMLElement).offsetHeight;
    const tooltipWidth = (tooltip as HTMLElement).offsetWidth;
    const currentPositionY = pY + tooltipHeight;
    const currentPositionX = pX + tooltipWidth;
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
        debouncedCallback();
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
