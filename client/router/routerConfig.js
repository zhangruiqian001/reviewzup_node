/**
 * Created by wei on 2016/8/2.
 */
import Hello from '../components/hello';
import {Route, IndexRoute} from 'react-router';
import React from 'react';

exports.routerConfig = [
    <Route key="1" path="/hello" component={Hello}/>
];


