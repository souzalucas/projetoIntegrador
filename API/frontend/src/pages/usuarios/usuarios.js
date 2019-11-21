import React from 'react';
import { Radio , Form, Input, Button, Modal, List, Avatar, Popconfirm, message} from 'antd';
import MainLayout from '../../layouts';
import { findAll, remove, create, update} from './usuariosAPI';
import "./usuarios.css";

function cancel(e) {
  console.log(e);
  message.error('Remoção cancelada');
}

const { TextUsuario } = Input;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class App extends React.Component {

    constructor(props) {
          super(props)
          //data_nascimento,tipo
          this.state = { cpf: '', nome: '', telefone: '', sexo: '', profissao : ''}
          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleUsuarioCpf = this.handleUsuarioCpf.bind(this)
          this.handleUsuarioNome = this.handleUsuarioNome.bind(this)
          this.handleUsuarioTelefone = this.handleUsuarioTelefone.bind(this)
          // this.handleUsuarioDataNascimento = this.handleUsuarioDataNascimento.bind(this)
          this.handleUsuarioSexo = this.handleUsuarioSexo.bind(this)
          this.handleUsuarioProfissao = this.handleUsuarioProfissao.bind(this)
          
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
      //verificar
      handleUsuarioProfissao = e => {
        console.log('radio checked', e.target.value);
        return this.setState({
            profissao: e.target.value
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
            //data_nascimento,tipo
                let { cpf, nome, telefone, sexo, profissao} = this.state
                //tipo
                create(cpf, nome, telefone, sexo, profissao).then(() => {
                    return findAll().then(data => this.setState({ usuarios: data }),window.location.reload())
                })
            }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div>
            <h2 className="titulo_usuario" >Usuários
                <Button className="botao_usuario" type="primary" onClick={this.showModal}>
                    Cadastrar Usuário
                </Button>
            </h2>
            <Modal
                title="Cadastrar Usuário"
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

        <Form.Item label="Profissão">
        {getFieldDecorator('profissao',{
          rules: [{ required: true, message: 'Por favor, escolha a profissão!' }],
        })(<Radio.Group onChange={this.handleUsuarioProfissao} value={this.state.profissao}>
          <Radio style={radioStyle} value={"secretaria"}>
            Secretaria
          </Radio>
          <Radio style={radioStyle} value={"professor"}>
            Professor
          </Radio>
          {/* verificar */}
          {/* <Radio style={radioStyle} value={"outro"}> 
            Outro
            {this.state.profissao === "outro" ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
          </Radio> */}
        </Radio.Group>)
        }
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
          //alteração realizada
          this.state = { usuarios: [], cpf:'',nome:'',telefone:'', sexo:'', profissao:'',visible: false,loading:false}

          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleUsuarioNome = this.handleUsuarioNome.bind(this)
          this.handleUsuarioTelefone = this.handleUsuarioTelefone.bind(this)
          // this.handleUsuarioDataNascimento = this.handleUsuarioDataNascimento.bind(this)
          this.handleUsuarioSexo = this.handleUsuarioSexo.bind(this)
          this.handleUsuarioProfissao= this.handleUsuarioProfissao.bind(this)
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

  handleUsuarioProfissao = e => {
    console.log('radio checked', e.target.value);
    return this.setState({
        profissao: e.target.value
    })
  }
  
    showModal(usuario){
      this.setState({
        visible: true,
        cpf: usuario.cpf,
        nome: usuario.nome,
        // dataNascumentoEdit: usuario.data_nascimento,
        telefone: usuario.telefone,
        sexo: usuario.sexo,
        profissao: usuario.profissao,
      });
    };
    
    handleCancel = () => {
      this.setState({ visible: false });
      this.props.form.resetFields();
    };
  
    componentDidMount() {
          findAll().then(data => this.setState({ usuarios: data }))
    }

    handleSubmit = e => {
      this.setState({
        visible: false,
      });
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { nome, telefone, sexo, profissao } = values;
          const { cpf } = this.state;
          update(cpf,nome,telefone,sexo,profissao).then(() => {
            this.props.form.resetFields();
            //usuarios
            return findAll().then(data => this.setState({ usuarios: data }))
          })
        }
      });
    };
  
    handleDelete(usuario) {
          remove(usuario.cpf).then( () => {
              return findAll().then(data => this.setState({ usuarios: data }))
          })
      }
    
    render() {
      let { usuarios } = this.state;
      const { visible, loading } = this.state;
      //dataNascumentoEdit, tipoEdit 
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
          <Modal visible={visible} title="Editar Usuario" onOk={this.handleSubmit} onCancel={this.handleCancel} footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Cancelar
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
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
                  })(<Input type="text" name="nome" placeholder="Nome do Usuario:" value={this.handleUsuarioNome} />)}
              </Form.Item >

              <Form.Item label="Telefone">
                  {getFieldDecorator('telefone', {
                  rules: [{ required: true, message: 'Por favor, insira um telefone!' }],
                  })(<Input type="text" name="telefone" placeholder="Telefone do Usuario:" value={this.handleUsuarioTelefone}/>)}
              </Form.Item >

              {/* <Form.Item label="Data_nascimento">
                  {getFieldDecorator('data_nascimento', {
                  rules: [{ required: true, message: 'Por favor, insira uma data de nascimento!' }],
                  })(<Input type="date" name="data_nascimento" placeholder="Data de nascimento do Usuario:" value={dataNascumentoEdit}/>)}
              </Form.Item > */}

              <Form.Item label="Sexo">
                  {getFieldDecorator('sexo', {
                  rules: [{ required: true, message: 'Por favor, insira um sexo!' }],
                 })(<Input type="text" name="sexo" placeholder="Sexo do Usuario:" value={this.handleUsuarioSexo}/>)}
              </Form.Item > 

              <Form.Item label="Profissão">
                {getFieldDecorator('profissao',{
                  rules: [{ required: true, message: 'Por favor, escolha a profissão!' }],
                })(<Radio.Group onChange={this.handleUsuarioProfissao} value={this.state.profissao}>
                  <Radio style={radioStyle} value={"secretaria"}>
                    Secretaria
                  </Radio>
                  <Radio style={radioStyle} value={"professor"}>
                    Professor
                  </Radio>
                  {/* verificar */}
                  {/* <Radio style={radioStyle} value={"outro"}> 
                    Outro
                    {this.state.profissao === "outro" ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                  </Radio> */}
              </Radio.Group>)
              }
              </Form.Item>

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