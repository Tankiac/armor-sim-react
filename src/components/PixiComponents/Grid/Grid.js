import React from "react";
import { Graphics } from "@inlet/react-pixi";

const Grid = (props) => {

    const gridDensity = 45;

    const drawGrid = React.useCallback(g => {
            g.clear()
        for (let i = 1; i < props.stageWidth / gridDensity; i++) {
            
            g.lineStyle(1, 0xcccccc)
            .moveTo(i*gridDensity, 0)
            .lineTo(i*gridDensity, props.stageHeight)
            
            g.moveTo(0, i*gridDensity)
            .lineTo(props.stageWidth, i*gridDensity)

            //console.log(`i:${i} stageHeight:${props.stageHeight} stageWidth:${props.stageWidth} gridDensity:${gridDensity}`)
        }
        
    }, [props.stageHeight, props.stageWidth])

    return (
        <Graphics draw={drawGrid}/>
    )
}

export default Grid;