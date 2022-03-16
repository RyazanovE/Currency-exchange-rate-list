import React, {FC} from "react"
import { List } from "./List"
import {IValuteItem} from "../types/types"
import {ValuteItem} from "../components/ValuteItem"

interface MytableProps {
    valute: IValuteItem[];
    className?: string;
}

export const MyTable: FC<MytableProps> = (props) => {


    return (
        <table className={props.className}>
        <caption>Таблица № 1</caption>
        <List<IValuteItem>
          items={props.valute}
          renderItem={(value) => <ValuteItem key={value.ID} item={value} />}
        ></List>
      </table>
    )
}