import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  MapPin,
  MessageSquareText,
  QrCode,
  Sparkles,
} from "lucide-react";

const PARTNER_TYPES = [
  {
    id: "properties",
    label: "Properties",
    price: "Free - $99/year",
    bestFor: "Residential buildings, apartments, condos, leasing teams, and property groups.",
    promise: "Turn the building into the entry point for what is nearby.",
    includes: ["Basic map listing", "Lobby QR entry", "Resident perks card connection", "Building activity snapshot"],
    notes: "Start free. Add analytics or full resident engagement when the building is ready.",
  },
  {
    id: "hotels",
    label: "Hotels",
    price: "$99-$149/year",
    bestFor: "Hotels, boutique stays, extended stays, concierge teams, and hospitality groups.",
    promise: "Help guests and residents orient themselves beyond the lobby.",
    includes: ["Guest QR entry", "Nearby dining and events layer", "Local resident rate placement", "Monthly engagement report"],
    notes: "Pricing depends on room count, entry points, and how much placement is needed.",
  },
  {
    id: "venues",
    label: "Venues",
    price: "Free 12 months, then $49-$149/year",
    bestFor: "Restaurants, bars, coffee shops, wellness, retail, services, and experience venues.",
    promise: "Show up while people nearby are deciding where to go next.",
    includes: ["Venue listing", "Perk or offer", "Event placement", "Scan and redemption tracking"],
    notes: "Most venues start free so they can prove scans, saves, and redemptions first.",
  },
  {
    id: "brands",
    label: "Brands",
    price: "$99-$149/year",
    bestFor: "Sponsors, product launches, retail campaigns, corridor activations, and local brand moments.",
    promise: "Buy the moment, not the impression.",
    includes: ["Campaign placement", "District targeting", "QR or text entry", "Survey and audience signals"],
    notes: "Campaign pricing changes with district footprint, timing, and number of placements.",
  },
  {
    id: "civic",
    label: "Civic",
    price: "$49-$79/year",
    bestFor: "Districts, chambers, city partners, civic groups, public events, and community programming.",
    promise: "Turn attendance into participation.",
    includes: ["Event visibility", "District discovery layer", "Public QR entry", "Participation reporting"],
    notes: "Built for simple community visibility without a heavy software rollout.",
  },
];

const MODULES = [
  ["Live map listing", "Included", "A real place on the downtown map with category, district, and nearby context."],
  ["QR entry points", "Included", "Put a code in a lobby, venue, room, event, menu, poster, or card. People scan and land in the right place."],
  ["Perks card connection", "Included for venues and resident partners", "Residents can save, show, redeem, and come back without downloading an app."],
  ["Event placement", "Included where relevant", "Add events to the map so people can RSVP or decide in the moment."],
  ["Partner dashboard", "Included on paid tiers", "See scans, saves, RSVPs, redemptions, and nearby activity in plain English."],
  ["AI insight notes", "Included on paid tiers", "The system explains what happened, where it happened, and what to try next."],
  ["Survey capture", "Campaign add-on or brand module", "Ask short questions through QR or text and connect answers to district behavior."],
  ["Monthly report", "Included on paid tiers", "A simple readout of what people did, which placements worked, and where demand showed up."],
];

const ADD_ONS = [
  ["Survey pulse", "From $49 per pulse", "3-6 questions, QR or text entry, audience summary, and plain-English takeaways."],
  ["Campaign launch kit", "From $99", "Offer setup, QR surfaces, placement logic, and launch checklist."],
  ["District placement", "Quoted by footprint", "Featured visibility in a selected district, corridor, or event window."],
  ["Building placement pack", "From $99", "Lobby, leasing, resident welcome, and move-in QR placements."],
  ["Event activation", "From $149", "Campaign or sponsor placement tied to an event, RSVP flow, or live downtown moment."],
  ["Custom partner report", "From $79", "A cleaner reporting view for leadership, owners, sponsors, or property groups."],
];

const PLACEMENTS = [
  ["Map feature", "Best for visibility", "Pinned placement inside the map when people search by need, category, or district."],
  ["QR surface", "Best for entry", "Lobby sign, table tent, room card, poster, sticker, or check-in surface."],
  ["Resident card offer", "Best for action", "Resident-only perk, local rate, event access, or redemption flow."],
  ["District spotlight", "Best for campaigns", "A timed placement around Rainey, Seaholm, 2nd Street, Congress, or another downtown zone."],
  ["Survey moment", "Best for learning", "Short QR or text survey after a scan, visit, event, or offer interaction."],
  ["Partner report", "Best for decisions", "Simple reporting that shows what worked and what to do next."],
];

