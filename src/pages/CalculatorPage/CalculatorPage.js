import React from "react";
import { useSelector } from "react-redux";

import DeMarreCalculator from "../../components/CalculatorComps/DeMarreCalculator/DeMarreCalculator";
import Toolbar from "../../components/Toolbar/Toolbar";
import SimGraphics from "../../components/CalculatorComps/SimGraphics/SimGraphics";
import classes from "./CalculatorPage.module.css"

const CalculatorPage = (props) => {
    const screenDimensions = useSelector(state => state.screenDimensions);

    return (
        <div className={classes.CalculatorPage}>
            <div className={`${classes.Content} ${screenDimensions.width < 800 ? classes.ContentSmall : null}`}>
                <Toolbar/>
                <DeMarreCalculator/>
                <SimGraphics/>
            </div>
        </div>
    )
}

export default CalculatorPage;