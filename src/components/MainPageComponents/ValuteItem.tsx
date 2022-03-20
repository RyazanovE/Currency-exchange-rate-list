import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { IValuteItem } from "../../types/types";
import { ExitAction, EnterAction } from "../store/reducers/isEnterReducer";
import { setValuteAction } from "../store/reducers/currentValuteReducer";
import { useNavigate } from "react-router-dom";
import {startLoadingAction} from "../store/reducers/isLoadingReducer"

interface ValuteItemProps {
  item: IValuteItem;
}

export const ValuteItem: FC<ValuteItemProps> = ({ item }) => {
  const diff = valuteDiff(item.Value, item.Previous);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 function valuteDiff(y: number, x: number) {
    return (((y - x) / x) * 100).toFixed(2);
  }

  function leaveHandler(e: React.MouseEvent) {
    if (
      (e.relatedTarget as HTMLElement).tagName !== "TD" &&
      (e.relatedTarget as HTMLElement).className !== "tooltip"
    ) {
      dispatch(ExitAction());
    }
  }

  function enterHandler() {
    dispatch(setValuteAction(item));
    dispatch(EnterAction());
  }

  function clickHandler() {
    dispatch(ExitAction());
    dispatch(setValuteAction(item));
    localStorage.currentCharCode = item.CharCode;
    localStorage.currentValuteName = item.Name;
    navigate("/valutepage");
  }

  return (
    <tr
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      onClick={clickHandler}
    >
      <td>{item.CharCode}</td>
      <td>{item.Value}</td>
      <td>
        {diff + "% "}
        {Number(diff) > 0 ? (
          <span style={{ color: "green" }}>&#11014;</span>
        ) : (
          <span style={{ color: "red" }}>&#11015;</span>
        )}
      </td>
    </tr>
  );
};
