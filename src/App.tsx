import React from 'react';
import { Col, Input, Row } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { createUseLocalStorage } from './shared/hooks/useLocalStorage';

let useLocalStorage = createUseLocalStorage('app');

function App() {
  let [value, setValue] = useLocalStorage('value', 'myValue');

  return (
    <div className="App">
      <Row>
        <Col md={4}>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
