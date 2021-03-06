import React, {Component} from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Areas from './pages/areas/areas';
import Atividades from './pages/atividades/atividades';
import Turmas from './pages/turmas/turmas';
import Professores from './pages/professores/professores';
import Alunos from './pages/alunos/alunos';
import Login from './pages/login/login';
import Usuarios from './pages/usuarios/usuarios';
import { isAuthenticated } from './services/auth';
import './styles.css';

// Utilizado para acessar as rotas apenas de maneira autenticada
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

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
                    <Route path="/login" component={Login}/>
                    <Route path="/usuarios" component={Usuarios}/>
                </Switch>
            </Router>
        )
    }
};

export default Routes;
