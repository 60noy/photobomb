import React, { Component } from 'react';
import {render} from 'react-dom';
import variables from '../../utils/variables';
import style from './style.css';
// image with api at start
export default class Image extends Component{
  render() {
    return (
      <div>
      	<img src={this.props.imageSrc} className={style.postImage}/>
      </div>
    );
  }
}
