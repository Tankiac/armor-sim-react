import React from "react";
import { useSelector } from "react-redux";

import DeMarreCalculator from "../../components/DeMarreCalculator/DeMarreCalculator";
import Toolbar from "../../components/Toolbar/Toolbar";
import SimGraphics from "../../components/SimGraphics/SimGraphics";
import classes from "./CalculatorPage.module.css"

const CalculatorPage = (props) => {
    const screenSize = useSelector(state => state.screenSize);

    return (
        <div className={classes.CalculatorPage}>
            <div className={classes.Content}>
                <Toolbar/>
                <DeMarreCalculator/>
                <SimGraphics/>
            </div>
        </div>
    )
}

export default CalculatorPage;