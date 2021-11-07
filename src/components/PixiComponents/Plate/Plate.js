import { Graphics, Container, Sprite } from "@inlet/react-pixi";
import React from "react";

const Plate = (props) => {
    const [position, setPosition] = React.useState({ x: props.x, y: props.y });

    const drawPlate = React.useCallback(g => {
        g.beginFill(0xFFFFFF)
        .lineStyle(4, 0x000000)
        .drawRect(0, 0, 500, 50)
        g.pivot.set(g.width/2, g.height/2)
        
    }, [])

    return (
        <Container
            position={[position.x, position.y]}>
            <Graphics 
                draw={drawPlate}
                angle={360 - 45}/>
        </Container>
    )
}

export default Plate;