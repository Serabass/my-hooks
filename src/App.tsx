import React from 'react';
import J from 'react-json-view';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { Ajax } from './shared/components/Ajax';

function App() {
  return (
    <div className="App">
      <Row>
        <Col md={12}>
          <Ajax url="https://httpbin.org/get">{({ response }) => <J src={response} />}</Ajax>
        </Col>
      </Row>
    </div>
  );
}

export default App;
