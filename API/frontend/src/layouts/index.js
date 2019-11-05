import React from 'react';
import {Link, Nav, withRouter} from 'react-router-dom';



import { Layout, Menu, Icon} from 'antd';

const { Header, Sider, Content } = Layout;

const links = [
  {route: "/", label:"Home", icon:"bug", key:"1"},
  {route: "/alunos", label:"Alunos", icon:"user", key:"2"},
  {route: "/professores", label:"Professores", icon:"form", key:"3"},
  {route: "/turmas", label:"Turmas", icon:"team", key:"4"},
  {route: "/atividades", label:"Atividades", icon:"thunderbolt", key:"5"},
  {route: "/areas", label:"Areas", icon:"bank", key:"6"},
];

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

  renderLink = () => {
    return links.map( link =>
      <Menu.Item key={link.key}>
        <Icon type={link.icon}/>
        <span>{link.label}</span>
        <Link key={link.key} to={link.route}>
        </Link>
      </Menu.Item>
    )
  }

  render() {

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            { this.renderLink() }
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

export default withRouter(MainLayout);