
var axios     = require('axios');

// https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose
const addNewPlayer = async (battletag) => {
  
	try {
    await axios.put('https://ahr.avantwing.com/PlanTeam', 
    
    { //req body
    	
    	filter : {
    		_id: "planTeam1593910414215",
    		"listPlayerEntry._id": { $ne: battletag }  // it's important!
    	}
    
      , update: {
        $addToSet: { 
          listPlayerEntry: { _id: battletag }
      	}
    	}
  		  
    }  // req body
    
  	) // axios.put
  }
  catch(e) { console.log(e) }
} // addNewPlayer

// $addToSet  그 리스트에 존재하지 않으면 추가


addNewPlayer('mbcat#1703');