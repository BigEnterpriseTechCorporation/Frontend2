import React, { FC, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, Outlet, Route } from 'react-router';
import { UserOutlined, TeamOutlined, CalendarOutlined, FileOutlined } from '@ant-design/icons';

import { VolonteerList } from './Volonteer/VolonteerList'
import { VolonteerBase } from './Volonteer/VolonteerBase';
import { VolonteerCreate } from './Volonteer/VolonteerCreate';
import { VolonteerUpdate } from './Volonteer/VolonteerUpdate';import { VolonteerDelete } from './Volonteer/VolonteerDelete';
import { VolonteerEventRequestList } from './VolonteerEventRequest/VolonteerEventRequestList'
import { VolonteerEventRequestBase } from './VolonteerEventRequest/VolonteerEventRequestBase';
import { VolonteerEventRequestCreate } from './VolonteerEventRequest/VolonteerEventRequestCreate';
import { VolonteerEventRequestUpdate } from './VolonteerEventRequest/VolonteerEventRequestUpdate';import { VolonteerEventRequestDelete } from './VolonteerEventRequest/VolonteerEventRequestDelete';

const { Sider, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

// 8-bit pixel art styles
const pixelArtStyles = {
    panel: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        marginBottom: '16px',
        border: '4px solid #FFFFFF',
        boxShadow: '4px 4px 0 #000',
        imageRendering: 'pixelated' as any,
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
        imageRendering: 'pixelated' as any
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

export const VolonteerAgg: FC = () => {
    const [activeKey, setActiveKey] = useState<string>('volunteer-list');

    return (
        <Layout style={{ 
            minHeight: '100vh',
        
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

export const VolonteerAggRouteList = () => {
    return <>
        <Route key={"Volonteer"} path="Volonteer" element={<VolonteerBase />}>
            <Route key={"List"} path="List" element={<VolonteerList />} />
            <Route key={"ListWithFilter"} path="List/:filterStr" element={<VolonteerList />} />
            <Route key={"Create"} path="Create" element={<VolonteerCreate />} />
            <Route key={"CreateWithFilter"} path="Create/:filterStr" element={<VolonteerCreate />} />
            <Route key={"Update"} path="Update/:volonteerId" element={<VolonteerUpdate />} />            <Route key={"Delete"} path="Delete/:volonteerId" element={<VolonteerDelete />} />
        </Route>
        <Route key={"VolonteerEventRequest"} path="VolonteerEventRequest" element={<VolonteerEventRequestBase />}>
            <Route key={"List"} path="List" element={<VolonteerEventRequestList />} />
            <Route key={"ListWithFilter"} path="List/:filterStr" element={<VolonteerEventRequestList />} />
            <Route key={"Create"} path="Create" element={<VolonteerEventRequestCreate />} />
            <Route key={"CreateWithFilter"} path="Create/:filterStr" element={<VolonteerEventRequestCreate />} />
            <Route key={"Update"} path="Update/:volonteerEventRequestId" element={<VolonteerEventRequestUpdate />} />            <Route key={"Delete"} path="Delete/:volonteerEventRequestId" element={<VolonteerEventRequestDelete />} />
        </Route>
    </>;
}
