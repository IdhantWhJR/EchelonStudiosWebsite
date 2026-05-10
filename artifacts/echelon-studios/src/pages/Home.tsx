import React from "react";
import { Link } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Mail,
  MessageSquare,
  Menu,
  X,
  Star,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import echelonLogo from "@assets/ChatGPT_Image_Apr_25,_2026,_12_37_24_PM_1777100859553.png";

const services = [
  { title: "Website Development", desc: "From single-page sites to premium multi-page builds with booking, payments and SEO baked in.", priceFrom: "4,999", priceUnit: "one-time" },
  { title: "AI Automation", desc: "WhatsApp auto-replies, CRM pipelines, AI chatbots and appointment automation that work 24/7.", priceFrom: "5,000", priceUnit: "setup + ₹1,000/mo" },
  { title: "Marketing", desc: "Social media management, performance ads on Meta & Google, and Local SEO that ranks you higher.", priceFrom: "3,000", priceUnit: "per month" },
  { title: "Maintenance & Support", desc: "Hosting support, regular updates, performance monitoring and priority tech & automation care.", priceFrom: "999", priceUnit: "per month" },
];

const tiers = [
  { name: "Starter Pack", setup: "7,999", monthly: "999", popular: false, features: ["Basic website", "WhatsApp integration", "1 automation system", "Hosting support", "Minor edits"] },
  { name: "Business Growth", setup: "14,999", monthly: "2,999", popular: true, features: ["Standard website (4–6 pages)", "AI chatbot", "CRM automation", "Basic social media management", "Performance monitoring"] },
  { name: "Scale Pack", setup: "24,999+", monthly: "5,000", popular: false, features: ["Premium website (6–10 pages)", "Full automation system", "Ads management (spend separate)", "Priority support", "Multi-channel automation"] },
];

const addons = [
  { name: "Sales Funnel Setup", price: "5,000 – 15,000" },
  { name: "Landing Page", price: "3,000 – 7,000" },
  { name: "Copywriting", price: "2,000 – 5,000" },
  { name: "Branding Kit", price: "3,000 – 8,000" },
];

const processSteps = [
  { step: "01", title: "Free Audit", desc: "We analyze your current online presence and tell you exactly what's missing." },
  { step: "02", title: "Custom Plan", desc: "You pick a package. We plan everything out. No jargon." },
  { step: "03", title: "We Build", desc: "You relax. We deliver your website and set everything up." },
  { step: "04", title: "You Grow", desc: "Customers find you. Leads come in. We stick around to help." },
];

const faqs = [
  { q: "Do I need to be tech-savvy?", a: "Not at all. We handle everything. You just tell us about your business." },
  { q: "How long does a website take?", a: "Landing pages in 3–5 days. Full websites in 7–10 days." },
  { q: "Will my website work on mobile?", a: "Yes, always. Over 80% of your customers will visit from their phone." },
  { q: "What happens after the website is delivered?", a: "Small fixes are free. For ongoing updates and management, monthly plans from ₹2,000/month." },
  { q: "Do you work with businesses outside Gurugram?", a: "Yes, we work with businesses across India remotely." },
];

const tickerItems = [
  "Website Development", "AI Automation", "WhatsApp Marketing", "Google SEO",
  "Performance Ads", "CRM Automation", "Social Media", "Lead Generation",
  "AI Chatbots", "Business Growth",
];

// ─── Animated Counter ──────────────────────────────────────────────────────
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const duration = 1800;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOut(progress) * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, to]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─── Scroll Progress Bar ───────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX, width: "100%" }} />;
}

