import React from 'react';
import J from 'react-json-view';
import { Col, Row, Spin } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { useAjax } from './shared/hooks/useAjax';

function App() {
  let [{ response, loading }] = useAjax<any>({
    url: 'https://httpbin.org/get',
  });

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="App">
      <Row>
        <Col md={12}>
          <J src={response} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
