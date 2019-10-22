
import React from 'react';
import "./areaAtividades.css";
import { Select, Form, Input, Button, Modal, List, Avatar} from 'antd';

import MainLayout from '../layouts';

const data = [
    {
      title: 'LOCAL 1',
    },
    {
      title: 'LOCAL 2',
    },
    {
      title: 'LOCAL 3',
    },
    {
      title: 'LOCAL 4',
    },
  ];

const { TextArea } = Input;

class AppMod extends React.Component {
    state = { visible: false };
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>
            Cadastrar
          </Button>
          <Modal
            title="Cadastrar Local"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <WrappedApp />
           
          </Modal>
        </div>
      );
    }
  }

const { Option } = Select;

class App extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Descrição">
          {getFieldDecorator('descrição', {
            rules: [{ required: true, message: 'Por favor, insira uma descrição!' }],
          })(<TextArea rows={4}/>)}
        </Form.Item >
        
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App);

function oi() {
    return (
        <MainLayout>
            <h1>Areas de Atividades</h1>

            <WrappedApp />

            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://cdn0.iconfinder.com/data/icons/travel-glyph-4/32/google_direction_locate-512.png" />}
                        title={<a>{item.title}</a>}
                        description="Universidade Tecnologica Federal do Parana"
                 />
            </List.Item>
      )}
    />

        </MainLayout>
    );
}
export default oi;  