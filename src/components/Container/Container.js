import React, {Component} from 'react';
import {render} from 'react-dom';
import Nav from '../Nav/Nav.js';

export default class Container extends Component{
	render() {
		return (
			<div>
  				<Nav />
  				{this.props.children}
			</div>
		);
	}
}

