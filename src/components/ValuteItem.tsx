import React, { FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import { IValuteItem } from "../types/types";
import {ExitAction, EnterAction} from "./store/isEnterReducer"
import {setCoordAction} from "./store/coordReducer"
import {setValuteAction} from "./store/currentValuteReducer"
import { RootState } from "./store/store"
import {setCurrrentCoordAction} from "./store/currentCoordReducer"

interface ValuteItemProps {
  item: IValuteItem;
}


export const ValuteItem: FC<ValuteItemProps> = ({ item }) => {
  const tooltip = document.querySelector('.tooltip')
  const diff = valuteDiff(item.Value, item.Previous);
  const dispatch = useDispatch();
  const currentCoord = useSelector((state: RootState) => ({
    pX: state.currentCoordReducer.pX,
    pY: state.currentCoordReducer.pY
  }))


  
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
      if ((e.relatedTarget as HTMLElement).tagName !== "TD" && (e.relatedTarget as HTMLElement).className!=="tooltip") {
        dispatch(ExitAction());
        
      }
    }}

    onMouseMove={(e) => {
      const pX = e.pageX+5
      const pY = e.pageY+10

      dispatch(setCurrrentCoordAction(pX, pY))

      if (!tooltip) {
        return
      }
      
      const tooltipHeight = (tooltip as HTMLElement).offsetHeight
      const tooltipWidth = (tooltip as HTMLElement).offsetWidth
      const currentPositionY = currentCoord.pY + tooltipHeight
      const currentPositionX = currentCoord.pX + tooltipWidth
      const maxPositionY = document.documentElement.clientHeight + document.documentElement.scrollTop
      const maxPositionX = document.documentElement.clientWidth
    

      if (currentPositionX > maxPositionX && currentPositionY > maxPositionY) {
        console.log(1)
        dispatch(setCoordAction(pX-10-tooltipWidth, pY-tooltipHeight))
      } else if (currentPositionY > maxPositionY) {
        dispatch(setCoordAction(pX, pY-tooltipHeight))
        
      } else if (currentPositionX > maxPositionX){
        dispatch(setCoordAction(pX-10-tooltipWidth, pY))

      }  else {
        dispatch(setCoordAction(pX, pY))
      }
      }
    
    }
 
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
