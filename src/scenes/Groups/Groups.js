import React, {Component} from 'react';
import {render} from 'react-dom';
import faker from 'faker';
import _ from 'lodash';
import style from './style.css';
import Auth from '../../modules/Auth.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Modal from '../../components/Modal/Modal.js';
import BlockIcon from 'material-ui/svg-icons/content/block';
import Cookies from 'universal-cookie';
import groupsData from '../../data/groups.json';
import usersData from '../../data/users.json';

const cookie = new Cookies();


export default class Groups extends Component {
  constructor(props) {
    super(props);
      this.state = {
        groups: groupsData,
        filterInput : '',
        open: false,
        isModalVisible: false,
        userGroupsNum: null,
         userImagesNum:null,
        alertMsg: null,
        showAlert: false,
        currentUser: null
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleToggleList = this.handleToggleList.bind(this);
      this.getNestedMembers = this.getNestedMembers.bind(this);
  }



  componentDidMount() {
    this.setState({userImagesNum:Math.floor(Math.random() * 10) + 1});
    this.setState({userGroupsNum:Math.floor(Math.random() * 10) + 1});

  }
// toggle modal after click
  toggleModal(){
    const isVisible = this.state.isModalVisible;
    this.setState({isModalVisible: !isVisible});
  }
//  show modal with user details
  show(user){
    this.setState({userGroupsNum:Math.floor(Math.random() * 10) + 1});
    this.setState({userImagesNum:Math.floor(Math.random() * 10) + 1});
    this.setState({isModalVisible: true, currentUser: user,   showAlert: false});
    // assign props to modal, name , class visible
  }

  // ban user
   banUser(user){
        let tempUser = this.state.currentUser;
        if (user.isBanned)
          {this.setState({alertMsg:user.name + ' is not banned anymore'});}
        else
          {this.setState({alertMsg: user.name + ' is banned'});}
        tempUser.isBanned = !tempUser.isBanned;
        this.setState({currentUser: tempUser});

  }

// create group members list items
  getNestedMembers(group,indexGroup){
  	return group.members.map((member,index) => {
          let isBanned = member.isBanned;
          console.log('user: ' + JSON.stringify(user));
          const user = {
            name: faker.name.firstName(),
            profile_image : faker.image.avatar()
          };
          // debugger;
  		  	return <ListItem
            key={indexGroup + index}
            onTouchTap={this.show.bind(this,user)}
            primaryText={user.name}
            rightIcon={user.isBanned ? <BlockIcon/> : null}
            hoverColor={isBanned ? '#FFCDD2' : null}
            leftAvatar={<Avatar src={user.profile_image}/>}
                          open={this.state.open}
  		  	       />;

  	});
    }

  render() {
  	return (
      <MuiThemeProvider>
      <div className={style.container}>
        <div className={style.header}>
        <div className={style.title}> Groups </div>
        <TextField hintText="Enter group name" className={style.textField} onChange={this.handleInputChange} />
        </div>
        <List className={style.body}>
          {this.state.groups.filter(group => group.name.toLowerCase().includes(this.state.filterInput.toLowerCase()))
          	.map((group,index) => {
            let groupIcon = group.icon;

             return <ListItem
            key={index}
            primaryText={group.name}
            leftAvatar={<Avatar src={require('../../images/' + groupIcon)}/>}
            onNestedListToggle={this.handleToggleList}
            primaryTogglesNestedList
            nestedItems={this.getNestedMembers(group, index)}
                    />;
            })
            }

        </List>

         {this.state.isModalVisible && this.state.currentUser ?
          <Modal tabIndex="0" profile={this.state.currentUser.profile_image}
              user={this.state.currentUser}
              name={this.state.currentUser.name}
              closeModal={this.toggleModal.bind(this)}
              isBanned={this.state.currentUser.isBanned}
              handleAlertMessage = {this.state.alertMsg}
              toggleAlert = {this.state.showAlert}
              banUser={this.banUser.bind(this,this.state.currentUser)}
              groupsNum={this.state.userGroupsNum} postsNum={this.state.userImagesNum}
          /> : null}
      </div>
      </MuiThemeProvider>
  	);
  }



  handleInputChange(e){
  	this.setState({filterInput: e.target.value});
  }

  handleToggleList (item){
  	this.setState({open:item.state.open});
  }
}
