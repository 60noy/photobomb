import React, {Component} from 'react';
import {render} from 'react-dom';
import style from './style.css';
import Auth from '../../modules/Auth.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Modal from '../../components/Modal/Modal.js';
import BlockIcon from 'material-ui/svg-icons/content/block';
import Cookies from 'universal-cookie';

const cookie = new Cookies();


export default class Groups extends Component {
  constructor(props) {
    super(props);
      this.state = {
        groups: [],
        filterInput : '',
        open: false,
        isModalVisible: false,
        userGroupsNum: null,
         userImagesNum:null,
        alertMsg: null,
        showAlert: false,
      };
      this.getGroups = this.getGroups.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleToggleList = this.handleToggleList.bind(this);
      this.getNestedMembers = this.getNestedMembers.bind(this);
      this.handleUserImagesNum = this.handleUserImagesNum.bind(this);
      this.handleUserGroupsNum = this.handleUserGroupsNum.bind(this);
  }

    componentWillMount() {
  		Auth.requireAuth();
  }

  componentDidMount() {
  	 this.getGroups();
  }

 handleUserImagesNum(id){
    function getImagesPromise(){
      return fetch(`${api}images/user_id/${id}`)
    .then(response => response.json())
    .then(responseText =>{
      return responseText.message.length;
    }).catch(error => console.log(error));
    }
    getImagesPromise().then(response =>{
      this.setState({userImagesNum:response});
    });
  }


  handleUserGroupsNum(id){
    function getGroupsPromise() {
      return fetch(`${api}groups/user_id/${id}`)
      .then(response => response.json())
    .then(responseText =>{
      console.dir('message: ' + responseText.message);
      return responseText.message.length;
    }).catch(error => console.log(error));
    }
    getGroupsPromise().then(response =>{
      this.setState({userGroupsNum:response});
    });
  }
// toggle modal after click
  toggleModal(){
    const isVisible = this.state.isModalVisible;
    this.setState({isModalVisible: !isVisible});
  }
//  show modal with user details
  show(user){
    this.setState({isModalVisible: true, currentUser: user, showAlert: false});
    this.handleUserImagesNum(user._id);
    this.handleUserGroupsNum(user._id);
    // assign props to modal, name , class visible
  }

  // ban user
   banUser(user){
    fetch(`${api}users/id/${user._id}/toggleban`,{
      method: 'GET',
        }).then(response => {
      if(response.ok && !response.json().error){
        this.setState({showAlert : true});
        let tempUser = this.state.currentUser;
        if (user.isBanned)
          {this.setState({alertMsg:user.name + ' is not banned anymore'});}
        else
          {this.setState({alertMsg: user.name + ' is banned'});}
        tempUser.isBanned = !tempUser.isBanned;
        this.setState({currentUser: tempUser});
    }
      else
      {console.log('err');}
    }).catch((error) => {
      console.error(error);
    });

  }

// create group members list items
  getNestedMembers(group,indexGroup){
  	return group.members.map((member,index) => {
          let isBanned = member.isBanned;
  		  	return <ListItem
            key={indexGroup + index}
            onTouchTap={this.show.bind(this,member)}
            primaryText={member.name}
            rightIcon={member.isBanned ? <BlockIcon/> : null}
            hoverColor={isBanned ? '#FFCDD2' : null}
            leftAvatar={<Avatar src={`${api}${member.profile_image}`}/>}
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
            leftAvatar={<Avatar src={`${api}${groupIcon}`}/>}
            onNestedListToggle={this.handleToggleList}
            primaryTogglesNestedList
            nestedItems={this.getNestedMembers(group, index)}
                    />;
            })
            }

        </List>

         {this.state.isModalVisible ?
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


  getGroups(){
       fetch(`${api}groups/all`)
    .then(response => response.json())
    .then(data => {
      this.setState({groups:data.message});
    }).catch(error =>{
    	console.log('error', error);

    });
  }

  handleInputChange(e){
  	this.setState({filterInput: e.target.value});
  }

  handleToggleList (item){
  	this.setState({open:item.state.open});
  }
}
