import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import shellData from "../../utility/shellData";
import plateData from "../../utility/plateData";

import classes from "./DeMarreCalculator.module.css"


const DeMarreCalculator = (props) => {
    const [result, setResult] = useState(null);
    const [shellPreset, setShellPreset] = useState(null);
    const [targetTankPreset, setTargetTankPreset] = useState(null);
    const [platePreset, setPlatePreset] = useState(null);
    const [plateNames, setPlateNames] = useState(null);

    const [shellMass, setShellMass] = useState(3.14);
    const [shellDiameter, setShellDiameter] = useState(57);
    const [shellVelocity, setShellVelocity] = useState(990);
    const [plateAngle, setPlateAngle] = useState(45);
    const [plateThickness, setPlateThickness] = useState(75);
    const [deMarreConst, setDeMarreConst] = useState(2400);
    const [thicknessConst, setThicknessConst] = useState(1.4);

    const dispatch = useDispatch();

    const angleOfImpact = Math.round(useSelector(state => state.angleOfImpact))

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
        setTargetTankPreset(e.value)
    }

    const onSelectPlatePreset = (e) => {
        setPlatePreset(e.value)
    }

    const renderCounter = useRef(0);

    useEffect(() => {
        if (renderCounter.current > 2) {
            onCalculate()
        } else renderCounter.current++
    }, [angleOfImpact])

    useEffect(() => {
        if (renderCounter.current > 2) {
            
        } else renderCounter.current++
    }, [platePreset])

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
    
    useEffect(() => {
        setPlateNames(getPlateNames());
    }, [targetTankPreset])

    useEffect(() => {
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
        
    }, [platePreset])

    useEffect(() => {
        if (shellPreset) {
            setShellMass(shellPreset.shellMass)
            setShellDiameter(shellPreset.shellDiameter)
            setShellVelocity(shellPreset.shellVelocity)
            setDeMarreConst(shellPreset.K)

            console.log(shellPreset)
        }
    }, [shellPreset])

    useEffect(() => {
        onCalculate()
    }, [shellMass, shellDiameter, shellVelocity, plateAngle, plateThickness, deMarreConst, thicknessConst])

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
                        id="plateSelect"
                        placeholder="Select a tank"
                        onChange={onSelectTargetTankPreset}
                        options={getTankNames()}
                    />
            </div>
            <div className={classes.PlatePresetContainer}>
                    <Select 
                        className={`${classes.SearchBox} ${classes.PlateSelectInput}`}
                        id="plateSelect"
                        placeholder="Select a plate"
                        onChange={onSelectPlatePreset}
                        options={plateNames}
                    />
            </div>
            <div className={classes.Container}>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellMass">Shell Mass (kg)</label>
                    <input 
                        type="number" 
                        id="shellMass" 
                        value={shellMass}
                        onInput={onInputShellMass}
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellDiameter">Shell Diameter (mm)</label>
                    <input 
                        type="number" 
                        id="shellDiameter" 
                        value={shellDiameter}
                        onInput={onInputShellDiameter}
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="shellVelocity">Shell Velocity (m/s)</label>
                    <input 
                        type="number" 
                        id="shellVelocity" 
                        value={shellVelocity}
                        onInput={onInputShellVelocity}
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="plateObliquity">Plate angle (°)</label>
                    <input 
                        type="number" 
                        id="plateObliquity" 
                        value={plateAngle} 
                        onInput={onInputPlateAngle}
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="angleOfImpact">Angle of Impact (°)</label>
                    <input 
                        type="number" 
                        id="angleOfImpact" 
                        value={angleOfImpact ? angleOfImpact : angleOfImpact === 0 ? angleOfImpact : 45}
                        readOnly={true}
                        className={`${classes.Input} ${classes.UnchangeableInput}`}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="plateThickness">Plate thickness (mm)</label>
                    <input 
                        type="number" 
                        id="plateThickness" 
                        value={plateThickness}
                        onInput={onInputPlateThickness}
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="deMarreConst">K - const.</label>
                    <input 
                        type="number" 
                        id="deMarreConst" 
                        value={deMarreConst}
                        onInput={onInputDeMarreConst}
                        className={classes.Input}/>
                </div>
                <div className={classes.InputContainer}>
                    <label htmlFor="thicknessConst">n - const.</label>
                    <input 
                        type="number"  
                        id="thicknessConst" 
                        value={thicknessConst}
                        onInput={onInputThicknessConst}
                        className={classes.Input}/>
                </div>
                <button 
                    className={classes.CalculateButton} 
                    onClick={() => {onCalculate()}}>
                        Calculate!
                    </button>
                {result && <div className={`${classes.Result} ${classes.Unselectable}`}>{Math.round(result*100)}mm</div>}
            </div>
        </div>
    )
    
};

export default DeMarreCalculator;