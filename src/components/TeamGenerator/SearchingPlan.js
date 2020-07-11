import dotenv from 'dotenv';
import React from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceWorking} from "../../redux/store";

import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import IconWorking from '../../svgs/IconWorking'


const DivSearchingPlan = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;



 const SearchingPlan = ({addRemoveNotification, loading, ready, working, replaceWorking}) => {
  
  

  
  return (
  
  <DivSearchingPlan>
      we can search for existing plan here 
  </DivSearchingPlan>
  
  )

}
  
	  


function mapStateToProps(state) { 
  return { 
    ready: state.ready 
    ,loading: state.loading
    ,working: state.working
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(SearchingPlan);