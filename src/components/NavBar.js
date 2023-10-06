import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from "react-router-dom";

const { Header } = Layout;
const { SubMenu } = Menu;

const NavBarHeader = withRouter((props) => {
    const { location } = props;

    const menuItems = [
        { key: '7', path: '/', label: 'FAQ' },
        { key: '6', path: '/about-us', label: 'About' },
        { key: '5', path: '/stories', label: 'Stories' },
        { key: '4', path: '/research', label: 'Research' },
        { key: '3', path: '/methods', label: 'Methods' },
        { key: '2', path: '/cities', label: 'Cities' },
    ];

    return (
        <Header style={{ lineHeight: '64px', width: '100%', backgroundColor: '#00427D' }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                style={{ lineHeight: '64px', width: '100%', backgroundColor: '#00427D' }}
            >
                <Menu.Item style={{ float: 'left', paddingLeft: '20px' }} className="titleNavbar">BBVA Dashboard</Menu.Item>

                {menuItems.map(item => (
                    <Menu.Item style={{ float: 'right' }} key={item.key}>
                        <Link to={item.path}>{item.label}</Link>
                    </Menu.Item>
                ))}

                <SubMenu style={{ float: 'right' }} title="Maps">
                    <Menu.Item key="1"><Link to="/mapusers">Users</Link></Menu.Item>
                    <Menu.Item key="8"><Link to="/map">Merchants</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </Header>
    );
});

export default NavBarHeader;

