import React, { Component } from 'react';
import {render} from 'react-dom';
import NotFound from '../NotFound/NotFound.js';
import style from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router} from 'react-router';
import { hashHistory } from 'react-router';
import Auth from '../../modules/Auth.js';

var RouteHandler = Router.RouteHandler;
const transitionTo = Router.transitionTo;

export default class LoginPage extends Component{
	constructor(props,context) {
		super(props,context);
		this.state = {
			password: '',
			errMsg: ''
		};
		this.showErrorWrongPassword = this.showErrorWrongPassword.bind(this);
		this.alertError = this.alertError.bind(this);
	}

	handleLogin(e){
		e.preventDefault();
		if (this.state.password === 'demo') {
			window.location = '/';
		}
			// set error message if the password is not correct
		else {
			this.setState({errMsg: 'Wrong password. try \'demo\''});
		}

}
	redirectToNextPage(){
		console.log( 'logged in');
		hashHistory.push('/');
		// save cookies, show green ok etc
	}

	showErrorWrongPassword(){
		this.setState({errMsg: 'Wrong password'});
		// show wrong password prompt
	}

	alertError(){
		alert('server internal error.');
	}

	handleInputChange(e){
		this.setState({password: e.target.value});
	}


	render() {
		return (
			<MuiThemeProvider>
			<div className={style.background}>
			<div className={style.container}>
					<div className={style.title}>
						Admin Panel Login
					</div>
					<form action ="/" onSubmit={this.handleLogin}>
				<TextField floatingLabelText="Enter admin password" type="password" onChange={this.handleInputChange.bind(this)} errorText={this.state.errMsg} /> <br/>
				<RaisedButton type="submit" label="Login" primary onClick={this.handleLogin.bind(this)} className={style.btnLogin}/>
				</form>
			</div>
			</div>
			</MuiThemeProvider>
		);
	}

	componentDidMount() {
		// fetch('https://api.github.com/users',{
		// 	method: 'GET',

		// })
		// .then(response => response.json())
		// .then(data => {
		// console.log('git data', data)
		// })
		// .catch(error => console.log('error git', error))
	}
}
