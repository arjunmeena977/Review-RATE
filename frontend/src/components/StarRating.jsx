import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating, interactive = false }) => {
  return (
    <div className="flex" style={{ gap: '4px', display: 'flex' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          fill={star <= rating ? "var(--warning)" : "transparent"}
          color={star <= rating ? "var(--warning)" : "var(--border)"}
          style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.2s' }}
          onClick={() => interactive && setRating(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
