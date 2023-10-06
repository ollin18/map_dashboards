import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from "react-router-dom";

const { Header } = Layout;
const { SubMenu } = Menu; // Import SubMenu from antd

const NavBar = () => {
    return (
        <Header style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '96px',
            backgroundColor: '#003D4C', //'#001529',
            textAlign: 'center'
        }} >
        </Header>
    );
};

export default NavBar;
