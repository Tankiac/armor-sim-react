import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import shellData from "../../../utility/shellData";
import plateData from "../../../utility/plateData";

import downArrow from "../../../assets/images/DownArrow.png"
import upArrow from "../../../assets/images/UpArrow.png"

import classes from "./DeMarreCalculator.module.css"


const DeMarreCalculator = (props) => {
    const [result, setResult] = useState(null);
    const [effectiveThickness, setEffectiveThickness] = useState(null)
    const [shellPreset, setShellPreset] = useState(null);
    const [targetTankPreset, setTargetTankPreset] = useState(null);
    const [platePreset, setPlatePreset] = useState(null);
    const [plateNames, setPlateNames] = useState(null);
    const [highlightInput, setHighlightInput] = useState(null);
    const [showInputs, setShowInputs] = useState(true);

    const [shellMass, setShellMass] = useState(3.14);
    const [shellDiameter, setShellDiameter] = useState(57);
    const [shellVelocity, setShellVelocity] = useState(990);
    const [plateAngle, setPlateAngle] = useState(45);
    const [plateThickness, setPlateThickness] = useState(75);
    const [deMarreConst, setDeMarreConst] = useState(2400);
    const [thicknessConst, setThicknessConst] = useState(1.4);

    const shellMassInput = useRef();
    const shellDiameterInput = useRef();
    const shellVelocityInput = useRef();
    const plateAngleInput = useRef();
    const plateThicknessInput = useRef();
    const deMarreConstInput = useRef();
    const thicknessConstInput = useRef();

    const dispatch = useDispatch();

    const angleOfImpact = Math.round(useSelector(state => state.angleOfImpact))

    const focusInput = (input) => {
        input.current.focus();
    }

    const onCalculate = () => {
        setResult(calculatePenetration());
    }

    const degreesToRadians = (degrees) => {
        var pi = Math.PI;
        return degrees * (pi/180);
    }

    const calculatePenetration = () => {
        let penetration;

        penetration = 

            (Math.pow( 
                ( 
                    (
                        shellMass * Math.pow( 
                            (shellVelocity * Math.cos(angleOfImpact !== 0 ? degreesToRadians(angleOfImpact) : 0) ), 2
                        ) 
                    ) 
                        / 
                    Math.pow(shellDiameter / 100, 3)
                ) 
                    / 
                (
                    Math.pow(
                    deMarreConst, 2
                ) * Math.pow(
                    shellDiameter / 100, 0.1 * -1
                )
                    ) , 1/thicknessConst)
            ) * shellDiameter / 100;

        return penetration;
    }

    const onInputPlateAngle = (e) => {
        dispatch({
            type: "setPlateAngle",
            payload: {
                plateAngle: e.target.value
            }
        })

        setPlateAngle(e.target.value)
    }

    const onInputShellMass = (e) => {
        setShellMass(e.target.value)
    }

    const onInputShellDiameter = (e) => {
        setShellDiameter(e.target.value)
    }

    const onInputShellVelocity = (e) => {
        setShellVelocity(e.target.value)
    }

    const onInputPlateThickness = (e) => {
        setPlateThickness(e.target.value)
    }

    const onInputDeMarreConst = (e) => {
        setDeMarreConst(e.target.value)
    }

    const onInputThicknessConst = (e) => {
        setThicknessConst(e.target.value)
    }


    const onSelectShellPreset = (e) => {
        setShellPreset(e.value)
    }

    const onSelectTargetTankPreset = (e) => {
        setTargetTankPreset(e.value);
        changePlate();
    }

    const onSelectPlatePreset = (e) => {
        setPlatePreset(e.value);
    }

    const renderCounter = useRef(0);
    const highlightRenderCounter = useRef(0);

    useEffect(() => {
        if (renderCounter.current > 2) {
            onCalculate()

            let hypotenuse;
            hypotenuse = plateThickness / Math.sin(degreesToRadians(90 - angleOfImpact));
            setEffectiveThickness(hypotenuse)

        } else renderCounter.current++
    }, [angleOfImpact, plateThickness])

    useEffect(() => {
        if (highlightRenderCounter.current > 2) {
                setHighlightInput(classes.HighlightInput);
        } else highlightRenderCounter.current++
    }, [angleOfImpact])

    const getShellNames = () => {
        let shellNames = [];
        shellData.forEach(shell => {
            shellNames.push(
                {
                    value: shell, label: shell.fullName
                }
            )
        });  

        return shellNames;
    }
    
    const getTankNames = () => {
        let tankNames = [];
        plateData.forEach(tank => {
            tankNames.push(
                {
                    value: tank.tankName, label: tank.tankName
                }
            )
        })

        return tankNames;
    }

    const getPlateNames = () => {
        let plateNames = [];
        plateData.forEach(tank => {
            if (tank.tankName === targetTankPreset) {
                tank.plates.forEach(plate => {
                    plateNames.push(
                        {
                            value: plate, label: plate.plateName
                        }
                    )
                })
            }
        })

        return plateNames;
    }

    const changePlate = () => {
        if (platePreset) {
            setPlateAngle(platePreset.angle)
            dispatch({
                type: "setPlateAngle",
                payload: {
                    plateAngle: platePreset.angle
                }
            })
            setPlateThickness(platePreset.thickness)
        }
    }
    
    useEffect(() => {
        setPlateNames(getPlateNames());
    }, [targetTankPreset])

    useEffect(() => {
        if (platePreset) {
            if (plateNames.find(plate => plate.value.plateName === platePreset.plateName)) {
                setPlatePreset(plateNames.find(plate => plate.value.plateName === platePreset.plateName).value);
            }
            else {
                setPlatePreset(plateNames[0].value);
            }
        }
    }, [plateNames])

    useEffect(() => {
        changePlate();
    }, [platePreset])

    useEffect(() => {
        if (shellPreset) {
            setShellMass(shellPreset.shellMass)
            setShellDiameter(shellPreset.shellDiameter)
            setShellVelocity(shellPreset.shellVelocity)
            setDeMarreConst(shellPreset.K)
        }
    }, [shellPreset])

    useEffect(() => {
        if (renderCounter.current > 2) {
            onCalculate()
        }
    }, [shellMass, shellDiameter, shellVelocity, plateAngle, plateThickness, deMarreConst, thicknessConst])

    const customSelectStyles = {
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: "rgba(43, 47, 54, 1)",
            color: "rgb(234, 236, 239)",
            border: "none",
            borderRadius: "5px"
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "rgb(234, 236, 239)",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: "rgba(43, 47, 54, 1)",
            color: "rgb(234, 236, 239)",
            "&:hover": {
                backgroundColor: "rgba(49, 53, 60, 1)"    
            }
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "rgba(43, 47, 54, 1)",
            color: "white",
            boxShadow: "none",
            borderColor: state.isFocused ? "rgb(255, 238, 0)" : "rgba(0, 0, 0, 0)",
            "&:hover": {
                backgroundColor: "rgba(49, 53, 60, 1)",
                cursor: "pointer"
            }
        })
    }

    return (
        
        <div className={classes.DeMarreCalculator}>
            <div className={classes.SearchContainer}>
                    <label 
                        htmlFor="shellSelect"
                        className={classes.SearchLabel}>
                        Shell presets
                    </label>
                    <Select 
                        className={classes.SearchBox}
                        styles={customSelectStyles}
                        id="shellSelect"
                        placeholder="Select a shell"
                        onChange={onSelectShellPreset}
                        options={getShellNames()}
                    />
            </div>
            <div className={classes.SearchContainer}>
                    <label 
                        htmlFor="plateSelect"
                        className={classes.SearchLabel}>
                        Plate presets
                    </label>
                    <Select 
                        className={`${classes.SearchBox} ${classes.PlateSelectInput}`}
                        styles={customSelectStyles}
                        id="plateSelect"
                        placeholder="Select a tank"
                        onChange={onSelectTargetTankPreset}
                        options={getTankNames()}
                    />
            </div>
            <div className={classes.PlatePresetContainer}>
                    <Select 
                        className={`${classes.SearchBox} ${classes.PlateSelectInput}`}
                        styles={customSelectStyles}
                        id="plateSelect"
                        placeholder="Select a plate"
                        onChange={onSelectPlatePreset}
                        options={plateNames}
                    />
            </div>

            <div 
                className={classes.ArrowContainer}
                onClick={() => {setShowInputs(!showInputs)}}>
                <img className={classes.ShowCalculatorArrow} src={showInputs ? upArrow : downArrow}/>
            </div>

            <div className={`${classes.Container} ${!showInputs ? classes.HideInputs : null}`}>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellMass">Shell Mass</label>
                    <div className={classes.InputWrapper} onClick={() => {focusInput(shellMassInput)}}>
                        <input 
                            type="number" 
                            id="shellMass" 
                            value={shellMass}
                            ref={shellMassInput}
                            onInput={onInputShellMass}
                            className={classes.Input}/>
                            <div className={classes.MeasuringUnit}>kg</div>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellDiameter">Shell Diameter</label>
                    <div className={classes.InputWrapper} onClick={() => {focusInput(shellDiameterInput)}}>
                        <input 
                            type="number" 
                            id="shellDiameter" 
                            value={shellDiameter}
                            ref={shellDiameterInput}
                            onInput={onInputShellDiameter}
                            className={classes.Input}/>
                            <div className={classes.MeasuringUnit}>mm</div>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellVelocity">Shell Velocity</label>
                    <div className={classes.InputWrapper} onClick={() => {focusInput(shellVelocityInput)}}>
                        <input 
                            type="number" 
                            id="shellVelocity" 
                            value={shellVelocity}
                            ref={shellVelocityInput}
                            onInput={onInputShellVelocity}
                            className={classes.Input}/>
                            <div className={classes.MeasuringUnit}>m/s</div>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="plateObliquity">Plate angle</label>
                    <div className={classes.InputWrapper} onClick={() => {focusInput(plateAngleInput)}}>
                        <input 
                            type="number" 
                            id="plateObliquity" 
                            value={plateAngle} 
                            ref={plateAngleInput}
                            onInput={onInputPlateAngle}
                            className={classes.Input}/>
                            <div className={classes.MeasuringUnit}>°</div>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="angleOfImpact">Angle of Impact</label>
                    <div className={`${classes.InputWrapper} ${classes.UnchangeableInputWrapper} ${highlightInput}`}>
                        <input 
                            type="number" 
                            id="angleOfImpact" 
                            value={angleOfImpact ? angleOfImpact : angleOfImpact === 0 ? angleOfImpact : 45}
                            readOnly
                            disabled
                            className={`${classes.Input} ${classes.UnchangeableInput}`}/>
                            <div className={classes.MeasuringUnit}>°</div>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="plateThickness">Plate thickness</label>
                    <div className={classes.InputWrapper} onClick={() => {focusInput(plateThicknessInput)}}>
                        <input 
                            type="number" 
                            id="plateThickness" 
                            value={plateThickness}
                            ref={plateThicknessInput}
                            onInput={onInputPlateThickness}
                            className={classes.Input}/>
                            <div className={classes.MeasuringUnit}>mm</div>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="deMarreConst">K - const.</label>
                    <div className={classes.InputWrapper} onClick={() => {focusInput(deMarreConstInput)}}>
                        <input 
                            type="number" 
                            id="deMarreConst" 
                            value={deMarreConst}
                            ref={deMarreConstInput}
                            onInput={onInputDeMarreConst}
                            className={classes.Input}/>
                            <div className={classes.MeasuringUnit}>-</div>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="thicknessConst">n - const.</label>
                    <div className={classes.InputWrapper} onClick={() => {focusInput(thicknessConstInput)}}>
                        <input 
                            type="number"  
                            id="thicknessConst" 
                            value={thicknessConst}
                            ref={thicknessConstInput}
                            onInput={onInputThicknessConst}
                            className={classes.Input}/>
                            <div className={classes.MeasuringUnit}>-</div>
                    </div>
                </div>
            </div>
            <button 
                    className={classes.CalculateButton} 
                    onClick={() => {onCalculate()}}>
                        Calculate
                </button>
            {result ? <div 
                className={`${classes.Result} ${classes.Unselectable}`}>
                    Effective penetration <span className={`${result*100 > plateThickness * 1.00 ? classes.SuccessText : result*100 > plateThickness * 0.9 ? classes.MixedText : classes.FailText}`}>{Math.round(result*100)}mm</span>
                    {
                        result*100 > plateThickness * 1.00 ? <div className={classes.SuccessText}>Complete penetration</div> :
                        result*100 > plateThickness * 0.9 ? <div className={classes.MixedText}>Partial penetration</div> :
                        result*100 < plateThickness * 0.9 ? <div className={classes.FailText}>No penetration</div> : null
                    }
                </div>
                : isNaN(result) ? <div 
                    className={`${classes.Result} ${classes.Unselectable}`}>
                        <div className={classes.FailText}>Error</div> Please input valid values
                </div> : null}
            {/*effectiveThickness && <div className={`${classes.Result} ${classes.Unselectable}`}>Effective thickness {Math.round(effectiveThickness)}mm</div>*/}
        </div>
    )
    
};

export default DeMarreCalculator;