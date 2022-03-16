import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoordAction } from "./store/coordReducer";
import { RootState } from "./store/store";

interface TooltipProps {
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const dispatch = useDispatch();
  const coords = useSelector((state: RootState) => ({
    pX: state.coordReducer.pX,
    pY: state.coordReducer.pY,
  }));
  
  return (
    <div
      onMouseMove={(e) => {
        dispatch(setCoordAction(e.pageX, e.pageY));
      }}
      className="tooltip"
      style={{ top: coords.pY, left: coords.pX }}
    >
        {props.children}
    </div>
  );
};
