import React from 'react';
import "./areas.css";
import { Select, Form, Input, Button, Modal, List, Avatar} from 'antd';
import { findAll, remove, create, update } from './areasAPI'

import MainLayout from '../../layouts';

const { TextArea } = Input;

class App extends React.Component {

  constructor(props) {
		super(props)
		
		this.state = { nome: '', descricao: '' }

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleAreaDescricao = this.handleAreaDescricao.bind(this)
		this.handleAreaNome = this.handleAreaNome.bind(this)
	}

	handleAreaNome(e) {
		return this.setState({
			nome: e.target.value
		})
	}

	handleAreaDescricao(e) {
		return this.setState({
			descricao: e.target.value
		})
	}

	handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { nome, descricao } = this.state
		
        create(nome, descricao).then(() => {
          return findAll().then(data => this.setState({ areas: data }))
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Nome">
          {getFieldDecorator('nome', {
            rules: [{ required: true, message: 'Por favor, insira um nome!' }],
          })(<Input type="text" name="nome" placeholder="Nome da Area de Atividade: " onChange={this.handleAreaNome} />)}
        </Form.Item>
        <Form.Item label="Descrição">
          {getFieldDecorator('descrição', {
            rules: [{ required: true, message: 'Por favor, insira uma descrição!' }],
          })(<TextArea rows={4} type="text" name="descricao" placeholder="Descricao da Area de Atividade: " onChange={this.handleAreaDescricao} />)}
        </Form.Item >
        
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App);

class Lista extends React.Component {
  constructor(props) {
		super(props)

		this.state = { areas: [] }
  }
  
  state = {
    loading: false,
    visible: false,
    nomeEdit: '',
    descricaoEdit: '',
  };

  showModal(area){
    this.setState({
      visible: true,
      nomeEdit: area.nome,
      descricaoEdit: area.descricao,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

	componentDidMount() {
		findAll().then(data => this.setState({ areas: data }))
  }

  handleDelete(area) {
		remove(area.id).then( () => {
			return findAll().then(data => this.setState({ areas: data }))
		})
	}
  
  render() {
    let { areas } = this.state
    const { visible, loading } = this.state;
    let { nomeEdit, descricaoEdit } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <MainLayout>
          <h1>Areas de Atividade</h1>

          <WrappedApp />

          <List
              itemLayout="horizontal"
              dataSource={areas}
              renderItem={item => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit" onClick={ () => this.showModal(item) }>editar</a>, 
                      <a key="list-loadmore-more" onClick={ () => this.handleDelete(item) }>remover</a>
                    ]}
                  >
                    <List.Item.Meta
                        avatar={<Avatar src="https://cdn0.iconfinder.com/data/icons/travel-glyph-4/32/google_direction_locate-512.png" />}
                        title={item.nome}
                        description={item.descricao}
                    />
                  </List.Item>
              )}
          />
          <Modal
            visible={visible}
            title="Editar Area de Atividade"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Calcelar
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                Editar
              </Button>,
            ]}
          >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              <Form.Item label="Nome">
                {getFieldDecorator('nome', {
                  rules: [{ required: true, message: 'Por favor, insira um nome!' }],
                })(<Input type="text" name="nome" placeholder="Nome da Area de Atividade: " value={nomeEdit}/>)}
              </Form.Item>
              <Form.Item label="Descrição">
                {getFieldDecorator('descrição', {
                  rules: [{ required: true, message: 'Por favor, insira uma descrição!' }],
                })(<TextArea rows={4} type="text" name="descricao" placeholder="Descricao da Area de Atividade: " value={descricaoEdit} />)}
              </Form.Item >
            </Form>
          </Modal>
      </MainLayout>
    );
  }
}

const ListaAreas = Form.create({ name: 'coordinated' })(Lista);

function Areas() {
    return (
      <ListaAreas />
    )
}
export default Areas;