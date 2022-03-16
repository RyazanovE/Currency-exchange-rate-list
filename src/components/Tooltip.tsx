import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoordAction } from "./store/coordReducer";
import { RootState } from "./store/store";

interface TooltipProps {
  isEnter?: boolean;
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const dispatch = useDispatch();
  const coords = useSelector((state: RootState) => ({
    pX: state.coordReducer.pX,
    pY: state.coordReducer.pY,
  }));
    
function getOpacity () {
  if (props.isEnter) {
    return {opacity: 1}
  } else {
    return {opacity: 0}
  }
}


  return (
    <div 
      onMouseMove={(e) => {
        dispatch(setCoordAction(e.pageX, e.pageY));
      }}
      className="tooltip"
      style={{ top: coords.pY, left: coords.pX, ...getOpacity()}}
    >
        {props.children}
    </div>
  );
};
