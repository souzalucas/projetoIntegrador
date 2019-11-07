import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
// import Logo from "../../assets/airbnb-logo.svg";

import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    cpf: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { cpf, password } = this.state;    
    if (!cpf || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/users", { cpf, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  };

  render() {
    return (
      <Container>
        {/* Ativado quando um formário é enviado */}
        <Form onSubmit={this.handleSignUp}> 
          {/* <img src={Logo} alt="Airbnb logo" /> */}
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
          <button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);