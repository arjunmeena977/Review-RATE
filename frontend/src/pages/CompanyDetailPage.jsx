import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, Star } from 'lucide-react';
import StarRating from '../components/StarRating';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('date');
  const [loading, setLoading] = useState(true);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    reviewerName: '',
    subject: '',
    reviewText: '',
    rating: 0
  });

  useEffect(() => {
    fetchCompany();
    fetchReviews();
  }, [id, sort]);

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`http://localhost:5005/api/companies/${id}`);
      setCompany(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5005/api/reviews/${id}?sort=${sort}`);
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    try {
      await axios.post(`http://localhost:5005/api/reviews/${id}`, formData);
      setShowReviewForm(false);
      setFormData({ reviewerName: '', subject: '', reviewText: '', rating: 0 });
      fetchReviews(); // Refresh reviews
    } catch (err) {
      console.error(err);
      alert('Error adding review');
    }
  };

  if (loading || !company) return <div>Loading...</div>;

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Company Header */}
      <div className="card mb-4" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {company.logo ? (
          <img src={company.logo} alt={company.companyName} style={{ width: 100, height: 100, borderRadius: '12px', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: 100, height: 100, borderRadius: '12px', backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            {company.companyName.charAt(0)}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h1 className="text-2xl">{company.companyName}</h1>
          <div className="flex gap-4 mt-4 text-gray">
            <div className="flex items-center"><MapPin size={16} className="mr-1" /> {company.city}, {company.location}</div>
            <div className="flex items-center"><Calendar size={16} className="mr-1" /> Founded: {new Date(company.foundedOn).toLocaleDateString()}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--warning)' }}>{averageRating}</div>
          <div className="flex items-center justify-center text-gray">
            <Star size={16} fill="var(--warning)" color="var(--warning)" />
            <span style={{ marginLeft: '4px' }}>({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="page-header">
        <h2 className="text-2xl">Reviews</h2>
        <div className="flex gap-4 items-center">
          <select className="form-control" value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: 'auto', padding: '0.5rem', cursor: 'pointer' }}>
            <option value="date">Newest First</option>
            <option value="rating_desc">Highest Rating</option>
            <option value="rating_asc">Lowest Rating</option>
          </select>
          <button className="btn btn-primary" onClick={() => setShowReviewForm(!showReviewForm)}>
            Add Review
          </button>
        </div>
      </div>

      {/* Add Review Form */}
      {showReviewForm && (
        <div className="card mb-4" style={{ borderTop: '4px solid var(--primary)' }}>
          <h3 className="text-xl mb-4" style={{ fontWeight: 600 }}>Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label className="form-label">Rating</label>
              <StarRating rating={formData.rating} setRating={(val) => setFormData({ ...formData, rating: val })} interactive={true} />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" required value={formData.reviewerName} onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Review Text</label>
              <textarea className="form-control" rows="4" required value={formData.reviewText} onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}></textarea>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">Submit Review</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowReviewForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reviews.length === 0 ? (
          <p className="text-gray">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="card">
              <div className="flex justify-between mb-2">
                <div style={{ fontWeight: 600 }}>{review.reviewerName}</div>
                <div className="text-gray" style={{ fontSize: '0.875rem' }}>{new Date(review.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="mb-2"><StarRating rating={review.rating} interactive={false} /></div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{review.subject}</h4>
              <p className="text-gray">{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyDetailPage;
