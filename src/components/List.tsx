import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function List<T>(props: ListProps<T>) {
  return (
    <tbody className={props.className}>
      <tr>
        <th>Букв. код</th>
        <th>Валюта</th>
        <th>Курс</th>
      </tr>
      {props.items.map(props.renderItem)}
    </tbody>
  );
}
