
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './page/Home';
import Shop from './page/Shop';
import Login from './page/Login';
import Admin from './page/Admin';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
