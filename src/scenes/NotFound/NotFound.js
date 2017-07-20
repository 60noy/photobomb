import React, { Component } from 'react';
import {render} from 'react-dom';
import style from './style.css';
import {Link} from 'react-router';

export default class NotFound extends Component{
	render() {
		return (
			<div className={style.background}>
					<div className={style.head}>
						
					<div className={style.medium}>
					This is not the page you are looking for
					<div>
					<Link to="/">Back to safety </Link>
					</div>
					</div>
				</div>
			</div>		
		);
	}
}