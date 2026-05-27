import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, MapPin, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const RESIDENT_LINKS = [
  { to: "/residents", label: "Resident home", description: "Discovery, perks, events, and local life" },
  { to: "/residents/map", label: "Live map", description: "Open the resident map layer" },
  { to: "/residents/discover", label: "Discover", description: "Find places nearby" },
  { to: "/residents/events", label: "Events", description: "See what is happening downtown" },
  { to: "/residents/perks", label: "Perks", description: "Open the resident pass" },
  { to: "/residents/card", label: "Perks card", description: "Show or manage your card" },
  { to: "/residents/ask", label: "Ask the map", description: "Search by intent or need" },
  { to: "/residents/about", label: "About", description: "How Downtown Perks works" },
];

const PARTNER_LINKS = [
  { to: "/partners", label: "Partner home", description: "Overview for properties, hotels, venues, brands, and civic teams" },
  { to: "/partners/properties", label: "Properties", description: "Residential visibility and building engagement" },
  { to: "/partners/hospitality", label: "Hotels", description: "Guest and resident activation" },
  { to: "/partners/venues", label: "Venues", description: "Local discovery, events, and redemptions" },
  { to: "/partners/brands", label: "Brands", description: "Campaigns and neighborhood placement" },
  { to: "/partners/civic", label: "Civic", description: "District participation and event intelligence" },
  { to: "/partners/dashboard", label: "Dashboard", description: "Operational district intelligence" },
  { to: "/partners/workspace/overview", label: "Workspace", description: "Partner reports, campaigns, and activity" },
  { to: "/partners/map", label: "Partner map", description: "Open the partner intelligence map" },
  { to: "/partners/pricing", label: "Pricing", description: "Partner plans by category" },
];

const FEATURED_LINKS = [
  { to: "/residents/card", label: "Get Your Card" },
  { to: "/partners/dashboard", label: "Dashboard" },
];

const HAMBURGER_RESIDENT_LINKS = [
  { to: "/residents", label: "Resident home" },
  { to: "/residents/map", label: "Live map" },
  { to: "/residents/events", label: "Events" },
  { to: "/residents/perks", label: "Perks" },
  { to: "/residents/card", label: "Perks card" },
  { to: "/residents/about", label: "About" },
];

const HAMBURGER_PARTNER_LINKS = [
  { to: "/partners", label: "Partner home" },
  { to: "/partners/pricing", label: "Pricing" },
  { to: "/partners/properties", label: "Properties" },
  { to: "/partners/hospitality", label: "Hotels" },
  { to: "/partners/venues", label: "Venues" },
  { to: "/partners/brands", label: "Brands" },
  { to: "/partners/civic", label: "Civic" },
  { to: "/partners/dashboard", label: "Dashboard" },
];

function NavLinkItem({ link, className, onClick, children }) {
  const isHashLink = link.to.includes("#");

  if (isHashLink) {
    return (
      <a href={link.to} onClick={onClick} className={className}>
        {children || link.label}
      </a>
    );
  }

  return (
    <Link to={link.to} onClick={onClick} className={className}>
      {children || link.label}
    </Link>
  );
}

