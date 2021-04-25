import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Paciente from './pages/Paciente';
import Home from './pages/Home';


const Routes: React.FC = () => {
    return(
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/Paciente" exact component={ Paciente } />
        <Route path="/Paciente/:id" exact component={ Paciente } />
       
      </Switch>
    );
  }
  
  export default Routes; //<Route path="/tarefas/:id" exact component={TasksDetail} />