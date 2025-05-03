
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12 py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-donation-purple">Heart Compass</h3>
            <p className="text-sm text-gray-600">
              A human-centered donation recommendation platform designed to help you discover 
              and support causes that align with your values.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  How Our Recommendations Work
                </Link>
              </li>
              <li>
                <Link to="/transparency" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Transparency Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: info@heartcompass.org
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Heart Compass. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="text-xs text-gray-500 hover:text-gray-700">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
