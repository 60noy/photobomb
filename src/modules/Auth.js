'use strict';
import Cookies from 'universal-cookie';
import {browserHistory } from 'react-router';

const cookie = new Cookies();

export default class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
	static authenticateUser(token) {
		cookie.set('login_data',token,{path : '/',httpOnly:true});  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
	static isAuthenticated() {

    // console.log('cookie: ', cookie.load('login_data'))
		if (cookie.get('login_data') === undefined) {
			return false;
		}
		return true;
	}

	static getCookie(){
		return cookie.get('login_data');
	}
  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
	static deauthenticateUser() {
		cookie.remove('login_data');
	}

  /**
   * Get a token value.
   *
   * @returns {string}
   */



  // check if user is authorized
	static requireAuth(){
    // check any tokens on the server. This is just a demo
	}





}
