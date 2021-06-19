import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ChakraProvider, theme } from '@chakra-ui/react';
import Home from './container/Home';
import Dashboard from './container/Dashboard';
import SingleCollection from './container/singleCollection';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
     
          <Route exact path="/">
           <Home/>
          </Route>
          
          <Route path="/collections">
           <Dashboard/>
          </Route>

          <Route path="/collection/:id">
             <SingleCollection/>
          </Route>


        </Switch>
    </Router>
    </ChakraProvider>
  );
}

export default App;
