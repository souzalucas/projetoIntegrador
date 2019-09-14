import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home">Municipal Stadium Control</div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <BrowserRouter>
      <Switch>
          <Route path="/" exact={true} component={Home} />
      </Switch>
  </ BrowserRouter>,
  document.getElementById('root')
);
