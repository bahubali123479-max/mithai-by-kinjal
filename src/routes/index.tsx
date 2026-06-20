import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroMithai from "@/assets/hero-mithai.jpg";
import imgKajuKatli from "@/assets/sweets/kaju-katli.jpg";
import imgGulabJamun from "@/assets/sweets/gulab-jamun.jpg";
import imgLadoo from "@/assets/sweets/ladoo.jpg";
import imgBarfi from "@/assets/sweets/barfi.jpg";
import imgJalebi from "@/assets/sweets/jalebi.jpg";
import imgHalwa from "@/assets/sweets/halwa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mithai by Priya — Homemade Indian Sweets in Wesley Chapel, FL" },
      {
        name: "description",
        content:
          "Order authentic homemade Indian mithai — kaju katli, gulab jamun, ladoo, barfi and more. Made fresh on your order date in Wesley Chapel, Florida.",
      },
      { property: "og:title", content: "Mithai by Priya — Homemade Indian Sweets" },
      {
        property: "og:description",
        content: "Authentic homemade Indian mithai, made fresh in Wesley Chapel, FL.",
      },
    ],
  }),
  component: Index,
});

type Sweet = {
  id: string;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  tint: string;
};

const SWEETS: Sweet[] = [
  { id: "kaju-katli", name: "Kaju Katli", desc: "Silky cashew diamonds with edible silver leaf.", price: 18, emoji: "🔸", tint: "from-amber-50 to-amber-100" },
  { id: "gulab-jamun", name: "Gulab Jamun", desc: "Warm milk dumplings soaked in cardamom-rose syrup.", price: 14, emoji: "🟤", tint: "from-orange-50 to-amber-100" },
  { id: "ladoo", name: "Ladoo (Besan / Motichoor)", desc: "Golden gram flour or pearl ladoo with ghee & nuts.", price: 14, emoji: "🟡", tint: "from-yellow-50 to-amber-100" },
  { id: "barfi", name: "Barfi (Milk / Coconut)", desc: "Slow-cooked khoya or coconut barfi, melt-in-mouth.", price: 16, emoji: "⬜", tint: "from-rose-50 to-amber-50" },
  { id: "jalebi", name: "Jalebi", desc: "Crisp saffron spirals dipped in warm sugar syrup.", price: 12, emoji: "🌀", tint: "from-orange-100 to-yellow-50" },
  { id: "halwa", name: "Halwa (Gajar / Suji)", desc: "Carrot or semolina halwa, rich with ghee and dry fruits.", price: 13, emoji: "🥣", tint: "from-red-50 to-amber-100" },
];

// TODO: Replace with your Formspree form ID (https://formspree.io)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your_form_id";

// TODO: Replace with your real numbers / handles
const WHATSAPP_NUMBER = "1XXXXXXXXXX"; // country code + number, no '+'
const INSTAGRAM_HANDLE = "yourhandle";

