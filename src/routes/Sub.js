import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';



const DivSub = styled(Div)`
	
	background-color: ${props => props.theme.COLOR_normal};

	/*background-image: url("https://www.transparenttextures.com/patterns/worn-dots.png"), linear-gradient(-10deg, hsl(210,100%,33%) 50%, hsl(210,100%,25%) 100%);*/
	/*background-color: ${props => props.theme.COLOR_normal};*/
	/*background-color: #22a7f0;*/
	/*background-image: linear-gradient(-20deg, hsl(233,60%,50%) 50%,hsl(233,60%,45%) 100%);*/
	/* hsl(233,60%,50%) */
  
  
  color: ${props => props.theme.color_strong};
  
  /*box-shadow: 2px 0px 2px #888;*/
  
  position: fixed;
  top: 0px;
  
  display: flex;
  
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  
  	width: 100%;
  	height: 50px; 
  	
  	flex-direction: row;
  	
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
		width: 120px;
	  height: 100%;
	 
		flex-direction: column;
		justify-content: flex-start;
		
	 }
  
`;

const DivLogo = styled(Div)`

  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  	width: 120px;
		heigth: 100%;
	
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
 
 @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	width: 100px;
	heigth: 250px;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	margin-top: 50px;
	margin-bottom:100px;
	
 }
`;

const DivLogoImg = styled(Div)`
	border-radius: 50%;
	
	@media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
		width: 40px;
		height: 40px;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
		width: 80px;
		height: 80px;
	}
`;

const ImgLogo = styled.img`
	border-radius: 50%;
`

const DivLogoText = styled(Div)`
	height: 50px;
	text-align: center;
	
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  	display: none;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	
	}
`;




const DivNavItem = styled(Div)`
	
	width:100%;
	height: 40px; 

  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
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
		<DivNavItem > <NavLinkNavItem to="team-generator" > Team Generator </NavLinkNavItem> </DivNavItem>
		
	</DivSub>
	
	)
}

export default Sub;