// ─── Pop Word Reveal ───────────────────────────────────────────────────────
function PopWords({ text, className = "", delay = 0, stagger = 0.07 }: {
  text: string; className?: string; delay?: number; stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ scale: 0.4, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 22,
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

// ─── Fade In on Scroll ─────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right";
}) {
  const yOffset = direction === "up" ? 30 : 0;
  const xOffset = direction === "left" ? -30 : direction === "right" ? 30 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Container ─────────────────────────────────────────────────────
function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Magnetic Button ───────────────────────────────────────────────────────
function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onClick={onClick} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Ticker / Marquee ──────────────────────────────────────────────────────
function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-y border-border py-4 bg-primary/5 relative">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {items.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-foreground/60">
            <span className="w-1.5 h-1.5 bg-primary rotate-45 shrink-0 inline-block" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Hero Visual ────────────────────────────────────────────────────────────
function HeroVisual() {
  const cards = [
    { icon: <MessageSquare className="w-4 h-4" />, label: "WhatsApp", title: "New lead just now", sub: "Auto-replied in 0.8s", pos: "top-0 -left-4", delay: 0.4 },
    { icon: <Star className="w-4 h-4 fill-current" />, label: "Google", title: "5.0 ★★★★★", sub: "+18 reviews this month", pos: "top-24 -right-4", delay: 0.55 },
    { icon: <TrendingUp className="w-4 h-4" />, label: "SEO", title: "+247% traffic", sub: "Ranked #1 locally", pos: "bottom-24 -left-6", delay: 0.7 },
    { icon: <Sparkles className="w-4 h-4" />, label: "AI Agent", title: "Booked 12 calls", sub: "While you slept", pos: "-bottom-2 -right-2", delay: 0.85 },
  ];

  return (
    <div className="relative w-full max-w-[460px] aspect-square">
      <div className="absolute inset-8 rounded-full bg-primary/15 blur-3xl" />

      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-primary/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
      </motion.div>

      <motion.div
        className="absolute inset-10 rounded-full border border-primary/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-primary/70 rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-primary/70 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute inset-20 rounded-full border-[1.5px] border-primary/60"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.15 }}
      >
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full" />
            <div className="relative w-32 h-32 bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_60px_rgba(245,197,24,0.35)]">
              <img src={echelonLogo} alt="" className="w-20 h-20 object-contain" />
            </div>
            <div className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
              Growth Engine
            </div>
          </div>
        </motion.div>
      </motion.div>

      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 22, delay: c.delay }}
          className={`absolute ${c.pos} z-20`}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            className="bg-card border border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.7)] px-4 py-3 min-w-[180px] backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
              <span className="text-primary">{c.icon}</span>
              {c.label}
            </div>
            <div className="font-serif font-bold text-base tracking-tight leading-tight text-foreground">{c.title}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{c.sub}</div>
          </motion.div>
        </motion.div>
      ))}

      <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        Live
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

        {/* Navigation */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"}`}
        >
          <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-serif font-bold text-xl tracking-tight z-50">
              <motion.img
                src={echelonLogo}
                alt="Echelon Studios"
                className="w-9 h-9 object-contain"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              Echelon Studios
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {["Services", "Pricing", "About", "Contact"].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="hover:text-primary transition-colors uppercase tracking-wider text-xs relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link href="/united-fc" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors uppercase tracking-wider text-xs">
                  United FC <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.46, duration: 0.5 }}
              >
                <MagneticButton>
                  <Button onClick={() => scrollTo("contact")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider text-xs px-6 py-5 rounded-none">
                    Get a Free Audit
                  </Button>
                </MagneticButton>
              </motion.div>
            </nav>

            <div className="md:hidden z-50">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {["Services", "Pricing", "About", "Contact"].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="font-serif text-3xl hover:text-primary transition-colors"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  {item}
                </motion.button>
              ))}
              <Link href="/united-fc" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center gap-2 font-serif text-3xl text-primary hover:text-primary/80 transition-colors">
                United FC <ArrowUpRight className="w-6 h-6" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,197,24,0.06)_0%,transparent_60%)]" />
            <div className="absolute inset-0 dark:hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
            <div className="absolute inset-0 dark:hidden bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgba(245,197,24,0.18)_0%,transparent_60%)]" />
            <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_60%_50%_at_60%_30%,rgba(245,197,24,0.08)_0%,transparent_60%)]" />
          </motion.div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-foreground/15 bg-foreground/[0.04] dark:bg-primary/5 dark:border-primary/30 text-foreground/80 dark:text-primary text-xs font-bold uppercase tracking-widest mb-8"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Trusted by businesses in Gurugram, Delhi &amp; Noida
                </motion.div>

                <h1 className="font-serif text-5xl sm:text-6xl md:text-[68px] xl:text-[88px] leading-[0.9] tracking-tighter font-bold mb-8">
                  <span style={{ display: "block", overflow: "hidden" }}>
                    <PopWords text="Your Business" delay={0.2} />
                  </span>
                  <span style={{ display: "block", overflow: "hidden" }}>
                    <PopWords text="Deserves to Be" delay={0.38} />
                  </span>
                  <span style={{ display: "inline-block", overflow: "visible", position: "relative" }}>
                    <PopWords text="Found." delay={0.56} className="text-primary" />
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-primary"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M0,5 Q50,10 100,2"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.95, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.72 }}
                  className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-light"
                >
                  We build high-converting websites, set up your Google presence, automate your WhatsApp, and use AI to grow your business — so you can focus on what you do best.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.88 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <MagneticButton>
                    <Button
                      onClick={() => scrollTo("contact")}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-lg font-bold rounded-none group flex items-center justify-between"
                    >
                      Let&apos;s Talk Growth
                      <ArrowUpRight className="ml-4 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </MagneticButton>
                  <Button
                    variant="outline"
                    onClick={() => scrollTo("services")}
                    className="h-16 px-10 text-lg font-medium rounded-none border-border hover:bg-muted"
                  >
                    View Services
                  </Button>
                </motion.div>
              </div>

              <div className="hidden lg:flex lg:col-span-5 items-center justify-center min-h-[560px] relative">
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <Ticker />

        {/* Stats Bar */}
        <section className="py-16 border-b border-border bg-card">
          <div className="container mx-auto px-6 md:px-12">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
              {[
                { value: 100, suffix: "%", label: "Client Satisfaction" },
                { value: 5, prefix: "₹", suffix: "K", label: "Starting from (website)" },
                { value: 24, suffix: "/7", label: "Automation Coverage" },
              ].map((stat, i) => (
                <StaggerItem key={i}>
                  <div className="font-serif text-4xl md:text-5xl font-black text-primary mb-2">
                    <Counter to={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">{stat.label}</div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-16 text-center max-w-3xl mx-auto">
                If they can&apos;t find you online,{" "}
                <span className="text-primary">they&apos;re calling your competitor.</span>
              </h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Customers can't find you", desc: "If you're not on Google, you don't exist. 80% of buyers search online before calling." },
                { title: "You're losing leads every day", desc: "No website means no credibility. Customers move on to whoever shows up first." },
                { title: "You're doing it all manually", desc: "Answering the same WhatsApp questions, following up by hand. There's a smarter way." },
              ].map((prob, i) => (
                <StaggerItem key={i}>
                  <TiltCard className="p-8 border border-border bg-card hover:border-primary/40 transition-colors duration-300 h-full">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary font-serif text-xl font-bold mb-6">
                      0{i + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{prob.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{prob.desc}</p>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-32 bg-card border-y border-border">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">What We Do</h2>
                <p className="text-xl text-muted-foreground">Everything you need to dominate your local market, under one roof.</p>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <StaggerItem key={i}>
                  <TiltCard className="group p-8 border border-border bg-background hover:border-primary/50 transition-colors duration-300 h-full">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 font-serif">{service.title}</h3>
                        <p className="text-muted-foreground mb-8">{service.desc}</p>
                      </div>
                      <div className="flex items-end justify-between gap-4 pt-6 border-t border-border">
                        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Starting From</span>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary leading-none">₹{service.priceFrom}</div>
                          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{service.priceUnit}</div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">No hidden fees. No endless retainers. Just clean, effective packages built for scale.</p>
            </FadeIn>

            <StaggerContainer className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {tiers.map((tier, i) => (
                <StaggerItem key={i}>
                  <TiltCard className={`relative p-8 md:p-10 border flex flex-col h-full ${tier.popular ? "border-primary shadow-[0_0_30px_rgba(245,197,24,0.12)] bg-background lg:scale-105 z-10" : "border-border bg-background/50"}`}>
                    {tier.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest">
                        Most Popular
                      </div>
                    )}
                    <h3 className="font-serif text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-bold">₹{tier.setup}</span>
                        <span className="text-sm text-muted-foreground uppercase tracking-wider">setup</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">+ ₹{tier.monthly}/month management</div>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {tier.features.map((feat, j) => (
                        <motion.li
                          key={j}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.07, duration: 0.4 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm">{feat}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <MagneticButton>
                      <Button
                        onClick={() => scrollTo("contact")}
                        className={`w-full h-14 font-bold uppercase tracking-wider rounded-none ${tier.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-transparent hover:bg-muted text-foreground"}`}
                      >
                        Get Started
                      </Button>
                    </MagneticButton>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Add-ons */}
            <FadeIn className="mt-20 max-w-4xl mx-auto">
              <div className="border border-border p-8 bg-card">
                <h3 className="font-serif text-2xl font-bold mb-8 text-center">Add-ons &amp; Extras</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {addons.map((addon, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                      <span className="font-medium">{addon.name}</span>
                      <span className="text-primary font-bold">₹{addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 bg-card border-y border-border overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Simple, fast, no-jargon process from start to results.</p>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-4 gap-0 relative">
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border z-0" />
              {processSteps.map((step, i) => (
                <StaggerItem key={i}>
                  <div className="flex flex-col items-center text-center px-6 relative z-10">
                    <motion.div
                      className="w-16 h-16 border-2 border-primary bg-background flex items-center justify-center font-serif text-2xl font-black text-primary mb-6"
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.step}
                    </motion.div>
                    <h3 className="font-serif text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <FadeIn direction="left">
                <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4 font-bold">About Us</div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  We&apos;re the team that gets Gurugram businesses{" "}
                  <span className="text-primary">found</span> online.
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Echelon Studios is a digital growth agency based in Gurugram. We combine web development, AI automation, and performance marketing to help local businesses compete online.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  No templates, no shortcuts. Everything is custom-built for your business, your customers, and your market.
                </p>
                <div className="space-y-3">
                  {[
                    "Custom websites — no WordPress, no templates",
                    "AI systems that work while you sleep",
                    "Honest pricing, no hidden retainers",
                    "Based in Gurugram, serving all of India",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <div className="w-1.5 h-1.5 bg-primary rotate-45 shrink-0" />
                      <span className="font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-primary/5 border border-primary/20" />
                  <div className="absolute inset-6 bg-card border border-border flex items-center justify-center">
                    <div className="text-center p-10">
                      <motion.img
                        src={echelonLogo}
                        alt="Echelon Studios"
                        className="w-24 h-24 object-contain mx-auto mb-8"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div className="font-serif text-2xl font-bold mb-2">Echelon Studios</div>
                      <div className="text-sm text-muted-foreground uppercase tracking-[0.25em] mb-6">Gurugram, India</div>
                      <div className="w-12 h-px bg-primary mx-auto mb-6" />
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Your Business Deserves to Be Found.
                      </p>
                    </div>
                  </div>
                  <motion.div
                    className="absolute -top-3 -right-3 w-6 h-6 bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-3 -left-3 w-6 h-6 border-2 border-primary"
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 bg-card border-y border-border">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <FadeIn className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border bg-background px-6">
                    <AccordionTrigger className="font-serif text-lg hover:text-primary hover:no-underline py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeIn className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">
                Ready to get <span className="text-primary">found online?</span>
              </h2>
              <p className="text-2xl text-muted-foreground mb-4">Let&apos;s talk about your business.</p>
              <p className="text-muted-foreground">Usually replies within an hour.</p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                {
                  icon: <MessageSquare className="w-7 h-7" />,
                  label: "WhatsApp",
                  value: "+91 98711 19813",
                  href: "https://wa.me/919871119813",
                  bg: "bg-[#25D366]",
                },
                {
                  icon: <Mail className="w-7 h-7" />,
                  label: "Email",
                  value: "echelon.studios.web@gmail.com",
                  href: "mailto:echelon.studios.web@gmail.com",
                  bg: "bg-primary",
                },
                {
                  icon: <MapPin className="w-7 h-7" />,
                  label: "Location",
                  value: "Gurugram, Haryana",
                  href: null,
                  bg: "bg-foreground",
                },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <TiltCard>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block p-8 border border-border bg-card hover:border-primary/50 transition-colors duration-300 group text-center">
                        <div className={`w-14 h-14 ${item.bg} text-white flex items-center justify-center mx-auto mb-5`}>
                          {item.icon}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{item.label}</div>
                        <div className="font-bold text-sm break-all group-hover:text-primary transition-colors">{item.value}</div>
                      </a>
                    ) : (
                      <div className="p-8 border border-border bg-card text-center">
                        <div className={`w-14 h-14 ${item.bg} text-background flex items-center justify-center mx-auto mb-5`}>
                          {item.icon}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{item.label}</div>
                        <div className="font-bold text-sm">{item.value}</div>
                      </div>
                    )}
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.3} className="text-center mt-16">
              <MagneticButton className="inline-block">
                <a
                  href="https://wa.me/919871119813"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-12 text-lg font-bold uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  Start on WhatsApp
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-[3px] border-primary bg-background pt-20 pb-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-20">
              <div>
                <div className="flex items-center gap-3 font-serif font-bold text-2xl tracking-tight mb-4">
                  <img src={echelonLogo} alt="Echelon Studios" className="w-10 h-10 object-contain" />
                  Echelon Studios
                </div>
                <p className="text-muted-foreground max-w-sm">Your Business Deserves to Be Found.</p>
              </div>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-6">Menu</h4>
                  <ul className="space-y-4 text-muted-foreground">
                    <li><button onClick={() => scrollTo("services")} className="hover:text-primary transition-colors">Services</button></li>
                    <li><button onClick={() => scrollTo("pricing")} className="hover:text-primary transition-colors">Pricing</button></li>
                    <li><button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About Us</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-6">Contact</h4>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Gurugram, India</li>
                    <li className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 shrink-0" /> echelon.studios.web@gmail.com</li>
                    <li>
                      <a href="https://wa.me/919871119813" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <MessageSquare className="w-4 h-4" /> +91 98711 19813
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© 2025 Echelon Studios. All rights reserved.</p>
              <p>Designed in Gurugram.</p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp */}
        <motion.a
          href="https://wa.me/919871119813"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-24 right-6 z-50 md:bottom-28 md:right-8 w-14 h-14 bg-[#25D366] flex items-center justify-center shadow-xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-[#25D366]"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <MessageSquare className="w-6 h-6 text-white relative z-10" />
        </motion.a>
      </div>
    </>
  );
}
