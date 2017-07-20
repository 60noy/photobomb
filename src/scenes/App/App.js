import React, { Component } from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory,hashHistory } from 'react-router';
import Home from '../Home/Home.js';
import Stats from '../Stats/Stats.js';
import NotFound from '../NotFound/NotFound.js';
import Container from '../../components/Container/Container.js';
import LoginPage from '../LoginPage/LoginPage.js';
import Auth from '../../modules/Auth.js';
import Cookies from 'universal-cookie';
import Users from '../Users/Users.js';
import Groups from '../Groups/Groups.js';

const cookie = new Cookies();
		// <Route path='/' getComponent={(location,cb)=> {
 					// 	if (Auth.isAuthenticated()) {
 					// 		cb(null,Home);
 					// 	}
 					// 	else{
 					// 		cb(null,LoginPage)
 					// 	}
 					// }}/>
 					// <Route path='/logout'  onEnter={(nextState, replace) => {
      //   				Auth.deauthenticateUser()}} />
        // change the current URL to /
        // replace('/');
// images cards screen
export default class App extends Component{
 	render() {
 		return (
 			<Router history={browserHistory}>
 				<Route path='/login' component={LoginPage}/>
 				<Route path='/' component={Container}>
 					<IndexRoute component={Home} onEnter={Auth.requireAuth()}/>
 					<Route path='stats' component={Stats}/>
 					<Route path='users' component={Users}/>
 					<Route path='groups' component={Groups}/>
 				</Route>
 				 <Route path='*' component={NotFound}/>

 			</Router>

 		);
 	}




 }
