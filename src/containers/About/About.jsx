import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const About = () => (
  <Layout>
    <Content style={{ position: 'fixed', height: '100%', width: '100%', left: 0 }}>
      <div>
        <h1>About Us</h1>
        <p>iammai. Full source code for this project is hosted on <a href={"https://github.com/iammai/react-redux-antd-boilerplate"} target={"_blank"}>github</a></p>
      </div>
    </Content>
  </Layout>
);

export default About;