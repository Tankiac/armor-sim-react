import React, { useEffect } from "react";

import { Sprite } from "@inlet/react-pixi";
import PlaceholderShell from "../../../assets/images/PlaceholderShell.png"


const Shell = ({ x = 400, y = 300, ...props }) => {

    function degToRad(degrees) {
        return degrees * (Math.PI / 180);
      };

    function radToDeg(rad) {
        return rad / (Math.PI / 180);
      };

    const useDrag = ({ x, y }) => {
        const sprite = React.useRef();
        const [isDragging, setIsDragging] = React.useState(false);
        const [position, setPosition] = React.useState({ x, y });
        const [plateX, plateY] = [props.stageWidth / 1.35 - 25, props.stageHeight / 2 - 25]
        const [shellAngle, setShellAngle] = React.useState(degToRad(0))

        const onDown = React.useCallback(() => setIsDragging(true), []);
        const onUp = React.useCallback(() => setIsDragging(false), []);
        const onMove = React.useCallback(e => {
          if (isDragging && sprite.current) {
            setPosition(e.data.getLocalPosition(sprite.current.parent));

            let a = plateX - e.data.getLocalPosition(sprite.current.parent).x
            let b = plateY - e.data.getLocalPosition(sprite.current.parent).y

            setShellAngle(Math.asin(a / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))) + degToRad(270))
          }
        }, [isDragging, setPosition]);
        
        return {
          ref: sprite,
          interactive: true, 
          pointerdown: onDown, 
          pointerup: onUp, 
          pointerupoutside: onUp,
          pointermove: onMove,
          alpha: isDragging ? 0.5 : 1,
          anchor: 0.5,
          position,
          rotation: position.y < plateY ? degToRad(360) - shellAngle : shellAngle
        };
      };

    const bind = useDrag({ x, y });
    
    return (
      <Sprite
        image={PlaceholderShell}
        scale={1}
        {...bind}
        {...props}
      />
    );
  }

  export default Shell;

