import { Graphics, Container } from "@inlet/react-pixi";
import React from "react";

const Plate = (props) => {

    const drawPlate = React.useCallback(g => {
        g.beginFill(0xFFFFFF)
        .lineStyle(4, 0x000000)
        .drawRect(0, 0, 500, 50)
        
    }, [])

    return (
        <Container
            position={[props.stageWidth / 1.7, props.stageHeight / 1.5]}
            angle={360 - 45}
            anchor={0.5}>
            <Graphics draw={drawPlate}/>
        </Container>
    )
}

export default Plate;