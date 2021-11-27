import React from "react";
import { useSelector } from "react-redux";

import classes from "./TutorialArticle.module.css"

const TutorialArticle = (props) => {
    const screenSize = useSelector(state => state.screenSize);

    return (
        <div className={classes.TutorialArticle}>
            <h1>How to use</h1>

            <h2 className={classes.SubTitle}>About</h2>

            <div className={classes.TextDiv}>
                This app is a calculator that uses the De Marre equation to calculate the penetration
                of large caliber shells against steel armor. It features a 2D graphical representation
                of the shell and target plate.
            </div>

            <h2 className={classes.SubTitle}>Graphical Representation</h2>

            <img 
                src="https://i.imgur.com/tvjymFS.gif" 
                alt="Dragging shell placeholder gif"
                className={classes.Image}/>

            <div className={classes.TextDiv}>
                You can freely move the shell around the grid to change the angle at which the shell impacts the
                armor. By selecting the presets or inputing a custom plate angle, the angle of the plate on your
                screen will change. 
            </div>

            <h2 className={classes.SubTitle}>The Calculator</h2>

            <div className={classes.TextDiv}>

                <div className={classes.ImageDesc}>
                    The version of the De Marre equation used can be seen in the picture below.
                </div>
                <img 
                    className={classes.Image}
                    src="https://i.imgur.com/T7m04OM.png" 
                    alt="De Marre Equation"/>

                The variables represent:
                <ul>
                    <li className={classes.ListItem}>
                        M - Shell Mass - The mass of the projectile alone, without the cartridge
                    </li>
                    <li className={classes.ListItem}>
                        D - Shell Diameter - The diameter of the attacking shell without the sabot if there was one
                    </li>
                    <li className={classes.ListItem}>
                        V - Shell Velocity - The velocity of the attacking shell at the point of impact
                    </li>
                    <li className={classes.ListItem}>
                        θ - Angle of Impact - The angle at which the shell impacts the plate
                    </li>
                    <li className={classes.ListItem}>
                        T - Shell Penetration - The maximum plate thickness that the shell can penetrate
                    </li>
                    <li className={classes.ListItem}>
                        K - De Marre's Constant - A dimensionless constant that varies from shell to shell. For soviet shells it is ~2400, while for other nations it is usually ~2000
                    </li>
                    <li className={classes.ListItem}>
                        n - Thickness exponent - A dimensionless constant that affects the shell's performance against angled armor. A value of 1.4 usually gives the most accurate results. For APCR and APDS shells it should be around 1.1 - 1.2
                    </li>
                    <li className={classes.ListItem}>
                        s - Absolute scale exponent - Always 0.1
                    </li>
                </ul>

                In the calculator you will also see:
                <ul>
                    <li className={classes.ListItem}>
                        Plate angle - The angle at which the target plate is placed in the 2D representation
                    </li>
                    <li className={classes.ListItem}>
                        Plate thickness - The thickness of the target plate. Irrelevant to the calculation
                        but shows if the result was a success or fail with a green, yellow or red color.
                        Green represents a total penetration, yellow represents a possible/partial penetration that
                        could still be lethal, and red represents a failure to penetrate.
                    </li>
                </ul>

            </div>

            <h2 className={classes.SubTitle}>Presets</h2>

            <div className={classes.TextDiv}>
                In the calculator there are a number of presets for shells and armor plates. Currently they only
                include WW2 German, American and Soviet shells and tanks. The calculator however works for all
                AP, APCR and most APDS shells, as well as any steel (RHA) armor plate at any angle. It does not
                work for APFSDS or HEAT shells, or ERA/NERA composite armor.
            </div>
            <div className={classes.TextDiv}>Keep in mind that to select a target plate preset, you must first select the tank that it belongs to.</div>
            <div className={classes.TextDiv}>
                You can manually type values into the input fields to test the penetration of shells which are not
                available in the presets, or hypothetical shells that you can make up yourself.
            </div>

        </div>
    )
}

export default TutorialArticle;