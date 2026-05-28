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
    <footer className="relative overflow-hidden bg-[#F7F8FB]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0B1F33]/12 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_50%_0%,rgba(179,143,79,0.12),transparent_58%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.15fr_0.8fr] lg:gap-12">
          <div className="lg:max-w-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/80 shadow-[inset_0_0_0_1px_rgba(11,31,51,0.05),0_12px_30px_rgba(11,31,51,0.06),0_0_24px_rgba(179,143,79,0.10)]">
                <MapPin className="h-4 w-4 text-[#B38F4F]" />
              </div>
              <span className="font-heading text-[18px] font-medium text-[#0B1F33]">
                Downtown Perks
              </span>
            </div>
            <p className="max-w-md text-[13px] leading-6 text-[#0B1F33]/62">
              Built for the people who actually live downtown — rewarding residents who chose local and helping local businesses show up in the moments that matter most.
            </p>
            <Link
              to="/card"
              className="mt-5 inline-flex h-9 items-center justify-center rounded-md bg-[#0B1F33] px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(11,31,51,0.12),0_0_26px_rgba(179,143,79,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(11,31,51,0.16),0_0_30px_rgba(179,143,79,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
            >
              Get Your Card
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:border-l lg:border-[#0B1F33]/6 lg:pl-8">
            {["Explore", "Partners"].map((group) => (
              <nav key={group} aria-label={group}>
                <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/46">
                  {group}
                </h4>
                <div className="grid gap-2.5">
                  {FOOTER_LINKS[group].map((link) => (
                    <Link
                      key={link.to + link.label}
                      to={link.to}
                      className="w-fit text-[13px] leading-5 text-[#0B1F33]/62 transition hover:-translate-y-px hover:text-[#0B1F33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
            ))}
          </div>

          <nav aria-label="Platform" className="lg:border-l lg:border-[#0B1F33]/6 lg:pl-8">
              <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/46">
                Platform
              </h4>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-1">
                {FOOTER_LINKS.Platform.map((link) => (
                  <Link
                    key={link.to + link.label}
                    to={link.to}
                    className="w-fit text-[13px] leading-5 text-[#0B1F33]/62 transition hover:-translate-y-px hover:text-[#0B1F33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 pt-6 text-left shadow-[inset_0_1px_0_rgba(11,31,51,0.06)] md:flex-row md:items-center md:justify-between">
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
