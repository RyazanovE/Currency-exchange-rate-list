import React, { FC } from "react";
import { List } from "../List/List";
import { IValuteItem } from "../../types/types";
import { ValuteItem } from "../ListItem/ValuteItem";

interface MaintableProps {
  valute: IValuteItem[];
  className?: string;
}

export const MainTable: FC<MaintableProps> = (props) => {
  return (
    <table className={props.className}>
      <caption>Курс валют ЦБ РФ на сегодня</caption>
      <tbody>
        <tr>
          <th>Букв. код</th>
          <th>Курс ЦБ</th>
          <th>%</th>
        </tr>
        <List<IValuteItem>
          items={props.valute}
          renderItem={(value) => <ValuteItem key={value.ID} item={value} />}
        />
      </tbody>
    </table>
  );
};
