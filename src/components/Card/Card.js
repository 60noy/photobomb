import React, { Component } from 'react';
import {render} from 'react-dom';
import Image from '../Image/Image.js';
import style from './style.css';
import {Col} from 'react-bootstrap';
import design from '../../utils/design.js';
const{primary_color,material_red,secondary_color} = design;
// import deleteImage from '../../images/ic_delete';
// import userImage from '../../images/ic_user';

export default class Card extends Component{
  constructor(props) {
    super(props);
  }


    render() {
      return (
        <Col xs={6} md={3} lg={2}>
        <div className={style.container}>
          <Image imageSrc={this.props.image}/>
          <div className={style.bottomBar}>
            <div className={style.bottomText}>
            <div className={style.title}> {this.props.title} </div>
            By <span className={style.author} onClick={this.props.showModal}>{this.props.authorName} </span>
            </div>
            <button onClick={this.props.deleteHandler} className={style.btnDelete}/>
          </div>
        </div>
        </Col>
      );
    }
  }
