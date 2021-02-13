import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import page1 from './Components.js/Page1';
import page2 from './Components.js/Page2';
import page3 from './Components.js/Page3';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route
                    exact={true}
                    path='/'
                    component={page1}
                />
                <Route
                    exact={true}
                    path='/Page1'
                    component={page1}
                />
                <Route
                    exact={true}
                    path='/page2'
                    component={page2}
                />
                <Route
                    exact={true}
                    path='/page3'
                    component={page3}
                />
            </Switch>
        </Router>
    );
}