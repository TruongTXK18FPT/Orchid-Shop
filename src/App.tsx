import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Shop from './page/Shop';
import Order from './page/Order';
import Navbar from './components/Navbar';
import Login from './page/Login';
import Admin from './page/Admin';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
