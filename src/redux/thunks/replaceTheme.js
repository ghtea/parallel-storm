import axios from 'axios';
import dotenv from 'dotenv';

import {REPLACE_READY, REPLACE_LOADING, REPLACE_DATA, ADD_NOTIFICATION, REMOVE_NOTIFICATION} from '../store';
import {replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../store'



// functions that dispatch actions which are from return fundamental action creators
const replaceTheme = (newThemeName) => 
  (dispatch, getState, axios) => {   
  
  dispatch( replaceData("themeName", newThemeName) );  
  
} // replaceTheme
    
export default  replaceTheme;