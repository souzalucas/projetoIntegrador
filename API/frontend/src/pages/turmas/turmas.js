import React from 'react';
// import "./atividades.css";
import { Select, Form, Input, Button, Modal, List, Avatar, Popconfirm, message, Radio} from 'antd';
import { findAll, remove, create, update } from './turmasAPI'

import MainLayout from '../../layouts';
import "./turma.css";

function cancel(e) {
  console.log(e);
  message.error('Remoção cancelada');
}
const {Option} = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const { TextArea } = Input;
const plainOptions = ['Segunda-Feira', 'Terça-Feira', "Quarta-Feira","Quinta-Feira","Sexta-Feira"];

// function handleChange(value) {
//   console.log(`Selected: ${value}`);
// }

// class SelectSizesDemo extends React.Component {
//   state = {
//     size: 'default',
//   };

// const options = [{ label: 'Dias da Semana',value: "Segunda-Feira", value: 'Terça-Feira', value: 'Quarta-Feira', value: 'Quinta-Feira', value: 'Sexta-Feira'},];

//   const optionsWithDisabled = [
//     { label: 'Dias da Semana', value: 'Orange', disabled: false },
//   ];


class App extends React.Component {

  constructor(props) {
		super(props)
		
		this.state = { dia: '', horario_inicio: '', horario_fim:'', size:''}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDia = this.handleDia.bind(this)
    this.handleHorarioInicio = this.handleHorarioInicio.bind(this)
    this.handleHorarioFim = this.handleHorarioFim.bind(this)
    this.handleSize = this.handleSize.bind(this)
  }


  handleSize = e => {
    this.setState({ size: e.target.value });
  };

  onChange1 = e => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      dia: e.target.value,
    });
  };


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

	handleDia(e) {
		return this.setState({
			dia: e.target.value
		})
	}

	handleHorarioInicio(e) {
		return this.setState({
			horario_inicio: e.target.value
		})
    }

    
    handleHorarioFim(e) {
		return this.setState({
			horario_fim: e.target.value
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
        let { dia, horario_inicio,horario_fim } = this.state
		
        create(dia, horario_inicio,horario_fim).then(() => {
          this.props.form.resetFields();
          return findAll().then(data => this.setState({ turmas: data }),window.location.reload())
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2 className="titulo_ativ">Turmas
          <Button className="botao_ativ" type="primary" onClick={this.showModal}>
            Cadastrar Turma
          </Button>
        </h2>
        <Modal
          title="Cadastar Turma"
          style= {{width:"150%"}}
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
          <Form.Item label="Dia">
            {getFieldDecorator('dia', {
              rules: [{ required: true, message: 'Por favor, insira um Dia!' }],
            })(<Input type="date" name="dia" placeholder="Dia da Turma" allowClear onChange={this.handleAtividadeNome} />)}
          </Form.Item>

          <Form.Item label="Início">
            {getFieldDecorator('horario_inicio', {
              rules: [{ required: true, message: 'Por favor, insira um horáro de início!' }],
            })(<Input  type="time" name="horario_inicio" placeholder="Início " onChange={this.handleAtividadeDescricao} />)}
          </Form.Item >

          <Form.Item label="Término">
            {getFieldDecorator('horario_fim', {
              rules: [{ required: true, message: 'Por favor, insira um horáro de término!' }],
            })(<Input  type="time" name="horario_fim" placeholder="Término " onChange={this.handleAtividadeDescricao} />)}
          </Form.Item >

          <Form.Item label="Dias:">
                <div>
                    <Radio.Group options={plainOptions} onChange={this.onChange1} value={this.state.value1}/>
                </div>
          </Form.Item >
          
            <Form.Item label="Alunos">
              <div>
                  <Select
                    mode="tags"
                    size={'default'}
                    placeholder="Please select"
                    defaultValue={['Jorge', 'João']}
                    // onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
              </div>
          </Form.Item>
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

    this.state = { turmas: [], id: '', data: '', horario_inicio: '', horario_fim: ''}
    
    this.handleSubmit = this.handleSubmit.bind(this)
		this.handleData = this.handleData.bind(this)
        this.handleHorarioInicio = this.handleHorarioInicio.bind(this)
		this.handleHorarioFim = this.handleHorarioFim.bind(this)
        
  }

    handleData(e) {
		return this.setState({
			data: e.target.value
		})
	}

	handleHorarioInicio(e) {
		return this.setState({
			horario_inicio: e.target.value
		})
	}

    handleHorarioFim(e) {
		return this.setState({
			horario_fim: e.target.value
		})
	}

	handleSubmit = e => {
    this.setState({
      visible: false,
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { id, data, horario_inicio, horario_fim } = this.state
        update(id, data, horario_inicio, horario_fim).then(() => {
          this.props.form.resetFields();
          return findAll().then(data => this.setState({ turmas: data }))
        })
      }
    });
  };
  
  state = {
    loading: false,
    visible: false,
  };

  showModal(atividade){
    this.setState({
      visible: true,
      id: atividade.id,
      data: atividade.data,
      horario_inicio: atividade.horario_inicio,
      horario_fim: atividade.horario_fim,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.form.resetFields();
  };

	componentDidMount() {
		findAll().then(data => this.setState({ turmas: data }))
  }

  handleDelete(turma){
    console.log(turma);
    message.success('Turma removida');
		remove(turma.id).then( () => { //Verificar
			return findAll().then(data => this.setState({ turmas: data }))
		})
	}
  
  render() {
    let { turmas } = this.state
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <MainLayout>
          <WrappedApp />

          <List
              itemLayout="horizontal"
              dataSource={turmas}
              renderItem={item => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit" onClick={ () => this.showModal(item) }>editar</a>,
                      <Popconfirm
                        title="Tem certeza que deseja remover a turma?"
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
                        title={item.date} //Trocar
                        description={item.horario_inicio}//Trocar
                    />
                  </List.Item>
              )}
          />
          {/* <Modal
            visible={visible}
            title="Editar Atividade"
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
                Editar
              </Button>,
            ]}
          >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              <Form.Item label="Nome">
                {getFieldDecorator('nome', {
                  rules: [{ required: true, message: 'Por favor, insira um nome!' }],
                })(<Input type="text" name="nome" defaultValue="teste" placeholder="Nome da Atividade: " onChange={this.handleAtividadeNome} />)}
              </Form.Item>
              <Form.Item label="Descrição">
                {getFieldDecorator('descrição', {
                  rules: [{ required: true, message: 'Por favor, insira uma descrição!' }],
                })(<TextArea rows={4} type="text" name="descricao" defaultValue="teste" placeholder="Descricao da Atividade: " onChange={this.handleAtividadeDescricao} />)}
              </Form.Item >
            </Form>
          </Modal> */}
      </MainLayout>
    );
  }
}

const ListaTurmas = Form.create({ name: 'coordinated' })(Lista);

function Turmas() {
    return (
      <ListaTurmas />
    )
}
export default Turmas;