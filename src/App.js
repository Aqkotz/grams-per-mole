import React from 'react';
import { Calculator } from './features/calculator/Calculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <div
        className='header'
      >
          GramsPerMole.com
      </div>
      <Calculator/>
    </div>
  );
}

export default App;
