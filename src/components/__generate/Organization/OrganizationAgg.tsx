import React, { FC, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, Outlet, Route } from 'react-router';
import { BankOutlined, CalendarOutlined } from '@ant-design/icons';

import { EventList } from './Event/EventList'
import { EventBase } from './Event/EventBase';
import { EventCreate } from './Event/EventCreate';
import { EventUpdate } from './Event/EventUpdate';import { EventDelete } from './Event/EventDelete';
import { OrganizationList } from './Organization/OrganizationList'
import { OrganizationBase } from './Organization/OrganizationBase';
import { OrganizationCreate } from './Organization/OrganizationCreate';
import { OrganizationUpdate } from './Organization/OrganizationUpdate';import { OrganizationDelete } from './Organization/OrganizationDelete';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { SubMenu } = Menu;

// 8-bit pixel art styles
const pixelArtStyles = {
    panel: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        marginBottom: '16px',
        border: '4px solid #FFFFFF',
        boxShadow: '4px 4px 0 #000',
        imageRendering: 'pixelated',
        borderRadius: 0
    },
    header: {
        fontSize: '16px',
        fontFamily: '"Press Start 2P", monospace',
        padding: '12px 16px',
        color: '#000000',
        borderBottom: '4px solid #000000',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        imageRendering: 'pixelated'
    },
    menuItem: {
        margin: 0, 
        padding: '12px 16px', 
        borderBottom: '2px solid #CCCCCC'
    },
    menuLink: {
        color: '#000000', 
        fontFamily: '"Press Start 2P", monospace', 
        fontSize: '12px'
    },
    subMenuItem: {
        padding: '10px 10px 10px 32px',
        margin: 0,
        fontSize: '11px',
        fontFamily: '"Press Start 2P", monospace'
    },
    stripedBackground: {
        background: 'repeating-linear-gradient(45deg, #4B6449, #4B6449 10px, #374b36 10px, #374b36 20px)'
    }
};

export const OrganizationAgg: FC = () => {
    const [activeKey, setActiveKey] = useState<string>('organization-list');

    return (
        <Layout style={{ 
            minHeight: '100vh',
            ...pixelArtStyles.stripedBackground,
            fontFamily: '"Press Start 2P", monospace'
        }}>
            <Content style={{ padding: '16px' }}>
                <div style={{ ...pixelArtStyles.panel, padding: '16px', minHeight: '100%' }}>
                    <Outlet />
                </div>
            </Content>
        </Layout>
    )
}

export const OrganizationAggRouteList = () => {
    return <>
        <Route key={"Event"} path="Event" element={<EventBase />}>
            <Route key={"List"} path="List" element={<EventList />} />
            <Route key={"ListWithFilter"} path="List/:filterStr" element={<EventList />} />
            <Route key={"Create"} path="Create" element={<EventCreate />} />
            <Route key={"CreateWithFilter"} path="Create/:filterStr" element={<EventCreate />} />
            <Route key={"Update"} path="Update/:eventId" element={<EventUpdate />} />            <Route key={"Delete"} path="Delete/:eventId" element={<EventDelete />} />
        </Route>
        <Route key={"Organization"} path="Organization" element={<OrganizationBase />}>
            <Route key={"List"} path="List" element={<OrganizationList />} />
            <Route key={"ListWithFilter"} path="List/:filterStr" element={<OrganizationList />} />
            <Route key={"Create"} path="Create" element={<OrganizationCreate />} />
            <Route key={"CreateWithFilter"} path="Create/:filterStr" element={<OrganizationCreate />} />
            <Route key={"Update"} path="Update/:organizationId" element={<OrganizationUpdate />} />            <Route key={"Delete"} path="Delete/:organizationId" element={<OrganizationDelete />} />
        </Route>
    </>;
}
