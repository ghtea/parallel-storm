import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
import dotenv from 'dotenv';

import reducer from './reducer';


const REPLACE_READY = "REPLACE_READY";
const REPLACE_LOADING = "REPLACE_LOADING";
const REPLACE_WORKING = "REPLACE_WORKING";

const REPLACE_DATA = "REPLACE_DATA";

const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";



// fundamental action creator
export const replaceReady = (which, true_false) => {
  return {
    type: REPLACE_READY,
    which: which,
    true_false: true_false
  }
}

export const replaceLoading = (which, true_false) => {
  return {
    type: REPLACE_LOADING,
    which: which,
    true_false: true_false
  }
}

export const replaceWorking = (which, true_false) => {
  return {
    type: REPLACE_WORKING,
    which: which,
    true_false: true_false
  }
}

export const replaceData = (which, newData) => {
  return {
    type: REPLACE_DATA,
    which: which,
    data: newData
  }
  
}

export const addNotification = (situation, message, idNotification) => {
  return {
    type: ADD_NOTIFICATION,
    situation: situation,
    message: message,
    idNotification: idNotification
  }
}

export const removeNotification = (idNotification) => {
  return {
    type: REMOVE_NOTIFICATION,
    idNotification: idNotification
  }
}





const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(axios), logger)
)


export default store;

//https://github.com/nomadcoders/vanilla-redux/blob/ccaa1acd081f27239f2cc8ad3c571bd0a9923f73/src/store.js