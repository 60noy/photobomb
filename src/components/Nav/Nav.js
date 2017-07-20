import React, {Component} from 'react';
import {render} from 'react-dom';
import style from './style.css';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

export default class Nav extends Component{
	constructor(props) {
		super(props);
	}
	// logout and delete session
	logout(){
		cookie.remove('login_data');
		this.navigateToPage('/login');
	}

	// navigate to another page by section click
	navigateToPage(path){
		browserHistory.push(path);
	}

	render() {
		return (
			<div className={style.container}>
				<div className={style.header} onClick={this.navigateToPage.bind(this,'/')}>
				<img src={require('../../images/admin-2.png')} width="100" height="100" className={style.headerPic}/>
				</div>

				<div className={style.section} onClick={this.navigateToPage.bind(this,'/')}>
				<img src={require('../../images/dash.png')} className={style.sidebar_icon}/>
				Dashboard
				</div>

				<div className={style.section} onClick={this.navigateToPage.bind(this,'/stats')}>
				<img src={require('../../images/stats.png')} className={style.sidebar_icon} />
				Statistics
				</div>

				<div className={style.section} onClick={this.navigateToPage.bind(this,'/users')}>
				<img src={require('../../images/users.png')} className={style.sidebar_icon} />
				Users
				</div>

				<div className={style.section} onClick={this.navigateToPage.bind(this,'/groups')}>
				<img src={require('../../images/groups.png')} className={style.sidebar_icon} />
				Groups
				</div>



				<div className={style.section} onClick={this.logout.bind(this)}>
				<img src={require('../../images/logout.png')} className={style.sidebar_icon}/>
				 Logout
				</div>
			</div>
		);
	}
}
