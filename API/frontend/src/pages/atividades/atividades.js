import React from 'react';
import "./atividades.css";
import { Select, Form, Input, Button, Modal, List, Avatar, Popconfirm, message} from 'antd';
import { findAll, remove, create, update } from './atividadesAPI'

import MainLayout from '../../layouts';

function cancel(e) {
  console.log(e);
  message.error('Remoção cancelada');
}

const { TextArea } = Input;

class App extends React.Component {

  constructor(props) {
		super(props)
		
		this.state = { nome: '', descricao: '' }

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleAtividadeDescricao = this.handleAtividadeDescricao.bind(this)
		this.handleAtividadeNome = this.handleAtividadeNome.bind(this)
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

	handleAtividadeNome(e) {
		return this.setState({
			nome: e.target.value
		})
	}

	handleAtividadeDescricao(e) {
		return this.setState({
			descricao: e.target.value
		})
	}

	handleSubmit = e => {
    
    console.log(e);
    this.setState({
      visible: false,
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { nome, descricao } = this.state
		
        create(nome, descricao).then(() => {
          return findAll().then(data => this.setState({ atividades: data }))
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2 className="titulo_ativ">Atividades
          <Button className="botao_ativ" type="primary" onClick={this.showModal}>
            Cadastrar atividade
          </Button>
        </h2>
        <Modal
          title="Cadastar Area de Atividade"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button  onClick={this.handleCancel}>
              Calcelar
            </Button>,
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
              Cadastrar
            </Button>,
          ]}
        >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item label="Nome">
            {getFieldDecorator('nome', {
              rules: [{ required: true, message: 'Por favor, insira um nome!' }],
            })(<Input type="text" name="nome" placeholder="Nome da Atividade " allowClear onChange={this.handleAtividadeNome} />)}
          </Form.Item>
          <Form.Item label="Descrição">
            {getFieldDecorator('descrição', {
              rules: [{ required: true, message: 'Por favor, insira uma descrição!' }],
            })(<TextArea rows={4} type="text" name="descricao" placeholder="Descricao da Atividade " allowClear onChange={this.handleAtividadeDescricao} />)}
          </Form.Item >
        </Form>
      </Modal>
      </div>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App);

class Lista extends React.Component {
  constructor(props) {
		super(props)

		this.state = { atividades: [] }
  }
  
  state = {
    loading: false,
    visible: false,
    nomeEdit: '',
    descricaoEdit: '',
  };

  showModal(atividade){
    this.setState({
      visible: true,
      nomeEdit: atividade.nome,
      descricaoEdit: atividade.descricao,
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
		findAll().then(data => this.setState({ atividades: data }))
  }

  handleDelete(atividade){
    console.log(atividade);
    message.success('Atividade removida');
		remove(atividade.id).then( () => {
			return findAll().then(data => this.setState({ atividades: data }))
		})
	}
  
  render() {
    let { atividades } = this.state
    const { visible, loading } = this.state;
    let { nomeEdit, descricaoEdit } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <MainLayout>
          <WrappedApp />

          <List
              itemLayout="horizontal"
              dataSource={atividades}
              renderItem={item => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit" onClick={ () => this.showModal(item) }>editar</a>,
                      <Popconfirm
                        title="Tem certeza que deseja reover atividade?"
                        onConfirm={() => this.handleDelete(item)}
                        onCancel={cancel}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <a key="list-loadmore-more">remover</a>
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                        avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4MKKGRATF2Kc_G8xdZbNmgC_g68WzZhiRgJU22Vz9cd0Op_KMuQ&s" />}
                        title={item.nome}
                        description={item.descricao}
                    />
                  </List.Item>
              )}
          />
          <Modal
            visible={visible}
            title="Editar Atividade"
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
                })(<Input type="text" name="nome" placeholder="Nome da Atividade: " value={nomeEdit}/>)}
              </Form.Item>
              <Form.Item label="Descrição">
                {getFieldDecorator('descrição', {
                  rules: [{ required: true, message: 'Por favor, insira uma descrição!' }],
                })(<TextArea rows={4} type="text" name="descricao" placeholder="Descricao da Atividade: " value={descricaoEdit} />)}
              </Form.Item >
            </Form>
          </Modal>
      </MainLayout>
    );
  }
}

const ListaAtividades = Form.create({ name: 'coordinated' })(Lista);

function Atividades() {
    return (
      <ListaAtividades />
    )
}
export default Atividades;