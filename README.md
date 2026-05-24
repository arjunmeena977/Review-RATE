# Review and Rating Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built for the "Review and Rating" assignment. It allows users to browse a list of companies, add new companies, view detailed company profiles, and submit ratings and reviews.

## 🚀 Tech Stack

- **Frontend:** React.js, Vite, React Router DOM, Axios, Lucide React (Icons), Custom Vanilla CSS for premium styling.
- **Backend:** Node.js, Express.js, Mongoose.
- **Database:** MongoDB.

## ✨ Features Implemented

1. **Company Listing:** Browse companies with a premium UI matching the provided Figma design.
2. **Search & Filter:** Find companies by city/location.
3. **Add Company:** A dedicated form to add new company profiles (Name, Location, City, Founded Date, Logo).
4. **Company Details:** View company information and its average rating.
5. **Review System:** Users can submit reviews with a 1-5 star rating system and text feedback.
6. **Review Listing:** Reviews are displayed on the company detail page, with sorting options (Newest First, Highest Rating, Lowest Rating).
7. **Mock Auth:** Setup for Login and Signup UI routing.

---

## 🛠️ Installation & Local Setup

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Running locally or a MongoDB Atlas connection string)

### 1. Clone/Download the Repository
Extract the files into your desired folder.

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Ensure your MongoDB server is running locally on port `27017`.
4. Start the backend server (it will run on `http://localhost:5005`):
   ```bash
   node server.js
   ```

### 3. Frontend Setup
1. Open a **new** terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

---

## 📡 API Endpoints Overview

**Companies:**
- `GET /api/companies` - Fetch all companies (supports `?search=` query).
- `GET /api/companies/:id` - Fetch details for a specific company.
- `POST /api/companies` - Create a new company profile.

**Reviews:**
- `GET /api/reviews/:companyId` - Fetch all reviews for a specific company (supports `?sort=` query).
- `POST /api/reviews/:companyId` - Submit a new review for a company.

## 🎨 Design Notes
The UI has been carefully crafted using Vanilla CSS to mimic the layout, colors, and premium feel of the provided Figma design, including custom gradients, hover animations, and a modern card-based layout.
