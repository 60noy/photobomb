import React, { Component } from 'react';
import {render} from 'react-dom';
import style from './style.css';
import Avatar from '../Avatar/Avatar.js';
import handleClickOutside from 'react-click-outside';
import {Alert, Button} from 'react-bootstrap';

export default class Modal extends Component{
	constructor(props) {
		super(props);
		this.state = {
			alertVisible: true
		}
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
	}

	handleAlertDismiss(){
		this.setState({alertVisible : false})
	}

	handleAlertShow(){
		this.setState({alertVisible : true})
	}

	render() {
		return (
			<div className={style.modal}>
				<div className={style.modalContent}>
				<span className={style.close} onClick={this.props.closeModal}> &times; </span>
				<Avatar username={this.props.name} profileImage={this.props.profile}/>
				<div className={style.text_medium}>
					<div> Uploaded {this.props.postsNum} posts. </div>
					<div> Member in {this.props.groupsNum} groups. </div>
				</div>
				<div className={style.bottom}>
				{this.props.toggleAlert ? (<Alert type="success" className={style.alert} onDismiss={this.handleAlertDismiss}>
					{this.props.handleAlertMessage}
					</Alert>) : null}
					{this.props.isBanned ? (<button className={style.btnBan} onClick={this.props.banUser}> UNBAN USER </button>) :
					(<button className={style.btnBanNotBanned} onClick={this.props.banUser}> BAN USER </button>)}
				</div>
				
					
			</div>
			</div>
		);
	}

	
	
}


