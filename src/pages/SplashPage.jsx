import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  MapPin,
  Navigation,
  QrCode,
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
  { label: "Resident access", value: "Card + map", icon: CreditCard },
  { label: "Partner readout", value: "QR + RSVPs", icon: QrCode },
  { label: "Local context", value: "Live nearby", icon: Building2 },
];

const pathCards = [
  {
    id: "resident-card",
    label: "Resident card",
    detail: "Access active",
    icon: CreditCard,
    x: "18%",
    y: "34%",
    variant: "light",
  },
  {
    id: "perks",
    label: "Perks nearby",
    detail: "Show card",
    icon: MapPin,
    x: "54%",
    y: "22%",
    variant: "dark",
  },
  {
    id: "partner-readout",
    label: "Partner readout",
    detail: "Scans + RSVPs",
    icon: Building2,
    x: "68%",
    y: "62%",
    variant: "light",
  },
  {
    id: "route",
    label: "Walkable route",
    detail: "4 min walk",
    icon: Navigation,
    x: "36%",
    y: "70%",
    variant: "light",
  },
];

const lifestyleTiles = [
  {
    image:
      "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=600&q=80",
    label: "Walkable plans",
    className: "left-[6%] top-[9%] h-20 w-28",
  },
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
    label: "Coffee nearby",
    className: "right-[7%] top-[12%] h-24 w-32",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    label: "Resident access",
    className: "left-[10%] bottom-[10%] h-24 w-36",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    label: "Rooftop nearby",
    className: "right-[10%] bottom-[12%] h-20 w-32",
  },
];

const storyboardSteps = ["load", "resident", "perks", "route", "partner", "resolve"];

const activePathByStep = {
  resident: "resident-card",
  perks: "perks",
  route: "route",
  partner: "partner-readout",
  resolve: "perks",
};

const activeSignalByStep = {
  resident: 0,
  partner: 1,
  resolve: 2,
};

