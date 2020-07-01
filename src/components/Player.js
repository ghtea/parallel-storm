import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';



const DivPlayer = styled(Div)`
  

  color: ${props => props.theme.color_strong};
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  margin: 15px;
  
  
`;


const DivBattletag = styled(Div)`
  font-size: 1.2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`


const DivMmrs = styled(Div)`
  width:100%; 
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  margin: 2px;
  
`

const DivMmr = styled(Div)`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
`


const DivRoles = styled(Div)`
  width:100%; 
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  margin: 2px;
  
`

const DivRole = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
`

const DivRoleName = styled(Div)`
  font-size: 0.9rem;
`



const DivAlbumCover= styled(Div)`
  position: relative;

	display: flex;
  flex-direction: column;
  justify-content: center;
  
	position: relative;
  
  text-align: center;
  
  &:hover > img {
    opacity:0.2;
  }
  &:hover > div {
    visibility: visible;
  }
}
`

const ImgAlbumCover = styled.img`
  position: absolute;
  z-index:1;

  width: 100%;
  heigth: 100%;
  
  border-radius: 4%;
  
`



function Player ({player}) {
	return (
 
  <DivPlayer> 
    <DivBattletag> mbcat#1111 </DivBattletag>
    
    <DivMmrs>
    
      <DivMmr> 
        <Div> NA </Div> 
        <Div> 2222 </Div> 
      </DivMmr>
      
      <DivMmr> 
        <Div> EU </Div> 
        <Div> 2222 </Div> 
      </DivMmr>
      
      <DivMmr> 
        <Div> KR </Div> 
        <Div> 2222 </Div> 
      </DivMmr>
      
      <DivMmr> 
        <Div> CN </Div> 
        <Div> 2222 </Div> 
      </DivMmr>
      
    </DivMmrs>
    
    
    <DivRoles>
    
      <DivRole> 
        <DivRoleName> Tank </DivRoleName> 
        <Div> 11 </Div> 
      </DivRole>
      
      <DivRole> 
        <DivRoleName> Bruiser </DivRoleName> 
        <Div> 11 </Div> 
      </DivRole>
      
      <DivRole> 
        <DivRoleName> Melee </DivRoleName> 
        <Div> 41 </Div> 
      </DivRole>
      
      <DivRole> 
        <DivRoleName> Ranged </DivRoleName> 
        <Div> 17 </Div> 
      </DivRole>
      
      <DivRole> 
        <DivRoleName> Healer </DivRoleName> 
        <Div> 111 </Div> 
      </DivRole>
      
      <DivRole> 
        <DivRoleName> Support </DivRoleName> 
        <Div> 33 </Div> 
      </DivRole>
      
    </DivRoles>
    
  </DivPlayer>
  
  
	
	)
}

export default Player;