function DropdownGroup({ id, label, links, openMenu, setOpenMenu, isActiveGroup }) {
  const isOpen = openMenu === id;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpenMenu(isOpen ? null : id)}
        aria-expanded={isOpen}
        aria-controls={`${id}-navigation`}
        className={`inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F] ${
          isActiveGroup
            ? "bg-[#0B1F33] text-white shadow-[0_10px_28px_rgba(11,31,51,0.14)]"
            : "text-[#0B1F33]/68 hover:bg-white hover:text-[#0B1F33]"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`${id}-navigation`}
            initial={{ opacity: 0, y: 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-11 w-[340px] overflow-hidden rounded-lg border border-[#0B1F33]/12 bg-white p-2 shadow-[0_22px_70px_rgba(11,31,51,0.16)] [backdrop-filter:none] [-webkit-backdrop-filter:none]"
          >
            <div className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/45">
              {label} paths
            </div>
            <div className="grid max-h-[min(62vh,460px)] gap-1 overflow-y-auto pr-1">
              {links.map((link) => (
                <NavLinkItem
                  key={link.to}
                  link={link}
                  onClick={() => setOpenMenu(null)}
                  className="group rounded-md border border-transparent px-3 py-2.5 text-left transition-all hover:border-[#0B1F33]/8 hover:bg-[#F7F8FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                >
                  <span className="block text-[13px] font-semibold text-[#0B1F33]">{link.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-4 text-[#0B1F33]/58">{link.description}</span>
                </NavLinkItem>
              ))}
              <button
                type="button"
                onClick={() => setOpenMenu(null)}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-[#0B1F33]/8 bg-[#F7F8FB] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33]/62 transition hover:border-[#B38F4F]/45 hover:text-[#0B1F33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
              >
                <ChevronUp className="h-3.5 w-3.5" />
                Roll up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setOpenMenu(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!openMenu) return undefined;

    const onPointerDown = (event) => {
      if (!event.target.closest("[data-dp-nav-root]")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  const isActive = (to) => {
    if (!to) return false;
    if (to === "/partners/dashboard") return location.pathname === "/partners/dashboard";
    if (to === "/residents/card") return location.pathname === "/card" || location.pathname === "/residents/card";
    return location.pathname === to;
  };

  const residentActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/residents") ||
    location.pathname === "/explore" ||
    location.pathname === "/events" ||
    location.pathname === "/card" ||
    location.pathname === "/ask-map" ||
    location.pathname === "/about" ||
    (location.pathname === "/map" && !location.search.includes("mode=partner"));

  const partnerActive =
    location.pathname.startsWith("/partners") ||
    location.pathname.startsWith("/partner-workspace") ||
    location.pathname.startsWith("/brands") ||
    location.pathname === "/reports" ||
    location.pathname === "/dashboard/partner" ||
    location.pathname === "/partner-dashboard" ||
    (location.pathname === "/map" && location.search.includes("mode=partner"));

  return (
    <nav
      data-dp-nav-root
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#0B1F33]/8 bg-white shadow-[0_12px_36px_rgba(11,31,51,0.08)]"
          : "border-b border-[#0B1F33]/6 bg-white"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Downtown Perks home">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#0B1F33]/12 bg-white shadow-[0_8px_22px_rgba(11,31,51,0.08)]">
            <MapPin className="h-3.5 w-3.5 text-[#B38F4F]" />
          </div>
          <span className="font-heading text-[15px] font-medium tracking-normal text-[#0B1F33]">
            Downtown Perks
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <DropdownGroup
            id="residents"
            label="Residents"
            links={RESIDENT_LINKS}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            isActiveGroup={residentActive}
          />
          <DropdownGroup
            id="partners"
            label="Partners"
            links={PARTNER_LINKS}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            isActiveGroup={partnerActive}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 lg:flex">
            {FEATURED_LINKS.map((link) => (
              <NavLinkItem
                key={link.to}
                link={link}
                className={`inline-flex h-9 items-center justify-center rounded-md px-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F] ${
                  isActive(link.to)
                    ? "bg-[#0B1F33] text-white"
                    : "border border-[#0B1F33]/10 bg-white text-[#0B1F33]/70 hover:border-[#B38F4F]/45 hover:text-[#0B1F33]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#0B1F33]/10 bg-white text-[#0B1F33]/78 shadow-[0_8px_24px_rgba(11,31,51,0.08)] transition-all hover:border-[#B38F4F]/45 hover:text-[#0B1F33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[68px] border-b border-[#0B1F33]/10 bg-white shadow-[0_24px_80px_rgba(11,31,51,0.14)] [backdrop-filter:none] [-webkit-backdrop-filter:none]"
          >
            <div className="mx-auto grid max-h-[calc(100vh-68px)] max-w-5xl gap-3 overflow-y-auto px-5 py-4 md:grid-cols-2">
              <NavSection
                eyebrow="Residents"
                title="Live downtown"
                cta={{ to: "/residents/map", label: "Open map" }}
                links={HAMBURGER_RESIDENT_LINKS}
                close={() => setOpen(false)}
              />
              <NavSection
                eyebrow="Partners"
                title="Work with Downtown Perks"
                cta={{ to: "/partners/pricing", label: "Pricing" }}
                links={HAMBURGER_PARTNER_LINKS}
                close={() => setOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}

function NavSection({ eyebrow, title, cta, links, close }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#0B1F33]/10 bg-white [backdrop-filter:none] [-webkit-backdrop-filter:none]">
      <div className="flex items-center justify-between gap-3 border-b border-[#0B1F33]/8 bg-[#0B1F33] px-4 py-3 text-white">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52">{eyebrow}</div>
          <div className="mt-0.5 text-[13px] font-semibold text-white">{title}</div>
        </div>
        <NavLinkItem
          link={cta}
          onClick={close}
          className="inline-flex h-8 items-center justify-center rounded-md border border-[#B38F4F]/45 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33] transition hover:border-[#B38F4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
        />
      </div>
      <div className="grid gap-0 p-2">
        {links.map((link) => (
          <NavLinkItem
            key={link.to}
            link={link}
            onClick={close}
            className="flex items-center justify-between rounded-md border border-transparent px-3 py-2.5 text-[13px] font-semibold text-[#0B1F33] transition-all hover:border-[#B38F4F]/35 hover:bg-[#F7F8FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
          >
            <span>{link.label}</span>
            <span className="text-[#B38F4F]">→</span>
          </NavLinkItem>
        ))}
      </div>
    </div>
  );
}
