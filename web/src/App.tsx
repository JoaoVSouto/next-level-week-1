import React from 'react';
import './App.css';

import Header from './components/Header';

export default function App(): JSX.Element {
  return (
    <div className="App">
      <Header title="Hello world" />
      <h1>App content</h1>
    </div>
  );
}
