import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await api.post('/api/newsletter/subscribe', { email });
      setStatus('success');
      setEmail('');
      setMessage('Successfully subscribed! Welcome to Beta.');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(err.response?.data?.message || 'Subscription failed. Try again.');
    }
  };

  return (
    <footer className="w-full bg-[#E9F4FF] border-t border-[#D0E2F5] pt-14 sm:pt-16 pb-0 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 6-Column Footer Grid aligned to top baseline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 xl:gap-8 items-start mb-12 sm:mb-16">
          
          {/* Column 1: Beta Logo + Social Media */}
          <div className="space-y-4">
            <Link to="/" className="inline-block select-none focus:outline-none">
              <img
                src="/logo.png"
                alt="Beta Softnet"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              One platform for communication, security, and enterprise collaboration.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-1">
              <a
                href="https://www.instagram.com/beta_softnet/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beta on Instagram"
                className="w-8 h-8 rounded-lg bg-white/90 border border-slate-200/90 flex items-center justify-center shadow-xs hover:shadow-sm hover:border-[#004AAD]/40 hover:scale-105 transition-all duration-200 group"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="h-4.5 w-4.5 object-contain group-hover:opacity-90 transition-opacity"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/balajir4619/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beta on LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/90 border border-slate-200/90 flex items-center justify-center shadow-xs hover:shadow-sm hover:border-[#004AAD]/40 hover:scale-105 transition-all duration-200 group"
              >
                <img
                  src="/linkedin.png"
                  alt="LinkedIn"
                  className="h-4.5 w-4.5 object-contain group-hover:opacity-90 transition-opacity"
                />
              </a>
              <a
                href="https://x.com/BETA_SOFTNET"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beta on X"
                className="w-8 h-8 rounded-lg bg-white/90 border border-slate-200/90 flex items-center justify-center shadow-xs hover:shadow-sm hover:border-[#004AAD]/40 hover:scale-105 transition-all duration-200 group"
              >
                <img
                  src="/twitter.png"
                  alt="X"
                  className="h-4.5 w-4.5 object-contain group-hover:opacity-90 transition-opacity"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Products
            </h2>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a
                  href="https://www.bnxmail.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  BNX Mail
                </a>
              </li>
              <li>
                <a
                  href="https://www.b2auth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  B2 Auth Security
                </a>
              </li>
              <li>
                <a
                  href="https://cliks.beta-softnet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Cliks
                </a>
              </li>
              <li>
                <a
                  href="https://www.cliksbusiness.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Cliks Business
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h2>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Business */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Business
            </h2>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Enterprise
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Small Business
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Custom Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-[#004AAD] transition-all duration-200 inline-block hover:translate-x-0.5"
                >
                  Customer Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Sales */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Contact Sales
            </h2>
            <div className="space-y-3.5 text-sm">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Phone:
                </span>
                <a
                  href="tel:+919444369625"
                  className="font-medium text-[#004AAD] hover:text-[#002D7A] transition-colors inline-block"
                >
                  +91 94443 69625
                </a>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Email:
                </span>
                <a
                  href="mailto:betasoftnet2025@gmail.com"
                  className="font-medium text-[#004AAD] hover:text-[#002D7A] transition-colors break-all inline-block"
                >
                  betasoftnet2025@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 6: Stay Updated / Newsletter */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Stay Updated
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Subscribe to get the latest product release notes and corporate insights.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white text-slate-900 placeholder-slate-400 border border-slate-300/80 rounded-xl py-2.5 pl-3.5 pr-11 text-xs focus:outline-none focus:ring-2 focus:ring-[#004AAD]/20 focus:border-[#004AAD] shadow-xs transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                aria-label="Subscribe to newsletter"
                className="absolute right-1.5 top-2.5 bottom-1.5 px-2.5 bg-[#004AAD] hover:bg-[#003882] rounded-lg text-white transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer shadow-xs active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            {status === 'success' && (
              <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center space-x-1.5 text-xs text-rose-600 font-medium">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Footer Row with subtle horizontal divider */}
      <div className="border-t border-[#D0E2F5] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Beta Softnet</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-[#004AAD] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#004AAD] transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-[#004AAD] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
