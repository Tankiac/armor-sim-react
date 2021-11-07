import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Graphics, Stage } from "@inlet/react-pixi";

import Shell from "../PixiComponents/Shell/Shell";
import Plate from "../PixiComponents/Plate/Plate";

import classes from "./SimGraphics.module.css"


const SimGraphics = (props) => {

    const simGraphicsRef = useRef()
    
    const [stageWidth, setStageWidth] = useState(1579);
    const [stageHeight, setStageHeight] = useState(913);
    
    const screenSize = useSelector(state => state.screenSize);

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
                        {/*<Shell stageWidth={stageWidth} stageHeight={stageHeight}/>*/}
                        <Shell x={300} y = {stageHeight / 2} scale={0.5} stageWidth={stageWidth} stageHeight={stageHeight}/>
                        <Plate x = {stageWidth / 1.35} y = {stageHeight / 2} stageWidth={stageWidth} stageHeight={stageHeight}/>
                </Stage>
            </div>
    )
}

export default SimGraphics;