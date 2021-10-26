import React, { useState, useRef } from "react";
import classes from "./DeMarreCalculator.module.css"

const DeMarreCalculator = (props) => {
    const [result, setResult] = useState(null)

    const shellMassRef = useRef();
    const shellDiameterRef = useRef();
    const shellVelocityRef = useRef();
    const plateObliquityRef = useRef();
    const deMarreConstRef = useRef();
    const thicknessConstRef = useRef();
    const absoluteScaleExponentRef = useRef();

    const onCalculate = (variables) => {
        setResult(calculatePenetration(variables));
    }

    const degreesToRadians = (degrees) => {
        var pi = Math.PI;
        return degrees * (pi/180);
    }

    const calculatePenetration = (vars) => {
        let penetration;

        penetration = 

            (Math.pow( 
                ( 
                    (
                        vars.shellMass * Math.pow( 
                            (vars.shellVelocity * Math.cos(vars.plateObliquity !== 0 ? degreesToRadians(vars.plateObliquity) : 0) ), 2
                        ) 
                    ) 
                        / 
                    Math.pow(vars.shellDiameter, 3)
                ) 
                        / Math.pow(
                            vars.deMarreConst, 2
                        ) * Math.pow(
                            vars.shellDiameter, vars.absoluteScaleExponent * -1
                        ) , 1/vars.thicknessConst)
            ) * vars.shellDiameter;


        console.log(Math.pow((vars.shellVelocity * Math.cos(vars.plateObliquity !== 0 ? degreesToRadians(vars.plateObliquity) : 0) ), 2));
        console.log(Math.cos(vars.plateObliquity !== 0 ? degreesToRadians(vars.plateObliquity) : 0))
        return penetration;
    }

    return (
        <div className={classes.Container}>
            <div className={classes.InputContainer}>
                <label for="shellMass">Shell Mass</label>
                <input type="number" ref={shellMassRef} id="shellMass" className={classes.Input}/>
            </div>
            <div className={classes.InputContainer}>
                <label for="shellDiameter">Shell Diameter</label>
                <input type="number" ref={shellDiameterRef} id="shellDiameter" className={classes.Input}/>
            </div>
            <div className={classes.InputContainer}>
                <label for="shellVelocity">Shell Velocity</label>
                <input type="number" ref={shellVelocityRef} id="shellVelocity" className={classes.Input}/>
            </div>
            <div className={classes.InputContainer}>
                <label for="plateObliquity">Angle of impact</label>
                <input type="number" ref={plateObliquityRef} id="plateObliquity" className={classes.Input}/>
            </div>
            <div className={classes.InputContainer}>
                <label for="deMarreConst">K - De Marre Constant</label>
                <input type="number" ref={deMarreConstRef} id="deMarreConst" className={classes.Input}/>
            </div>
            <div className={classes.InputContainer}>
                <label for="thicknessConst">n - Thickness Constant</label>
                <input type="number" ref={thicknessConstRef} id="thicknessConst" className={classes.Input}/>
            </div>
            <div className={classes.InputContainer}>
                <label for="absoluteScaleExponent">s - Abs. Scale Exponent</label>
                <input type="number" ref={absoluteScaleExponentRef} id="absoluteScaleExponent" className={classes.Input}/>
            </div>
            <button 
                className={classes.CalculateButton} 
                onClick={() => {onCalculate({
                    shellMass: shellMassRef.current.value,
                    shellDiameter: shellDiameterRef.current.value,
                    shellVelocity: shellVelocityRef.current.value,
                    plateObliquity: plateObliquityRef.current.value,
                    deMarreConst: deMarreConstRef.current.value,
                    thicknessConst: thicknessConstRef.current.value,
                    absoluteScaleExponent: absoluteScaleExponentRef.current.value
                })}}>
                    Calculate!
                </button>
            {result && <div className={classes.Result}>{Math.round(result*100)}mm</div>}
        </div>
    )
    
};

export default DeMarreCalculator;