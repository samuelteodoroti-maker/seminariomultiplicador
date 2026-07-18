import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Music,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Menu,
  X,
  Star,
  Sparkles,
  Church,
  ArrowRight,
  MessageCircle,
  Compass,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#historia", label: "Nossa História" },
  { href: "#cursos", label: "Cursos" },
  { href: "#polos", label: "Polos e Parcerias" },
  { href: "#contato", label: "Contato" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
      <Nav />
      <main>
        <Hero />
        <History />
        <Courses />
        <Guide />
        <Hubs />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---------------- Reusable primitives ---------------- */

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
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20 transition-transform group-hover:scale-105 dark:bg-gold dark:text-gold-foreground dark:ring-gold/30">
            <Church className="h-5 w-5" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-base font-bold sm:text-lg">
              Seminário Multiplicador
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
              Teológico · Rio de Janeiro
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-full bg-primary px-4 text-primary-foreground shadow-sm hover:bg-primary/90 md:inline-flex dark:bg-gold dark:text-gold-foreground dark:hover:bg-gold/90"
          >
            <a href="#contato">
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
            className="mt-3 h-12 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 dark:bg-gold dark:text-gold-foreground dark:hover:bg-gold/90"
          >
            <a href="#contato" onClick={() => setOpen(false)}>
              Inscreva-se Já <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-border/70 bg-hero-pattern"
    >
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-70" />
      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-36 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <Badge
            variant="outline"
            className="mb-8 rounded-full border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-gold" />
            Formação Ministerial · Desde 2019
          </Badge>

          <h1 className="font-display text-[2.5rem] font-bold leading-[1.02] tracking-tight text-balance text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            Seminário Teológico{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent dark:from-gold dark:to-gold/70">
                Multiplicador
              </span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 -skew-x-6 bg-gold/40 dark:bg-gold/25" />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
            O lugar ideal para você investir em seu chamado.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-primary px-7 text-[15px] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 dark:bg-gold dark:text-gold-foreground dark:shadow-gold/20 dark:hover:bg-gold/90"
            >
              <a href="#cursos">
                Ver Cursos Disponíveis
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-background/70 px-7 text-[15px] backdrop-blur transition-colors hover:bg-accent"
            >
              <a href="#historia">Conheça Nossa História</a>
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
        "Em março de 2019 nascia o Seminário Multiplicador, com um chamado claro: preparar vocacionados com profundidade bíblica e dependência do Espírito Santo.",
    },
    {
      year: "2021",
      title: "Expansão para novos polos",
      body:
        "A obra cresceu e novos polos foram estabelecidos, ampliando o alcance da formação teológica no Rio de Janeiro.",
    },
    {
      year: "2024+",
      title: "Estrutura consolidada",
      body:
        "Hoje operamos com sede administrativa em Bangu, polo em Campo Grande e ensino a distância em parceria com universidades reconhecidas.",
    },
  ];

  return (
    <section id="historia" className="border-b border-border/70 py-24 sm:py-32">
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
                  em Padre Miguel, o Seminário Multiplicador tem se expandido
                  para servir vocacionados em toda a região metropolitana do
                  Rio de Janeiro.
                </>
              }
            />
            <blockquote className="mt-10 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/10 to-transparent p-7 dark:from-gold/5">
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
              <li key={t.year} className="relative">
                <span className="absolute -left-[38px] top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-gold bg-background shadow-sm lg:-left-[51px]">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>
                <Card className="border-border/70 bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md hover:shadow-gold/5">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-display text-3xl font-bold tracking-tight text-primary dark:text-gold">
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Courses ---------------- */

const COURSES = [
  {
    icon: BookOpen,
    title: "Teologia Cristã",
    subtitle: "Sistemática e Bíblica",
    body:
      "Uma bússola que guiará na jornada do seu chamado, ajudando a explorar o mundo espiritual, mergulhar nas escrituras sagradas e decifrar os fundamentos teológicos.",
  },
  {
    icon: GraduationCap,
    title: "Educação Cristã",
    subtitle: "Formação de líderes",
    body:
      "Uma jornada enriquecedora destinada a fortalecer os fundamentos espirituais, nutrir a fé e capacitar líderes para viver e ensinar como Jesus.",
  },
  {
    icon: Music,
    title: "Ministério de Adoração",
    subtitle: "Adoração como estilo de vida",
    body:
      "Um curso especial focado na adoração a Deus como estilo de vida, explorando os caminhos que levam a uma conexão mais profunda e à liderança musical autêntica.",
  },
];

