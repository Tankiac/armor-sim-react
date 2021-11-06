import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./ToolbarBtn.module.css"

const ToolbarBtn = (props) => {
    const dispatch = useDispatch();
    const activeToolbarBtn = useSelector(state => state.activeToolbarBtn);
    const screenSize = useSelector(state => state.screenSize);

    const setBtnClasses = () => {
        let classString = `${classes.ToolbarBtn} ${screenSize === "large" || screenSize === "medium" ? 
        classes.ToolbarBtnLarge : screenSize === "small" ? 
        classes.ToolbarBtnSmall : classes.ToolbarBtnExtraSmall}`;

        if (props.btnColor === "white") {
            classString = classString.concat(` ${classes.ToolbarBtnWhite}`)
        } else if (props.btnColor === "black") {
            classString = classString.concat(` ${classes.ToolbarBtnBlack}`)
        }
        if (activeToolbarBtn === props.name.toLowerCase()) {
            classString = classString.concat(` ${classes.ToolbarBtnActive}`)
        }
        
        return classString;
    }

    return (
                <Link to={props.linkTo}>
                    <button 
                    onClick={() => {
                        dispatch({
                            type: "setActiveToolbarBtn",
                            payload: { 
                                activeToolbarBtn: props.name.toLowerCase()
                            }
                        })
                    }}
                    className=
                        {
                            setBtnClasses()
                        }>
                            {props.name}
                    </button>
                </Link>
    )
}

export default ToolbarBtn;