const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Company = require('../models/Company');

// Add a review
router.post('/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const newReview = new Review({ ...req.body, companyId });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get reviews for a company
router.get('/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    const { sort } = req.query; // 'date', 'rating_desc', 'rating_asc'

    let sortOptions = { createdAt: -1 }; // default: newest first
    if (sort === 'rating_desc') sortOptions = { rating: -1, createdAt: -1 };
    if (sort === 'rating_asc') sortOptions = { rating: 1, createdAt: -1 };

    const reviews = await Review.find({ companyId }).sort(sortOptions);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
