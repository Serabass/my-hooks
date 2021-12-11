import React from 'react';
import { Col, InputNumber, Row } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { useAjax } from './shared/hooks/useAjax';

function App() {
  let a = useAjax({
    url: 'https://httpbin.org/get',
  });

  return (
    <div className="App">
      <Row>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}

export default App;
