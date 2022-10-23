import React from 'react';
import './css/App.css';
import Stars from './Stars';

function App() {
  return (
    <div>
      <Stars/>
      <Stars count={0}/>
      <Stars count={1}/>
      <Stars count={2}/>
      <Stars count={3}/>
      <Stars count={4}/>
      <Stars count={5}/>
      <Stars count={6}/>
    </div>
  );
}

export default App;
