import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
import Channel from "@pages/Channel";



const SignUp = loadable(() => import('@pages/SignUp'));
const Login = loadable(() => import('@pages/Login'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
    return (
        // <div>
        // <div>
        //     layouts/app/index.tsx
        // </div>
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path="/signup" component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path="/workspace/channel" component={Channel} />
        </Switch>
        // </div>
    );
};

export default App;
