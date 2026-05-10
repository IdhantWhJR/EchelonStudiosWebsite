import React from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Calendar,
  Trophy,
  Users,
  Instagram,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import unitedLogo from "@assets/Gemini_Generated_Image_mdkubrmdkubrmdku-removebg-preview_1777100926010.png";

const squad = [
  { no: "01", name: "Vidhaan Sood", role: "Goalkeeper" },
  { no: "05", name: "Idhant Sood", role: "Right Back" },
  { no: "06", name: "Abhyuday", role: "Left Back" },
  { no: "04", name: "Kabir", role: "Centre Back" },
  { no: "03", name: "Diyaansh", role: "Centre Back" },
  { no: "11", name: "Arijit", role: "Centre Mid" },
  { no: "12", name: "Arjun Sharma", role: "Centre Mid" },
  { no: "09", name: "Arjun Sangwan", role: "Attacking Mid" },
  { no: "07", name: "Paranjay Negi", role: "Right Wing" },
  { no: "10", name: "Ishaan Kumar", role: "Left Wing" },
  { no: "08", name: "Viraj Yadav", role: "Striker" },
];

const lastResult = {
  date: "APR 12",
  opp: "Faridabad Bois",
  score: "2 — 5",
  result: "L",
  venue: "Home",
};

const nextFixture = {
  date: "MAY 02",
  opp: "Victory Valley",
  venue: "Conscient Sports",
  time: "TBD",
};

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

function ClubMark({ size = "h-10 w-10" }: { size?: string }) {
  return (
    <img
      src={unitedLogo}
      alt="Echelon United FC"
      className={`${size} object-contain drop-shadow-[0_2px_8px_rgba(245,197,24,0.25)]`}
    />
  );
}

