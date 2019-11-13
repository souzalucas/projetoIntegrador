/*import React from 'react';
import './login.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import img from '../../new.png'


          

function Professores() {
    return (
        <div className="login">
            <img src={img}/>
        </div>
    );
}
export default Professores;  */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Form, Container } from "./styles";
// import img from "../../assets/fecam.png";
import './login.css'
import img from '../../new.png'

class SignIn extends Component{
  state = {
    cpf: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { cpf, password } = this.state;
    if (!cpf || !password) {
      this.setState({ error: "Preencha cpf e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { cpf, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container className="login">
        <Form onSubmit={this.handleSignIn}>
          <div className = "logol" >
            <img src={img}/>
          </div>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="cpf"
            placeholder="CPF"
            onChange={e => this.setState({ cpf: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);