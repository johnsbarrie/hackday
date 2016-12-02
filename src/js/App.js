import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route , IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import Layout from './jsx/layout/Layout';
import Home from './jsx/pages/Home';
import QRCode from './jsx/pages/QRCode';
import Oscillator from './jsx/pages/Oscillator';
import SpinnerControl from './jsx/pages/Spinner';
import ServerConnect from './jsx/pages/ServerConnect';

/**
React Router Setup
*/
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="/qrcode" />
			<Route path="home" component={Home}></Route>
			<Route path="qrcode" component={QRCode}></Route>
			<Route path="oscillator" component={ Oscillator }></Route>
			<Route path="spinner" component={SpinnerControl}></Route>
			<Route path="serverconnect" component={ServerConnect}></Route>
		</Route>
	</Router>, document.getElementById("app")
);
