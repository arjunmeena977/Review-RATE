import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CompanyListPage from './pages/CompanyListPage';
import AddCompanyPage from './pages/AddCompanyPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<CompanyListPage />} />
          <Route path="/add-company" element={<AddCompanyPage />} />
          <Route path="/companies/:id" element={<CompanyDetailPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