function Courses() {
  return (
    <section
      id="cursos"
      className="relative border-b border-border/70 bg-cream/40 py-24 dark:bg-card/25 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Nossos Cursos"
          title="Professores qualificados. Um ambiente que investe em sua vida."
          description="Três programas centrais para formar ministros com profundidade bíblica, sensibilidade espiritual e excelência acadêmica."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(({ icon: Icon, title, subtitle, body }, i) => (
            <Card
              key={title}
              className="group relative flex flex-col overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-gold/5"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardContent className="flex flex-1 flex-col p-7 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground dark:bg-gold/15 dark:text-gold dark:group-hover:bg-gold dark:group-hover:text-gold-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-3xl font-bold text-muted-foreground/40">
                    0{i + 1}
                  </span>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {subtitle}
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-balance">
                  {title}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  {body}
                </p>
                <a
                  href="#guia"
                  className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/70 dark:text-gold dark:hover:text-gold/80"
                >
                  Descobrir se é pra mim
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Interactive Guide ---------------- */

type GoalKey = "pastoral" | "louvor" | "educacao";
type ModeKey = "presencial" | "ead";

const GOALS: { key: GoalKey; label: string; icon: typeof BookOpen }[] = [
  { key: "pastoral", label: "Pastoral / Teológico", icon: BookOpen },
  { key: "louvor", label: "Louvor / Adoração", icon: Music },
  { key: "educacao", label: "Educação Cristã", icon: GraduationCap },
];

const MODES: { key: ModeKey; label: string; hint: string }[] = [
  { key: "presencial", label: "Presencial", hint: "Encontros na sede/polos" },
  { key: "ead", label: "A Distância — EaD", hint: "Aulas online e flexíveis" },
];

const RECOMMENDATIONS: Record<GoalKey, { title: string; body: string }> = {
  pastoral: {
    title: "Bacharel em Teologia Cristã",
    body:
      "Nosso programa de Teologia Sistemática e Bíblica é o caminho ideal para quem sente o chamado pastoral e ministerial.",
  },
  louvor: {
    title: "Ministério de Adoração",
    body:
      "Um curso desenhado para levitas e líderes de louvor que desejam profundidade espiritual e excelência na liderança musical.",
  },
  educacao: {
    title: "Educação Cristã",
    body:
      "Formação sólida para quem deseja ensinar a fé com clareza, servir na escola bíblica, no discipulado e na liderança educacional da igreja.",
  },
};

function Guide() {
  const [goal, setGoal] = useState<GoalKey | null>(null);
  const [mode, setMode] = useState<ModeKey | null>(null);
  const done = goal && mode;
  const rec = goal ? RECOMMENDATIONS[goal] : null;
  const steps = (goal ? 1 : 0) + (mode ? 1 : 0);
  const progress = (steps / 2) * 100;

  const waMsg = encodeURIComponent(
    done
      ? `Olá! Tenho interesse em ${RECOMMENDATIONS[goal!].title} (${mode === "ead" ? "EaD" : "Presencial"}).`
      : "Olá! Gostaria de saber mais sobre os cursos do Seminário Multiplicador.",
  );

  return (
    <section id="guia" className="border-b border-border/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              <Compass className="h-3.5 w-3.5" />
              Guia Interativo
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] text-balance sm:text-4xl md:text-5xl">
              Descubra seu Caminho Ministerial
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Responda duas perguntas e receba uma recomendação personalizada
              de curso alinhada ao seu chamado e à sua realidade.
            </p>

            <div className="mt-8 hidden space-y-3 lg:block">
              {[
                "Sem cadastro, sem compromisso",
                "Resposta imediata via WhatsApp",
                "Consultor qualificado",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <Card className="border-border/70 bg-card shadow-sm">
            <CardContent className="space-y-8 p-6 sm:p-8">
              {/* Progress */}
              <div>
                <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <span>Passo {steps} de 2</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-[width] duration-500 dark:from-gold dark:to-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary dark:bg-gold/15 dark:text-gold">
                    1
                  </span>
                  <h3 className="font-display text-lg font-semibold">
                    Qual é o seu objetivo ministerial?
                  </h3>
                </div>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  {GOALS.map(({ key, label, icon: Icon }) => {
                    const active = goal === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setGoal(key)}
                        aria-pressed={active}
                        className={cn(
                          "group flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all duration-200",
                          active
                            ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20 dark:border-gold dark:bg-gold/10 dark:ring-gold/25"
                            : "border-border hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40 dark:hover:border-gold/40",
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-9 w-9 place-items-center rounded-lg transition-colors",
                            active
                              ? "bg-primary text-primary-foreground dark:bg-gold dark:text-gold-foreground"
                              : "bg-muted text-muted-foreground group-hover:bg-accent",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold leading-snug">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary dark:bg-gold/15 dark:text-gold">
                    2
                  </span>
                  <h3 className="font-display text-lg font-semibold">
                    Qual sua preferência de modalidade?
                  </h3>
                </div>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {MODES.map(({ key, label, hint }) => {
                    const active = mode === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setMode(key)}
                        aria-pressed={active}
                        className={cn(
                          "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all duration-200",
                          active
                            ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20 dark:border-gold dark:bg-gold/10 dark:ring-gold/25"
                            : "border-border hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40 dark:hover:border-gold/40",
                        )}
                      >
                        <span className="text-sm font-semibold">{label}</span>
                        <span className="text-xs text-muted-foreground">{hint}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {done && rec && (
                <div className="animate-fade-up rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/12 via-transparent to-primary/12 p-6 sm:p-7">
                  <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                    <CheckCircle2 className="h-4 w-4" />
                    Recomendação para você
                  </div>
                  <h4 className="font-display text-2xl font-bold text-balance">
                    {rec.title}
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                    {rec.body} Modalidade escolhida:{" "}
                    <span className="font-semibold text-foreground">
                      {mode === "ead" ? "A Distância (EaD)" : "Presencial"}
                    </span>
                    .
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 h-12 rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/25 hover:bg-[#20b858]"
                  >
                    <a
                      href={`https://wa.me/5521971803049?text=${waMsg}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Falar com Consultor no WhatsApp
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Hubs ---------------- */

const HUBS = [
  {
    tag: "Sede Administrativa",
    name: "Polo Teológico Bangu",
    address: "Av. Santa Cruz, 6197 — Bangu, Rio de Janeiro — RJ",
    note: "Em parceria com a Igreja Batista Nova Betel.",
  },
  {
    tag: "Polo Regional",
    name: "Polo Campo Grande",
    address: "Rua Pampeiro, 373 — Campo Grande, RJ",
    note: "Em parceria com a Igreja Batista Nova Bereira.",
  },
  {
    tag: "Ensino a Distância",
    name: "Polo EaD",
    address: "Aulas online com plataformas universitárias parceiras.",
    note: "Formação flexível com certificação reconhecida.",
  },
];

const PARTNERS = [
  "Cruzeiro do Sul Virtual",
  "UNIFIL — Universidade Filadélfia",
  "UNOESTE — Universidade do Oeste Paulista",
];

function Hubs() {
  return (
    <section
      id="polos"
      className="border-b border-border/70 bg-cream/40 py-24 dark:bg-card/25 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Polos e Parcerias"
          title="Uma estrutura pensada para o seu chamado."
          description="Formação presencial em polos estratégicos e ensino a distância com o respaldo de universidades reconhecidas."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {HUBS.map((h) => (
            <Card
              key={h.name}
              className="group border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-7">
                <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {h.tag}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-balance">
                  {h.name}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  {h.address}
                </p>
                <div className="mt-5 rounded-lg border border-dashed border-border bg-background/50 p-3 text-xs italic text-muted-foreground">
                  {h.note}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Parcerias Universitárias — EaD
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-balance sm:text-3xl">
              Formação a distância com respaldo acadêmico
            </h3>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-gold/60"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <p className="font-display text-sm font-semibold leading-snug text-balance">
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  return (
    <section id="contato" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-primary/85 p-8 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-12 lg:p-16 dark:from-card dark:via-card dark:to-background dark:shadow-black/30">
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
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] text-balance sm:text-4xl md:text-5xl">
                Dê o próximo passo em seu chamado.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/80 text-pretty sm:text-lg">
                Fale com nossa equipe pelo WhatsApp, e-mail ou visite nossa
                sede em Bangu. Teremos alegria em atender você.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-gold px-6 text-gold-foreground shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5 hover:bg-gold/90"
                >
                  <a
                    href="https://wa.me/5521971803049"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-primary-foreground/25 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <a href="mailto:contato@setemrj.com.br">
                    <Mail className="mr-2 h-4 w-4" /> Enviar E-mail
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ContactItem icon={Phone} title="Telefone / WhatsApp">
                (21) 97180-3049
              </ContactItem>
              <ContactItem icon={Mail} title="E-mail">
                contato@setemrj.com.br
              </ContactItem>
              <ContactItem icon={MapPin} title="Endereço" wide>
                Av. de Santa Cruz, 6197
                <br />
                Bangu, Rio de Janeiro — RJ · CEP 21820-020
              </ContactItem>
              <ContactItem icon={Clock} title="Atendimento" wide>
                A partir de segunda-feira, 14:00
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
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm dark:bg-gold dark:text-gold-foreground">
                <Church className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base font-bold">
                  Seminário Multiplicador
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
                <Mail className="h-4 w-4 text-gold" /> contato@setemrj.com.br
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
          <p>Atendimento a partir de segunda-feira, 14:00</p>
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
