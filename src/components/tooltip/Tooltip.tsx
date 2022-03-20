import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoordAction } from "../store/reducers/coordReducer";
import { RootState } from "../store/store";

interface TooltipProps {}

export const Tooltip: FC<TooltipProps> = (props) => {
  const dispatch = useDispatch();
  const coords = useSelector((state: RootState) => ({
    pX: state.coordReducer.pX,
    pY: state.coordReducer.pY,
  }));
  const isMoving = useSelector((state: RootState) => {
    return state.isMovingReducer.isMoving;
  });
  const isEnter = useSelector((state: RootState) => {
    return state.isEnterReducer.isEnter;
  });

  function getOpacity() {
    if (!isMoving && isEnter) {
      return { opacity: 0.8 };
    } else {
      return { opacity: 0 };
    }
  }

  return (
    <div
      onMouseMove={(e) => {
        dispatch(setCoordAction(e.pageX, e.pageY));
      }}
      className="tooltip"
      style={{ top: coords.pY, left: coords.pX, ...getOpacity() }}
    >
      {props.children}
    </div>
  );
};
