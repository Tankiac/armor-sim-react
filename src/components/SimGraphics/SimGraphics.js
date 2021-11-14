import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Graphics, Stage } from "@inlet/react-pixi";

import Shell from "../PixiComponents/Shell/Shell";
import Plate from "../PixiComponents/Plate/Plate";
import Grid from "../PixiComponents/Grid/Grid";

import classes from "./SimGraphics.module.css"


const SimGraphics = (props) => {

    function degToRad(degrees) {
        return degrees * (Math.PI / 180);
      };

    function radToDeg(rad) {
        return rad / (Math.PI / 180);
      };

    const dispatch = useDispatch();
    const plateAngle = useSelector(state => state.plateAngle);
    const screenSize = useSelector(state => state.screenSize);

    const simGraphicsRef = useRef()
    
    const [stageWidth, setStageWidth] = useState(1579);
    const [stageHeight, setStageHeight] = useState(913);
    const [shellPosition, setShellPosition] = useState({});
    const [shellDistanceToPlate, setShellDistanceToPlate] = useState(null);
    const [shellDistanceToPlateEdge, setShellDistanceToPlateEdge] = useState(null);
    const [angleOfImpact, setAngleOfImpact] = useState(null);

    const plateX = stageWidth / 1.35;
    const plateY = stageHeight / 2;

    const plateWidth = 500;
    const plateHeight = 50;

    const halfPlateWidth = plateWidth / 2;

    useEffect(() => {
        let shellDistanceToPlate = 
            Math.sqrt(
                Math.pow(Math.abs(plateY - shellPosition.y), 2) + 
                Math.pow(Math.abs(plateX - shellPosition.x), 2)
            )
        let plateEdgeXdiff;
        let plateEdgeYdiff;
        
        plateEdgeXdiff = halfPlateWidth * Math.sin(degToRad(plateAngle))
        plateEdgeYdiff = halfPlateWidth * Math.sin(degToRad(90 - plateAngle))
        let plateEdge = {
            x: plateX - plateEdgeXdiff,
            y: plateY + plateEdgeYdiff
        }
        let shellDistanceToPlateEdge = 
            Math.sqrt(
                Math.pow(Math.abs(plateEdge.y - shellPosition.y), 2) + 
                Math.pow(Math.abs(plateEdge.x - shellPosition.x), 2)
            )
        setShellDistanceToPlate(shellDistanceToPlate)
        setShellDistanceToPlateEdge(shellDistanceToPlateEdge)
    }, [shellPosition, plateAngle])

    useEffect(() => {
        const impactAngle = 
            Math.abs(
                90 - radToDeg(
                    Math.acos(
                        (
                            (Math.pow(shellDistanceToPlate, 2) + Math.pow(halfPlateWidth, 2)) - 
                            Math.pow(shellDistanceToPlateEdge, 2)
                        )
                            /
                        (2 * shellDistanceToPlate * halfPlateWidth)
                    )
                )
            )
        setAngleOfImpact(impactAngle)
        dispatch({
            type: "setAngleOfImpact",
            payload: {
                angleOfImpact: impactAngle
            }
        })
    }, [shellDistanceToPlateEdge, shellDistanceToPlate])

    useEffect(() => {
        setStageHeight(simGraphicsRef.current.clientHeight);
        setStageWidth(simGraphicsRef.current.clientWidth);
    }, [screenSize])

    return (
            <div className={classes.SimGraphics} ref={simGraphicsRef}>
                <Stage 
                    width={stageWidth} 
                    height={stageHeight}
                    
                    options={{
                        backgroundAlpha: 0,
                        antialias: true,
                        interactive: true
                    }}>
                        <Grid 
                            stageHeight={stageHeight} 
                            stageWidth={stageWidth}/>
                        <Shell 
                            x={300} 
                            y = {stageHeight / 2} 
                            scale={0.5} 
                            setShellPosition={setShellPosition} 
                            stageWidth={stageWidth} 
                            stageHeight={stageHeight}/>
                        <Plate 
                            plateAngle={plateAngle} 
                            plateWidth={plateWidth}
                            plateHeight={plateHeight}
                            x = {plateX} 
                            y = {plateY} 
                            stageWidth={stageWidth} 
                            stageHeight={stageHeight}/>
                </Stage>
            </div>
    )
}

export default SimGraphics;