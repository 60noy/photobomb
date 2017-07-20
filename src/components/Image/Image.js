import React, { Component } from 'react';
import {render} from 'react-dom';
import style from './style.css';
// image with api at start
export default class Image extends Component{
  render() {
    return (
      	<img src={this.props.imageSrc} className={style.postImage}/>
    );
  }
}
