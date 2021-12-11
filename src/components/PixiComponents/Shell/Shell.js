import React, { useState, useRef, useCallback, useEffect } from "react";
import { DashLine } from 'pixi-dashed-line'

import { Graphics, Sprite, useTick } from "@inlet/react-pixi";
import APCBCShell from "../../../assets/images/APCBCShell.png"


const Shell = (props) => {

    function degToRad(degrees) {
        return degrees * (Math.PI / 180);
      };

      const sprite = useRef();
      const trajectoryLine = useRef();

      const [position, setPosition] = useState({ x: props.shellX, y: props.shellY });
      const [shellAngle, setShellAngle] = useState(degToRad(0));

      useEffect(() => {
          setShellAngle(degToRad(360))
      }, [props.stageHeight, props.stageWidth])

      useEffect(() => {
        setPosition({ x: props.shellX, y: props.shellY })
        props.setShellPosition({ x: props.shellX, y: props.shellY })
      }, [props.shellX, props.shellY])

    const useDrag = () => {
        
        const [isDragging, setIsDragging] = useState(false);

        const onDown = useCallback(() => setIsDragging(true), []);
        const onUp = useCallback(() => setIsDragging(false), []);
        const onMove = useCallback(e => {
          if (isDragging && sprite.current) {
            let currentX = e.data.getLocalPosition(sprite.current.parent).x;
            let currentY = e.data.getLocalPosition(sprite.current.parent).y;

            if (currentX > 0 && currentY > 0) {
              setPosition(e.data.getLocalPosition(sprite.current.parent));
              props.setShellPosition(
                { 
                  x: currentX,
                  y: currentY
                }
              )

              let a = props.plateX - currentX
              let b = props.plateY - currentY

              setShellAngle(Math.asin(a / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))) + degToRad(270))
            }
          }
        }, [isDragging]);
        
        return {
          interactive: true, 
          cursor: isDragging ? "grabbing" : "grab",
          pointerdown: onDown, 
          pointerup: onUp, 
          pointerupoutside: onUp,
          pointermove: onMove,
          alpha: isDragging ? 0.5 : 1,
          anchor: 0.5,
          position,
        };
      };

    const bindDrag = useDrag();

    const drawTrajectoryLine = useCallback(g => {
      g.clear();
      if (position.x === props.shellX && position.y === props.shellY) {
        const dash = new DashLine(g, {
          dash: [20, 10],
          width: 2,
          color: 0xe8e400,
      })
        dash.moveTo(props.shellX, props.shellY)
        .lineTo(props.plateX, props.plateY)
      } else if (position.x !== props.shellX || position.y !== props.shellY) {
        g.clear()
        const dash = new DashLine(g, {
          dash: [20, 10],
          width: 2,
          color: 0xe8e400,
      })
        dash.moveTo(position.x, position.y)
        .lineTo(props.plateX, props.plateY)
      }
      
    }, [props, position])

    useTick((delta) => {
      const g = trajectoryLine.current;
      g.moveTo(sprite.current.position)
      .lineTo(props.plateX, props.plateY)
    })

    return (
      <React.Fragment>
        <Graphics 
        draw={drawTrajectoryLine}
        ref={trajectoryLine}/>
        <Sprite
        image={APCBCShell}
        scale={1}
        ref={sprite}
        rotation={position.y < props.plateY ? degToRad(360) - shellAngle : shellAngle}
        {...bindDrag}
        {...props}
        />
      </React.Fragment>
    );
  }

  export default Shell;

