import React from 'react';
import loadable from '@loadable/component';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';

const SignUp = loadable(() => import('@pages/SignUp'));
const LogIn = loadable(() => import('@pages/Login'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
    return (
        // <div>
        // <div>
        //     layouts/app/index.tsx
        // </div>
        <BrowserRouter>
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/workspace" component={Workspace} />
        </Switch>
        </BrowserRouter>

    );
};

export default App;
