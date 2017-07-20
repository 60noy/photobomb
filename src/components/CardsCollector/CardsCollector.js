/*eslint sort-imports: 0*/

import React, { Component } from 'react';
import {render} from 'react-dom';
import faker from 'faker';
import Card from '../Card/Card.js';
import {usersData,groupsData,imagesData,tagsData} from '../../data/allData';
import style from './style.css';
import {Row} from 'react-bootstrap';
import Modal from '../Modal/Modal.js';

// holder of all the cards
export default class CardsCollector extends Component{
  constructor(props) {
    super(props);
    console.log(imagesData);
    this.state = {
      images: imagesData,
      isModalVisible: false,
      // for showing modals
      currentUser: null,
      userGroupsNum: null,
      userImagesNum:null,
       alertMsg: null,
      showAlert: false
    };

  }
  delete(item){
    let newState = this.state.images;
    newState.splice(newState.indexOf(item),1);
    this.setState({images: newState});
  }
// toggle modal after click
  toggleModal(){
    const isVisible = this.state.isModalVisible;
    this.setState({isModalVisible: !isVisible});
  }
//  show modal with user details
  show(user){
    this.setState({isModalVisible: true, currentUser: user, showAlert: false});
    // fill with data from server
    this.setState({userImagesNum: 4});
    this.setState({groupsNum: 8});
    // assign props to modal, name , class visible
  }

   banUser(user){
        this.setState({showAlert : true});
        let tempUser = this.state.currentUser;
        if (user.isBanned)
          {this.setState({alertMsg:user.name + ' is not banned anymore'});}
        else
          {this.setState({alertMsg: user.name + ' is banned'});}
        tempUser.isBanned = !tempUser.isBanned;
        this.setState({currentUser: tempUser});
  }

 render(){
    return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
        {this.state.images.map((image,index) => {
          const randomImage = faker.random.image();
           return <Card key={index} title={image.title} image={randomImage} deleteHandler={this.delete.bind(this,image)} showModal={this.show.bind(this,image.user_id)} authorName={`${faker.name.firstName()} ${faker.name.lastName()}`}> {image.title} </Card>;

          // else if( index % 4 === 3 ){return <Card key={index} image={image.image_string} deleteHandler={this.delete.bind(this,image)} showModal={this.show.bind(this,image.user_id)}> {image.title} </Card> </Row>;
      })
      }

      {this.state.isModalVisible ?
       <Modal tabIndex="0" profile={this.state.currentUser.profile_image}
        user={this.state.currentUser}
        name={this.state.currentUser.name}
        handleAlertMessage = {this.state.alertMsg}
        toggleAlert = {this.state.showAlert}
        isBanned={this.state.currentUser.isBanned}
        closeModal={this.toggleModal.bind(this)}
        banUser={this.banUser.bind(this,this.state.currentUser)}
        groupsNum={this.state.userGroupsNum} postsNum={this.state.userImagesNum}
       /> : null}

    </div>
    );
  }
}
