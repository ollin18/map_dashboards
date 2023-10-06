import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import About from '../containers/About/About';
import Users from '../containers/Users/mapusers';

const Routes = class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Users} />
                <Route exact path="/about-us" component={About} />
                <Route exact path="/map" component={Users} />
                <Route exact path="/mapusers" component={Users} />
            </Switch>
        );
    }
};

export default Routes;