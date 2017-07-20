import React, { Component } from 'react';
import {render} from 'react-dom';
import Image from '../Image/Image.js';
import style from './style.css';
import design from '../../utils/design.js';
import {Card as mCard, CardMedia,CardHeader,CardActions,CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
const{primary_color,material_red,secondary_color} = design;
// import deleteImage from '../../images/ic_delete';
// import userImage from '../../images/ic_user';

export default class Card extends Component{
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(){
    return false;
  }
    render() {
      return (
        <div className={style.container}>
          <mCard style={{}}>
            <CardMedia
               overlay={<CardTitle title={this.props.title} subtitle={this.props.authorName} onClick={this.props.showModal} />}
            >
               <img src={this.props.image} alt="media_img" />
             </CardMedia>
          <CardActions>
            <FlatButton onClick={this.props.deleteHandler} label="delete"/>
          </CardActions>
        </mCard>
        </div>
      );
    }
  }