function Index() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [special, setSpecial] = useState("");
  const [mode, setMode] = useState<"Pickup" | "Delivery">("Pickup");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) =>
    setSelected((s) => ({ ...s, [id]: !s[id] }));

  const selectedSweets = SWEETS.filter((s) => selected[s.id]);
  const estimate = selectedSweets.reduce((sum, s) => sum + s.price, 0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(fd.get("name") || "");
    const sweetList = selectedSweets.map((s) => `${s.name} ($${s.price}/500g)`).join(", ");
    fd.append("Selected Sweets", sweetList || "(none)");
    fd.append("Special Request (menu)", special);
    fd.append("Estimated minimum total", `$${estimate}`);

    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (!res.ok && !FORMSPREE_ENDPOINT.includes("your_form_id")) {
        throw new Error("Could not send order. Please try again or WhatsApp us.");
      }
      setSubmitted(name || "friend");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_85%,transparent)] border-b border-[color-mix(in_oklab,var(--saffron)_25%,transparent)]">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪔</span>
            <span className="font-display text-xl font-bold text-[var(--deep-red)]">
              Mithai by Priya
            </span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            <button onClick={() => scrollTo("menu")} className="hover:text-[var(--saffron)]">Menu</button>
            <button onClick={() => scrollTo("order")} className="hover:text-[var(--saffron)]">Order</button>
            <button onClick={() => scrollTo("reviews")} className="hover:text-[var(--saffron)]">Reviews</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-[var(--saffron)]">Contact</button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 80% at 80% 20%, rgba(255,215,0,0.35), transparent 60%), radial-gradient(50% 70% at 10% 90%, rgba(255,107,0,0.35), transparent 60%), linear-gradient(180deg, #FFF8E7 0%, #FFEEC2 100%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            {submitted && (
              <div className="mb-6 rounded-2xl border-2 border-[var(--saffron)] bg-white p-5 shadow-lg">
                <h2 className="font-display text-2xl font-bold text-[var(--deep-red)]">
                  Thank you, {submitted}! 🙏
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your order request is received. I will call/WhatsApp you within a few hours
                  to confirm your order and share payment details (Zelle / Venmo / Cash).
                </p>
              </div>
            )}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-[var(--saffron)]/40 px-3 py-1 text-xs font-semibold text-[var(--deep-red)] uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[var(--saffron)] animate-pulse" />
              Now taking orders in Wesley Chapel
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-extrabold leading-[1.05] text-[var(--deep-red)]">
              Authentic Homemade <span className="text-[var(--saffron)]">Indian Mithai</span> — Made Fresh in Wesley Chapel, FL
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Recipes from my grandmother's kitchen, made fresh on your order date with pure ghee,
              real khoya, and zero shortcuts.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => scrollTo("order")} className="btn-primary hover:btn-primary-hover">
                Order Now →
              </button>
              <button
                onClick={() => scrollTo("menu")}
                className="inline-flex items-center justify-center rounded-full border-2 border-[var(--deep-red)] px-7 py-3 font-semibold text-[var(--deep-red)] hover:bg-[var(--deep-red)] hover:text-white transition"
              >
                See the menu
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>✦ 100% homemade</span>
              <span>✦ Pure ghee</span>
              <span>✦ Min order $20</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--gold)]/40 to-[var(--saffron)]/40 blur-2xl" />
            <img
              src={heroMithai}
              alt="Assorted homemade Indian mithai on a brass thali"
              width={1600}
              height={1024}
              className="relative rounded-[2rem] shadow-2xl border-4 border-white object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-[var(--saffron)] uppercase">The Menu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--deep-red)] mt-2">
            Pick your favourites
          </h2>
          <p className="mt-3 text-muted-foreground">Prices per 500g • Tick what you'd like, then fill the form below.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SWEETS.map((s) => {
            const on = !!selected[s.id];
            return (
              <label
                key={s.id}
                className={`group relative cursor-pointer rounded-3xl border-2 bg-white p-5 transition shadow-sm hover:-translate-y-1 hover:shadow-xl ${
                  on
                    ? "border-[var(--saffron)] ring-4 ring-[var(--saffron)]/20"
                    : "border-transparent"
                }`}
              >
                <div className={`h-32 rounded-2xl bg-gradient-to-br ${s.tint} flex items-center justify-center text-6xl`}>
                  <span>{s.emoji}</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[var(--deep-red)]">{s.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-snug">{s.desc}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--gold)]/30 px-3 py-1 text-sm font-bold text-[var(--deep-red)]">
                    ${s.price}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">per 500g</span>
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${
                      on ? "text-[var(--saffron)]" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition ${
                        on ? "border-[var(--saffron)] bg-[var(--saffron)] text-white" : "border-[var(--border)]"
                      }`}
                      aria-hidden
                    >
                      {on ? "✓" : ""}
                    </span>
                    {on ? "Added" : "Add"}
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => toggle(s.id)}
                />
              </label>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 border-2 border-dashed border-[var(--saffron)]/40">
          <label className="block">
            <span className="font-display text-lg font-bold text-[var(--deep-red)]">Special request</span>
            <span className="block text-sm text-muted-foreground mb-2">
              Something not on the menu? Tell me — kheer, peda, mysore pak, festival platters…
            </span>
            <textarea
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
              rows={3}
              placeholder="e.g. 1kg mysore pak for Diwali, less sugar please"
              className="w-full rounded-xl border-2 border-[var(--input)] bg-[var(--cream)] p-3 focus:outline-none focus:border-[var(--saffron)]"
            />
          </label>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="bg-gradient-to-b from-[var(--cream)] to-[#FFEFC8] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest text-[var(--saffron)] uppercase">Place your order</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--deep-red)] mt-2">
              Tell me what you need
            </h2>
            <p className="mt-3 text-muted-foreground">
              I'll call or WhatsApp you within a few hours to confirm and share payment details.
            </p>
          </div>

          {selectedSweets.length > 0 && (
            <div className="mb-6 rounded-2xl bg-white border-2 border-[var(--gold)] p-5">
              <h3 className="font-display font-bold text-[var(--deep-red)]">Your selection</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {selectedSweets.map((s) => (
                  <li key={s.id} className="flex justify-between">
                    <span>{s.name}</span>
                    <span className="font-semibold">${s.price}/500g</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-dashed flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated minimum (500g each)</span>
                <span className="font-bold text-[var(--deep-red)]">${estimate}</span>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 md:p-8 shadow-xl border border-[var(--gold)]/30 space-y-5">
            <Field label="Full Name" required>
              <input name="name" required className="input" placeholder="Priya Sharma" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone Number" required>
                <input name="phone" type="tel" required className="input" placeholder="(813) 555-0100" />
              </Field>
              <Field label="Email" required>
                <input name="email" type="email" required className="input" placeholder="you@example.com" />
              </Field>
            </div>

            <Field label="Delivery or Pickup" required>
              <div className="flex gap-3 flex-wrap">
                {(["Pickup", "Delivery"] as const).map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 min-w-[140px] cursor-pointer rounded-xl border-2 px-4 py-3 text-center font-semibold transition ${
                      mode === opt
                        ? "border-[var(--saffron)] bg-[var(--saffron)]/10 text-[var(--deep-red)]"
                        : "border-[var(--border)] hover:border-[var(--saffron)]/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={opt}
                      checked={mode === opt}
                      onChange={() => setMode(opt)}
                      className="sr-only"
                    />
                    {opt === "Pickup" ? "🚗 Pickup" : "🛵 Delivery"}
                  </label>
                ))}
              </div>
            </Field>

            {mode === "Delivery" && (
              <Field label="Delivery Address" required>
                <textarea
                  name="address"
                  required
                  rows={2}
                  className="input"
                  placeholder="Street, City, ZIP — within 15 miles of Wesley Chapel"
                />
              </Field>
            )}

            <Field label="Preferred Date to Receive Order" required>
              <input
                name="date"
                type="date"
                required
                min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
                className="input"
              />
            </Field>

            <Field label="How did you hear about us?">
              <select name="source" className="input">
                <option value="">Select one…</option>
                <option>WhatsApp group</option>
                <option>Instagram</option>
                <option>Friend</option>
                <option>Facebook</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="Special instructions">
              <textarea
                name="instructions"
                rows={3}
                className="input"
                placeholder="Less sugar, no nuts, festival packaging, etc."
              />
            </Field>

            {error && (
              <p className="text-sm text-[var(--deep-red)] bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary hover:btn-primary-hover w-full disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit Order Request"}
            </button>
            <p className="text-xs text-center text-muted-foreground">
              No payment now. I'll contact you to confirm and collect via Zelle, Venmo or Cash.
            </p>
          </form>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-[var(--saffron)] uppercase">Kind words</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--deep-red)] mt-2">
            Loved by our neighbours
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              name: "Anjali Patel",
              text: "The kaju katli melts in your mouth — tastes exactly like the one my mum makes back in Ahmedabad. Will order every Diwali!",
            },
            {
              name: "Rohan Mehta",
              text: "Ordered ladoo and gulab jamun for my son's birthday. Everyone asked who made them. Truly homemade quality.",
            },
            {
              name: "Deepika Iyer",
              text: "Fresh, not too sweet, and beautifully packed. Priya even remembered my husband's diabetes-friendly request. 10/10.",
            },
          ].map((r) => (
            <div key={r.name} className="rounded-3xl bg-white p-6 shadow-md border border-[var(--gold)]/40">
              <div className="text-[var(--gold)] text-lg">★★★★★</div>
              <p className="mt-3 text-foreground leading-relaxed">"{r.text}"</p>
              <p className="mt-4 font-display font-bold text-[var(--deep-red)]">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[var(--deep-red)] text-[var(--cream)]">
        <div className="mx-auto max-w-4xl px-5 py-16 md:py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--gold)]">
            Let's talk sweets
          </h2>
          <p className="mt-4 text-[var(--cream)]/80 max-w-xl mx-auto">
            All orders are made fresh. Minimum order $20. Delivery within 15 miles of Wesley Chapel, FL.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 font-bold text-white shadow-lg hover:scale-105 transition"
            >
              💬 WhatsApp us
            </a>
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-7 py-3 font-bold text-white shadow-lg hover:scale-105 transition"
            >
              📸 Instagram
            </a>
          </div>
          <p className="mt-10 text-xs text-[var(--cream)]/60">
            © {new Date().getFullYear()} Mithai by Priya · Wesley Chapel, Florida · Made with 🧡
          </p>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 2px solid var(--input);
          background: var(--cream);
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.15s;
          font: inherit;
          color: inherit;
        }
        .input:focus { border-color: var(--saffron); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block mb-1.5 font-semibold text-sm text-[var(--deep-red)]">
        {label} {required && <span className="text-[var(--saffron)]">*</span>}
      </span>
      {children}
    </label>
  );
}
