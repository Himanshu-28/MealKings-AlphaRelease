import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Footer.css";  // Importing custom CSS

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-white">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="footer-link">About Us</a></li>
              <li><a href="#!" className="footer-link">Careers</a></li>
              <li><a href="#!" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-white">Help</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="footer-link">Support</a></li>
              <li><a href="#!" className="footer-link">FAQs</a></li>
              <li><a href="#!" className="footer-link">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-white">Social Media</h5>
            <a href="#!" className="footer-link"><i className="fab fa-facebook-f me-3"></i></a>
            <a href="#!" className="footer-link"><i className="fab fa-twitter me-3"></i></a>
            <a href="#!" className="footer-link"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <p className="text-white-50 mt-4">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
