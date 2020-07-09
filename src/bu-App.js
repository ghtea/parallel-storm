import React, { Component }  from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import Sub from "./routes/Sub";
import Home from "./routes/Home";
import TeamGenerator from "./routes/TeamGenerator";

import {ThemeProvider } from 'styled-components';
import {dark, light} from "./styles/themes"
import { GlobalStyle, Div} from './styles/DefaultStyles';

import './styles/font.css';

// env 사용할때 각변수 앞에 REACT_APP_ 를 붙혀야한다 https://hello-bryan.tistory.com/134

const DivContent = styled(Div)`
  
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    margin-top: 50px; /* height of sub */
  	
	}
 
	 @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	  margin-left: 120px; /* width of sub */
	 
		
	 }
  
`;

class App extends React.Component {
    
  isDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    else {
      return false;
    }
  }  
    
    
  constructor(props){
      super(props);
      
      this.state = {
          themeApp: 'light'
      };
      
  }
  
  componentDidMount() {
    // we use as string here but we should use as object (without comma) when pass to theme in ThemeProvicer
      let themeDevice = this.isDarkMode() ? 'dark' : 'light';
      
      this.setState(prevState =>{
          return{
            ...prevState,
            themeApp: themeDevice
          }
        })
      
    
  }
  
  render() {
    
    const { themeApp } = this.state;
    
    return (
      <>
      <ThemeProvider theme={themeApp === 'light' ? light : dark }>
      
      
      <GlobalStyle/>
      
      <BrowserRouter>
        
        
        <Route path="/" component={Sub} />
        
        
        <DivContent>
        <Switch >
        <Route path="/" exact={true} component={Home} />
        
        <Route path="/team-generator" exact={true} component={TeamGenerator} />
        <Route path="/team-generator/:idPlanTeam"  component={TeamGenerator} />
        
        </Switch >
        </DivContent>
        
      </BrowserRouter>
      
      
      </ThemeProvider>
      </>
    );
  }
}

export default App;