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
const addRemoveNotification =  (situation, message, time=3000, idNotification="none") => 
  async (dispatch, getState) => {   
    
    let idNotificationUsing;
    if (idNotification ==="none") {
       idNotificationUsing = Date.now().toString();
    }
    else {idNotificationUsing = idNotification}
    
    
    dispatch( addNotification(situation, message, idNotificationUsing) );  
    
    await awaitTime(time);
    
    dispatch( removeNotification(idNotificationUsing) );
        
} // addRemoveNotification
    
export default  addRemoveNotification;
