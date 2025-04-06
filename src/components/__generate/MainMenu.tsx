import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { Layout, Menu, Typography, Button, Drawer, ConfigProvider } from 'antd';
import { MenuOutlined, HomeOutlined, TeamOutlined, BankOutlined, UserOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import HomePage from '../HomePage.jsx';
import { Home } from '../Home';

import { OrganizationAgg, OrganizationAggRouteList } from './Organization/OrganizationAgg'
import { PersonAgg, PersonAggRouteList } from './Person/PersonAgg'
import { VolonteerAgg, VolonteerAggRouteList } from './Volonteer/VolonteerAgg'

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

// Pixel art theme styles
const pixelArtTheme: CSSProperties = {
  fontFamily: '"Press Start 2P", "VT323", monospace',
  textRendering: 'optimizeSpeed',
  imageRendering: 'pixelated' as any,
  letterSpacing: '1px'
};

const pixelBorder = (color = '#8bac82', size = 4): CSSProperties => ({
  border: `${size}px solid ${color}`,
  boxShadow: `${size}px ${size}px 0 #000`,
  position: 'relative',
  imageRendering: 'pixelated' as any,
  borderRadius: 0
});

// Define menu items for reusability and extensibility
const menuItems = [
  {
    key: 'homepage',
    icon: <HomeOutlined style={{ fontSize: '20px' }} />,
    label: 'Homepage',
    path: '/',
    children: [] // No submenu for homepage
  },
  {
    key: 'OrganizationAgg',
    icon: <BankOutlined style={{ fontSize: '20px' }} />,
    label: 'Organizations',
    path: '/OrganizationAgg',
    children: [
      { key: 'org-list', label: 'View List', path: '/OrganizationAgg' },
      { key: 'org-create', label: 'Create New', path: '/OrganizationAgg/Organization/Create' },
      { key: 'org-reports', label: 'Reports', path: '/OrganizationAgg/reports' },
      { key: 'event', label: 'Event', path: '/OrganizationAgg/Event/List' },
      { key: 'event-create', label: 'New Event', path: '/OrganizationAgg/Event/Create' }
    ]
  },
  {
    key: 'PersonAgg',
    icon: <TeamOutlined style={{ fontSize: '20px' }} />,
    label: 'Persons',
    path: '/PersonAgg',
    children: [
      { key: 'person-list', label: 'View List', path: '/PersonAgg/Person/List' },
      { key: 'person-create', label: 'Add Person', path: '/PersonAgg/Person/Create' },
      { key: 'person-reports', label: 'Reports', path: '/PersonAgg/Reports' }
    ]
  },
  {
    key: 'VolonteerAgg',
    icon: <UserOutlined style={{ fontSize: '20px' }} />,
    label: 'Volunteers',
    path: '/VolonteerAgg',
    children: [
      { key: 'vol-list', label: 'View List', path: '/VolonteerAgg/Volonteer/List' },
      { key: 'vol-create', label: 'Register', path: '/VolonteerAgg/Volonteer/Create' },
      { key: 'vol-events', label: 'Events', path: '/VolonteerAgg/VolonteerEventRequest/List' },
      { key: 'vol-events-create', label: 'New Event', path: '/VolonteerAgg/VolonteerEventRequest/Create' }
    ]
  }
];

export const MainMenu: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('homepage');
  const [isMobile, setIsMobile] = useState(false);
  const primaryColor = '#4B6449'; // Green color theme

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

  // Custom menu item style
  const getMenuItemStyle = (isActive: boolean): CSSProperties => ({
    margin: '12px 0',
    padding: '14px 18px',
    fontSize: '12px',
    fontFamily: '"Press Start 2P", monospace',
    letterSpacing: '0.5px',
    lineHeight: '1.5',
    ...(pixelBorder(isActive ? '#78e08f' : 'transparent', isActive ? 4 : 0)),
    backgroundColor: isActive ? '#2d3c2b' : 'transparent',
    color: isActive ? '#78e08f' : '#fff',
    cursor: 'pointer'
  });

  // Submenu item style
  const getSubMenuItemStyle = (isActive: boolean): CSSProperties => ({
    margin: '6px 0',
    padding: '8px 10px 8px 46px',
    fontSize: '10px',
    fontFamily: '"Press Start 2P", monospace',
    letterSpacing: '0.5px',
    lineHeight: '1.4',
    backgroundColor: isActive ? '#2d3c2b' : 'transparent',
    borderLeft: isActive ? '4px solid #78e08f' : '4px solid transparent',
    color: isActive ? '#78e08f' : '#F0ECDC',
    cursor: 'pointer',
    position: 'relative'
  });

  // Track whether each menu is expanded
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    OrganizationAgg: false,
    PersonAgg: false, 
    VolonteerAgg: false
  });

  // Toggle menu expansion
  const toggleMenuExpansion = (key: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ConfigProvider>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh', backgroundColor: '#2d3c2b', ...(pixelArtTheme as any) }}>
          {/* Mobile drawer for small screens */}
          {isMobile && (
            <>
              <Header style={{ 
                padding: '0 16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                backgroundColor: primaryColor,
                height: '60px',
                ...(pixelBorder('#F0ECDC') as any),
                borderLeft: 'none',
                borderRight: 'none',
                borderTop: 'none',
                boxShadow: '0 4px 0 #000'
              }}>
                <Title level={4} style={{ margin: 0, color: '#F0ECDC', fontFamily: '"Press Start 2P", monospace', fontSize: '16px', textShadow: '2px 2px 0 #000' }}>
                  DASHBOARD 8-BIT
                </Title>
                <Button 
                  type="text" 
                  icon={<MenuOutlined />}
                  onClick={() => setMobileDrawerOpen(true)}
                  style={{ 
                    color: '#F0ECDC',
                    ...(pixelBorder('#78e08f', 3) as any),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 8px',
                    height: '34px'
                  }}
                />
              </Header>
              <Drawer
                title={<span style={{ ...(pixelArtTheme as any), color: '#F0ECDC' }}>MENU</span>}
                placement="left"
                onClose={() => setMobileDrawerOpen(false)}
                visible={mobileDrawerOpen}
                bodyStyle={{ padding: 0, backgroundColor: '#2d3c2b', ...(pixelArtTheme as any) }}
                headerStyle={{ backgroundColor: primaryColor, borderBottom: '4px solid #F0ECDC' }}
                style={{ ...pixelBorder('#F0ECDC') } as any}
              >
                <div style={{ padding: '16px 0' }}>
                  {menuItems.map(item => (
                    <div key={item.key}>
                      <div 
                        style={getMenuItemStyle(activeKey === item.key)}
                        onClick={() => {
                          handleMenuClick(item.key);
                          if (item.children && item.children.length > 0) {
                            toggleMenuExpansion(item.key);
                          }
                        }}
                      >
                        <Link 
                          to={item.path}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px',
                            color: activeKey === item.key ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '12px',
                            lineHeight: '1.5',
                            letterSpacing: '0.5px',
                            width: '100%',
                            justifyContent: 'space-between'
                          }}
                          onClick={(e) => {
                            if (item.children && item.children.length > 0) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                          {item.children && item.children.length > 0 && (
                            <div style={{ fontSize: '10px', marginRight: '8px' }}>
                              {expandedMenus[item.key] ? 
                                <DownOutlined style={{ fontSize: '10px', color: '#78e08f' }} /> : 
                                <RightOutlined style={{ fontSize: '10px' }} />
                              }
                            </div>
                          )}
                        </Link>
                      </div>
                      
                      {/* Render submenu items if this item has children and is expanded */}
                      {item.children && item.children.length > 0 && expandedMenus[item.key] && (
                        <div style={{ marginTop: '4px', marginBottom: '6px' }}>
                          {item.children.map(child => (
                            <div 
                              key={child.key}
                              style={getSubMenuItemStyle(activeKey === child.key)}
                              onClick={() => handleMenuClick(child.key)}
                            >
                              <Link 
                                to={child.path}
                                style={{ 
                                  display: 'block', 
                                  color: activeKey === child.key ? '#78e08f' : '#F0ECDC',
                                  textDecoration: 'none',
                                  fontSize: '10px',
                                  position: 'relative'
                                }}
                              >
                                <span style={{ 
                                  position: 'absolute', 
                                  left: '-16px', 
                                  top: '2px', 
                                  fontSize: '14px',
                                  color: '#78e08f'
                                }}>
                                  •
                                </span>
                                {child.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Drawer>
            </>
          )}

          {/* Sidebar for desktop */}
          {!isMobile && (
            <Sider 
              collapsible 
              collapsed={collapsed} 
              onCollapse={(value) => setCollapsed(value)}
              theme="dark"
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: primaryColor,
                ...(pixelBorder('#F0ECDC') as any),
                borderLeft: 'none',
                borderTop: 'none',
                borderBottom: 'none'
              }}
              width={280}
            >
              <div style={{ 
                height: 64, 
                margin: 16, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderBottom: '2px dashed #F0ECDC'
              }}>
                <Title level={4} style={{ 
                  margin: 0, 
                  display: collapsed ? 'none' : 'block', 
                  color: '#F0ECDC', 
                  fontFamily: '"Press Start 2P", monospace', 
                  fontSize: '16px',
                  textShadow: '2px 2px 0 #000'
                }}>
                  DASHBOARD 8-BIT
                </Title>
                {collapsed && (
                  <div style={{ 
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#F0ECDC',
                    ...(pixelBorder('#78e08f', 2) as any)
                  }}/>
                )}
              </div>
              
              <div style={{ padding: '16px 8px' }}>
                {/* Homepage item */}
                <div key="homepage">
                  <div 
                    style={getMenuItemStyle(activeKey === 'homepage')}
                    onClick={() => handleMenuClick('homepage')}
                  >
                    <Link 
                      to="/"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px',
                        color: activeKey === 'homepage' ? '#78e08f' : '#F0ECDC',
                        textDecoration: 'none',
                        fontSize: '12px',
                        lineHeight: '1.5',
                        letterSpacing: '0.5px',
                        width: '100%',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <HomeOutlined style={{ fontSize: '20px' }} />
                        {!collapsed && <span>Homepage</span>}
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Organization item */}
                <div key="OrganizationAgg">
                  <div 
                    style={getMenuItemStyle(activeKey.startsWith('org-') || activeKey.startsWith('event-'))}
                    onClick={() => {
                      if (expandedMenus['OrganizationAgg']) {
                        // If already expanded, don't do anything on click
                        return;
                      }
                      // If not expanded, expand it
                      toggleMenuExpansion('OrganizationAgg');
                    }}
                  >
                    <Link 
                      to="#"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px',
                        color: activeKey.startsWith('org-') || activeKey.startsWith('event-') ? '#78e08f' : '#F0ECDC',
                        textDecoration: 'none',
                        fontSize: '12px',
                        lineHeight: '1.5',
                        letterSpacing: '0.5px',
                        width: '100%',
                        justifyContent: 'space-between'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <BankOutlined style={{ fontSize: '20px' }} />
                        {!collapsed && <span>Organizations</span>}
                      </div>
                      {!collapsed && (
                        <div style={{ fontSize: '10px', marginRight: '8px' }}>
                          {expandedMenus['OrganizationAgg'] ? 
                            <DownOutlined style={{ fontSize: '10px', color: '#78e08f' }} /> : 
                            <RightOutlined style={{ fontSize: '10px' }} />
                          }
                        </div>
                      )}
                    </Link>
                  </div>
                  
                  {/* Organization subtabs */}
                  {!collapsed && expandedMenus['OrganizationAgg'] && (
                    <div style={{ marginTop: '4px', marginBottom: '6px' }}>
                      {/* View Organization List */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'org-list')}
                        onClick={() => handleMenuClick('org-list')}
                      >
                        <Link 
                          to="/OrganizationAgg/Organization/List"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'org-list' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          View List
                        </Link>
                      </div>
                      
                      {/* Create New Organization */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'org-create')}
                        onClick={() => handleMenuClick('org-create')}
                      >
                        <Link 
                          to="/OrganizationAgg/Organization/Create"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'org-create' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          Create New
                        </Link>
                      </div>
                      
                      {/* Organization Reports */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'org-reports')}
                        onClick={() => handleMenuClick('org-reports')}
                      >
                        <Link 
                          to="/OrganizationAgg/reports"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'org-reports' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          Reports
                        </Link>
                      </div>
                      
                      {/* Event List */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'event-list')}
                        onClick={() => handleMenuClick('event-list')}
                      >
                        <Link 
                          to="/OrganizationAgg/Event/List"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'event-list' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          Events
                        </Link>
                      </div>
                      
                      {/* Create New Event */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'event-create')}
                        onClick={() => handleMenuClick('event-create')}
                      >
                        <Link 
                          to="/OrganizationAgg/Event/Create"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'event-create' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          New Event
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Persons item */}
                <div key="PersonAgg">
                  <div 
                    style={getMenuItemStyle(activeKey.startsWith('person-'))}
                    onClick={() => {
                      if (expandedMenus['PersonAgg']) {
                        return;
                      }
                      toggleMenuExpansion('PersonAgg');
                    }}
                  >
                    <Link 
                      to="#"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px',
                        color: activeKey.startsWith('person-') ? '#78e08f' : '#F0ECDC',
                        textDecoration: 'none',
                        fontSize: '12px',
                        lineHeight: '1.5',
                        letterSpacing: '0.5px',
                        width: '100%',
                        justifyContent: 'space-between'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <TeamOutlined style={{ fontSize: '20px' }} />
                        {!collapsed && <span>Persons</span>}
                      </div>
                      {!collapsed && (
                        <div style={{ fontSize: '10px', marginRight: '8px' }}>
                          {expandedMenus['PersonAgg'] ? 
                            <DownOutlined style={{ fontSize: '10px', color: '#78e08f' }} /> : 
                            <RightOutlined style={{ fontSize: '10px' }} />
                          }
                        </div>
                      )}
                    </Link>
                  </div>
                  
                  {/* Person subtabs */}
                  {!collapsed && expandedMenus['PersonAgg'] && (
                    <div style={{ marginTop: '4px', marginBottom: '6px' }}>
                      {/* View Person List */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'person-list')}
                        onClick={() => handleMenuClick('person-list')}
                      >
                        <Link 
                          to="/PersonAgg/Person/List"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'person-list' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          View List
                        </Link>
                      </div>
                      
                      {/* Add New Person */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'person-create')}
                        onClick={() => handleMenuClick('person-create')}
                      >
                        <Link 
                          to="/PersonAgg/Person/Create"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'person-create' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          Add Person
                        </Link>
                      </div>
                      
                      {/* Person Reports */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'person-reports')}
                        onClick={() => handleMenuClick('person-reports')}
                      >
                        <Link 
                          to="/PersonAgg/Reports"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'person-reports' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          Reports
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Volunteers item */}
                <div key="VolonteerAgg">
                  <div 
                    style={getMenuItemStyle(activeKey.startsWith('vol-'))}
                    onClick={() => {
                      if (expandedMenus['VolonteerAgg']) {
                        return;
                      }
                      toggleMenuExpansion('VolonteerAgg');
                    }}
                  >
                    <Link 
                      to="#"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px',
                        color: activeKey.startsWith('vol-') ? '#78e08f' : '#F0ECDC',
                        textDecoration: 'none',
                        fontSize: '12px',
                        lineHeight: '1.5',
                        letterSpacing: '0.5px',
                        width: '100%',
                        justifyContent: 'space-between'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <UserOutlined style={{ fontSize: '20px' }} />
                        {!collapsed && <span>Volunteers</span>}
                      </div>
                      {!collapsed && (
                        <div style={{ fontSize: '10px', marginRight: '8px' }}>
                          {expandedMenus['VolonteerAgg'] ? 
                            <DownOutlined style={{ fontSize: '10px', color: '#78e08f' }} /> : 
                            <RightOutlined style={{ fontSize: '10px' }} />
                          }
                        </div>
                      )}
                    </Link>
                  </div>
                  
                  {/* Volunteer subtabs */}
                  {!collapsed && expandedMenus['VolonteerAgg'] && (
                    <div style={{ marginTop: '4px', marginBottom: '6px' }}>
                      {/* View Volunteer List */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'vol-list')}
                        onClick={() => handleMenuClick('vol-list')}
                      >
                        <Link 
                          to="/VolonteerAgg/Volonteer/List"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'vol-list' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          View List
                        </Link>
                      </div>
                      
                      {/* Register Volunteer */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'vol-create')}
                        onClick={() => handleMenuClick('vol-create')}
                      >
                        <Link 
                          to="/VolonteerAgg/Volonteer/Create"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'vol-create' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          Register
                        </Link>
                      </div>
                      
                      {/* Volunteer Events */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'vol-events')}
                        onClick={() => handleMenuClick('vol-events')}
                      >
                        <Link 
                          to="/VolonteerAgg/VolonteerEventRequest/List"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'vol-events' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          Events
                        </Link>
                      </div>
                      
                      {/* Create Volunteer Event */}
                      <div 
                        style={getSubMenuItemStyle(activeKey === 'vol-events-create')}
                        onClick={() => handleMenuClick('vol-events-create')}
                      >
                        <Link 
                          to="/VolonteerAgg/VolonteerEventRequest/Create"
                          style={{ 
                            display: 'block', 
                            color: activeKey === 'vol-events-create' ? '#78e08f' : '#F0ECDC',
                            textDecoration: 'none',
                            fontSize: '10px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '2px', 
                            fontSize: '14px',
                            color: '#78e08f'
                          }}>
                            •
                          </span>
                          New Event
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Sider>
          )}

          <Layout style={{ 
            marginLeft: isMobile ? 0 : (collapsed ? 80 : 280),
            background: 'linear-gradient(45deg, #4B6449 25%, #2d3c2b 25%, #2d3c2b 50%, #4B6449 50%, #4B6449 75%, #2d3c2b 75%, #2d3c2b 100%)',
            backgroundSize: '20px 20px',
          }}>
            {!isMobile && (
              <Header style={{ 
                padding: 0, 
                backgroundColor: primaryColor,
                ...(pixelBorder('#F0ECDC') as any),
                borderLeft: 'none',
                borderRight: 'none',
                borderTop: 'none',
                height: '60px',
                boxShadow: '0 4px 0 #000'
              }} />
            )}
            <Content style={{ 
              margin: '24px 16px', 
              padding: 0,
              background: 'transparent',
              minHeight: 280
            }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route key={"OrganizationAgg"} path="/OrganizationAgg" element={<OrganizationAgg />}>
                  {OrganizationAggRouteList()}
                </Route>
                <Route key={"PersonAgg"} path="/PersonAgg" element={<PersonAgg />}>
                  {PersonAggRouteList()}
                </Route>
                <Route key={"VolonteerAgg"} path="/VolonteerAgg" element={<VolonteerAgg />}>
                  {VolonteerAggRouteList()}
                </Route>
                <Route key={"Homepage"} path="/homepage" element={<HomePage />} />
              </Routes>
            </Content>
            <Footer style={{ 
              textAlign: 'center', 
              backgroundColor: primaryColor,
              color: '#78e08f',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '12px',
              ...(pixelBorder('#F0ECDC') as any),
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: 'none',
              marginTop: '20px'
            }}>
              DASHBOARD 8-BIT ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};