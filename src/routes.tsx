import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Clients from './pages/Cliente';
import Home from './pages/Home';


const Routes: React.FC = () => {
    return(
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/Clients" exact component={ Clients } />
        <Route path="/Clients/:id" exact component={ Clients } />
      
      </Switch>
    );
  }
  
  export default Routes; //<Route path="/tarefas/:id" exact component={TasksDetail} />