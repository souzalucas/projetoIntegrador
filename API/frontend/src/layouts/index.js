import React from 'react';
import ReactDOM from 'react-dom';


import { Layout, Menu, Icon,  Form,
  Input, Tooltip ,Button, } from 'antd';

const { Header, Sider, Content } = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: false,
    confirmDirty: false,
    autoCompleteResult: [],
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Alunos</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="form" />
              <span>Professores</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="team" />
              <span>Turmas</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="thunderbolt" />
              <span>Atividades</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="bank" />
              <span>Areas de Atividades</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="bug" />
              <span>T E S T E</span>

            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <span>Controle do Complexo Esportivo Municipal</span>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;