import React from 'react';
import { Radio , Form, Input, Button, Modal, List, Avatar, Popconfirm, message} from 'antd';
import MainLayout from '../../layouts';
import { findAll, remove, create, update} from './alunosAPI';
import "./alunos.css";




function cancel(e) {
  console.log(e);
  message.error('Remoção cancelada');
}

const { TextAluno } = Input;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class App extends React.Component {

    constructor(props) {
          super(props)
          this.state = { cpf: '', nome: '', telefone: '',data_nascimento:'', sexo: ''}
          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleAlunoCpf = this.handleAlunoCpf.bind(this)
          this.handleAlunoNome = this.handleAlunoNome.bind(this)
          this.handleAlunoTelefone = this.handleAlunoTelefone.bind(this)
          this.handleAlunoDataNascimento = this.handleAlunoDataNascimento.bind(this)
          this.handleAlunoSexo = this.handleAlunoSexo.bind(this)
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
  
      handleAlunoCpf(e) {  
        // console.log(e.target.value)
          return this.setState({
              cpf: e.target.value
          })
      }  

      handleAlunoNome(e) {
          return this.setState({
              nome: e.target.value
          })
      }

      handleAlunoTelefone(e) {
        return this.setState({
            telefone: e.target.value
        })
      }

      handleAlunoDataNascimento(e) {
        return this.setState({
            data_nascimento: e.target.value
        })
      }

      handleAlunoSexo(e) {
        return this.setState({
            sexo: e.target.value
        })
      }
      handleSubmit = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
        e.preventDefault();
        // teste = validarCpf(e.target.value); // false
        //         console.log(teste)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { cpf, nome, telefone, data_nascimento, sexo} = this.state
                //tipo
                create(cpf, nome, telefone, data_nascimento, sexo).then(() => {
                    return findAll().then(data => this.setState({ alunos: data }),window.location.reload())
                })
            }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div>
            <h2 className="titulo_aluno" >Alunos
                <Button className="botao_aluno" type="primary" onClick={this.showModal}>
                    Cadastrar Aluno
                </Button>
            </h2>
            <Modal
                title="Cadastrar Aluno"
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
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>

          <Form.Item label="Cpf">
            {getFieldDecorator('cpf', {
              rules: [{ required: true, message: 'Por favor, insira um cpf!' }],
            })(<Input type="text" name="cpf" placeholder="Cpf do Aluno: " onChange={this.handleAlunoCpf}/>)}
          </Form.Item>

          <Form.Item label="Nome">
            {getFieldDecorator('nome', {
              rules: [{ required: true, message: 'Por favor, insira um nome!' }],
            })(<Input type="text" name="nome" placeholder="Nome do Aluno:" onChange={this.handleAlunoNome}/>)}
          </Form.Item >

          <Form.Item label="Telefone">
            {getFieldDecorator('telefone', {
              rules: [{ required: true, message: 'Por favor, insira um telefone!' }],
            })(<Input type="text" name="telefone" placeholder="Telefone do Aluno:" onChange={this.handleAlunoTelefone}/>)}
          </Form.Item >

          <Form.Item label="Data nascimento" > 
            {getFieldDecorator('data_nascimento', {
              rules: [{ required: true, message: 'Por favor, insira uma data de nascimento!' }],
            })(<Input type="date" name="data_nascimento" placeholder="Data de nascimento do Aluno:" onChange={this.handleAlunoDataNascimento} />)}
          </Form.Item >

          <Form.Item label="Sexo">
            {getFieldDecorator('sexo', {
              rules: [{ required: true, message: 'Por favor, insira um sexo!' }],
            })(<Radio.Group onChange={this.handleUsuarioSexo} value={this.state.sexo}>
              <Radio style={radioStyle} value={"Masculino"}>
                Masculino
              </Radio>
              <Radio style={radioStyle} value={"Feminino"}>
                Feminino
              </Radio>
            </Radio.Group>)
            }</Form.Item >
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
          this.state = { alunos: [], cpf:'',nome:'',telefone:'',data_nascimento:'', sexo:'',visible: false,loading:false}

          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleAlunoNome = this.handleAlunoNome.bind(this)
          this.handleAlunoTelefone = this.handleAlunoTelefone.bind(this)
          this.handleAlunoDataNascimento = this.handleAlunoDataNascimento.bind(this)
          this.handleAlunoSexo = this.handleAlunoSexo.bind(this)
    }

    handleAlunoCpf(e) {
        return this.setState({
            cpf: e.target.value
        })
    }

    handleAlunoNome(e) {
        return this.setState({
            nome: e.target.value
        })
    }

    handleAlunoTelefone(e) {
      return this.setState({
          telefone: e.target.value
      })
    }

    handleAlunoDataNascimento(e) {
      return this.setState({
          data_nascimento: e.target.value
      })
    }

    handleAlunoSexo(e) {
      return this.setState({
          sexo: e.target.value
      })
    }
  
    showModal(aluno){
      this.setState({
        visible: true,
        cpf: aluno.cpf,
        nome: aluno.nome,
        data_nascimento: aluno.data_nascimento,
        telefone: aluno.telefone,
        sexo: aluno.sexo,
      });
    };
    
    handleCancel = () => {
      this.setState({ visible: false });
      this.props.form.resetFields();
    };
  
    componentDidMount() {
          findAll().then(data => this.setState({ alunos: data }))
    }

    handleSubmit = e => {
      this.setState({
        visible: false,
      });
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { nome, telefone,data_nascimento,sexo } = values;
          const { cpf } = this.state;
          update(cpf,nome,telefone,data_nascimento,sexo).then(() => {
            this.props.form.resetFields();
            return findAll().then(data => this.setState({ alunos: data }))
          })
        }
      });
    };
  
    handleDelete(aluno) {
          remove(aluno.cpf).then( () => {
              return findAll().then(data => this.setState({ alunos: data }))
          })
      }
    
    render() {
      let { alunos } = this.state;
      const { visible, loading } = this.state;
      const { getFieldDecorator } = this.props.form;
      return (
        <MainLayout>
            <WrappedApp />
  
            <List
                itemLayout="horizontal"
                dataSource={alunos}
                renderItem={item => (
                    <List.Item
                      actions={[
                        <a key="list-loadmore-edit" onClick={ () => this.showModal(item) }>editar</a>, 
                        <Popconfirm
                          title="Tem certeza que deseja remover o aluno?"
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
                          description={item.cpf}
                      />
                    </List.Item>
                )}
            />
          <Modal visible={visible} title="Editar Aluno" onOk={this.handleSubmit} onCancel={this.handleCancel} footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Cancelar
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
                  Editar
                </Button>,
              ]}
            >
            <Form labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              {/* <Form.Item label="Cpf">
                {getFieldDecorator('cpf', {
                rules: [{ required: true, message: 'Por favor, insira um cpf!' }],
                })(<Input type="text" name="cpf" placeholder="Cpf do Usuario:" value={cpfEdit} />)}
              </Form.Item> */}

              <Form.Item label="Nome">
                  {getFieldDecorator('nome', {
                  rules: [{ required: true, message: 'Por favor, insira um nome!' }],
                  })(<Input type="text" name="nome" placeholder="Nome do Aluno:" value={this.handleAlunoNome} />)}
              </Form.Item >

              <Form.Item label="Telefone">
                  {getFieldDecorator('telefone', {
                  rules: [{ required: true, message: 'Por favor, insira um telefone!' }],
                  })(<Input type="text" name="telefone" placeholder="Telefone do Aluno:" value={this.handleAlunoTelefone}/>)}
              </Form.Item >

              <Form.Item label="Data_nascimento">
                  {getFieldDecorator('data_nascimento', {
                  rules: [{ required: true, message: 'Por favor, insira uma data de nascimento!' }],
                  })(<Input type="date" name="data_nascimento" placeholder="Data de nascimento do Aluno:" value={this.handleAlunoDataNascimento}/>)}
              </Form.Item >

              <Form.Item label="Sexo">
                  {getFieldDecorator('sexo', {
                  rules: [{ required: true, message: 'Por favor, insira um sexo!' }],
                 })(<Input type="text" name="sexo" placeholder="Sexo do Aluno:" value={this.handleAlunoSexo}/>)}
              </Form.Item > 

            </Form>
          </Modal> 
        </MainLayout>
      );
    }
}
  
   const ListaAlunos = Form.create({ name: 'coordinated' })(Lista);
  
   function Alunos() {
      return (
        <ListaAlunos />
      )
  }

  export default Alunos;	