export default function UnitedFC() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/united-fc" className="flex items-center gap-3 z-50">
            <ClubMark size="h-12 w-12" />
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-bold text-base tracking-tight">
                Echelon United FC
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Est. 2026 · Gurugram
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { id: "club", label: "Club" },
              { id: "squad", label: "Squad" },
              { id: "matches", label: "Matches" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="hover:text-primary transition-colors uppercase tracking-wider text-xs"
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Studios
            </Link>
            <Button
              onClick={() => scrollTo("join")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider text-xs px-6 py-5 rounded-none"
            >
              Join the Club
            </Button>
          </nav>

          <button
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-7 transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {[
          { id: "club", label: "Club" },
          { id: "squad", label: "Squad" },
          { id: "matches", label: "Matches" },
          { id: "join", label: "Join the Club" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="font-serif text-3xl hover:text-primary transition-colors"
          >
            {item.label}
          </button>
        ))}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider text-xs mt-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Echelon Studios
        </Link>
      </div>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-end pt-24 pb-16 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* Dark mode glow */}
          <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(245,197,24,0.18)_0%,transparent_60%)]" />
          <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,rgba(245,197,24,0.06)_1px,transparent_1px)] bg-[size:120px_100%]" />

          {/* Light-mode pitch backdrop */}
          <div className="absolute inset-0 dark:hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(245,197,24,0.22)_0%,transparent_55%)]" />
          <div className="absolute inset-0 dark:hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:120px_100%]" />

          {/* Massive watermark */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none select-none">
            <span className="font-serif font-black text-[28vw] leading-[0.8] tracking-tighter text-foreground/[0.04] dark:text-primary/[0.05]">
              EUFC
            </span>
          </div>
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-foreground/15 bg-foreground/[0.04] dark:bg-primary/5 dark:border-primary/30 text-foreground/80 dark:text-primary text-xs font-bold uppercase tracking-widest mb-8">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  An Echelon Studios initiative
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="md:hidden mb-6">
                  <ClubMark size="h-24 w-24" />
                </div>
                <h1 className="font-serif text-5xl sm:text-7xl md:text-[110px] leading-[0.85] tracking-tighter font-bold mb-8">
                  Echelon
                  <br />
                  <span className="relative inline-block">
                    United
                    <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary -z-10" />
                  </span>{" "}
                  FC.
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                  A football club started by a bunch of players who simply love
                  the game. We train together, we play together, and we're
                  open to joining leagues that match our level.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => scrollTo("matches")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base font-bold rounded-none uppercase tracking-wider"
                  >
                    Next Fixture <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scrollTo("squad")}
                    className="h-14 px-8 text-base font-medium rounded-none border-border hover:bg-muted"
                  >
                    Meet the Squad
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right column: massive crest */}
            <div className="hidden md:flex md:col-span-4 items-center justify-center">
              <FadeIn delay={0.4}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <img
                    src={unitedLogo}
                    alt="Echelon United FC crest"
                    className="relative w-full max-w-[340px] object-contain drop-shadow-[0_8px_32px_rgba(245,197,24,0.35)]"
                  />
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Club Section */}
      <section
        id="club"
        className="py-24 md:py-32 border-t border-border"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6 font-bold">
                01 / The Club
              </div>
              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                Just a bunch of players
                <br />
                who love the game.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Echelon United was put together by a group of friends who got
                tired of pickup football and wanted something a bit more
                serious — a proper team, a proper kit, and proper matches.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We train weekly, play friendlies whenever we can, and we're
                actively looking for leagues and tournaments that match where
                we are right now. If you run a competition or want to set up a
                fixture, get in touch.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {[
                {
                  k: "Founded",
                  v: "2026, Gurugram",
                  d: "By a group of weekend players who wanted more.",
                },
                {
                  k: "Colours",
                  v: "Black & Yellow",
                  d: "Same as the studio. Not a coincidence.",
                },
                {
                  k: "Status",
                  v: "Open to leagues",
                  d: "Available for friendlies, tournaments and league entries.",
                },
              ].map((row, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="border border-border p-6 bg-card hover:border-primary/40 transition-colors duration-300">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {row.k}
                      </div>
                      <div className="font-serif font-bold text-lg tracking-tight text-right">
                        {row.v}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {row.d}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Squad */}
      <section id="squad" className="py-24 md:py-32 bg-card border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6 font-bold">
              02 / The Squad
            </div>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-2xl">
                Eleven players. One badge.
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Users className="w-4 h-4 text-primary" />
                Manager: Idhant Sood
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {squad.map((p, i) => (
              <FadeIn
                key={p.no}
                delay={0.04 * i}
                className="bg-background p-6 hover:bg-muted/40 transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-serif text-5xl font-black tracking-tighter group-hover:text-primary transition-colors">
                    {p.no}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2 text-right">
                    {p.role}
                  </span>
                </div>
                <div className="font-serif font-bold text-xl tracking-tight">
                  {p.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  U17 · Gurugram
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Matches */}
      <section id="matches" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6 font-bold">
              03 / Matches
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-14">
              Last result &amp; next fixture.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Last Result */}
            <FadeIn>
              <div className="border border-border bg-card p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    <Trophy className="w-4 h-4 text-primary" /> Last Result
                  </span>
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                      lastResult.result === "W"
                        ? "bg-primary text-primary-foreground"
                        : lastResult.result === "D"
                        ? "bg-muted text-foreground border border-border"
                        : "bg-foreground/10 text-foreground border border-foreground/20"
                    }`}
                  >
                    {lastResult.result}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-between gap-6 my-2">
                  <div>
                    <div className="font-serif font-bold text-2xl tracking-tight leading-tight">
                      Echelon United
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {lastResult.venue}
                    </div>
                  </div>
                  <div className="font-serif text-6xl md:text-7xl font-black tracking-tighter">
                    {lastResult.score.split("—")[0].trim()}
                  </div>
                </div>

                <div className="flex items-center gap-3 my-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    FT
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="flex-1 flex items-center justify-between gap-6 my-2">
                  <div>
                    <div className="font-serif font-bold text-2xl tracking-tight leading-tight">
                      {lastResult.opp}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Away
                    </div>
                  </div>
                  <div className="font-serif text-6xl md:text-7xl font-black tracking-tighter text-muted-foreground">
                    {lastResult.score.split("—")[1].trim()}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {lastResult.date} · Friendly
                </div>
              </div>
            </FadeIn>

            {/* Next Fixture */}
            <FadeIn delay={0.1}>
              <div className="border border-border bg-card p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" /> Next Fixture
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">
                    Upcoming
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                    Echelon United vs
                  </div>
                  <div className="font-serif font-black text-4xl md:text-5xl tracking-tighter mb-6">
                    {nextFixture.opp}
                  </div>

                  <div className="grid grid-cols-3 gap-px bg-border border border-border w-full max-w-md">
                    <div className="bg-background p-4">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        Date
                      </div>
                      <div className="font-serif font-bold text-base tracking-tight">
                        {nextFixture.date}
                      </div>
                    </div>
                    <div className="bg-background p-4">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        Time
                      </div>
                      <div className="font-serif font-bold text-base tracking-tight">
                        {nextFixture.time}
                      </div>
                    </div>
                    <div className="bg-background p-4">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        Venue
                      </div>
                      <div className="font-serif font-bold text-base tracking-tight">
                        {nextFixture.venue}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">
                  More fixtures announced soon
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Join / Sponsor CTA */}
      <section
        id="join"
        className="py-24 md:py-32 bg-card border-y border-border"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            <FadeIn className="bg-background p-10 md:p-14">
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6 font-bold">
                Players
              </div>
              <h3 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
                Contact us for a trial.
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Trials are currently open for ages <span className="text-foreground font-bold">14 – 17</span>.
                Drop us an email with a few lines about yourself and we'll be
                in touch.
              </p>
              <a
                href="mailto:echelonunitedfc@gmail.com"
                className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" /> echelonunitedfc@gmail.com
              </a>
            </FadeIn>

            <FadeIn delay={0.1} className="bg-primary text-primary-foreground p-10 md:p-14">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6 font-bold">
                Sponsors
              </div>
              <h3 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
                Put your name on the kit.
              </h3>
              <p className="opacity-80 mb-8 leading-relaxed">
                Front-of-shirt, back, sleeve and matchday partner slots are
                open for the upcoming season. Get in touch to discuss what
                works for you.
              </p>
              <a
                href="mailto:echelonunitedfc@gmail.com"
                className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity"
              >
                <Mail className="w-4 h-4" /> echelonunitedfc@gmail.com
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-14">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ClubMark size="h-12 w-12" />
                <div className="flex flex-col leading-tight">
                  <span className="font-serif font-bold text-base tracking-tight">
                    Echelon United FC
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Est. 2026 · Gurugram
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                A football club. An Echelon Studios initiative.
              </p>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4 font-bold">
                Club
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollTo("club")}
                    className="hover:text-primary transition-colors"
                  >
                    The Club
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("squad")}
                    className="hover:text-primary transition-colors"
                  >
                    Squad
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("matches")}
                    className="hover:text-primary transition-colors"
                  >
                    Matches
                  </button>
                </li>
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Echelon Studios
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4 font-bold">
                Get in touch
              </div>
              <a
                href="https://instagram.com/echelonunitedfc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors mb-3"
              >
                <Instagram className="w-4 h-4" /> @echelonunitedfc
              </a>
              <br />
              <a
                href="mailto:echelonunitedfc@gmail.com"
                className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" /> echelonunitedfc@gmail.com
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>© 2026 Echelon United FC · An Echelon Studios initiative</div>
            <div className="uppercase tracking-[0.2em]">Gurugram</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
