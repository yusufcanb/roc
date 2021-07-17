import React, {FunctionComponent, useEffect} from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Header} from "core/components";
import Home from "core/views/Home";

import Settings from "project/views/Settings";
import Factory from "factory/views/Factory";
import Jobs from "job/views/Jobs";
import TaskForce from "task-force/views/TaskForce";
import Robot from "robot/views/Robot";
import {useStore} from "./core/store";

const App: FunctionComponent = () => {
    const {environmentStore} = useStore();

    useEffect(() => {
        environmentStore.fetchEnvironments();
    }, [environmentStore]);

    return <Router>
        <Header/>
        <main style={{height: "100%"}}>
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
}

export default App;
