import React from 'react';
import heroCar from './hero_car.jpg';
import logo from './carcar_logo.png';

function MainPage() {
  return (
    <>
      {/* Header / Nav (Optional) */}
      <header className="bg-white border-bottom">
        <div className="container d-flex flex-wrap align-items-center justify-content-between py-2">
          {/* Logo */}
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src={logo} alt="CarCar Logo" style={{ height: '50px' }} className="me-2" />
            <span className="fs-4 fw-bold text-primary">CarCar</span>
          </a>
          {/* Nav items */}
          <nav className="nav">
            <a href="#features" className="nav-link px-2 link-secondary">Features</a>
            <a href="#pricing" className="nav-link px-2 link-secondary">Pricing</a>
            <a href="#contact" className="nav-link px-2 link-secondary">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-light py-5">
        <div className="container my-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h1 className="display-4 fw-bold text-primary">CarCar Enterprise</h1>
              <p className="lead mb-4">
                The #1 solution for big-baller automobile dealership management.  
                Streamline inventory, sales, and services – all in one place. 
              </p>
              <a href="#features" className="btn btn-primary btn-lg me-2">Learn More</a>
              <a href="#contact" className="btn btn-outline-primary btn-lg">Get Started</a>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={heroCar}
                alt="Enterprise car hero"
                className="img-fluid rounded"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why CarCar?</h2>
          <p className="text-muted">
            Powerful features and integrations designed for serious dealerships.
          </p>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-sm-6 text-center">
            <i className="bi bi-truck fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">Seamless Inventory</h5>
            <p className="text-muted">
              Track all rides in real time. No more guessin’ what’s on the lot.
            </p>
          </div>
          <div className="col-lg-4 col-sm-6 text-center">
            <i className="bi bi-cash-stack fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">Boost Sales</h5>
            <p className="text-muted">
              Centralize sales data. Close deals fast and keep that paper stack high.
            </p>
          </div>
          <div className="col-lg-4 col-sm-6 text-center">
            <i className="bi bi-tools fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">Service Center</h5>
            <p className="text-muted">
              Easy scheduling and VIP tracking keeps customers coming back.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section (Optional) */}
      <section id="pricing" className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Pricing</h2>
            <p className="text-muted">Flexible plans for dealerships of all sizes.</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-sm-6 text-center">
              <div className="border rounded p-4 h-100">
                <h4 className="fw-bold mb-3">Basic</h4>
                <h2 className="fw-bold">$99/mo</h2>
                <p className="text-muted my-3">
                  Perfect for small or starter dealerships.
                </p>
                <button className="btn btn-outline-primary">Buy Now</button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 text-center">
              <div className="border rounded p-4 h-100">
                <h4 className="fw-bold mb-3">Pro</h4>
                <h2 className="fw-bold">$299/mo</h2>
                <p className="text-muted my-3">
                  Advanced features for growing businesses.
                </p>
                <button className="btn btn-outline-primary">Buy Now</button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 text-center">
              <div className="border rounded p-4 h-100">
                <h4 className="fw-bold mb-3">Enterprise</h4>
                <h2 className="fw-bold">Custom</h2>
                <p className="text-muted my-3">
                  All out. Unlimited rides, advanced support, the works.
                </p>
                <button className="btn btn-outline-primary">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Get in Touch</h2>
          <p className="text-muted">We’d love to hear from you.</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label htmlFor="contactName" className="form-label">Name</label>
                <input type="text" id="contactName" className="form-control" placeholder="Your name" />
              </div>
              <div className="mb-3">
                <label htmlFor="contactEmail" className="form-label">Email</label>
                <input type="email" id="contactEmail" className="form-control" placeholder="Your email" />
              </div>
              <div className="mb-3">
                <label htmlFor="contactMessage" className="form-label">Message</label>
                <textarea id="contactMessage" className="form-control" rows="4" placeholder="How can we help?"></textarea>
              </div>
              <button className="btn btn-primary btn-lg">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-4">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <p className="mb-0">© 2025 CarCar. All rights reserved.</p>
          <nav className="nav">
            <a href="#features" className="nav-link px-2 text-light">Features</a>
            <a href="#pricing" className="nav-link px-2 text-light">Pricing</a>
            <a href="#contact" className="nav-link px-2 text-light">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default MainPage;
