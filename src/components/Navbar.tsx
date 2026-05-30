import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-200 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-semibold text-brand-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-900 text-white shadow-panel">
            LEW
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Laxmi Engineering Works</p>
            <span className="text-xl font-semibold">Hydraulic Pipe & Fittings</span>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-200 sm:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
          Menu
        </button>

        <nav className={`hidden items-center gap-8 sm:flex`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-brand-900' : 'text-brand-600 hover:text-brand-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-900/10 transition hover:bg-brand-800"
          >
            <Phone size={16} /> Contact
          </Link>
        </nav>
      </div>

      {open ? (
        <div className="border-t border-brand-200 bg-white/98 px-4 py-5 sm:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-brand-100 text-brand-900' : 'text-brand-600 hover:bg-brand-50 hover:text-brand-900'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
