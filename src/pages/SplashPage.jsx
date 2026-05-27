import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CreditCard,
  MapPin,
  Navigation,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const VIDEO_SRC = "/videos/downtown-austin-drone-cinematic.mp4";

const audienceCards = [
  {
    label: "Residents",
    eyebrow: "Live downtown",
    title: "Find what is useful nearby.",
    body: "Open the resident map for places, perks, events, the card, and walkable decisions without another app.",
    href: "/residents",
    action: "Enter resident view",
    icon: CreditCard,
  },
  {
    label: "Partners",
    eyebrow: "Activate downtown",
    title: "Show up when decisions happen.",
    body: "Use map visibility, QR entry, surveys, campaigns, and district intelligence for properties, hotels, venues, brands, and civic teams.",
    href: "/partners",
    action: "Enter partner view",
    icon: Building2,
  },
];

const signalPoints = [
  { label: "Resident access", value: "Card + map" },
  { label: "Partner layer", value: "QR + survey" },
  { label: "District context", value: "Live nearby" },
];

export default function SplashPage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F8FB] pt-[68px] text-[#0B1F33]">
      <AnimatePresence>
        {showIntro && (
          <motion.section
            className="fixed inset-0 z-[900] bg-[#0B1F33] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Downtown Perks opening animation"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setShowIntro(false)}
            />
            <div className="absolute inset-0 bg-[#0B1F33]/42" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,31,51,0.86),rgba(11,31,51,0.18)_48%,rgba(11,31,51,0.62))]" />

            <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 md:left-6 md:right-6">
              <button
                type="button"
                onClick={() => setShowIntro(false)}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-white/18 bg-white/12 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                aria-label="Back to audience gateway"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[#B38F4F]" />
                Back
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowIntro(false)}
                  className="inline-flex h-9 items-center rounded-md border border-white/18 bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition hover:border-[#B38F4F]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={() => setShowIntro(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/18 bg-white/12 text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                  aria-label="Close animation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 px-5 pb-8 md:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-6xl"
              >
                <div className="inline-flex items-center gap-2 rounded-md border border-white/18 bg-white/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78 shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[#B38F4F]" />
                  Downtown Perks
                </div>
                <h1 className="mt-5 max-w-4xl font-heading text-[42px] font-medium leading-[0.98] md:text-[72px]">
                  Where Downtown Meets You
                </h1>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/72">
                  Built for the people who actually live downtown — and the businesses that keep it interesting.
                </p>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="relative min-h-[calc(100vh-68px)] border-b border-[#0B1F33]/8 px-5 py-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <video className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" src={VIDEO_SRC} autoPlay muted loop playsInline preload="metadata" />
          <div className="absolute inset-0 bg-[#F7F8FB]/82" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(247,248,251,0.94),rgba(247,248,251,0.66),rgba(247,248,251,0.96))]" />
          <div className="absolute left-1/2 top-12 h-[520px] w-[820px] -translate-x-1/2 rounded-[18px] border border-[#0B1F33]/8 bg-white/44 shadow-[0_34px_120px_rgba(11,31,51,0.10)]" />
          <div className="absolute left-[8%] top-[22%] h-px w-[84%] bg-[#0B1F33]/8" />
          <div className="absolute left-[14%] top-[46%] h-px w-[72%] bg-[#0B1F33]/8" />
          <div className="absolute left-[28%] top-[8%] h-[74%] w-px bg-[#0B1F33]/8" />
          <div className="absolute left-[62%] top-[5%] h-[82%] w-px bg-[#0B1F33]/8" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-180px)] max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-md border border-[#0B1F33]/8 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B1F33]/58 shadow-[0_12px_34px_rgba(11,31,51,0.08)]">
              <Sparkles className="h-3.5 w-3.5 text-[#B38F4F]" />
              Audience gateway
            </div>

            <h1 className="mt-6 max-w-3xl font-heading text-[42px] font-medium leading-[0.98] md:text-[72px]">
              Pick your experience.
            </h1>
            <p className="mt-5 max-w-2xl font-heading text-2xl italic leading-tight text-[#0B1F33] md:text-3xl">
              One downtown layer. Two useful paths.
            </p>
            <p className="mt-5 max-w-xl text-[14px] leading-7 text-[#0B1F33]/64">
              Residents use Downtown Perks to decide what to do nearby. Partners use it to understand where and when to participate.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/residents"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#0B1F33] px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(11,31,51,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_3px_rgba(179,143,79,0.16),0_18px_36px_rgba(11,31,51,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
              >
                Start as resident
                <ArrowRight className="ml-2 h-4 w-4 text-[#B38F4F]" />
              </Link>
              <Link
                to="/partners"
                className="inline-flex h-10 items-center justify-center rounded-md border border-[#0B1F33]/10 bg-white px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33] shadow-[0_12px_30px_rgba(11,31,51,0.08)] transition hover:-translate-y-0.5 hover:border-[#B38F4F]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
              >
                Start as partner
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-[#0B1F33]/8 bg-white p-3 shadow-[0_28px_90px_rgba(11,31,51,0.14)]"
          >
            <div className="rounded-md border border-[#0B1F33]/8 bg-[#F7F8FB] p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B1F33]/48">Choose path</div>
                  <div className="mt-1 text-[13px] font-semibold text-[#0B1F33]">Resident or partner</div>
                </div>
                <Link
                  to="/map?mode=resident&tab=map"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0B1F33] px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:shadow-[0_0_0_3px_rgba(179,143,79,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                >
                  Open map
                </Link>
              </div>

              <div className="relative min-h-[260px] overflow-hidden rounded-md border border-[#0B1F33]/8 bg-white">
                <div className="absolute inset-0">
                  <div className="absolute left-0 top-[24%] h-px w-full bg-[#0B1F33]/8" />
                  <div className="absolute left-0 top-[54%] h-px w-full bg-[#0B1F33]/8" />
                  <div className="absolute left-[24%] top-0 h-full w-px bg-[#0B1F33]/8" />
                  <div className="absolute left-[56%] top-0 h-full w-px bg-[#0B1F33]/8" />
                  <div className="absolute left-[78%] top-0 h-full w-px bg-[#0B1F33]/8" />
                </div>

                <MapNode className="left-[18%] top-[34%]" icon={CreditCard} label="Resident card" />
                <MapNode className="left-[54%] top-[22%]" icon={MapPin} label="Perks nearby" selected />
                <MapNode className="left-[68%] top-[62%]" icon={Building2} label="Partner signal" />
                <MapNode className="left-[36%] top-[70%]" icon={Navigation} label="Walkable route" />
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {signalPoints.map((point) => (
                  <div key={point.label} className="rounded-md border border-[#0B1F33]/8 bg-white p-3">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/45">{point.label}</div>
                    <div className="mt-1 text-[13px] font-semibold text-[#0B1F33]">{point.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2">
          {audienceCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.href}
                className="group rounded-lg border border-[#0B1F33]/8 bg-white p-5 shadow-[0_18px_50px_rgba(11,31,51,0.08)] transition hover:-translate-y-1 hover:border-[#B38F4F]/45 hover:shadow-[0_0_0_3px_rgba(179,143,79,0.10),0_24px_62px_rgba(11,31,51,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#0B1F33]/8 bg-[#F7F8FB] text-[#B38F4F]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#0B1F33]/34 transition group-hover:translate-x-1 group-hover:text-[#B38F4F]" />
                </div>
                <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B1F33]/48">{card.eyebrow}</div>
                <h2 className="mt-2 font-heading text-3xl font-medium text-[#0B1F33]">{card.title}</h2>
                <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#0B1F33]/62">{card.body}</p>
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]">{card.action}</div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function MapNode({ className, icon: Icon, label, selected = false }) {
  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md border px-2.5 py-2 shadow-[0_14px_34px_rgba(11,31,51,0.14)] ${className} ${
        selected
          ? "border-[#B38F4F]/70 bg-[#0B1F33] text-white"
          : "border-[#0B1F33]/8 bg-white text-[#0B1F33]"
      }`}
    >
      <Icon className="h-4 w-4 text-[#B38F4F]" />
      <span className="whitespace-nowrap text-[11px] font-semibold">{label}</span>
    </div>
  );
}
