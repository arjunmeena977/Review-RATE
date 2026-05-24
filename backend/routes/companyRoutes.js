const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Add a company
router.post('/', async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    console.error(err.stack);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
});

// Get all companies (with search/filter)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { companyName: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const companies = await Company.find(query).sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single company details
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
