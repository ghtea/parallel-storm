
var axios     = require('axios');

// https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose
const updatePlanTeam = async () => {
	try {
    await axios.put('https://ahr.avantwing.com/PlanTeam/planTeam1593910414215', 
    
    //req body
    { 
    	
    	filter : {
    		_id: "planTeam1593910414215",
    		"listPlayerEntry._id": { $ne: 'Nightmare#12645' }  // it's important!
    	}
    
      , update: {
        $addToSet: { 
          listPlayerEntry: { _id:"Nightmare#12645", roleReal:["dd"] }
      	}
    	}
  		  
    }  
    
  	)
  }
  catch(e) {
    console.log(e)
  }
}  
// $addToSet  그 리스트에 존재하지 않으면 추가


updatePlanTeam();