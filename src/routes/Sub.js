import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';





const DivSub = styled(Div)`
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_strong};
  
  
  position: fixed;
  
  display: flex;
  
  
  @media (max-width: 540px) {
  
  	width: 100%;
  	height: 50px; 
  	
  	flex-direction: row;
  	
	}
 
	 @media (min-width: 541px) {
		width: 160px;
	  height: 100%;
	 
		flex-direction: column;
		justify-content: flex-start;
		
	 }
  
`;

const DivProfile = styled(Div)`

  @media (max-width: 540px) {
  	
	}
 
 @media (min-width: 541px) {
	width: 120px;
	display: flex;
	flex-direction: column;
	
	margin-top: 50px;
	margin-bottom:100px;
	
 }
`;

const DivProfileImg = styled(Div)`
	border-radius: 50%;
	
	@media (max-width: 540px) {
		width: 40px;
		height: 40px;
	}
 
	@media (min-width: 541px) {
		width: 120px;
		height: 120px;
	}
`;

const ImgProfile = styled.img`
	border-radius: 50%;
`

const DivProfileName = styled(Div)`

  @media (max-width: 540px) {
  	display: none;
	}
 
 @media (min-width: 541px) {
	
 }
`;




const DivNavItem = styled(Div)`
	height: 30px; 

  @media (max-width: 540px) {
  
	}
 
	 @media (min-width: 541px) {
	 }
`;


const activeClassName = 'nav-link-active';

const NavLinkNavItem = styled(NavLink).attrs({ activeClassName })`
  
	color: ${props => props.theme.color_normal};
	text-decoration: none;
	
	
	&.${activeClassName} {
		color: ${props => props.theme.color_active};
	}
	
`;


function Sub () {
	return (
 
	
  <DivSub>
  	
  	<DivProfile>
	  	<DivProfileImg> 
	  		<ImgProfile src={require('../images/profile.jpeg')} width="100%" height="100%" /> 
	  	</DivProfileImg>
	  	
	  	<DivProfileName> msowl 
	  	</DivProfileName> 
  	</DivProfile>
  	
  	<DivNavItem > <NavLinkNavItem to="/about"> About </NavLinkNavItem> </DivNavItem>
		<DivNavItem > <NavLinkNavItem to="/" exact={true}> Library </NavLinkNavItem> </DivNavItem>
		
	</DivSub>
	
	)
}

export default Sub;