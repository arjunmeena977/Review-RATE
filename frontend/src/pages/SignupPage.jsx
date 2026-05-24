import React from 'react';

const SignupPage = () => {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '500px' }}>
      <div className="card">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="********" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
