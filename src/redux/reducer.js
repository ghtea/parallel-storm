import {getTimeStamp} from '../tools/vanilla/time'
import {toggleArrayElement} from '../tools/vanilla/array'

//const REPLACE_RERENDER = "REPLACE_RERENDER";
const REPLACE_READY = "REPLACE_READY";
const REPLACE_LOADING = "REPLACE_LOADING";
const REPLACE_WORKING = "REPLACE_WORKING";

const REPLACE_DATA = "REPLACE_DATA";


const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

const ADD_RESULT = "ADD_RESULT";
const REPLACE_PLAYER_TAGS = "REPLACE_PLAYER_TAGS";
const REPLACE_PLAYER_STATUS = "REPLACE_PLAYER_STATUS";
const REPLACE_REGION = "REPLACE_REGION";
const REPLACE_NUMBER = "REPLACE_NUMBER";


const stateInitial = { 
    
    // foundamental 
    /*
    rerender: {
      planTeam: ""
    }*/
    
    ready : {
      planTeam: false
    }
    
    ,loading : {
      planTeam: false
    }
    
    
    ,working : {
      createPlan: false
      
      ,addPlayer: false
      ,putPlayerMmr: false
      ,addPlayerToListPlayerEntry: false
      ,addPlayerMmrStandardToListPlayerEntry: false
    }
    
    ,notification : []
    
    
    // others
    ,authority: "unknown" // "administrator" "viewer"
    
    ,idPlanTeam: ""
    
    ,planTeam: {
      _id:"_id"
      ,password:"password"
      ,title:"title"
      ,listResult:[]
      ,listPlayerEntry: [
        {
          _id: "test"
          , tags: []
        }
      ]
      , option: {}
    }
    
    
    ,themeName: "light"
    
  };



const reducer = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    
    /*
    case REPLACE_RERENDER:
      return {
      	...state, 
      	rerender: {
      	  ...state.rerender
      	  ,[action.which]: getTimeStamp()
      	}
      };
      */
      
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
    
    case ADD_RESULT:
      return {
      	...state, 
      	
      	planTeam: {
      	  ...state.planTeam
      	  , listResult: [
      	    ...state.planTeam.listResult
      	    , action.result
      	  ]
      	}
      	
      };
      
    case REPLACE_REGION:
      return {
      	...state, 
      	
      	planTeam: {
      	  ...state.planTeam
      	  , option: {
      	    ...state.planTeam.option
      	    , region: action.region
      	  }
      	}
      	
      };
      
    case REPLACE_NUMBER:
      
      let whichNumber;
      let valueCurrent;
      
      if (action.which === "team") {
        whichNumber = "numberTeams"
        valueCurrent = action.pairNumber[0];
      }
      else if (action.which === "group") {
        whichNumber = "numberGroups"
        valueCurrent = action.pairNumber[1];
      }
      
      
        
      
      if (action.how === "center") {
        return {
          ...state,
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: 0
        	  }
          }
        }
      }
      else if  (action.how === "plus") {
        return {
          ...state,
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: ( (state.planTeam.option)[whichNumber] + 1)
        	  }
          }
        }
      }
      else if  (action.how === "minus" && !(valueCurrent == 0)) {
        return {
          ...state,
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: ( (state.planTeam.option)[whichNumber] - 1)
        	  }
          }
        }
      }
      else if  (action.how === "minus" && (valueCurrent == 0)) {
        return {
          ...state,
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: 0
        	  }
          }
        }
      }
       
      
    case REPLACE_PLAYER_TAGS:
      
      const index1 = (state.planTeam.listPlayerEntry).findIndex( objPlayer => objPlayer._id === action.battletag);
      
      
      return {
        ...state, 
      	
      	planTeam: {
      	  ...state.planTeam
      	  
      	  , listPlayerEntry: state.planTeam.listPlayerEntry.map(
      	      objPlayer => (objPlayer._id === action.battletag)? 
      	        {...objPlayer, tags:toggleArrayElement(state.planTeam.listPlayerEntry[index1]["tags"], action.tag, action.true_false) }
      	        : objPlayer
      	    )
      	}
      }
    
    case REPLACE_PLAYER_STATUS:
      

      return {
        ...state, 
      	
      	planTeam: {
      	  ...state.planTeam
      	  
      	  , listPlayerEntry: state.planTeam.listPlayerEntry.map(
      	      objPlayer => (objPlayer._id === action.battletag)? 
      	        {...objPlayer, status:action.status }
      	        : objPlayer
      	    )
      	}
      }
      
    default:
      return state;
  }
};


export default reducer;
