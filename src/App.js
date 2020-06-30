import React, { Component }  from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import Sub from "./routes/Sub";
import Home from "./routes/Home";


import {ThemeProvider } from 'styled-components';
import {dark, light} from "./styles/themes"
import { GlobalStyle, Div} from './styles/DefaultStyles';
import { ResetStyle} from './styles/ResetStyle';

import './styles/font.css'

const DivContent = styled(Div)`
   
  
  @media (max-width: 540px) {
    margin-top: 50px; /* height of sub */
  	
  	width: 100%;
	  height: 100%;
  	
	}
 
	 @media (min-width: 541px) {
	  margin-left: 160px; /* width of nav */
	 
		width: 100%;
	  height: 100%;
	 
		
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
      
      <ResetStyle/>
      <GlobalStyle/>
      
      <BrowserRouter>
      
        <Route path="/" component={Sub} />
        
        <DivContent>
        <Switch >
        <Route path="/" exact={true} component={Home} />

        </Switch >
        </DivContent>
        
      </BrowserRouter>
      
      
      </ThemeProvider>
      </>
    );
  }
}

export default App;