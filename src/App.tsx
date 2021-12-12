import React from 'react';
import J from 'react-json-view';
import { Alert, Col, Row, Spin } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { Ajax } from './shared/components/Ajax';

function App() {
  let args = {
    errorNode: (error: any) => <Alert message={error.message} />,
    loadingNode: () => <Spin />,
  };
  return (
    <Row className="App">
      <Col md={24}>
        <Ajax url="https://httpbin.org/get" {...args}>
          {({ response }) => <J src={response} />}
        </Ajax>
      </Col>
    </Row>
  );
}

export default App;
