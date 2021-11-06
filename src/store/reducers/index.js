import { createStore } from "redux";

const mainReducer = (state = { screenSize: "large", }, action ) => {
    switch (action.type) {
        case "flash": return { ...state, flashMessage: action.payload.flashMessage, flashType: action.payload.flashType } || state;
        case "setScreenSize": return { ...state, screenSize: action.payload.screenSize } || state;
        default: return state;
    }
};

const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;