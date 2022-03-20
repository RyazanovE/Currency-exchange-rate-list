import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { Tooltip } from "../components/tooltip/Tooltip";
import { MainTable } from "../components/table/MainTable";
import { setCurrentCoordAction } from "../components/store/reducers/currentCoordReducer";
import { setCoordAction } from "../components/store/reducers/coordReducer";
import { moveAction, stopAction } from "../components/store/reducers/isMovingReducer";
import { Footer } from "../components/Footer/Footer";

export const MainPage = () => {
  let timeout: any = useRef(null);
  const tooltip = document.querySelector(".tooltip");
  const dispatch = useDispatch();
  const valuteArr = useSelector((state: RootState) => {
    return state.valuteArrReducer.valuteArr;
  });
  const currentValute = useSelector(
    (state: RootState) => state.currentValuteReducer.Name
  );
  const currentCoord = useSelector((state: RootState) => ({
    pX: state.currentCoordReducer.pX,
    pY: state.currentCoordReducer.pY,
  }));

  function stopHandler(e: React.MouseEvent) {
    e.preventDefault();
    (() => {
      dispatch(moveAction());
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => dispatch(stopAction()), 500);
    })();
  }

  function coordHandler(e: React.MouseEvent) {
    const pX = e.pageX + 5;
    const pY = e.pageY + 10;

    dispatch(setCurrentCoordAction(e.pageX, e.pageY));

    if (!tooltip) {
      return;
    }

    const tooltipHeight = (tooltip as HTMLElement).offsetHeight;
    const tooltipWidth = (tooltip as HTMLElement).offsetWidth;
    const currentPositionY = currentCoord.pY + tooltipHeight;
    const currentPositionX = currentCoord.pX + tooltipWidth;
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
      <MainTable
        valute={valuteArr}
        className="table-wrappper__valute-table valute-table"
      />
      {<Tooltip>{currentValute}</Tooltip>}
    </div>
  

  );
};
