import React from 'react';
import NavBar from '../../components/NavBar';
import FooterDash from '../../components/Footer';
import { Layout } from 'antd';
import Routes from '../../routes/index';

const App = () => {
  return (
    <Layout>
      <NavBar />
      <Routes />
      <FooterDash />
    </Layout>
  );
};

export default App;
