import dotenv from 'dotenv';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';



import IconPlus from '../../svgs/basic/IconPlus'

import {CopyToClipboard} from 'react-copy-to-clipboard';



// STYLES
const DivGuide = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;



const DivGuideTitle = styled(Div)`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`



const DivBody = styled(Div)`
  
  width: 100%;
  max-width: 600px;
  
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  
	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  overflow-y: auto;
  
`

const Part = styled(Div)`
  
  margin-top: 6px;
  margin-bottom: 6px;
  
  font-size: 0.9rem;
  
	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`







 const Guide = ({
  
   
 }) => {

  
  
  return (
  <DivGuide>
    
    <DivGuideTitle> Guide </DivGuideTitle>

    
   <DivBody>
   
    <Part>
      <Div> mmr & roles data came from replays in Heroes Profile API </Div>
    </Part>
    
     <Part>
      <Div> used mmr of game mode where the player played more than 100 games (> 40 > 10) </Div>
      <Div> Storm League in current region > Quick Match in current region > Storm League in other region > ...</Div>
    </Part>
      
    <Part>
	    <Div> using number of each role, I have chosen main roles for each player </Div>
	    <Div> the players who play few roles are separated into different teams </Div>
	   </Part>
	    
   </DivBody>
  
  </DivGuide>
        
  
  )
}
  
  

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default Guide;