import axios from 'axios';
import dotenv from 'dotenv';

import {REPLACE_READY, REPLACE_LOADING, REPLACE_DATA, ADD_NOTIFICATION, REMOVE_NOTIFICATION} from '../store';
import {replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../store'



// functions that dispatch actions which are from return fundamental action creators
const readPlayerMmr = (battletag) => {   
  
  return async (dispatch, getState, axios) => { 

    const onSuccess = (newPlanTeam) => { 
      
      dispatch( replaceData("cPlayerMmr", newPlanTeam) );  // 이게 먼저 돼고, 아래 loading, ready 수정해 주어야 한다!!!
      
      dispatch( replaceReady("cPlayerMmr", true) );
      dispatch( replaceLoading("cPlayerMmr", false) ); 
      
      return;
    } 


    const onError = (error) =>{ 
      
      dispatch( replaceReady("cPlayerMmr", false) );
      dispatch( replaceLoading("cPlayerMmr", false) ); 
      
      const idNotification = Date.now();
      dispatch( addNotification("error", "Reading collection of PlayerMmr has failed", idNotification) );
      setTimeout(
        dispatch( removeNotification(idNotification) )
        , 4000);
      
      return; 
    } 


    try { 
      
      dispatch( replaceReady("cPlayerMmr", false) );
      dispatch( replaceLoading("cPlayerMmr", true) ); 
      
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
} // readPlayerMmr
    
export default  readPlayerMmr;