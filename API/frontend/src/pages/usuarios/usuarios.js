import React from 'react';
import { Select, Form, Input, Button, Modal, List, Avatar, Popconfirm, message} from 'antd';
import MainLayout from '../../layouts';
import { findAll, remove, create} from './usuariosAPI';

//Adicionar confirmações

const { TextUsuario } = Input;
// const { Option } = Select;

class App extends React.Component {

    constructor(props) {
          super(props)
          //data_nascimento,tipo
          this.state = { cpf: '', nome: '', telefone: '', sexo: ''}
          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleUsuarioCpf = this.handleUsuarioCpf.bind(this)
          this.handleUsuarioNome = this.handleUsuarioNome.bind(this)
          this.handleUsuarioTelefone = this.handleUsuarioTelefone.bind(this)
          // this.handleUsuarioDataNascimento = this.handleUsuarioDataNascimento.bind(this)
          this.handleUsuarioSexo = this.handleUsuarioSexo.bind(this)
          // this.handleUsuarioTipo = this.handleUsuarioTipo.bind(this)
          
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
  
      handleUsuarioCpf(e) {
          return this.setState({
              cpf: e.target.value
          })
      }
  
      handleUsuarioNome(e) {
          return this.setState({
              nome: e.target.value
          })
      }

      handleUsuarioTelefone(e) {
        return this.setState({
            telefone: e.target.value
        })
      }

      // handleUsuarioDataNascimento(e) {
      //   return this.setState({
      //       data_nascimento: e.target.value
      //   })
      // }

      handleUsuarioSexo(e) {
        return this.setState({
            sexo: e.target.value
        })
      }

    //   handleUsuarioTipo(e) {
    //     return this.setState({
    //         tipo: e.target.value
    //     })
    // }

      handleSubmit = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            //data_nascimento,tipo
                let { cpf, nome, telefone, sexo} = this.state
                //tipo
                create(cpf, nome, telefone, sexo).then(() => {
                    return findAll().then(data => this.setState({ usuarios: data }),window.location.reload())
                })
            }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div>
            <h2 className="titulo_area">Usuários
                <Button className="botao_area" type="primary" onClick={this.showModal}>
                    Cadastrar Usuário
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

          <Form.Item label="Cpf">
            {getFieldDecorator('cpf', {
              rules: [{ required: true, message: 'Por favor, insira um cpf!' }],
            })(<Input type="text" name="cpf" placeholder="Cpf do Usuario: " onChange={this.handleUsuarioCpf}/>)}
          </Form.Item>

          <Form.Item label="Nome">
            {getFieldDecorator('nome', {
              rules: [{ required: true, message: 'Por favor, insira um nome!' }],
            })(<Input type="text" name="nome" placeholder="Nome do Usuario:" onChange={this.handleUsuarioNome}/>)}
          </Form.Item >

          <Form.Item label="Telefone">
            {getFieldDecorator('telefone', {
              rules: [{ required: true, message: 'Por favor, insira um telefone!' }],
            })(<Input type="text" name="telefone" placeholder="Telefone do Usuario:" onChange={this.handleUsuarioTelefone}/>)}
          </Form.Item >

          {/* <Form.Item label="Data nascimento">
            {getFieldDecorator('data_nascimento', {
              rules: [{ required: true, message: 'Por favor, insira uma data de nascimento!' }],
            })(<Input type="date" name="data_nascimento" placeholder="Data de nascimento do Usuario:" onChange={this.handleUsuarioDataNascimento} />)}
          </Form.Item > */}

          <Form.Item label="Sexo">
            {getFieldDecorator('sexo', {
              rules: [{ required: true, message: 'Por favor, insira um sexo!' }],
            })(<Input type="text" name="sexo" placeholder="Sexo do Usuario:" onChange={this.handleUsuarioSexo}/>)}
          </Form.Item >

