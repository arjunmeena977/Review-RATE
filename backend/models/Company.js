const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  foundedOn: { type: Date, required: true },
  logo: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
