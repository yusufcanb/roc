import React, {FunctionComponent, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {Header, OnBoardingLayout} from "core/components";
import {Route as Path} from "core/models/Route";
import Home from "core/views/Home";
import {useStore} from "./core/store";

import routes from "./routes";

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

    const renderRoutesRecursive: any = (path: Path) => {
        return Array.isArray(path.children)
            ? path.children.map((child: Path) => <Route path={path.path} component={path.component} exact={path.isExact} children={renderRoutesRecursive(child)}/>)
            : <Route path={path.path} component={path.component} exact={path.isExact}/>
    }

    const renderApp = () => (
        <Router>
            <Header/>
            <main style={{height: "100%"}}>
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    {
                        routes.map((route) => renderRoutesRecursive(route))
                    }
                </Switch>
            </main>
        </Router>
    )

    const isLoading = environmentStore.isLoading || projectStore.isLoading || factoryStore.isLoading;
    return isLoading && store.onBoarding ? renderOnBoarding() : renderApp()

}

export default observer(App);
