import React from 'react';
import ReactDom from 'react-dom';
import {routerConfig} from './router/routerConfig';
import {Router, hashHistory, Route} from 'react-router';
import Hello from './components/hello';

ReactDom.render(
    <Router history={hashHistory}>
        <Route key="1" path="/hello" component={Hello}/>
    </Router>,
    document.getElementById('root')
);
