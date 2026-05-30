import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-brand-200 bg-white py-12 text-brand-700">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Laxmi Engineering Works</p>
          <p className="max-w-sm text-sm leading-6">
            Supplying hydraulic pipes and fittings from Vapi, Gujarat for durable industrial systems.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Quick links</h3>
          <ul className="space-y-3 text-sm text-brand-600">
            <li><Link className="hover:text-brand-900" to="/">Home</Link></li>
            <li><Link className="hover:text-brand-900" to="/products">Products</Link></li>
            <li><Link className="hover:text-brand-900" to="/about">About</Link></li>
            <li><Link className="hover:text-brand-900" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-4 text-sm text-brand-600">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Contact</h3>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 text-brand-500" />
            <p>Vapi, Gujarat, India</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-brand-500" />
            <a className="hover:text-brand-900" href="tel:+910000000000">+91 9510916203, +91 8511906201</a>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-brand-500" />
            <a className="hover:text-brand-900" href="mailto:info@laxmiengineeringworks.com">laxmiengineeringworks.vapi@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
