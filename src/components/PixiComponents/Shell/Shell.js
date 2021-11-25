import React, { useState, useRef, useCallback } from "react";
import { DashLine } from 'pixi-dashed-line'

import { Graphics, Sprite, useTick } from "@inlet/react-pixi";
import PlaceholderShell from "../../../assets/images/PlaceholderShell.png"


const Shell = ({ x = 400, y = 300, ...props }) => {

    function degToRad(degrees) {
        return degrees * (Math.PI / 180);
      };

    function radToDeg(rad) {
        return rad / (Math.PI / 180);
      };

      const [position, setPosition] = useState({ x, y });

      const sprite = useRef();
      const trajectoryLine = useRef();

      const [plateX, plateY] = [props.stageWidth / 1.35, props.stageHeight / 2]

    const useDrag = () => {
        
        const [isDragging, setIsDragging] = useState(false);
        
        const [shellAngle, setShellAngle] = useState(degToRad(0))

        const onDown = useCallback(() => setIsDragging(true), []);
        const onUp = useCallback(() => setIsDragging(false), []);
        const onMove = useCallback(e => {
          if (isDragging && sprite.current) {
            setPosition(e.data.getLocalPosition(sprite.current.parent));
            props.setShellPosition(
              { 
                x: e.data.getLocalPosition(sprite.current.parent).x,
                y: e.data.getLocalPosition(sprite.current.parent).y
              }
            )

            let a = plateX - e.data.getLocalPosition(sprite.current.parent).x
            let b = plateY - e.data.getLocalPosition(sprite.current.parent).y

            setShellAngle(Math.asin(a / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))) + degToRad(270))
          }
        }, [isDragging, setPosition]);
        
        return {
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

    const bindDrag = useDrag();

    const drawTrajectoryLine = useCallback(g => {
      if (position.x === x && position.y === y) {
        const dash = new DashLine(g, {
          dash: [20, 10],
          width: 2,
          color: 0x000000,
      })
        dash.moveTo(x, y)
        .lineTo(plateX, plateY)
      } else if (position.x !== x || position.y !== y) {
        g.clear()
        const dash = new DashLine(g, {
          dash: [20, 10],
          width: 2,
          color: 0x000000,
      })
        dash.moveTo(position.x, position.y)
        .lineTo(plateX, plateY)
      }
      
    }, [position])

    useTick((delta) => {
      const g = trajectoryLine.current;
      g.moveTo(sprite.current.position)
      .lineTo(plateX, plateY)
    })

    return (
      <React.Fragment>
        <Graphics 
        draw={drawTrajectoryLine}
        ref={trajectoryLine}/>
        <Sprite
        image={PlaceholderShell}
        scale={1}
        ref={sprite}
        {...bindDrag}
        {...props}
        />
      </React.Fragment>
    );
  }

  export default Shell;

