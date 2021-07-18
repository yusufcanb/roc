import React, {FunctionComponent, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {Header, OnBoardingLayout} from "core/components";
import Home from "core/views/Home";
import {useStore} from "./core/store";

import Settings from "project/views/Settings";
import Factory from "factory/views/Factory";
import Jobs from "job/views/Jobs";
import TaskForce from "task-force/views/TaskForce";
import Robot from "robot/views/Robot";


const App: FunctionComponent = () => {
    const {environmentStore, projectStore, factoryStore} = useStore();
    const store = useStore();

    useEffect(() => {
        environmentStore.fetchEnvironments();
        projectStore.fetchProjects();
        factoryStore.fetchFactories();
    }, [environmentStore, projectStore, factoryStore]);


    const renderOnBoarding = () => {
        store.setOnBoarding(false);
        return <OnBoardingLayout/>
    }

    const renderApp = () => (
        <Router>
            <Header/>
            <main style={{height: "100%"}}>
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/job" component={Jobs}/>
                    <Route path="/task-force" component={TaskForce}/>
                    <Route path="/robot" component={Robot}/>
                    <Route path="/factory" component={Factory}/>
                    <Route path="/settings" component={Settings}/>
                </Switch>
            </main>
        </Router>
    )

    const isLoading = environmentStore.isLoading || projectStore.isLoading || factoryStore.isLoading;
    return isLoading && store.onBoarding ? renderOnBoarding() : renderApp()

}

export default observer(App);
