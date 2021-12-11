import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stage } from "@inlet/react-pixi";

import Shell from "../../PixiComponents/Shell/Shell";
import Plate from "../../PixiComponents/Plate/Plate";
import Grid from "../../PixiComponents/Grid/Grid";

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
    const screenDimensions = useSelector(state => state.screenDimensions);
    const plateThickness = useSelector(state => state.plateThickness);

    const simGraphicsRef = useRef()
    const stageRef = useRef()
    
    const [stageWidth, setStageWidth] = useState(window.innerWidth - 341);
    const [stageHeight, setStageHeight] = useState(window.innerHeight - 60);
    const [shellPosition, setShellPosition] = useState({x: 300, y: stageHeight / 2});
    const [shellDistanceToPlate, setShellDistanceToPlate] = useState(null);
    const [shellDistanceToPlateEdge, setShellDistanceToPlateEdge] = useState(null);
    const [plateX, setPlateX] = useState(stageWidth / 1.35);
    const [plateY, setPlateY] = useState(stageHeight / 2);
    const [shellX, setShellX] = useState(stageWidth / 5);
    const [shellY, setShellY] = useState(stageHeight / 2);
    const [shellScale, setShellScale] = useState(0.5);
    const [plateWidth, setPlateWidth] = useState(500);

    const halfPlateWidth = plateWidth / 2;

    useEffect(() => {
        setShellX(stageWidth / 5);
        setShellY(stageHeight / 2);
    }, [stageWidth, stageHeight])

    useEffect(() => {
        setPlateX(stageWidth / 1.35);
        setPlateY(stageHeight / 2);
    }, [stageWidth, stageHeight])

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
    }, [shellPosition, plateAngle, halfPlateWidth, plateX, plateY])

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
        dispatch({
            type: "setAngleOfImpact",
            payload: {
                angleOfImpact: impactAngle
            }
        })
    }, [shellDistanceToPlateEdge, shellDistanceToPlate])

    useEffect(() => {
        setStageHeight(screenDimensions.height - 60);
        setStageWidth(screenDimensions.width - 341);

        if (screenDimensions.width < 1000) {
            setShellScale(0.4);
            setPlateWidth(300);
            setPlateX(stageWidth / 1.55);
            setShellX(stageWidth / 5.5);
        } else if (screenDimensions.width < 1200) {
            setShellScale(0.4);
            setPlateWidth(400);
            setPlateX(stageWidth / 1.45);
            setShellX(stageWidth / 5);
        } else {
            setShellScale(0.5);
            setPlateWidth(500);
            setPlateX(stageWidth / 1.35);
            setShellX(stageWidth / 5);
        }
    }, [screenDimensions, stageWidth])

    return (
            <div 
                className={`${classes.SimGraphics} ${screenDimensions.width < 800 ? classes.HideSimGraphics : null}`} 
                ref={simGraphicsRef}>
                <Stage 
                    width={stageWidth} 
                    height={stageHeight}
                    id="stage"
                    ref={stageRef}

                    options={{
                        backgroundAlpha: 0,
                        antialias: true,
                        interactive: true
                    }}>
                        <Grid 
                            stageHeight={stageHeight} 
                            stageWidth={stageWidth}/>
                        <Shell 
                            shellX={shellX} 
                            shellY={shellY} 
                            scale={shellScale} 
                            setShellPosition={setShellPosition} 
                            stageWidth={stageWidth} 
                            stageHeight={stageHeight}
                            plateX={plateX}
                            plateY={plateY}/>
                        <Plate 
                            plateAngle={plateAngle} 
                            plateWidth={plateWidth}
                            plateThickness={plateThickness / 1.3}
                            position={{x: plateX, y: plateY}}
                            stageWidth={stageWidth} 
                            stageHeight={stageHeight}/>
                </Stage>
            </div>
    )
}

export default SimGraphics;