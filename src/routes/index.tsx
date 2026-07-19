import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";
import {
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Menu,
  X,
  Star,
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Calendar,
  Award,
  Building2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-multiplicador.png.asset.json";
import logoLightAsset from "@/assets/logo-multiplicador-light.webp.asset.json";
import logoDarkAsset from "@/assets/logo-multiplicador-dark.webp.asset.json";
import abibetAsset from "@/assets/abibet-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const INSCRICAO_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd_FXumqagFpFB14oDqXOgmRRNaQliiftQqzplHdrx6uC4hhw/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#historia", label: "Nossa História" },
  { href: "#cursos", label: "Curso" },
  { href: "#polos", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

const SECTION_IDS = ["home", "historia", "cursos", "polos", "contato"];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <History />
        <Courses />
        <Hubs />
        <Affiliation />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---------------- Active section hook ---------------- */

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ---------------- Scroll reveal ---------------- */

function Reveal({
  as: Tag = "div",
  className,
  delay = 0,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Scroll progress ---------------- */

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-gold via-primary to-gold transition-[width] duration-150 ease-out"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

/* ---------------- Reusable primitives ---------------- */

function LogoMark({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light" | "dark";
}) {
  // Unified brand mark — use the official logo everywhere.
  void variant;
  void logoLightAsset;
  void logoDarkAsset;
  const src = logoAsset.url;

  return (
    <img
      src={src}
      alt="Seminário Teológico Batista Multiplicador"
      className={cn("object-contain", className)}
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="h-px w-8 bg-gold" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
        {children}
      </span>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

/* ---------------- Navigation ---------------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-[0_1px_0_0_color-mix(in_oklab,var(--foreground)_4%,transparent)] backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="group flex min-w-0 items-center gap-3 rounded-lg"
        >
          <LogoMark className="h-11 w-11 shrink-0 transition-transform group-hover:scale-105" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-base font-bold sm:text-lg">
              <span className="sm:hidden">STBM Multiplicador</span>
              <span className="hidden sm:inline">Seminário Teológico Batista Multiplicador</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
              Teológico · Rio de Janeiro
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold transition-all duration-300",
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-full bg-primary px-4 text-primary-foreground shadow-sm hover:bg-primary/90 sm:inline-flex"
          >
            <a href={INSCRICAO_URL} target="_blank" rel="noreferrer">
              Inscreva-se <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card/50 backdrop-blur transition-colors hover:bg-accent lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-lg transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[500px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
            >
              {item.label}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
          <Button
            asChild
            size="lg"
            className="mt-3 h-12 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <a href={INSCRICAO_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              Inscreva-se Já <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-border/70 bg-hero-pattern"
    >
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-70" />
      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-36 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <LogoMark variant="light" className="mx-auto mb-8 h-24 w-24 rounded-full bg-white p-3 shadow-xl shadow-primary/20 ring-1 ring-border dark:bg-white/95 dark:ring-white/20 sm:h-28 sm:w-28" />

          <Badge
            variant="outline"
            className="mb-8 rounded-full border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-gold" />
            Formação Ministerial · Desde 2019
          </Badge>

          <h1 className="font-display text-[2.25rem] font-bold leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            Seminário Teológico Batista{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Multiplicador
              </span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 -skew-x-6 rounded-sm bg-gold/40" />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
            O lugar ideal para você investir em seu chamado.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-primary px-7 text-[15px] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30"
            >
              <a href={INSCRICAO_URL} target="_blank" rel="noreferrer">
                Inscreva-se Já
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-background/70 px-7 text-[15px] backdrop-blur transition-colors hover:bg-accent"
            >
              <a href="#cursos">Ver Curso</a>
            </Button>
          </div>

          <div className="mx-auto mt-12 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 shadow-sm backdrop-blur">
            <div className="flex items-center gap-0.5 text-gold" aria-label="5 estrelas">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              Avaliação 5.0 no Google
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · Aprovado por nossos alunos
            </span>
          </div>
        </div>

        <a
          href="#historia"
          aria-label="Rolar para a próxima seção"
          className="mx-auto mt-14 hidden h-11 w-11 place-items-center rounded-full border border-border/70 bg-card/70 text-muted-foreground backdrop-blur transition-colors hover:border-gold/60 hover:text-gold sm:grid"
        >
          <ChevronDown className="h-5 w-5 animate-scroll-cue" />
        </a>
      </div>
    </section>
  );
}

/* ---------------- Pillars strip ---------------- */

function Pillars() {
  const items = [
    { k: "2019", v: "Ano de fundação", Icon: Calendar },
    { k: "100%", v: "Ensino presencial", Icon: GraduationCap },
    { k: "5.0★", v: "Avaliação no Google", Icon: Award },
    { k: "Bangu", v: "Sede única — RJ", Icon: Building2 },
  ];
  return (
    <section aria-label="Destaques institucionais" className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-4 sm:divide-y-0">
          {items.map((it, i) => (
            <Reveal
              key={it.k}
              delay={i * 80}
              className="group px-4 py-6 text-center sm:py-8"
            >
              <div className="mx-auto mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-primary-foreground">
                <it.Icon className="h-5 w-5" />
              </div>
              <dt className="font-display text-2xl font-bold text-primary sm:text-3xl">
                {it.k}
              </dt>
              <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                {it.v}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- History ---------------- */

function History() {
  const timeline = [
    {
      year: "2019",
      title: "O início em Padre Miguel",
      body:
        "Em março de 2019 nascia o Seminário Teológico Batista Multiplicador, com um chamado claro: preparar vocacionados com profundidade bíblica e dependência do Espírito Santo.",
    },
    {
      year: "2021",
      title: "Consolidação da formação",
      body:
        "A obra amadureceu, com turmas consolidadas e uma comunidade crescente de vocacionados comprometidos com a Palavra.",
    },
    {
      year: "2024+",
      title: "Nova sede em Bangu",
      body:
        "Hoje toda a formação está centralizada na nossa sede em Bangu, em parceria com a Igreja Batista Nova Betel — um ambiente único dedicado ao seu chamado.",
    },
  ];

  return (
    <section id="historia" className="scroll-mt-24 border-b border-border/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="Nossa História"
              title="Uma trajetória de fidelidade e crescimento."
              description={
                <>
                  Fundado em{" "}
                  <span className="font-semibold text-foreground">
                    março de 2019
                  </span>{" "}
                  em Padre Miguel, o Seminário Teológico Batista Multiplicador tem se expandido
                  para servir vocacionados em toda a região metropolitana do
                  Rio de Janeiro.
                </>
              }
            />
            <blockquote className="mt-10 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/10 to-transparent p-7">
              <div className="mb-3 font-display text-4xl leading-none text-gold">
                “
              </div>
              <p className="font-display text-lg italic leading-relaxed text-foreground text-pretty">
                Preparar vocacionados para o ministério cristão com dependência
                total do Espírito Santo de Deus, levando a Bíblia como regra
                de fé e prática, cooperando com o Seu Reino e preparando
                ministros.
              </p>
              <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                — Nossa Missão
              </footer>
            </blockquote>
          </div>

          <ol className="relative space-y-5 border-l border-dashed border-border pl-7 lg:pl-10">
            {timeline.map((t, i) => (
              <Reveal as="li" delay={i * 120} key={t.year} className="relative">
                <span className="absolute -left-[38px] top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-gold bg-background shadow-sm lg:-left-[51px]">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>
                <Card className="border-border/70 bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md hover:shadow-gold/5">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-display text-3xl font-bold tracking-tight text-primary">
                        {t.year}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Marco {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold text-balance">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                      {t.body}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Courses ---------------- */

const COURSE_HIGHLIGHTS = [
  "Teologia Sistemática e Bíblica",
  "Professores qualificados e experientes",
  "Ensino presencial em Bangu — RJ",
  "Ambiente acolhedor e dedicado ao seu chamado",
];

function Courses() {
  return (
    <section
      id="cursos"
      className="relative scroll-mt-24 border-b border-border/70 bg-cream/40 py-24 dark:bg-card/25 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Nosso Curso"
          title="Teologia Cristã — Sistemática e Bíblica."
          description="Professores qualificados e um ambiente especial que investe de verdade em sua vida ministerial."
        />

        <div className="mx-auto mt-16 max-w-4xl">
          <Card className="group relative overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardContent className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
              <div className="flex flex-col items-start gap-6">
                <div className="inline-grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <BookOpen className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Programa Principal
                  </p>
                  <h3 className="mt-1.5 font-display text-3xl font-bold text-balance sm:text-4xl">
                    Teologia Cristã
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    Sistemática e Bíblica
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty sm:text-base">
                  Uma bússola que guiará na jornada do seu chamado, ajudando a
                  explorar o mundo espiritual, mergulhar nas escrituras sagradas
                  e decifrar os fundamentos teológicos com profundidade,
                  sensibilidade espiritual e excelência acadêmica.
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {COURSE_HIGHLIGHTS.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <a href={INSCRICAO_URL} target="_blank" rel="noreferrer">
                      Inscreva-se agora
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-border bg-background px-6 hover:bg-accent"
                  >
                    <a
                      href="https://wa.me/5521971803049?text=Ol%C3%A1%21%20Tenho%20interesse%20no%20curso%20de%20Teologia%20Crist%C3%A3."
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Tirar dúvidas
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Location ---------------- */

function Hubs() {
  return (
    <section
      id="polos"
      className="scroll-mt-24 border-b border-border/70 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Nossa Localização"
          title="Um só endereço, dedicado ao seu chamado."
          description="Toda a nossa formação acontece de forma presencial em Bangu, em parceria com a Igreja Batista Nova Betel."
        />

        <div className="mx-auto mt-14 max-w-4xl">
          <Card className="group overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-primary/5">
            <CardContent className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
              <div className="inline-grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Sede Única — Presencial
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-balance sm:text-3xl">
                  Seminário Teológico Batista Multiplicador — Bangu
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  Av. Santa Cruz, 6197 — Bangu, Rio de Janeiro — RJ
                  <br />
                  CEP 21820-020
                </p>
                <div className="mt-5 rounded-lg border border-dashed border-border bg-background/50 p-3 text-xs italic text-muted-foreground">
                  Em parceria com a Igreja Batista Nova Betel.
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <a href={INSCRICAO_URL} target="_blank" rel="noreferrer">
                      Inscreva-se agora
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-border bg-background px-6 hover:bg-accent"
                  >
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Av.+Santa+Cruz+6197+Bangu+Rio+de+Janeiro"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver no mapa
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Affiliation ---------------- */

function Affiliation() {
  return (
    <section
      aria-label="Filiação institucional"
      className="border-b border-border/70 bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center gap-8 rounded-3xl border border-border/70 bg-card/50 p-8 text-center shadow-sm sm:p-10 md:flex-row md:text-left">
          <a
            href="https://abibet.org.br"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl bg-white p-4 shadow-sm ring-1 ring-border transition-transform hover:scale-[1.02]"
            aria-label="ABIBET — Associação Brasileira de Instituições Batistas de Ensino Teológico"
          >
            <img
              src={abibetAsset.url}
              alt="ABIBET — Associação Brasileira de Instituições Batistas de Ensino Teológico"
              className="h-16 w-auto object-contain sm:h-20"
            />
          </a>
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Filiação Institucional
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-balance sm:text-2xl">
              Membro da ABIBET
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground text-pretty">
              O Seminário Teológico Batista Multiplicador é filiado à{" "}
              <span className="font-semibold text-foreground">
                Associação Brasileira de Instituições Batistas de Ensino
                Teológico
              </span>
              , referência nacional em excelência acadêmica e integridade
              doutrinária na formação ministerial batista.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  return (
    <section id="contato" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-primary/85 p-8 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-12 lg:p-16 dark:from-card dark:via-card dark:to-background dark:shadow-black/30 dark:[--primary-foreground:oklch(0.96_0.008_210)]">
          {/* Decorative */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2.5">
                <span className="h-px w-8 bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                  Contato
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] text-balance text-white drop-shadow-sm sm:text-4xl md:text-5xl dark:text-primary-foreground">
                Dê o próximo passo em seu chamado.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 text-pretty sm:text-lg dark:text-primary-foreground/80">
                Fale com nossa equipe pelo WhatsApp, e-mail ou visite nossa
                sede em Bangu. Teremos alegria em atender você.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-gold px-6 text-gold-foreground shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5 hover:bg-gold/90"
                >
                  <a href={INSCRICAO_URL} target="_blank" rel="noreferrer">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Inscreva-se Já
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-primary-foreground/25 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <a
                    href="https://wa.me/5521971803049"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ContactItem icon={Phone} title="Telefone / WhatsApp">
                (21) 97180-3049
              </ContactItem>
              <ContactItem icon={Mail} title="E-mail">
                contato@multiplicadorrj.com.br
              </ContactItem>
              <ContactItem icon={MapPin} title="Endereço" wide>
                Av. de Santa Cruz, 6197
                <br />
                Bangu, Rio de Janeiro — RJ · CEP 21820-020
              </ContactItem>
              <ContactItem icon={Clock} title="Atendimento" wide>
                Terça a sábado, a partir das 14h
              </ContactItem>
              <ContactItem icon={Calendar} title="Aulas" wide>
                Terças, quintas e sábados — período noturno
              </ContactItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  title,
  children,
  wide = false,
}: {
  icon: typeof Phone;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-5 backdrop-blur transition-colors hover:bg-primary-foreground/10",
        wide && "sm:col-span-2",
      )}
    >
      <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-gold/20 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
        {title}
      </p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-primary-foreground">
        {children}
      </p>
    </div>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-12 w-12" />
              <div className="leading-tight">
                <p className="font-display text-base font-bold">
                  Seminário Teológico Batista Multiplicador
                </p>
                <p className="text-xs text-muted-foreground">
                  Formação bíblica e ministerial
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              O lugar ideal para você investir em seu chamado — desde 2019, no
              Rio de Janeiro.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Navegação
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-foreground/80 transition-colors hover:text-gold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Fale conosco
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" /> (21) 97180-3049
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" /> contato@multiplicadorrj.com.br
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Av. de Santa Cruz, 6197 — Bangu, RJ
              </li>
            </ul>
            <a
              href="https://instagram.com/seminario_multiplicador"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
              @seminario_multiplicador
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Copyright Seminário Teológico
            Multiplicador. Todos os direitos reservados.
          </p>
          <p>Atendimento de terça a sábado, a partir das 14h · Aulas terças, quintas e sábados (noite)</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating WhatsApp ---------------- */

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5521971803049"
      target="_blank"
      rel="noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-[#20b858] active:scale-95"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20 group-hover:opacity-0" />
    </a>
  );
}
