import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Example for Dashboard page

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Example for Dashboard page only */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
