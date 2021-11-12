import React from "react";
import { Graphics } from "@inlet/react-pixi";

const Grid = (props) => {

    const gridDensity = 45;

    const drawGrid = React.useCallback(g => {
        for (let i = 0; i < props.stageWidth / gridDensity; i++) {
            g.beginFill(0x000000)
            .lineStyle(1, 0xcccccc)
            .moveTo(i*gridDensity, 0)
            .lineTo(i*gridDensity, props.stageHeight)
            
            g.beginFill(0x000000)
            .lineStyle(1, 0xcccccc)
            .moveTo(0, i*gridDensity)
            .lineTo(props.stageWidth, i*gridDensity)
        }
        
    }, [])

    return (
        <Graphics draw={drawGrid}/>
    )
}

export default Grid;