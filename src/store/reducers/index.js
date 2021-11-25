import { createStore } from "redux";

const mainReducer = (state = { 
        screenSize: "large", 
        flash: null, 
        plateAngle: 45, 
        angleOfImpact: 45,
        plateThickness: 50
    }, action ) => {
    switch (action.type) {
        case "flash": return { ...state, flashMessage: action.payload.flashMessage, flashType: action.payload.flashType } || state;
        case "setScreenSize": return { ...state, screenSize: action.payload.screenSize } || state;
        case "setPlateAngle": return { ...state, plateAngle: action.payload.plateAngle } || state;
        case "setAngleOfImpact": return { ...state, angleOfImpact: action.payload.angleOfImpact } || state;
        case "setPlateThickness": return { ...state, plateThickness: action.payload.plateThickness } || state;
        default: return state;
    }
};

const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;