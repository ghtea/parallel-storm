import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import dotenv from 'dotenv';

import reducerRoot from './reducers/root';


const ACCEPT = "ACCEPT";
const TOGGLE_READY = "TOGGLE_READY";
const TOGGLE_LOADING = "TOGGLE_LOADING";


// belong to actionCreator
const toggleReady = (which, true_false) => {
  return {
    type: TOGGLE_READY,
    which: which,
    true_false: true_false
  }
}

const toggleLoading = (which, true_false) => {
  return {
    type: TOGGLE_LOADING,
    which: which,
    true_false: true_false
  }
}


// 이 함수 밖의 앞 뒤에서 loading, ready 다루기

// ready: false - loading: false
// ready: false - loading: true
const acceptPlanTeam = async (idPlanTeam) => {
  
  try {
    
      const response = await axios.get( `${process.env.REACT_APP_URL_AHR}/PlanTeam/${idPlanTeam}`);
      
      const newPlanTeam = response.data;
    
    return {
      type: ACCEPT,
      which: "planTeam",
      content: newPlanTeam
    };
  }
  catch (error) { 
    console.log("acceptPlanTeam has failed, ") 
    
  }
};
// ready: true - loading: false    // ready: false - loading: false




const store = createStore(
  reducerRoot,
  applyMiddleware(thunk.withExtraArgument(axios))
)


export const actionCreators = {
  acceptPlanTeam,
  toggleReady,
  toggleLoading
};

export default store;

//https://github.com/nomadcoders/vanilla-redux/blob/ccaa1acd081f27239f2cc8ad3c571bd0a9923f73/src/store.js