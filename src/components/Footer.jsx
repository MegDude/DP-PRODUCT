import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const FOOTER_LINKS = {
  Explore: [
    { to: "/map?mode=resident&tab=map", label: "Live Map" },
    { to: "/events", label: "Events" },
    { to: "/perks", label: "Perks" },
    { to: "/card", label: "Perks Card" },
    { to: "/about", label: "About" },
  ],
  Partners: [
    { to: "/partners/properties", label: "Properties" },
    { to: "/partners/hospitality", label: "Hospitality" },
    { to: "/partners/venues", label: "Venues" },
    { to: "/partners/brands", label: "Brands" },
    { to: "/partners/civic", label: "Civic" },
  ],
  Platform: [
    { to: "/partners", label: "Partner Overview" },
    { to: "/partner-workspace/overview", label: "Partner Workspace" },
    { to: "/partners/dashboard", label: "Dashboard" },
    { to: "/partners#pricing", label: "Pricing" },
    { to: "/brands", label: "Brand Directory" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#0B1F33]/8 bg-[#F7F8FB]">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,1.1fr)_minmax(0,1.9fr)] lg:gap-16">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#0B1F33]/10 bg-white shadow-[0_12px_30px_rgba(11,31,51,0.06)]">
                <MapPin className="h-4 w-4 text-[#B38F4F]" />
              </div>
              <span className="font-heading text-[18px] font-medium text-[#0B1F33]">
                Downtown Perks
              </span>
            </div>
            <p className="max-w-md text-[14px] leading-7 text-[#0B1F33]/62">
              Built for the people who actually live downtown — rewarding residents who chose local and helping local businesses show up in the moments that matter most.
            </p>
            <Link
              to="/card"
              className="mt-7 inline-flex h-10 items-center justify-center rounded-md bg-[#0B1F33] px-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_14px_34px_rgba(11,31,51,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_3px_rgba(179,143,79,0.14),0_18px_36px_rgba(11,31,51,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
            >
              Get Your Card
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div
                key={group}
                className="rounded-lg border border-[#0B1F33]/8 bg-white/72 p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)]"
              >
                <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/48">
                  {group}
                </h4>
                <div className="grid gap-3.5">
                  {links.map((link) => (
                    <Link
                      key={link.to + link.label}
                      to={link.to}
                      className="text-[13px] leading-5 text-[#0B1F33]/64 transition-colors hover:text-[#0B1F33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#0B1F33]/8 pt-7 text-left md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] leading-5 text-[#0B1F33]/50">
            © {new Date().getFullYear()} Downtown Perks · Austin, TX · 78701
          </p>
          <p className="font-heading text-[13px] italic leading-5 text-[#0B1F33]/46">
            Search Less. Spend Less. Do More.
          </p>
        </div>
      </div>
    </footer>
  );
}
