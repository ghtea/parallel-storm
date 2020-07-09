import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
//import path from 'path'
import { NavLink, useParams } from 'react-router-dom';

import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";
// https://reacttraining.com/blog/react-router-v5-1/

import {Div, Table, Tr, Td} from '../styles/DefaultStyles';

import IconLoading from '../svgs/IconLoading'
import IconInfo from '../svgs/IconInfo'

// 이상하게 dotenv.config() 안해도 된다 (오히려 하면 에러 발생...)
//dotenv.config() ;
//dotenv.config({ path: path.join(__dirname, '../../.env') });


const DivTableEntry = styled(Div)`
  
  padding-left: 20px;
  padding-right: 20px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`

const DivIconLoading = styled(Div)`
  margin-top: 10px;
`

/*
display:grid;
*/

const DivRow = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 60px ${30*4}px 40px 40px; // min entire = 400 - 20*2 = 360
  grid-template-rows: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  &:nth-child(1) {
    border-top-left-radius:    10px;
    border-top-right-radius:   10px;
    
  }
  
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:  10px;
    
    border-bottom-style: none;
    
  }
`


const DivBattletag = styled(Div)`
  padding-left: 5px;
  display: block;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`




const RowPlayer = ({_id}) => {
  return (
    
    <DivRow >
      
      <DivBattletag> 
        {_id}
      </DivBattletag>
      
      <Div> 
        (mmr) 
      </Div>
       
      <Div> 
        Tank, Bruiser
      </Div>
      
      <Div> 
        A 
      </Div>
       
      <Div> 
        <IconInfo
          width={"20px"}
          height={"20px"}
        /> 
      </Div>
         
    </DivRow>
  )
}




const TableEntry = ({loading, ready, planTeam, readPlanTeam, notification}) => {
  
  let { idPlanTeam } = useParams();
  
    
  useEffect( () => { readPlanTeam(idPlanTeam) }, [notification]);
  
  /*
  const {loading, response, error, refetch } = useAxios({
    url: `https://ahr.avantwing.com/PlanTeam/${idPlanTeam}`
  })
  */
  

  
  
  //console.log(process.env);
  return (
  
  <>
    
    
  
    { (loading.planTeam) &&   
    <DivIconLoading>
      <IconLoading 
        width={"36px"}
        height={"36px"}
      />  
    </DivIconLoading>
    }
    
    { (ready.planTeam) && 
    
      //<Div> { JSON.stringify( response["data"]["listPlayerEntry"] )} </Div>
      <DivTableEntry> 
      
      { 
        ( planTeam["listPlayerEntry"] ).map( (player, i) => 
          
            < RowPlayer key={player._id} _id={player._id} /> )
          
      }
        
      </DivTableEntry>
    }
    
  
  
  </>
  )
}

	  
//<button onClick= {refetch} > Refectch </button>



function mapStateToProps(state) { 
  return { 
    planTeam: state.planTeam
    ,ready: state.ready 
    ,loading: state.loading
    ,notification: state.notification
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TableEntry);