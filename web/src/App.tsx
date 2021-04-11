import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Header} from "./components";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact={true}> </Route>
            </Switch>
        </Router>
    );
}

export default App;
