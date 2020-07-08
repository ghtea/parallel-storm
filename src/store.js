import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import dotenv from 'dotenv';

import reducerRoot from './reducers/root';


const REPLACE_READY = "REPLACE_READY";
const REPLACE_LOADING = "REPLACE_LOADING";
const REPLACE_DATA = "REPLACE_DATA";

const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";


// fundamental action creator
const replaceReady = (which, true_false) => {
  return {
    type: REPLACE_READY,
    which: which,
    true_false: true_false
  }
}

const replaceLoading = (which, true_false) => {
  return {
    type: REPLACE_LOADING,
    which: which,
    true_false: true_false
  }
}

const replaceData = (which, newData) => {
  return {
    type: REPLACE_DATA,
    which: which,
    data: newData
  }
  
}

const addNotification = (situation, message, idNotification) => {
  return {
    type: ADD_NOTIFICATION,
    situation: situation,
    message: message,
    idNotification: idNotification
  }
}

const removeNotification = (idNotification) => {
  return {
    type: REMOVE_NOTIFICATION,
    idNotification: idNotification
  }
}




// functions that dispatch actions which are from return fundamental action creators
export const readPlanTeam = (idPlanTeam) => {   
  
  return async (dispatch, getState, axios) => { 

    const onSuccess = (newPlanTeam) => { 
      
      
      dispatch( replaceData("planTeam", newPlanTeam) );  // 이게 먼저 돼고, 아래 loading, ready 수정해 주어야 한다!!!
      
      dispatch( replaceReady("planTeam", true) );
      dispatch( replaceLoading("planTeam", false) ); 
      
      return;
    } 


    const onError = (error) =>{ 
      
      dispatch( replaceReady("planTeam", false) );
      dispatch( replaceLoading("planTeam", false) ); 
      
      const idNotification = Date.now();
      dispatch( addNotification("error", "Reading planTeam has failed", idNotification) );
      setTimeout(
        dispatch( removeNotification(idNotification) )
        , 5000);
      
      return; 
    } 


    try { 
      
      dispatch( replaceReady("planTeam", false) );
      dispatch( replaceLoading("planTeam", true) ); 
      
      const response = await axios.get( `${process.env.REACT_APP_URL_AHR}/PlanTeam/${idPlanTeam}`);
      
      
      
      const newPlanTeam = response.data;
      
      console.log(newPlanTeam);
      
      onSuccess(newPlanTeam);
  
      return; 
      
    } // try
    
    catch (error) { 
      
      onError(error); 
      
      return; 
      
    } //catch

  } 
} // readPlanTeam
    



const store = createStore(
  reducerRoot,
  applyMiddleware(thunk.withExtraArgument(axios))
)


export default store;

//https://github.com/nomadcoders/vanilla-redux/blob/ccaa1acd081f27239f2cc8ad3c571bd0a9923f73/src/store.js