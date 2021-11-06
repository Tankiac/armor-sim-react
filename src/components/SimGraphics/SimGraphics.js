import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Graphics, Stage } from "@inlet/react-pixi";

import Plate from "../PixiComponents/Plate/Plate";

import classes from "./SimGraphics.module.css"


const SimGraphics = (props) => {

    const [stageWidth, setStageWidth] = useState(1000);
    const [stageHeight, setStageHeight] = useState(500);

    const screenSize = useSelector(state => state.screenSize);

    const simGraphicsRef = useRef()

    useEffect(() => {
        setStageHeight(simGraphicsRef.current.clientHeight);
        setStageWidth(simGraphicsRef.current.clientWidth);
    }, [screenSize])

    const reducer = (_, { data }) => data
    const Grid = () => {
        const [motion, update] = useReducer(reducer)
      
        return (null)
    }

    

    return (
            <div className={classes.SimGraphics} ref={simGraphicsRef}>
                <Stage 
                    width={stageWidth} 
                    height={stageHeight}
                    options={{
                        backgroundAlpha: 0,
                        antialias: true,
                    }}>
                        <Plate stageWidth={stageWidth} stageHeight={stageHeight}/>
                </Stage>
            </div>
    )
}

export default SimGraphics;