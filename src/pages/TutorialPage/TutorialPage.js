import React from "react";

import TutorialArticle from "../../components/TutorialComps/TutorialArticle/TutorialArticle";
import Toolbar from "../../components/Toolbar/Toolbar";
import classes from "./TutorialPage.module.css"

const TutorialPage = (props) => {
    return (
        <div className={classes.TutorialPage}>
            <Toolbar/>
            <TutorialArticle/>
        </div>
    )
}

export default TutorialPage;