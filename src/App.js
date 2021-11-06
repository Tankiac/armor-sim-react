import React from "react";

import Toolbar from "./components/Toolbar/Toolbar";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import ScreenSizeProvider from "./components/ScreenSizeProvider/ScreenSizeProvider";
import DeMarreCalculator from "./components/DeMarreCalculator/DeMarreCalculator";

function App() {
  return (
    <React.Fragment>
      <ScreenSizeProvider/>
      
      <CalculatorPage/>
    </React.Fragment>
  );
}

export default App;
