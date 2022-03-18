import React, { FC, useState } from "react";
import { List } from "../reusedComponents/List";
import { ISelectedValue } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ValutePageTableProps {
  arr: ISelectedValue[];
  className?: string;
}

export const ValutePageTable: FC<ValutePageTableProps> = (props) => {
  const [prevValue, setPrevValue] = useState<Number | null>(null);

  function valuteDiff(y: number, x: number) {
    return ((y - x)).toFixed(4);
  }



  return (
    <table className={props.className}>
      <caption className="valute-page-caption">
        {localStorage.currentValuteName + `(${localStorage.currentCharCode})`}
      </caption>
      <tbody>
        <tr>
          <th>Дата</th>
          <List<ISelectedValue>
            items={props.arr}
            renderItem={(item) => <td key={item.date}>{item.date}</td>}
          />
        </tr>
        <tr>
          <th>Валюта</th>
          <List<ISelectedValue>
            items={props.arr}
            renderItem={(item) => (
              <td key={item.date}>
                {item.value !== null ? item.value?.Value : "-"}
              </td>
            )}
          />
        </tr>
        <tr>
          <th>Разница</th>
          <List<ISelectedValue>
            items={props.arr}
            renderItem={(item) => (
              <td style={item.value !== null && Number(valuteDiff(item.value?.Value, item.value.Previous)) < 0 ? {color: "red"} : {color: "green"}} key={item.date}>
                {item.value !== null
                  ? valuteDiff(item.value?.Value, item.value.Previous)
                  : "-"}
              </td>
            )}
          />
        </tr>
      </tbody>
    </table>
  );
};
