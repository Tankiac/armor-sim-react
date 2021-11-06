import React from "react";
import { useSelector } from "react-redux";

import classes from "./Toolbar.module.css"
import DrawerToggle from "./ToolbarComps/DrawerToggle/DrawerToggle";
import ToolbarBtns from "./ToolbarComps/ToolbarBtns/ToolbarBtns";

const Toolbar = (props) => {
    const screenSize = useSelector(state => state.screenSize);

    return (
            <header className={
                `${classes.Toolbar} ${screenSize === "large" ? classes.ToolbarLarge : 
                screenSize === "medium" ? classes.ToolbarLarge : 
                screenSize === "small" ? classes.ToolbarSmall : 
                screenSize === "extraSmall" ? classes.ToolbarExtraSmall 
                : null}`}>
                {screenSize !== "extraSmall" ? <ToolbarBtns btnColor={props.btnColor}/> : <DrawerToggle isHomePage={props.btnColor === "white"}/>}
            </header>
    )
}

export default Toolbar;