export const toggleArrayElement = (array, value, true_false) => {
    let index = array.indexOf(value);
		
		if (true_false) { // value should exist in array now
	    if (index === -1) {
	        array.push(value);
	    } else {}
		}
		else { // value should not exist in array now
	    if (index === -1) {} 
	    else {
	        array.splice(index, 1);
	    }
		}
    
    return array;
}