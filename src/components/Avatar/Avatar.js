import React, { Component } from 'react';
import {render} from 'react-dom';
import style from './style.css';
import variables from '../../utils/variables.js';
const {api} = variables;

export default class Avatar extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={style.wrapper}>
				<img src={`${api}${this.props.profileImage}`} className={style.user_icon} />
				<p className={style.user_text}> {this.props.username} </p>

			</div>
		);
	}
}
