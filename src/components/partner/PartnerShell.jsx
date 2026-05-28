/**
 * PartnerShell — Wraps all partner pages with unified layout, navigation, and footer
 */
import { Link } from 'react-router-dom';

const PARTNER_NAV = [
  { label: 'Residential', href: '/partners/residential' },
  { label: 'Hospitality', href: '/partners/hotels' },
  { label: 'Venues', href: '/partners/venues' },
  { label: 'Brands', href: '/partners/brands' },
  { label: 'Civic', href: '/partners/civic' },
];

export default function PartnerShell({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-white border-b border-[#0B1F33]/8 flex items-center px-5">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/partners" className="text-[14px] font-bold text-[#0B1F33]">
            Downtown Perks
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {PARTNER_NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[13px] text-[#0B1F33]/58 hover:text-[#0B1F33] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-[68px]">{children}</main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-white py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0B1F33]/12 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_50%_0%,rgba(179,143,79,0.10),transparent_58%)]" />
        <div className="relative mx-auto max-w-7xl px-5">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[#0B1F33]/46">
                Partners
              </h4>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-[13px] md:grid-cols-1">
                {PARTNER_NAV.map((item) => (
                  <Link key={item.href} to={item.href} className="w-fit text-[#0B1F33]/58 transition hover:-translate-y-px hover:text-[#0B1F33]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:border-l md:border-[#0B1F33]/6 md:pl-8">
              <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[#0B1F33]/46">
                Product
              </h4>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-[13px] md:grid-cols-1">
                <Link to="/map?mode=resident&tab=map" className="w-fit text-[#0B1F33]/58 transition hover:-translate-y-px hover:text-[#0B1F33]">Explore</Link>
                <Link to="/events" className="w-fit text-[#0B1F33]/58 transition hover:-translate-y-px hover:text-[#0B1F33]">Events</Link>
                <Link to="/perks" className="w-fit text-[#0B1F33]/58 transition hover:-translate-y-px hover:text-[#0B1F33]">Perks</Link>
                <Link to="/card" className="w-fit text-[#0B1F33]/58 transition hover:-translate-y-px hover:text-[#0B1F33]">Perks Card</Link>
              </div>
            </div>

            <div className="md:border-l md:border-[#0B1F33]/6 md:pl-8">
              <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[#0B1F33]/46">
                Company
              </h4>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-[13px] md:grid-cols-1">
                <Link to="/about" className="w-fit text-[#0B1F33]/58 transition hover:-translate-y-px hover:text-[#0B1F33]">About</Link>
                <Link to="/contact" className="w-fit text-[#0B1F33]/58 transition hover:-translate-y-px hover:text-[#0B1F33]">Contact</Link>
                <span className="text-[#0B1F33]/40">Privacy</span>
                <span className="text-[#0B1F33]/40">Terms</span>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-2 pt-6 text-[12px] text-[#0B1F33]/50 shadow-[inset_0_1px_0_rgba(11,31,51,0.06)] md:flex-row md:items-center md:justify-between">
            <p>&copy; 2026 Downtown Perks. All rights reserved.</p>
            <p className="font-heading italic text-[#0B1F33]/46">Search Less. Spend Less. Do More.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