        {/* <Form.Item label="Encargo">
        {getFieldDecorator('tipo', {
              rules: [{ required: true, message: 'Por favor, escolha o encargo!' }],
            })(<Select defaultValue="professor" style={{ width: 120 }} onChange={this.handleUsuarioTipo}>
            <Option value="professor">professor</Option>
            <Option value="secretaria">secretaria</Option>
       </Select>)}
       </Form.Item > */}

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
  
          this.state = { usuarios: [] }
    }
    
    state = {
      loading: false,
      visible: false,
      nomeEdit:'',
      // dataNascumentoEdit: '',
      telefoneEdit: '',
      sexoEdit: '',
      // tipoEdit: '',
    };
  
    showModal(usuario){
      this.setState({
        visible: true,
        nomeEdit: usuario.nome,
        // dataNascumentoEdit: usuario.data_nascimento,
        telefoneEdit: usuario.telefone,
        sexoEdit: usuario.sexo,
        // tipoEdit: usuario.tipo,
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
          findAll().then(data => this.setState({ usuarios: data }))
    }
  
    handleDelete(usuario) {
          remove(usuario.cpf).then( () => {
              return findAll().then(data => this.setState({ usuarios: data }))
          })
      }
    
    render() {
      let { usuarios } = this.state;
      const { visible, loading } = this.state;
      //dataNascumentoEdit, tipoEdit 
      let { nomeEdit, telefoneEdit, sexoEdit} = this.state;
      const { getFieldDecorator } = this.props.form;
      return (
        <MainLayout>
            <WrappedApp />
  
            <List
                itemLayout="horizontal"
                dataSource={usuarios}
                renderItem={item => (
                    <List.Item
                      actions={[
                        <a key="list-loadmore-edit" onClick={ () => this.showModal(item) }>editar</a>, 
                        <Popconfirm
                          title="Tem certeza que deseja remover o usuario?"
                          onConfirm={() => this.handleDelete(item)}
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
            <Modal visible={visible} title="Editar Usuario" onOk={this.handleOk} onCancel={this.handleCancel} footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Calcelar
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                  Editar
                </Button>,
              ]}
            >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              {/* <Form.Item label="Cpf">
                {getFieldDecorator('cpf', {
                rules: [{ required: true, message: 'Por favor, insira um cpf!' }],
                })(<Input type="text" name="cpf" placeholder="Cpf do Usuario:" value={cpfEdit} />)}
              </Form.Item> */}

              <Form.Item label="Nome">
                  {getFieldDecorator('nome', {
                  rules: [{ required: true, message: 'Por favor, insira um nome!' }],
                  })(<Input type="text" name="nome" placeholder="Nome do Usuario:" value={nomeEdit} />)}
              </Form.Item >

              <Form.Item label="Telefone">
                  {getFieldDecorator('telefone', {
                  rules: [{ required: true, message: 'Por favor, insira um telefone!' }],
                  })(<Input type="text" name="telefone" placeholder="Telefone do Usuario:" value={telefoneEdit}/>)}
              </Form.Item >

              {/* <Form.Item label="Data_nascimento">
                  {getFieldDecorator('data_nascimento', {
                  rules: [{ required: true, message: 'Por favor, insira uma data de nascimento!' }],
                  })(<Input type="date" name="data_nascimento" placeholder="Data de nascimento do Usuario:" value={dataNascumentoEdit}/>)}
              </Form.Item > */}

              <Form.Item label="Sexo">
                  {getFieldDecorator('sexo', {
                  rules: [{ required: true, message: 'Por favor, insira um sexo!' }],
                 })(<Input type="text" name="sexo" placeholder="Sexo do Usuario:" value={sexoEdit}/>)}
              </Form.Item > 
            </Form>
            </Modal> 
        </MainLayout>
      );
    }
}
  
   const ListaUsuarios = Form.create({ name: 'coordinated' })(Lista);
  
   function Usuarios() {
      return (
        <ListaUsuarios />
      )
  }

  export default Usuarios;	