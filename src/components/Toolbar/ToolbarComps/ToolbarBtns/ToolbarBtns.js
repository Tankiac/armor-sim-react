import React from "react";
import { useSelector } from "react-redux";

import classes from "./ToolbarBtns.module.css"
import ToolbarBtn from "./ToolbarBtn/ToolbarBtn";

const ToolbarBtns = (props) => {
    const screenSize = useSelector(state => state.screenSize);

    const toolbarButtons = [ 
        {name: "Calculator", linkTo: "/"}, 
        {name: "How to use", linkTo: "/tutorial"}, 
        {name: "Armor Basics", linkTo: "/article"}, 
    ]

    return (
            <div className={
                `${screenSize === "large" || screenSize === "medium" ? 
                classes.ToolbarBtnsLarge : screenSize === "small" ? 
                classes.ToolbarBtnsSmall : classes.ToolbarBtnsExtraSmall}`}>
                {toolbarButtons.map(button => {
                    return <ToolbarBtn name={button.name} linkTo={button.linkTo} btnColor={props.btnColor}/>
                })}
            </div>
    )
}

export default ToolbarBtns;