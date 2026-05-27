import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function HomeFooter() {
  const footerGroups = [
    {
      title: "Explore",
      links: [
        { to: "/map?mode=resident&tab=map", label: "Live Map" },
        { to: "/events", label: "Events" },
        { to: "/perks", label: "Perks" },
        { to: "/card", label: "Perks Card" },
        { to: "/about", label: "About" },
      ],
    },
    {
      title: "Partners",
      links: [
        { to: "/partners/properties", label: "Properties" },
        { to: "/partners/hospitality", label: "Hospitality" },
        { to: "/partners/venues", label: "Venues" },
        { to: "/partners/brands", label: "Brands" },
        { to: "/partners/civic", label: "Civic" },
      ],
    },
    {
      title: "Platform",
      links: [
        { to: "/partners", label: "Partner Overview" },
        { to: "/partners/pricing", label: "Pricing" },
        { to: "/partners/dashboard", label: "Dashboard" },
        { to: "/partner-workspace/overview", label: "Workspace" },
        { to: "/brands", label: "Brand Directory" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#0B1F33]/8 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-14">
        <div className="mb-9 flex flex-col gap-6 border-b border-[#0B1F33]/8 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#0B1F33]/10 bg-[#F7F8FB]">
                <MapPin className="h-4 w-4 text-[#B38F4F]" />
              </div>
              <span className="font-heading text-[17px] font-medium text-[#0B1F33]">
                Downtown Perks
              </span>
            </div>
            <p className="max-w-md text-[13px] leading-6 text-[#0B1F33]/58">
              Built for the people who actually live downtown — rewarding residents who chose local and helping local businesses show up in the moments that matter most.
            </p>
          </div>
          <Link
            to="/card"
            className="inline-flex h-10 w-fit items-center justify-center rounded-md bg-[#0B1F33] px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_0_3px_rgba(179,143,79,0.14),0_18px_36px_rgba(11,31,51,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
          >
            Get Your Card
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title} className="rounded-lg border border-[#0B1F33]/8 bg-[#F7F8FB] p-5">
              <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/48">{group.title}</h4>
              <div className="grid gap-2.5">
                {group.links.map((link) => (
                  <Link
                    key={link.to + link.label}
                    to={link.to}
                    className="text-[13px] leading-5 text-[#0B1F33]/62 transition hover:text-[#0B1F33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-[#0B1F33]/8 pt-7 text-left md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] leading-5 text-[#0B1F33]/48">
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
