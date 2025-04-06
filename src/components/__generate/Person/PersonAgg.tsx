import React, { FC, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, Outlet, Route } from 'react-router';
import { TeamOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';

import { PersonList } from './Person/PersonList'
import { PersonBase } from './Person/PersonBase';
import { PersonCreate } from './Person/PersonCreate';
import { PersonUpdate } from './Person/PersonUpdate';import { PersonDelete } from './Person/PersonDelete';

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

export const PersonAgg: FC = () => {
    const [activeKey, setActiveKey] = useState<string>('person-list');

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

export const PersonAggRouteList = () => {
    return <>
        <Route key={"Person"} path="Person" element={<PersonBase />}>
            <Route key={"List"} path="List" element={<PersonList />} />
            <Route key={"ListWithFilter"} path="List/:filterStr" element={<PersonList />} />
            <Route key={"Create"} path="Create" element={<PersonCreate />} />
            <Route key={"CreateWithFilter"} path="Create/:filterStr" element={<PersonCreate />} />
            <Route key={"Update"} path="Update/:personId" element={<PersonUpdate />} />            <Route key={"Delete"} path="Delete/:personId" element={<PersonDelete />} />
        </Route>
    </>;
}
