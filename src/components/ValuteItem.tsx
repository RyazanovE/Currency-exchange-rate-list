import React, { FC, useState } from "react";
import { useDispatch} from "react-redux";
import { IValuteItem } from "../types/types";
import {ExitAction, EnterAction} from "./store/isEnterReducer"
import {setCoordAction} from "./store/coordReducer"
import {setValuteAction} from "./store/currentValuteReducer"

interface ValuteItemProps {
  item: IValuteItem;
}


export const ValuteItem: FC<ValuteItemProps> = ({ item }) => {
  const diff = valuteDiff(item.Value, item.Previous);
  const dispatch = useDispatch();


  function valuteDiff(y: number, x: number) {
    return (((y - x) / x) * 100).toFixed(2);
  }

  


  return (
    <tr
      onMouseEnter={() => {
        dispatch(setValuteAction(item.Name))
        dispatch(EnterAction());
      }}
      onMouseLeave={(e) => {
        if ((e.relatedTarget as HTMLElement).tagName !== "TD") {
          dispatch(ExitAction());
        }
      }}
      onMouseMove={(e) => {dispatch(setCoordAction(e.pageX, e.pageY))}}
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
