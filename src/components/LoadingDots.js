import React from "react";
import styled, {
	keyframes
}
from "styled-components";
import {
	Div
}
from '../styles/DefaultStyles';
//https://medium.com/@chrisburgin95/using-react-and-styled-components-to-make-a-simple-loading-animation-df1330c652cb

const BounceAnimation = keyframes `
  0% { margin-bottom: 0; }
  20% { margin-bottom: 6px }
  40% { margin-bottom: 12px }
  
  50% { margin-bottom: 15px }
  
  60% { margin-bottom: 12px }
  80% { margin-bottom: 6px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div `
  display: flex;
  align-items: flex-end;
  height: 20px;
`;

const Dot = styled.div `
  background-color: ${props => props.theme.color_active};
  
  border-radius: 50%;
  width: 8px;
  height: 8px;
  
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;

const LoadingDots = () => {

	return (

		< DotWrapper >
		< Dot delay = {"0s"} / >
		< Dot delay = {".1s"} / >
		< Dot delay = {".2s"} / >
		< /DotWrapper>
	)

}
export default LoadingDots