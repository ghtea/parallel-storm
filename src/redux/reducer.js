const REPLACE_READY = "REPLACE_READY";
const REPLACE_LOADING = "REPLACE_LOADING";
const REPLACE_WORKING = "REPLACE_WORKING";

const REPLACE_DATA = "REPLACE_DATA";

const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";



const stateInitial = { 
    
    // foundamental 
    ready : {
      planTeam: false
    },
    
    loading : {
      planTeam: false
      ,playerMmr: false
    }, 
    
    working : {
      putPlayerMmr: false
    }, 
    
    notification : [],
    
    
    // others
    planTeam: {},
    
    themeName: "light"
    
  };



const reducer = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    
    case REPLACE_DATA:
      return {
      	...state, 
      	[action.which]: action.data
      };
      
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
