import React, { FC, useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Drawer, ConfigProvider } from 'antd';
import { MenuOutlined, HomeOutlined, TeamOutlined, BankOutlined, UserOutlined } from '@ant-design/icons';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { Home } from '../Home';

import { OrganizationAgg, OrganizationAggRouteList } from './Organization/OrganizationAgg'
import { PersonAgg, PersonAggRouteList } from './Person/PersonAgg'
import { VolonteerAgg, VolonteerAggRouteList } from './Volonteer/VolonteerAgg'

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

// Define menu items for reusability and extensibility
const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
    path: '/'
  },
  {
    key: 'OrganizationAgg',
    icon: <BankOutlined />,
    label: 'Organizations',
    path: '/OrganizationAgg'
  },
  {
    key: 'PersonAgg',
    icon: <TeamOutlined />,
    label: 'Persons',
    path: '/PersonAgg'
  },
  {
    key: 'VolonteerAgg',
    icon: <UserOutlined />,
    label: 'Volunteers',
    path: '/VolonteerAgg'
  }
];

export const MainMenu: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const primaryColor = '#1890ff'; // Default antd primary color

  // Function to handle menu item click
  const handleMenuClick = (key: string) => {
    setActiveKey(key);
    setMobileDrawerOpen(false);
  };

  // Handle responsive layout
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <ConfigProvider>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          {/* Mobile drawer for small screens */}
          {isMobile && (
            <>
              <Header style={{ 
                padding: '0 16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                backgroundColor: primaryColor 
              }}>
                <Title level={4} style={{ margin: 0, color: 'white' }}>Dashboard</Title>
                <Button 
                  type="text" 
                  icon={<MenuOutlined />}
                  onClick={() => setMobileDrawerOpen(true)}
                  style={{ color: 'white' }}
                />
              </Header>
              <Drawer
                title="Menu"
                placement="left"
                onClose={() => setMobileDrawerOpen(false)}
                visible={mobileDrawerOpen}
                bodyStyle={{ padding: 0 }}
              >
                <Menu
                  theme="light"
                  mode="inline"
                  selectedKeys={[activeKey]}
                >
                  {menuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
                      <Link to={item.path}>{item.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu>
              </Drawer>
            </>
          )}

          {/* Sidebar for desktop */}
          {!isMobile && (
            <Sider 
              collapsible 
              collapsed={collapsed} 
              onCollapse={(value) => setCollapsed(value)}
              theme="light"
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div style={{ 
                height: 64, 
                margin: 16, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <Title level={4} style={{ margin: 0, display: collapsed ? 'none' : 'block' }}>Dashboard</Title>
              </div>
              <Menu
                theme="light"
                mode="inline"
                selectedKeys={[activeKey]}
              >
                {menuItems.map(item => (
                  <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
          )}

          <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 200) }}>
            {!isMobile && (
              <Header style={{ padding: 0, background: '#fff' }} />
            )}
            <Content style={{ 
              margin: '24px 16px', 
              padding: 24, 
              background: '#fff',
              borderRadius: 8,
              minHeight: 280
            }}>
              <Routes>
                <Route key={"Home"} path="/" element={<Home />}>
                  <Route key={"OrganizationAgg"} path="OrganizationAgg" element={<OrganizationAgg />}>
                    {OrganizationAggRouteList()}
                  </Route>
                  <Route key={"PersonAgg"} path="PersonAgg" element={<PersonAgg />}>
                    {PersonAggRouteList()}
                  </Route>
                  <Route key={"VolonteerAgg"} path="VolonteerAgg" element={<VolonteerAgg />}>
                    {VolonteerAggRouteList()}
                  </Route>
                </Route>
              </Routes>
            </Content>
            <Footer style={{ textAlign: 'center', background: '#fff' }}>
              Dashboard ©{new Date().getFullYear()} Created with Ant Design
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};