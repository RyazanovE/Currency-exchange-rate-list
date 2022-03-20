import React from "react";
import { TenDaysValuteTable } from "../table/TenDaysValuteTable";
import { SelectedValuteTable } from "../table/SelectedValuteTable";
import { Link } from "react-router-dom";


export const SelValuteContent = (props) => {
    return(
        <>
        <SelectedValuteTable {...props}/> 
        <TenDaysValuteTable {...props} className="valute-table valute-page-container__valute-table"/>
        <Link to="/" className="button-back valute-page-container__button-back" >На главную &#10148;</Link>
        </>
    )
}