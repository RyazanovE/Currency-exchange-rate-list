export interface IValuteItem {
  ID: string;
  NumCode: number;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

export interface ICoords {
  pX: number,
  pY: number,

}

export interface ISelectedValue {
  date: string,
  value: IValuteItem | null,
}