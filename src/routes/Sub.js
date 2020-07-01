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
		width: 120px;
	  height: 100%;
	 
		flex-direction: column;
		justify-content: flex-start;
		
	 }
  
`;

const DivLogo = styled(Div)`

  @media (max-width: 540px) {
  	
	}
 
 @media (min-width: 541px) {
	width: 100px;
	display: flex;
	flex-direction: column;
	
	margin-top: 50px;
	margin-bottom:100px;
	
 }
`;

const DivLogoImg = styled(Div)`
	border-radius: 50%;
	
	@media (max-width: 540px) {
		width: 40px;
		height: 40px;
	}
 
	@media (min-width: 541px) {
		width: 80px;
		height: 80px;
	}
`;

const ImgLogo = styled.img`
	border-radius: 50%;
`

const DivLogoText = styled(Div)`

	text-align: center;
	
  @media (max-width: 540px) {
  	display: none;
	}
 
 @media (min-width: 541px) {
	
 }
`;




const DivNavItem = styled(Div)`
	
	width:100%;
	height: 40px; 

  @media (max-width: 540px) {
  
	}
 
	 @media (min-width: 541px) {
	 }
`;


const activeClassName = 'nav-link-active';

const NavLinkNavItem = styled(NavLink).attrs({ activeClassName })`
  width: 90%;
  height: 100%;
  
	color: ${props => props.theme.color_normal};
	
	text-decoration: none;
	text-align: center;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	&.${activeClassName} {
		color: ${props => props.theme.color_active};
	}
	
`;


function Sub () {
	return (
 
	
  <DivSub>
  	
  	<DivLogo>
	  	<DivLogoImg> 
	  		<ImgLogo src="" width="100%" height="100%" /> 
	  	</DivLogoImg>
	  	
	  	<DivLogoText> 
	  		Parallel Storm
	  	</DivLogoText> 
  	</DivLogo>
  	
  	<DivNavItem > <NavLinkNavItem to="/about"> About </NavLinkNavItem> </DivNavItem>
		<DivNavItem > <NavLinkNavItem to="/" exact={true}> Home </NavLinkNavItem> </DivNavItem>
		<DivNavItem > <NavLinkNavItem to="TeamGenerator" > Team Generator </NavLinkNavItem> </DivNavItem>
		
	</DivSub>
	
	)
}

export default Sub;