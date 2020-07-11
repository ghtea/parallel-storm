import {getTimeStamp} from '../tools/vanilla/time'

const REPLACE_RERENDER = "REPLACE_RERENDER";
const REPLACE_READY = "REPLACE_READY";
const REPLACE_LOADING = "REPLACE_LOADING";
const REPLACE_WORKING = "REPLACE_WORKING";

const REPLACE_DATA = "REPLACE_DATA";

const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";



const stateInitial = { 
    
    // foundamental 
    rerender: {
      planTeam: ""
    }
    
    ,ready : {
      planTeam: false
    }
    
    ,loading : {
      planTeam: false
    }
    
    
    ,working : {
      createPlan: false
      ,putPlayerMmr: false
    }
    
    ,notification : []
    
    
    // others
    ,authority: "viewer" // "administrator"
    
    ,idPlanTeam: ""
    ,planTeam: {}
    
    
    ,themeName: "light"
    
  };



const reducer = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    
    case REPLACE_RERENDER:
      return {
      	...state, 
      	rerender: {
      	  ...state.rerender
      	  ,[action.which]: getTimeStamp()
      	}
      };
      
    case REPLACE_DATA:
      
      if ( (!!action.data) && (action.data.constructor === Array) ) {
        return {
      	...state, 
      	[action.which]: [...action.data]
        }
      }
      
      else if ( (!!action.data) && (action.data.constructor === Object) ) {
        return {
      	...state, 
      	[action.which]: {...action.data}
        }
      }
      else {
        return {
        	...state, 
        	[action.which]: action.data
        }
      }
      
    case REPLACE_READY:
      return {
      	...state, 
      	ready: {
      	  ...state.ready,
      	  [action.which]: action.true_false
      	}
      };
      
    case REPLACE_LOADING:
      return {
      	...state, 
      	loading: {
      	  ...state.loading,
      	  [action.which]: action.true_false
      	}
      };
      
    case REPLACE_WORKING:
      return {
      	...state, 
      	working: {
      	  ...state.working,
      	  [action.which]: action.true_false
      	}
      };
      
    case ADD_NOTIFICATION:
      return {
      	...state, 
      	
      	notification: [
      	  {
      	    situation: action.situation
      	    ,message: action.message
      	    ,idNotification: action.idNotification
      	  }
      	  , ...state.notification
      	]
      	
      };
    
    case REMOVE_NOTIFICATION:
      return {
      	...state, 
      	notification: state.notification.filter(element => element.idNotification !== action.idNotification)
      };
    
    
    default:
      return state;
  }
};


export default reducer;
