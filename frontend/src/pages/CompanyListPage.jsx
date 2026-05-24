import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin } from 'lucide-react';

const CompanyListPage = () => {
  const [companies, setCompanies] = useState([]);
  const [citySearch, setCitySearch] = useState('');
  const [sort, setSort] = useState('Name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []); // Initial load

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`http://localhost:5005/api/companies?search=${citySearch}`);
      let fetched = res.data;
      if (sort === 'Name') {
        fetched = fetched.sort((a, b) => a.companyName.localeCompare(b.companyName));
      }
      setCompanies(fetched);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleFind = () => {
    fetchCompanies();
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="flex items-center gap-4">
          <div>
            <label className="text-gray text-sm" style={{ display: 'block', marginBottom: '4px' }}>Select City</label>
            <div style={{ position: 'relative', width: '300px' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Indore, Madhya Pradesh, India" 
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFind()}
                style={{ paddingRight: '30px' }}
              />
              <MapPin size={18} color="var(--primary)" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
          <div style={{ marginTop: '24px' }}>
            <button className="btn btn-primary" onClick={handleFind}>Find Company</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div style={{ marginTop: '24px' }}>
            <Link to="/add-company" className="btn btn-primary">+ Add Company</Link>
          </div>
          <div>
            <label className="text-gray text-sm" style={{ display: 'block', marginBottom: '4px' }}>Sort:</label>
            <select className="form-control" value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: '150px' }}>
              <option value="Name">Name</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-gray text-sm mb-4">
        Result Found: {companies.length}
      </div>

      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <div>
          {companies.length === 0 ? (
            <p>No companies found. Add one to get started!</p>
          ) : (
            companies.map(company => (
              <div key={company._id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="flex gap-4">
                  {company.logo ? (
                    <img src={company.logo} alt={company.companyName} style={{ width: 80, height: 80, borderRadius: '8px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 80, height: 80, borderRadius: '8px', backgroundColor: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                      {company.companyName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{company.companyName}</h3>
                    <div className="flex items-center text-gray text-sm mb-2">
                      <MapPin size={14} style={{ marginRight: '4px' }} />
                      {company.location} {/* Using location instead of city to match longer text like in screenshot */}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      4.5 
                      <div className="flex" style={{ color: 'var(--warning)', letterSpacing: '2px' }}>
                        ★★★★★
                      </div>
                      <span className="text-gray" style={{ fontWeight: 400 }}>41 Reviews</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div className="text-gray text-sm">
                    Founded on {new Date(company.foundedOn).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}
                  </div>
                  <Link to={`/companies/${company._id}`} className="btn btn-dark">
                    Detail Review
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyListPage;
