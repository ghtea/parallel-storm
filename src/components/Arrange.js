import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';


const DivArrange = styled(Div)`
	position: fixed;
  left: 50%;
  transform: translateX(-50%);
  
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_strong};
  
  
  display: flex;
  flex-direction: row;
  align-item: center;
  
  height: 50px;
  
  @media (max-width: 540px) {
  	top: 50px; /* height of nav */
  	
  	width: 100%;
	}
 
	 @media (min-width: 541px) {
		top: 15px;
		
		width: 300px;
	 }
  
`;

const DivArrangeItem = styled(Div)`
	height: 100%;
	width: 100%
	
	display: flex;
  flex-direction: row;
  align-item: center;
  
  @media (max-width: 480px) {
  
	}
 
	 @media (min-width: 481px) {
	 }
`;


const activeClassName = 'nav-link-active';

const NavLinkMenuItem = styled(NavLink).attrs({ activeClassName })`
  
	color: ${props => props.theme.color_normal};
	text-decoration: none;
	
	&.${activeClassName} {
		color: ${props => props.theme.color_active};
	}
	
`;


function Arrange () {
	return (
 
  <DivArrange>
  	<DivArrangeItem> abc </DivArrangeItem>
  	<DivArrangeItem> artist </DivArrangeItem>
  	<DivArrangeItem> rating </DivArrangeItem>
  	<DivArrangeItem> group </DivArrangeItem>
	</DivArrange>
	
	)
}

export default Arrange;