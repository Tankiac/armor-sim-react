import React from "react";
import { Switch, Route } from "react-router-dom"

import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import ScreenSizeProvider from "./components/ScreenSizeProvider/ScreenSizeProvider";
import TutorialPage from "./pages/TutorialPage/TutorialPage";

function App() {
  return (
    <React.Fragment>
      <ScreenSizeProvider/>
      <main>
        <Switch>
          <Route path="/tutorial">
            <TutorialPage/>
          </Route>
          <Route path="/">
            <CalculatorPage/>
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
