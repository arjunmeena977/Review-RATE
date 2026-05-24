import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCompanyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    city: '',
    foundedOn: '',
    logo: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5005/api/companies', formData);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error adding company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card">
        <h1 className="text-2xl mb-4">Add New Company</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input type="text" name="companyName" className="form-control" required value={formData.companyName} onChange={handleChange} />
          </div>
          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">City *</label>
              <input type="text" name="city" className="form-control" required value={formData.city} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Location (State/Country) *</label>
              <input type="text" name="location" className="form-control" required value={formData.location} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Founded On *</label>
            <input type="date" name="foundedOn" className="form-control" required value={formData.foundedOn} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Logo URL (Optional)</label>
            <input type="url" name="logo" className="form-control" placeholder="https://example.com/logo.png" value={formData.logo} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Adding...' : 'Save Company'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyPage;
