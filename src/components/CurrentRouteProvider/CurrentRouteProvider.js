import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const CurrentRouteProvider = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const getToolbarBtn = () => {
        switch (location.pathname) {
            case "/": return "calculator";
            case "/tutorial": return "how to use";
            default: return "calculator";
        }
    }

    useEffect(() => {
        dispatch({
            type: "setActiveToolbarBtn",
            payload: {
                activeToolbarBtn: getToolbarBtn()
            }
        })
    }, [location])

    return null;
}

export default CurrentRouteProvider;