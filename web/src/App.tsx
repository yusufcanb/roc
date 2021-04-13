import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Header} from "./components";
import Login from "./views/Login";

import {observer} from "mobx-react-lite";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact={true}></Route>
                <Route path="/login" component={Login}></Route>
            </Switch>
        </Router>
    );
}

export default observer(App);
