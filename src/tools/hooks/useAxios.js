import defaultAxios from 'axios';
import React, {useState, useEffect} from 'react';

// if we not use existing axios instance, use default axios instance
const useAxios = (options, axios = defaultAxios) => {
	
	const [state, setState] = useState({
		loading:true,
		error: null,
		data: null
	});
	
	const [trigger, setTrigger] = useState(0);
	
	// trigger: 내가 리렌더링 하고 싶을 때 변화시키는 존재
	useEffect( ()=>{
		
		axios(options).then(data => {
			setState({
				...state,
				loading: false,
				data: data
			})
		}).catch(error => {
			setState({...state, loading: false, error})
		})
		
	}, [trigger]
	
	); //useEffect 
	
	
	if (!options.url) {
		return;
	}
	
	const refetch = () => {
		setState({
			...state,
			loading: true
		});
		setTrigger( Date.now() );
	}
	
	
	
	return {...state, refetch };
}

export default useAxios