const SURVEY_STEPS = [
  ["01", "Scan or text", "A resident, guest, customer, or event attendee scans a QR code or texts a short keyword."],
  ["02", "Answer quickly", "They answer a few everyday questions. No app, no account, no long form."],
  ["03", "Signals connect", "Answers connect to district, timing, offer, event, or placement context."],
  ["04", "Engine explains", "The AI-powered insight layer turns the responses into plain-English audience notes and next steps."],
];

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`border-t border-[#0B1F33]/8 px-5 py-14 md:py-18 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-8 max-w-3xl">
            {eyebrow && <span className="dp-label mb-3 block">{eyebrow}</span>}
            {title && <h2 className="font-heading text-3xl font-medium leading-[1.08] text-[#0B1F33] md:text-4xl">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function PillLink({ href, children }) {
  return (
    <a href={href} className="inline-flex h-9 items-center justify-center rounded-md border border-[#0B1F33]/10 bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33] transition hover:border-[#B38F4F]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]">
      {children}
    </a>
  );
}

export default function Pricing() {
  const [activeType, setActiveType] = useState("properties");

  const activePartner = useMemo(
    () => PARTNER_TYPES.find((type) => type.id === activeType) || PARTNER_TYPES[0],
    [activeType]
  );

  return (
    <div className="min-h-screen bg-[#F7F8FB] pt-[68px] text-[#0B1F33]">
      <section className="relative overflow-hidden px-5 py-16 md:py-22">
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(11,31,51,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(11,31,51,0.24) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-7 flex flex-wrap gap-2">
            <PillLink href="#partner-types">Partner types</PillLink>
            <PillLink href="#modules">Modules</PillLink>
            <PillLink href="#add-ons">Add-ons</PillLink>
            <PillLink href="#surveys">Surveys</PillLink>
            <PillLink href="#placements">Placements</PillLink>
          </div>
          <span className="dp-label mb-4 block">Partner pricing</span>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="font-heading text-[38px] font-medium leading-[1.03] md:text-[56px]">
                Simple pricing for partners who want downtown action, not software homework.
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#0B1F33]/68">
                Downtown Perks is built around easy entry points: scan a QR code, text a keyword, open the map, show the card, read the report. Dumb tech on the front end. A smart audience and analytics engine underneath.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/partners#partner-types" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#0B1F33] px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#081521] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]">
                  Find your partner type
                  <ArrowRight className="h-4 w-4 text-[#B38F4F]" />
                </Link>
                <Link to="/partners/brands#brand-form" className="inline-flex h-10 items-center justify-center rounded-md border border-[#0B1F33]/10 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33] transition hover:border-[#B38F4F]/45">
                  Discuss activation
                </Link>
              </div>
            </div>
            <div className="rounded-lg border border-[#0B1F33]/8 bg-white p-5 shadow-[0_14px_34px_rgba(11,31,51,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/50">What pricing reflects</p>
              <div className="mt-4 grid gap-3">
                {["Footprint", "Visibility", "Activation", "Reporting"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-[#0B1F33]/8 bg-[#F7F8FB] p-3">
                    <Check className="h-4 w-4 text-[#B38F4F]" />
                    <span className="text-[13px] font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="partner-types" eyebrow="Pricing matrix" title="Plans by partner type.">
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {PARTNER_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setActiveType(type.id)}
              className={`shrink-0 rounded-md border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                activeType === type.id
                  ? "border-[#0B1F33] bg-[#0B1F33] text-white"
                  : "border-[#0B1F33]/10 bg-white text-[#0B1F33]/68 hover:border-[#B38F4F]/45 hover:text-[#0B1F33]"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-lg border border-[#0B1F33]/8 bg-white p-5 shadow-[0_14px_34px_rgba(11,31,51,0.05)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0B1F33]/50">{activePartner.label}</p>
            <div className="mt-3 font-heading text-3xl font-medium">{activePartner.price}</div>
            <p className="mt-4 text-[13px] leading-6 text-[#0B1F33]/64">{activePartner.bestFor}</p>
            <p className="mt-4 rounded-md border border-[#B38F4F]/30 bg-[#F7F8FB] p-3 text-[13px] font-medium leading-6 text-[#0B1F33]">
              {activePartner.promise}
            </p>
            <p className="mt-4 text-[12px] leading-5 text-[#0B1F33]/58">{activePartner.notes}</p>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#0B1F33]/8 bg-white shadow-[0_14px_34px_rgba(11,31,51,0.05)]">
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse text-left">
                <thead className="bg-[#0B1F33] text-white">
                  <tr>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]">Partner</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]">Pricing</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]">Best fit</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]">Core expectation</th>
                  </tr>
                </thead>
                <tbody>
                  {PARTNER_TYPES.map((type) => (
                    <tr key={type.id} className="border-b border-[#0B1F33]/8">
                      <td className="px-4 py-4 text-[13px] font-semibold">{type.label}</td>
                      <td className="px-4 py-4 text-[13px]">{type.price}</td>
                      <td className="px-4 py-4 text-[12px] leading-5 text-[#0B1F33]/62">{type.bestFor}</td>
                      <td className="px-4 py-4 text-[12px] leading-5 text-[#0B1F33]/62">{type.promise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <Section id="modules" eyebrow="Platform modules" title="What the platform offers.">
        <div className="grid gap-3 md:grid-cols-2">
          {MODULES.map(([title, availability, body]) => (
            <article key={title} className="rounded-md border border-[#0B1F33]/8 bg-white p-4 shadow-[0_10px_26px_rgba(11,31,51,0.04)]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0B1F33] text-[#B38F4F]">
                  {title.includes("QR") ? <QrCode className="h-4 w-4" /> : title.includes("Survey") ? <ClipboardList className="h-4 w-4" /> : title.includes("AI") ? <Sparkles className="h-4 w-4" /> : title.includes("dashboard") || title.includes("report") ? <BarChart3 className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold">{title}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B38F4F]">{availability}</p>
                  <p className="mt-2 text-[12px] leading-5 text-[#0B1F33]/60">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="add-ons" eyebrow="Add-ons and campaign additions" title="Add only what the activation needs." className="bg-white">
        <div className="overflow-hidden rounded-lg border border-[#0B1F33]/8 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse text-left">
              <thead className="bg-[#F7F8FB]">
                <tr>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33]/56">Add-on</th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33]/56">Guide price</th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33]/56">What partners can expect</th>
                </tr>
              </thead>
              <tbody>
                {ADD_ONS.map(([name, price, body]) => (
                  <tr key={name} className="border-t border-[#0B1F33]/8">
                    <td className="px-4 py-4 text-[13px] font-semibold">{name}</td>
                    <td className="px-4 py-4 text-[13px] text-[#0B1F33]/72">{price}</td>
                    <td className="px-4 py-4 text-[12px] leading-5 text-[#0B1F33]/62">{body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-[12px] leading-5 text-[#0B1F33]/58">
          Add-ons are intentionally small. The point is to test real behavior quickly, then expand only when the data supports it.
        </p>
      </Section>

      <Section id="surveys" eyebrow="Survey engine" title="Low-tech surveys. Better audience answers.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-[#0B1F33]/8 bg-white p-5 shadow-[0_14px_34px_rgba(11,31,51,0.05)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B1F33] text-[#B38F4F]">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-heading text-3xl font-medium leading-[1.08]">Ask a few good questions at the exact right moment.</h3>
            <p className="mt-4 text-[13px] leading-6 text-[#0B1F33]/64">
              Surveys work through a QR code or text prompt. A brand, venue, hotel, property, or civic partner can ask people what they want, why they came, what they noticed, what they would come back for, or what would make the experience better.
            </p>
            <p className="mt-4 text-[13px] leading-6 text-[#0B1F33]/64">
              The partner does not need an app rollout or complicated software. People answer in a simple flow. The engine groups responses with scans, district, timing, event, placement, and audience context.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SURVEY_STEPS.map(([num, title, body]) => (
              <article key={num} className="rounded-md border border-[#0B1F33]/8 bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B38F4F]">{num}</div>
                <h4 className="mt-4 text-[13px] font-semibold">{title}</h4>
                <p className="mt-2 text-[12px] leading-5 text-[#0B1F33]/60">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="placements" eyebrow="Placement opportunities" title="Where a partner can show up.">
        <div className="grid gap-3 md:grid-cols-3">
          {PLACEMENTS.map(([title, label, body]) => (
            <article key={title} className="rounded-md border border-[#0B1F33]/8 bg-white p-4 shadow-[0_10px_26px_rgba(11,31,51,0.04)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33]/48">{label}</p>
              <h3 className="mt-3 text-[14px] font-semibold">{title}</h3>
              <p className="mt-2 text-[12px] leading-5 text-[#0B1F33]/60">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Next step" title="Pick the lightest useful version first." className="bg-white">
        <div className="max-w-3xl">
          <p className="text-[14px] leading-7 text-[#0B1F33]/68">
            Downtown Perks is priced so partners can begin with a simple pilot, learn what people actually do, then add campaigns, surveys, placements, or reporting when there is a clear reason.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/partners#partner-types" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#0B1F33] px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#081521] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38F4F]">
              Choose partner type
              <ArrowRight className="h-4 w-4 text-[#B38F4F]" />
            </Link>
            <Link to="/partners/brands#brand-form" className="inline-flex h-10 items-center justify-center rounded-md border border-[#0B1F33]/10 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0B1F33] transition hover:border-[#B38F4F]/45">
              Start a conversation
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
