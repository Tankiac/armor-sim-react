import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./DeMarreCalculator.module.css"

const DeMarreCalculator = (props) => {
    const [result, setResult] = useState(null)

    const dispatch = useDispatch();

    const angleOfImpact = Math.round(useSelector(state => state.angleOfImpact) * 10) / 10

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
                            (vars.shellVelocity * Math.cos(angleOfImpact !== 0 ? degreesToRadians(angleOfImpact) : 0) ), 2
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

        return penetration;
    }

    const onInputPlateAngle = (e) => {
        console.log(e)
        dispatch({
            type: "setPlateAngle",
            payload: {
                plateAngle: e.target.value
            }
        })
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className={classes.DeMarreCalculator}>
            <div className={classes.Container}>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellMass">Shell Mass (kg)</label>
                    <input 
                        type="number" 
                        ref={shellMassRef} 
                        id="shellMass" 
                        defaultValue={3.14} 
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellDiameter">Shell Diameter (mm)</label>
                    <input 
                        type="number" 
                        ref={shellDiameterRef} 
                        id="shellDiameter" 
                        defaultValue={57} 
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellVelocity">Shell Velocity (m/s)</label>
                    <input 
                        type="number" 
                        ref={shellVelocityRef} 
                        id="shellVelocity" 
                        defaultValue={990} 
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="plateObliquity">Plate angle (°)</label>
                    <input 
                        type="number" 
                        ref={plateObliquityRef} 
                        id="plateObliquity" 
                        onInput={onInputPlateAngle}
                        defaultValue={45} 
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="angleOfImpact">Angle of Impact (°)</label>
                    <input 
                        type="number" 
                        ref={null} 
                        id="angleOfImpact" 
                        value={angleOfImpact ? angleOfImpact : 45}
                        className={`${classes.Input} ${classes.UnchangeableInput}`}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="deMarreConst">K - const.</label>
                    <input 
                        type="number" 
                        ref={deMarreConstRef} 
                        id="deMarreConst" 
                        defaultValue={2400} 
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="thicknessConst">n - const.</label>
                    <input 
                        type="number" 
                        ref={thicknessConstRef} 
                        id="thicknessConst" 
                        defaultValue={1.4} 
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="absoluteScaleExponent">s - const.</label>
                    <input 
                        type="number" 
                        ref={absoluteScaleExponentRef} 
                        id="absoluteScaleExponent" 
                        defaultValue={0.1} 
                        className={classes.Input}/>
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