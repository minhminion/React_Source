import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './css/mainlayout.css'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import userHandler from '../../modules/user/handlers'
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = (props) => {
  const [colapsed, setColapsed] = useState(true)

  const { children, logoutAccount } = props

  const toggle = () => {
    setColapsed(!colapsed)
  }

  return (
    <Layout style={{height: '100vh'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={broken => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <UserOutlined />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <VideoCameraOutlined />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <UploadOutlined />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4" onClick={logoutAccount}>
            <UserOutlined />
            <span className="nav-text">Log Out</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100vh' }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}


export default connect(
(state) => {
  return {
    user: state.user.user
  }
},
dispatch => ({
  ...userHandler(dispatch)
})
)(withRouter(MainLayout))
