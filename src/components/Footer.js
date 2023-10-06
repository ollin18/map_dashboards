import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterDash = () => {
    return (
        <Footer style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '64px',
            backgroundColor: '#003D4C', //'#001529',
            textAlign: 'center'
        }} >
        </Footer>
    );
};

export default FooterDash
