import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Menu from './components/Menu/Menu';
import HomePage from './pages/HomePage/HomePage';
import DriftPage from './pages/DriftPage/DriftPage';
import TimeAttackPage from './pages/TimeAttackPage/TimeAttackPage';
import ForzaPage from './pages/ForzaPage/ForzaPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Menu />
        <div className="page">
          <Route path="/" exact component={HomePage} />
          <Route path="/drift" component={DriftPage} />
          <Route path="/timeattack" component={TimeAttackPage} />
          <Route path="/forza" component={ForzaPage} />
        </div>
      </div>
    </Router>
  );
}