function FlowChip({ card, active }) {
  const Icon = card.icon;
  const isDark = card.variant === "dark";

  return (
    <motion.div
      className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 px-2 py-1.5 shadow-[0_14px_34px_rgba(11,31,51,0.14)] sm:gap-2 sm:px-2.5 sm:py-2 ${
        isDark ? "bg-[#0B1F33] text-white" : "bg-white/94 text-[#0B1F33]"
      }`}
      style={{ left: card.x, top: card.y }}
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{
        opacity: 1,
        y: active ? -4 : 0,
        scale: active ? 1.035 : 1,
        boxShadow: active
          ? "0 0 0 3px rgba(179,143,79,0.16), 0 18px 40px rgba(11,31,51,0.18)"
          : "0 0 0 1px rgba(11,31,51,0.05), 0 14px 34px rgba(11,31,51,0.10)",
      }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-[#B38F4F] sm:h-4 sm:w-4" />
      <div>
        <span className="block whitespace-nowrap text-[10px] font-semibold leading-none sm:text-[11px]">{card.label}</span>
        <span className={`mt-1 block whitespace-nowrap text-[8px] leading-none sm:text-[9px] ${isDark ? "text-white/45" : "text-[#0B1F33]/42"}`}>{card.detail}</span>
      </div>
      {active && <CheckCircle2 className="h-3 w-3 shrink-0 text-[#B38F4F] sm:h-3.5 sm:w-3.5" />}
    </motion.div>
  );
}

function ChoosePathStoryboard() {
  const [step, setStep] = useState(0);
  const current = storyboardSteps[step];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((prev) => (prev + 1) % storyboardSteps.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative min-h-[380px] overflow-hidden rounded-md bg-white/90 shadow-[inset_0_0_0_1px_rgba(11,31,51,0.04),0_18px_54px_rgba(11,31,51,0.06)] sm:min-h-[330px]">
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-[10%] top-[18%] h-32 w-32 bg-[#B38F4F]/10 blur-2xl"
            animate={{ opacity: [0.32, 0.54, 0.32], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[8%] right-[14%] h-40 w-40 bg-[#0B1F33]/7 blur-2xl"
            animate={{ opacity: [0.26, 0.44, 0.26], scale: [1, 1.06, 1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {lifestyleTiles.map((tile, index) => (
            <motion.div
              key={tile.label}
              className={`absolute z-0 overflow-hidden bg-white/70 shadow-[0_14px_34px_rgba(11,31,51,0.10)] ${tile.className}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: current === "load" ? 0 : 0.34, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.55 }}
              aria-hidden="true"
            >
              <img src={tile.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-white/28" />
              <div className="absolute bottom-0 left-0 right-0 bg-white/82 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#0B1F33]/48">
                {tile.label}
              </div>
            </motion.div>
          ))}
        </div>

        <svg className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 720 360" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M130 126 C230 66, 330 90, 390 84 C500 72, 545 180, 490 236 C430 302, 305 268, 260 252"
            fill="none"
            stroke="#B38F4F"
            strokeWidth="2"
            strokeDasharray="8 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: current === "load" ? 0.18 : 1, opacity: 0.65 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </svg>

        <AnimatePresence>
          {current === "load" && (
            <div className="absolute inset-0 z-10 grid grid-cols-3 gap-2 p-4 sm:gap-3 sm:p-6">
              {[0, 1, 2].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 0.54, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: item * 0.12, duration: 0.4 }}
                  className="bg-[#EEF0F2] p-3 sm:p-4"
                >
                  <div className="h-20 bg-white/70" />
                  <div className="mt-4 h-2 w-2/3 bg-white/80" />
                  <div className="mt-2 h-2 w-1/2 bg-white/80" />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {current !== "load" &&
          pathCards.map((card) => (
            <FlowChip
              key={card.id}
              card={card}
              active={activePathByStep[current] === card.id}
            />
          ))}

        <AnimatePresence>
          {current === "resolve" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-4 left-3 right-3 z-30 bg-white/92 p-3 text-[#0B1F33] shadow-[0_18px_44px_rgba(11,31,51,0.14),0_0_0_1px_rgba(179,143,79,0.16)] backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-4"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B38F4F]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Map readout
                  </div>
                  <div className="mt-1 text-[13px] font-semibold sm:text-[14px]">
                    Resident access active · Perk nearby · Route ready
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#F7F8FB] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(11,31,51,0.04)]">
                    <div className="text-[13px] font-bold text-[#0B1F33]">4m</div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#0B1F33]/38">Walk</div>
                  </div>
                  <div className="bg-[#F7F8FB] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(11,31,51,0.04)]">
                    <div className="text-[13px] font-bold text-[#0B1F33]">1</div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#0B1F33]/38">Perk</div>
                  </div>
                  <div className="bg-[#F7F8FB] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(11,31,51,0.04)]">
                    <div className="text-[13px] font-bold text-[#0B1F33]">Live</div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#0B1F33]/38">Nearby</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {signalPoints.map((point, index) => {
          const Icon = point.icon;
          const isActive = activeSignalByStep[current] === index;

          return (
            <motion.div
              key={point.label}
              animate={{ y: isActive ? -2 : 0 }}
              className={`bg-white/72 p-3 shadow-[inset_0_0_0_1px_rgba(11,31,51,0.04)] transition ${
                isActive ? "shadow-[inset_0_0_0_1px_rgba(179,143,79,0.28),0_12px_28px_rgba(11,31,51,0.08)]" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/45">
                <Icon className="h-3.5 w-3.5 text-[#B38F4F]" />
                {point.label}
              </div>
              <div className="mt-1 text-[13px] font-semibold text-[#0B1F33]">{point.value}</div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

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
                className="inline-flex h-9 items-center gap-2 rounded-md bg-white/12 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_14px_34px_rgba(0,0,0,0.18)] transition hover:bg-white/18 hover:shadow-[0_0_0_1px_rgba(179,143,79,0.24),0_14px_34px_rgba(0,0,0,0.18),0_0_28px_rgba(179,143,79,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                aria-label="Back to audience gateway"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[#B38F4F]" />
                Back
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowIntro(false)}
                  className="inline-flex h-9 items-center rounded-md bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33] shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_14px_34px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(179,143,79,0.28),0_14px_34px_rgba(0,0,0,0.18),0_0_30px_rgba(179,143,79,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={() => setShowIntro(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/12 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_14px_34px_rgba(0,0,0,0.18)] transition hover:bg-white/18 hover:shadow-[0_0_0_1px_rgba(179,143,79,0.24),0_14px_34px_rgba(0,0,0,0.18),0_0_28px_rgba(179,143,79,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
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
                <div className="inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78 shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-md">
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

      <section className="relative min-h-[calc(100vh-68px)] px-5 py-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <video className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" src={VIDEO_SRC} autoPlay muted loop playsInline preload="metadata" />
          <div className="absolute inset-0 bg-[#F7F8FB]/82" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(247,248,251,0.94),rgba(247,248,251,0.66),rgba(247,248,251,0.96))]" />
          <div className="absolute left-[4%] top-[18%] h-56 w-56 rounded-full bg-[#B38F4F]/14 blur-3xl" />
          <div className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-white/52 blur-[82px]" />
          <div className="absolute bottom-[8%] right-[16%] h-64 w-64 rounded-full bg-[#0B1F33]/10 blur-3xl" />
          <div className="absolute left-1/2 top-[46%] h-[460px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/34 blur-[92px]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-180px)] max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-md bg-white/86 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B1F33]/58 shadow-[0_0_0_1px_rgba(11,31,51,0.035),0_12px_34px_rgba(11,31,51,0.07),0_0_28px_rgba(179,143,79,0.06)]">
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
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#0B1F33] px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(11,31,51,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_rgba(179,143,79,0.14),0_18px_36px_rgba(11,31,51,0.18),0_0_32px_rgba(179,143,79,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
              >
                Start as resident
                <ArrowRight className="ml-2 h-4 w-4 text-[#B38F4F]" />
              </Link>
              <Link
                to="/partners"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white/88 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33] shadow-[0_0_0_1px_rgba(11,31,51,0.035),0_12px_30px_rgba(11,31,51,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(179,143,79,0.18),0_14px_32px_rgba(11,31,51,0.08),0_0_30px_rgba(179,143,79,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
              >
                Start as partner
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-lg bg-white/78 p-3 shadow-[0_0_0_1px_rgba(11,31,51,0.05),0_28px_90px_rgba(11,31,51,0.10),0_0_64px_rgba(179,143,79,0.10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(179,143,79,0.18),0_30px_92px_rgba(11,31,51,0.12),0_0_82px_rgba(179,143,79,0.16)]"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[#B38F4F]/16 blur-3xl transition duration-300 group-hover:bg-[#B38F4F]/22" />
            <div className="relative rounded-md bg-[#F7F8FB]/72 p-3 shadow-[inset_0_0_0_1px_rgba(11,31,51,0.04)]">
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

              <ChoosePathStoryboard />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(179,143,79,0.28),transparent)]" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2">
          {audienceCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.href}
                className="group relative overflow-hidden rounded-lg bg-white/74 p-5 shadow-[0_0_0_1px_rgba(11,31,51,0.05),0_18px_50px_rgba(11,31,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(179,143,79,0.18),0_0_58px_rgba(179,143,79,0.14),0_24px_62px_rgba(11,31,51,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#B38F4F]/0 blur-2xl transition duration-300 group-hover:bg-[#B38F4F]/14" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F7F8FB] text-[#B38F4F] shadow-[inset_0_0_0_1px_rgba(11,31,51,0.04)]">
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
