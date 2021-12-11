import React from "react";
import { useSelector } from "react-redux";

import classes from "./Toolbar.module.css"
import ToolbarBtns from "./ToolbarComps/ToolbarBtns/ToolbarBtns";

const Toolbar = (props) => {
    const screenSize = useSelector(state => state.screenSize);

    return (
            <header className={
                `${classes.Toolbar} 
                ${screenSize !== "small" ? classes.ToolbarLarge : classes.ToolbarSmall}`}>
                <ToolbarBtns btnColor={props.btnColor}/>
            </header>
    )
}

export default Toolbar;