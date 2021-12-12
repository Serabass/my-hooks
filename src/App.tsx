import React from 'react';
import J from 'react-json-view';
import { Alert, Col, Row, Spin } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { Ajax } from './shared/components/Ajax';

function App() {
  return (
    <div className="App">
      <Row>
        <Col md={24}>
          <Ajax
            url="https://httpbin.org/get"
            errorNode={(error) => <Alert message={error.message} />}
            loadingNode={() => <Spin />}
          >
            {({ response }) => {
              return <J src={response.data} />;
            }}
          </Ajax>
        </Col>
      </Row>
    </div>
  );
}

export default App;
