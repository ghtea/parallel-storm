import { createStore } from "redux";
import axios from 'axios';
import dotenv from 'dotenv';




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
  catch (error) { console.log(error) }
};




const reducer = (
  
  // 기본값 설정
  state = { 
    
    planTeam: {}, 
    
    ready : {
      planTeam: false
    },
    
    loading : {
      planTeam: false
    }
    
  }, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    
    case ACCEPT:
      return {
      	...state, 
      	[action.which]: action.content
      };
      
    case TOGGLE_READY:
      return {
      	...state, 
      	ready: {
      	  ...state.ready,
      	  [action.which]: action.true_false
      	}
      };
      
    case TOGGLE_LOADING:
      return {
      	...state, 
      	loading: {
      	  ...state.loading,
      	  [action.which]: action.true_false
      	}
      };
      
    
    
    default:
      return state;
  }
};


const store = createStore(reducer);

export const actionCreators = {
  acceptPlanTeam,
  toggleReady,
  toggleLoading
};

export default store;

//https://github.com/nomadcoders/vanilla-redux/blob/ccaa1acd081f27239f2cc8ad3c571bd0a9923f73/src/store.js