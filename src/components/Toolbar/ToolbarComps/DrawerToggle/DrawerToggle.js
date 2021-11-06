import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from './DrawerToggle.module.css';
import drawerToggleWhite from "../../../../assets/images/DrawerToggleWhite.png"
import drawerToggleTransparent from "../../../../assets/images/DrawerToggleTransparent.png"

const DrawerToggle = (props) => {
    const dispatch = useDispatch();
    const [drawerTogglePng, setDrawerTogglePng] = useState(drawerToggleTransparent)

    const setShowBackdrop = () => {
        dispatch({
            type: "setShowBackdrop",
            payload: {
                showBackdrop: true
            }
        })
    }

    useEffect(() => {
        if (props.isHomePage) {
            setDrawerTogglePng(drawerToggleTransparent)
        } else if (!props.isHomePage) {
            setDrawerTogglePng(drawerToggleWhite)
        }
    }, [props.isHomePage])

    return (
        <img
        src={drawerTogglePng}   
        className={classes.DrawerToggle}
        onClick={setShowBackdrop}/>
    )

};

export default DrawerToggle;