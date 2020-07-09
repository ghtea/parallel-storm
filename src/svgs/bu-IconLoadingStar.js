import React from 'react';
import styled, {keyframes} from 'styled-components';

import themes from "../styles/themes"
import { connect } from "react-redux";
import {Div} from '../styles/DefaultStyles';


// 100% { -moz-transform: rotate(360deg); }
const keyframesSpin = keyframes`
  
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


const DivContainer = styled(Div)`

  /* Animation */
  animation: ${keyframesSpin} 3s ease-out infinite;
`;


// size, w : h = 9 : 8
const IconLoading = ({width, height, themeName}) => {

	return (
		
	<DivContainer style= {{ width: `${width}`, height:`${height}` }} >
	
		<svg 
			
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			width="100%"
			height="100%"
			viewBox="0 0 576 512"
			
			fill={ themes[themeName]["color_weak"] }
			>
			
			<path 
				d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z">
				</path>
			
		</svg>
		
	</DivContainer>
	)
}


function mapStateToProps(state) { 
  return { 
    themeName: state.themeName
  }; 
} 

/*
function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
  }; 
}
*/

export default connect(mapStateToProps)(IconLoading);