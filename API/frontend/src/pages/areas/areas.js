import React from 'react';
import "./areas.css";
import { Select, Form, Input, Button, Modal, List, Avatar, Popconfirm, message} from 'antd';
import { findAll, remove, create, update } from './areasAPI'

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
		this.handleAreaDescricao = this.handleAreaDescricao.bind(this)
		this.handleAreaNome = this.handleAreaNome.bind(this)
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
    this.props.form.resetFields();
  };

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
    console.log(e);
    this.setState({
      visible: false,
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { nome, descricao } = this.state
		
        create(nome, descricao).then(() => {
          this.props.form.resetFields();
          return findAll().then(data => this.setState({ areas: data }),window.location.reload())
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <h2 className="titulo_area">Areas
        <Button className="botao_area" type="primary" onClick={this.showModal}>
            Cadastrar Area
          </Button>
        </h2>
        <Modal
          title="Cadastar Area"
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
              })(<Input type="text" name="nome" placeholder="Nome da Area " allowClear onChange={this.handleAreaNome} />)}
            </Form.Item>
            <Form.Item label="Descrição">
              {getFieldDecorator('descrição', {
                rules: [{ required: true, message: 'Por favor, insira uma descrição!' }],
              })(<TextArea rows={4} type="text" name="descricao" placeholder="Descricao da Area " allowClear onChange={this.handleAreaDescricao} />)}
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

    this.state = { areas: [], id: '', nome: '', descricao: '' }

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
    this.setState({
      visible: false,
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { id, nome, descricao } = this.state
        update(id, nome, descricao).then(() => {
          this.props.form.resetFields();
          return findAll().then(data => this.setState({ areas: data }))
        })
      }
    });
  };

  state = {
    loading: false,
    visible: false,
  };

  showModal(area){
    this.setState({
      visible: true,
      id: area.id,
      nome: area.nome,
      descricao : area.descricao,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.form.resetFields();
  };

	componentDidMount() {
		findAll().then(data => this.setState({ areas: data }))
  }

  handleDelete(area) {
    console.log(area);
    message.success('Area removida');
		remove(area.id).then( () => {
			return findAll().then(data => this.setState({ areas: data }))
		})
	}
  
  render() {
    let { areas } = this.state
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <MainLayout>
          <WrappedApp/>

          <List
              itemLayout="horizontal"
              dataSource={areas}
              renderItem={item => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit" onClick={ () => this.showModal(item) }>editar</a>, 
                      <Popconfirm
                        title="Tem certeza que deseja remover area?"
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
                        avatar={<Avatar src="https://cdn2.iconfinder.com/data/icons/cycle/154/map-pointer-geo-location-velo-cycle-sport-drive-512.png" />}
                        title={item.nome}
                        description={item.descricao}
                    />
                  </List.Item>
              )}
          />
          <Modal
            visible={visible}
            title="Editar Area"
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Calcelar
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
                Editar
              </Button>,
            ]}
          >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              <Form.Item label="Nome">
                <Input value={this.state.nome} type="text" name="nome" placeholder="Nome da Area: " onChange={this.handleAreaNome} />
              </Form.Item>
              <Form.Item label="Descrição">
                <TextArea value={this.state.descricao} rows={4} type="text" name="descricao" placeholder="Descricao da Area: " onChange={this.handleAreaDescricao} />
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