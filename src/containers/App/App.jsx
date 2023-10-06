import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Layout } from 'antd';
import Routes from '../../routes/index';

const App = () => {
  return (
    <Layout>
      <NavBar />
      <Routes />
      <Footer />
    </Layout>
  );
};

export default App;
