import React from "react";
import { Graphics, Container } from "@inlet/react-pixi";

const Plate = (props) => {

    const drawPlate = React.useCallback(g => {
        g.clear()
        g.beginFill(0x999999)
        .lineStyle(3, 0x000000)
        .drawRect(0, 0, props.plateWidth, props.plateHeight)
        g.pivot.set(g.width/2, 0)
    }, [props])

    return (
        <Container
            position={[props.position.x, props.position.y]}>
            <Graphics 
                draw={drawPlate} 
                angle={360 - (90 - props.plateAngle)}/>
        </Container>
    )
}

export default Plate;