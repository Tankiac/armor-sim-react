import React from "react";
import { Graphics, Container, Sprite } from "@inlet/react-pixi";

const Plate = (props) => {
    const [position, setPosition] = React.useState({ x: props.x, y: props.y });

    const drawPlate = React.useCallback(g => {
        g.beginFill(0xaaaaaa)
        .lineStyle(4, 0x000000)
        .drawRect(0, 0, props.plateWidth, props.plateHeight)
        g.pivot.set(g.width/2, 0)
    }, [])

    return (
        <Container
            position={[position.x, position.y]}>
            <Graphics 
                draw={drawPlate} 
                angle={360 - (90 - props.plateAngle)}/>
        </Container>
    )
}

export default Plate;