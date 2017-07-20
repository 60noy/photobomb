import React, {Component} from 'react';
import {render} from 'react-dom';
import style from './style.css';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from '../../modules/Auth.js';
import Modal from '../../components/Modal/Modal.js';
import Toggle from 'material-ui/Toggle';
import BlockIcon from 'material-ui/svg-icons/content/block';
import usersData from '../../data/users.json';

const toggleStyles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
};

export default class Users extends Component{
	constructor(props) {
		super(props);
		this.state = {
			users: usersData,
			filterInput: '',
			currentUser: null,
			userGroupsNum: null,
     	userImagesNum:null,
     	isModalVisible: false,
      alertMsg: null,
      showAlert: false,
      isToggled : false

		};
		this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
	}

  handleToggle(e,isToggled) {
    this.setState({isToggled : isToggled});
  }


	handleInputChange(e){
		this.setState({filterInput: e.target.value});
	}

 handleUserImagesNum(){
    this.setState({userImagesNum:Math.floor(Math.random() * 10) + 1});
  }


  handleUserGroupsNum(){
      this.setState({userGroupsNum:Math.floor(Math.random() * 10) + 1});
  }
// toggle modal after click
  toggleModal(){
    const isVisible = this.state.isModalVisible;
    this.setState({isModalVisible: !isVisible});
  }
//  show modal with user details
  show(user){
    this.setState({isModalVisible: true, currentUser: user, showAlert: false});
    this.handleUserImagesNum();
    this.handleUserGroupsNum();
    // assign props to modal, name , class visible
  }

  // ban user
  banUser(user){
    const tempUser = user;
        if (user.isBanned)
          {this.setState({alertMsg:user.name + ' is not banned anymore'});}
        else
          {this.setState({alertMsg: user.name + ' is banned'});}
        tempUser.isBanned = !tempUser.isBanned;
        this.setState({currentUser: tempUser});
  }



	render() {
		return (
			<MuiThemeProvider>
			<div className={style.container}>
				<div className={style.header}>
				<div className={style.title}> Users </div>
        <div className={style.flex_container}>
          <div className={style.left}>
            <TextField hintText="Enter username" className={style.textField} onChange={this.handleInputChange} />
          </div>
        <div className={style.right}>
        <Toggle label="Banned Only" onToggle={this.handleToggle} thumbStyle={toggleStyles.thumbOff} trackStyle={toggleStyles.trackOff} thumbSwitchedStyle={toggleStyles.thumbSwitched} trackSwitchedStyle={toggleStyles.trackSwitched}/>
        </div>
        </div>
				</div>
				<List className={style.body}>
					{this.state.users.filter(user => user.name.toLowerCase().includes(this.state.filterInput.toLowerCase()))
						.map((user,index) => {
						let userIcon = user.profile_image;
            let isBanned = user.isBanned;
            // if toggled => render banned users
            // if not => render all users
						if (this.state.isToggled) {
              if (isBanned) {
                return (<ListItem
            key={index}
            primaryText={user.name}
            onTouchTap={this.show.bind(this,user)}
            hoverColor={isBanned ? '#FFCDD2' : null}
            rightIcon={isBanned ? <BlockIcon/> : null}
            leftAvatar={<Avatar src={require('../../images/' + userIcon)}/>}
                        />);
              }
              else
                {return null;}
            }
            else{
              return(<ListItem
               key={index}
               primaryText={user.name}
               hoverColor={isBanned ? '#FFCDD2' : null}
               rightIcon={isBanned ? <BlockIcon/> : null}
               onTouchTap={this.show.bind(this,user)}
               leftAvatar={<Avatar src={require('../../images/' + userIcon)}/>}
                     />);

            }
            }
        )}

				</List>
				 {this.state.isModalVisible ?
       <Modal tabIndex="0" profile={require('../../images/' + this.state.currentUser.profile_image)}
        user={this.state.currentUser}
        name={this.state.currentUser.name}
        isBanned={this.state.currentUser.isBanned}
        closeModal={this.toggleModal.bind(this)}
        banUser={this.banUser.bind(this,this.state.currentUser)}
        handleAlertMessage = {this.state.alertMsg}
        toggleAlert = {this.state.showAlert}
        groupsNum={this.state.userGroupsNum} postsNum={this.state.userImagesNum}
       /> : null}
			</div>
			</MuiThemeProvider>
		);
	}
}
