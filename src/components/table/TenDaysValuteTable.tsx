import React, { FC} from "react";
import { List } from "../List/List";
import { ISelectedValue } from "../../types/types";


interface TenDaysValuteTableProps {
  arr: ISelectedValue[];
  className?: string;
}

export const TenDaysValuteTable: FC<TenDaysValuteTableProps> = (props) => {

  function valuteDiff(y: number, x: number) {
    return ((y - x)).toFixed(4);
  }

  function diffColor(item: any) {
  
    
    if (item.value !== null) {
      return  Number(valuteDiff(item.value?.Value, item.value.Previous)) < 0 ? {color: "red"} : {color: "green"}
    } else {
      return {color: "block"}
    }
  }


  return (
    <table className={props.className}>
      <caption className="valute-page-caption">
        Динамика курса 
      </caption>
      <tbody>
        <tr>
          <th>Дата</th>
          <List<ISelectedValue>
            items={props.arr}
            renderItem={(item, ind) => (ind!==0 && <td key={item.date}>{(item.date)}</td>)}
          />
        </tr>
        <tr>
          <th>Курс</th>
          <List<ISelectedValue>
            items={props.arr}
            renderItem={(item, ind) => (ind!==0 && 
              <td key={item.date}>
                {item.value.Value}
              </td>
            )}
          />
        </tr>
        <tr>
          <th>Разница</th>
          <List<ISelectedValue>
            items={props.arr}
            renderItem={(item, ind) => (ind!==0 && 
              <td style={diffColor(item)} key={item.date}>
                {valuteDiff(item.value.Value, item.value.Previous)}
              </td>
            )}
          />
        </tr>
      </tbody>
    </table>
  );
};
