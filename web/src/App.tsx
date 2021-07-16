import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {observer} from "mobx-react-lite";

import {Header} from "./components";

import Settings from "./views/Settings";
import Home from "./views/Home";
import Factory from "./views/Factory";
import Jobs from "./views/Jobs";
import TaskForce from "./views/TaskForce";
import Robot from "./views/Robot";

function App() {

    return (
        <Router>
            <Header/>
            <main>
                <Switch>
                    <Route path="/" component={Home} exact={true}></Route>
                    <Route path="/job" component={Jobs}></Route>
                    <Route path="/task-force" component={TaskForce}></Route>
                    <Route path="/robot" component={Robot}></Route>
                    <Route path="/factory" component={Factory}></Route>
                    <Route path="/settings" component={Settings}></Route>
                </Switch>
            </main>
        </Router>
    );
}

export default observer(App);
