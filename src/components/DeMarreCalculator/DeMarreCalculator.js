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
                    / 
                (
                    Math.pow(
                    vars.deMarreConst, 2
                ) * Math.pow(
                    vars.shellDiameter, vars.absoluteScaleExponent * -1
                )
                    ) , 1/vars.thicknessConst)
            ) * vars.shellDiameter;

        console.log(
            ( 
                (
                    vars.shellMass * Math.pow( 
                        (vars.shellVelocity * Math.cos(vars.plateObliquity !== 0 ? degreesToRadians(vars.plateObliquity) : 0) ), 2
                    ) 
                ) 
                    / 
                Math.pow(vars.shellDiameter, 3)
            ) 
                / 
            (
                Math.pow(
                vars.deMarreConst, 2
            ) * Math.pow(
                vars.shellDiameter, vars.absoluteScaleExponent * -1
            )
                )
        )
        console.log(Math.pow((vars.shellVelocity * Math.cos(vars.plateObliquity !== 0 ? degreesToRadians(vars.plateObliquity) : 0) ), 2));
        console.log(Math.cos(vars.plateObliquity !== 0 ? degreesToRadians(vars.plateObliquity) : 0))
        return penetration;
    }

    return (
        <div className={classes.DeMarreCalculator}>
            <div className={classes.Container}>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellMass">Shell Mass</label>
                    <input type="number" ref={shellMassRef} id="shellMass" value={3.14} className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellDiameter">Shell Diameter</label>
                    <input type="number" ref={shellDiameterRef} id="shellDiameter" defaultValue={57} className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellVelocity">Shell Velocity</label>
                    <input type="number" ref={shellVelocityRef} id="shellVelocity" defaultValue={990} className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="plateObliquity">Angle of impact</label>
                    <input type="number" ref={plateObliquityRef} id="plateObliquity" defaultValue={30} className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="deMarreConst">K - const.</label>
                    <input type="number" ref={deMarreConstRef} id="deMarreConst" defaultValue={2400} className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="thicknessConst">n - const.</label>
                    <input type="number" ref={thicknessConstRef} id="thicknessConst" defaultValue={1.4} className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="absoluteScaleExponent">s - const.</label>
                    <input type="number" ref={absoluteScaleExponentRef} id="absoluteScaleExponent" defaultValue={0.1} className={classes.Input}/>
                </div>
                <button 
                    className={classes.CalculateButton} 
                    onClick={() => {onCalculate({
                        shellMass: shellMassRef.current.value,
                        shellDiameter: shellDiameterRef.current.value/100,
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
        </div>
    )
    
};

export default DeMarreCalculator;