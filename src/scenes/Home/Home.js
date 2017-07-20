import React, { Component } from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reactTapEventPlugin from 'react-tap-event-plugin';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import { Router, browserHistory } from 'react-router';
import Auth from '../../modules/Auth.js';
import CardsCollector from '../../components/CardsCollector/CardsCollector.js';
import style from './style.css';


reactTapEventPlugin();
export default class Home extends Component{
	constructor(props) {
		super(props);

	}

	render() {
		return(

			<MuiThemeProvider>
 			<div className={style.container}>
 				<div className={style.title}>
 				Posts
 				</div>
 				<CardsCollector/>
 			</div>
 			</MuiThemeProvider>

		);
	}


}
