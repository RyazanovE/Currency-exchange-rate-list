import React, { FC } from "react";
import { ISelectedValue } from "../../types/types";

interface SelectedValuteTableProps {
  arr: ISelectedValue[];
  className?: string;
}

export const SelectedValuteTable: FC<SelectedValuteTableProps> = (props) => {
  const thArr = [
    "Дата",
    "Код",
    "Номинал",
    `ЦБ на ${props.arr[1].date}`,
    "ЦБ на сегодня",
  ];
  const tdArr = [
    props.arr[0].value.CharCode,
    props.arr[0].value.Nominal,
    props.arr[0].value.Previous,
    props.arr[0].value.Value,
  ];

  return (
    <table className="selected-value-table">
      <caption className="valute-page-caption">
        {localStorage.currentValuteName + `(${localStorage.currentCharCode})`}
      </caption>
      <tbody>
        <tr>
          {thArr.map((el, ind) => (
            <th key={ind}>{el}</th>
          ))}
        </tr>
        <tr>
          <td>
            {props.arr[0].date +
              "." +
              String(new Date().getFullYear()).substr(2, 4)}
          </td>
          {tdArr.map((el, ind) => (
            <td key={ind}>{el}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
