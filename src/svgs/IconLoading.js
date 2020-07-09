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


const DivContainer1 = styled(Div)`
	position: relative;
  
  animation: ${keyframesSpin} 2s linear infinite;
`;

const DivContainer2 = styled(Div)`
	position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  width: 100%;
  height: 100%;
`;


// size, w : h = 9 : 8
const IconLoading = ({width, height, themeName}) => {

	return (
		
	<DivContainer1 style= {{ width: `${width}`, height:`${height}` }} >
		<DivContainer2  >
		<svg 
			
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			width="100%"
			height="100%"
			viewBox="0 0 512 512"
			
			fill={ themes[themeName]["color_very_weak"] }
			>
			
			
			
			<path 
				d="M352.57 128c-28.09 0-54.09 4.52-77.06 12.86l12.41-123.11C289 7.31 279.81-1.18 269.33.13 189.63 10.13 128 77.64 128 159.43c0 28.09 4.52 54.09 12.86 77.06L17.75 224.08C7.31 223-1.18 232.19.13 242.67c10 79.7 77.51 141.33 159.3 141.33 28.09 0 54.09-4.52 77.06-12.86l-12.41 123.11c-1.05 10.43 8.11 18.93 18.59 17.62 79.7-10 141.33-77.51 141.33-159.3 0-28.09-4.52-54.09-12.86-77.06l123.11 12.41c10.44 1.05 18.93-8.11 17.62-18.59-10-79.7-77.51-141.33-159.3-141.33zM256 288a32 32 0 1 1 32-32 32 32 0 0 1-32 32z">
			</path>
			
		</svg>
		</DivContainer2 >
	</DivContainer1 >
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


/*
normal stars

viewBox="0 0 512 512"
	<path 
				d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
				</path>
*/