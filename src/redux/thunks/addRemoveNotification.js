/*
import axios from 'axios';
import dotenv from 'dotenv';
*/
import {REPLACE_READY, REPLACE_LOADING, REPLACE_DATA, ADD_NOTIFICATION, REMOVE_NOTIFICATION} from '../store';
import {replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../store'


const awaitTime = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

// functions that dispatch actions which are from return fundamental action creators
const addRemoveNotification =  (situation, message, time=3000, idNotification) => 
  async (dispatch, getState) => {   
    
    idNotification = idNotification || Date.now().toString();
    
    dispatch( addNotification(situation, message, idNotification) );  
    
    await awaitTime(time);
    
    dispatch( removeNotification(idNotification) );
        
} // addRemoveNotification
    
export default  addRemoveNotification;
