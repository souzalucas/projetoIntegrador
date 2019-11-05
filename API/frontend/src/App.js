import React, {Component} from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Areas from './pages/areas/areas';
import Atividades from './pages/atividades/atividades';
import Turmas from './pages/turmas/turmas';
import Professores from './pages/professores/professores';
import Alunos from './pages/alunos/alunos';

export class Routes extends Component {    
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/areas" component={Areas}/>
                    <Route path="/atividades" component={Atividades}/>
                    <Route path="/alunos" component={Alunos}/>
                    <Route path="/professores" component={Professores}/>
                    <Route path="/turmas" component={Turmas}/>
                </Switch>
            </Router>
        )
    }
};

export default Routes;
