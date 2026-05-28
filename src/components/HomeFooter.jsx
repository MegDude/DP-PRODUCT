import { Link } from "react-router-dom";

const footerGroups = {
  Residents: [
    { to: "/map?mode=resident&tab=map", label: "Map" },
    { to: "/events", label: "Events" },
    { to: "/card", label: "Perks Card" },
    { to: "/residents", label: "Get Started" },
  ],
  Partners: [
    { to: "/partners/properties", label: "Properties" },
    { to: "/partners/hotels", label: "Hotels" },
    { to: "/partners/venues", label: "Venues" },
    { to: "/partners/brands", label: "Brands" },
    { to: "/partners/civic", label: "Civic" },
  ],
  Directory: [
    { to: "/contact", label: "Contact" },
    { to: "/partners", label: "Partner Mode" },
    { to: "/brands", label: "Brand Directory" },
  ],
};

export default function HomeFooter() {
  return (
    <footer className="bg-[#0B1F33] px-6 py-10 text-[#F7F1E8] lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_2.05fr] lg:gap-12">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#B38F4F] text-lg font-bold leading-none text-[#0B1F33]">
                D
              </div>
              <span className="font-sans text-lg font-bold tracking-tight">
                Downtown Perks
              </span>
            </div>
            <p className="mb-6 max-w-sm text-sm font-light leading-6 text-[#F7F1E8]/70">
              Built for the people who actually live downtown — helping residents find what’s nearby and helping local businesses get noticed.
            </p>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B38F4F]">
              Austin, TX
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {Object.entries(footerGroups).map(([group, links]) => (
              <nav key={group} aria-label={group}>
                <h4 className="mb-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#B38F4F] sm:text-[10px]">
                  {group}
                </h4>
                <ul className="space-y-2.5 text-xs font-light text-[#F7F1E8]/70 sm:text-sm">
                  {links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="transition-colors hover:text-[#F7F1E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {group === "Directory" && (
                    <li className="min-w-0 pt-2">
                      <a
                        href="mailto:partners@downtownperks.com"
                        className="inline-block max-w-full break-all text-[11px] leading-relaxed text-[#B38F4F] transition-colors hover:text-[#F7F1E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F] sm:text-xs"
                      >
                        partners@downtownperks.com
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-6 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#F7F1E8]/40">
          <div>© {new Date().getFullYear()} Downtown Perks · Austin, TX · 78701</div>
          <div className="text-[#B38F4F]">Where downtown meets you.</div>
        </div>
      </div>
    </footer>
  );
}
