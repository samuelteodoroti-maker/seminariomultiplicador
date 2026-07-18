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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Nav />
      <Hero />
      <History />
      <Courses />
      <Guide />
      <Hubs />
      <Contact />
      <Footer />
      <a
        href="https://wa.me/5521971803049"
        target="_blank"
        rel="noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Church className="h-5 w-5" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-base font-bold sm:text-lg">
              Seminário Multiplicador
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Teológico · Rio de Janeiro
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
            className="hidden bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 md:inline-flex"
          >
            <a href="#contato">Inscreva-se</a>
          </Button>
          <button
            aria-label="Abrir menu"
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3">
              <ThemeToggle />
              <Button asChild className="flex-1">
                <a href="#contato" onClick={() => setOpen(false)}>
                  Inscreva-se Já
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border bg-hero-pattern"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="outline"
            className="mb-6 border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-gold" />
            Formação Ministerial · Desde 2019
          </Badge>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Seminário Teológico{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary dark:text-gold">
                Multiplicador
              </span>
              <span className="absolute inset-x-0 bottom-1 h-3 -skew-x-6 bg-gold/40 dark:bg-gold/25" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            O lugar ideal para você investir em seu chamado.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-primary px-6 text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <a href="#cursos">
                Ver Cursos Disponíveis <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-border bg-background/60 px-6 backdrop-blur"
            >
              <a href="#historia">Conheça Nossa História</a>
            </Button>
          </div>

          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 shadow-sm backdrop-blur">
            <div className="flex items-center gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              Avaliação 5.0 no Google
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section id="historia" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Nossa História
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Uma trajetória de fidelidade e crescimento.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Fundado em <span className="font-semibold text-foreground">março de 2019</span>{" "}
              em Padre Miguel, o Seminário Multiplicador tem se expandido para servir vocacionados
              em toda a região metropolitana do Rio de Janeiro.
            </p>
            <blockquote className="mt-8 border-l-4 border-gold bg-cream/60 p-6 dark:bg-card">
              <p className="font-display text-lg italic leading-relaxed text-foreground">
                “Preparar vocacionados para o ministério cristão com dependência total do
                Espírito Santo de Deus, levando a Bíblia como regra de fé e prática, cooperando
                com o Seu Reino e preparando ministros.”
              </p>
              <footer className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                — Nossa Missão
              </footer>
            </blockquote>
          </div>

          <ol className="relative space-y-6 border-l border-border pl-6 lg:pl-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[34px] top-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-gold bg-background lg:-left-[42px]">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>
                <Card className="border-border/70 transition-colors hover:border-gold/50">
                  <CardContent className="p-6">
                    <div className="mb-2 font-display text-2xl font-bold text-primary dark:text-gold">
                      {t.year}
                    </div>
                    <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
    <section id="cursos" className="border-b border-border bg-cream/40 py-20 dark:bg-card/30 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Nossos Cursos
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Professores qualificados. Um ambiente que investe em sua vida.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Três programas centrais para formar ministros com profundidade bíblica, sensibilidade
            espiritual e excelência acadêmica.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(({ icon: Icon, title, subtitle, body }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-gold to-primary opacity-0 transition-opacity group-hover:opacity-100 dark:from-gold dark:via-primary dark:to-gold" />
              <CardContent className="p-7">
                <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-gold/15 dark:text-gold dark:group-hover:bg-gold dark:group-hover:text-gold-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {subtitle}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
                <a
                  href="#guia"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/70 dark:text-gold dark:hover:text-gold/80"
                >
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

type GoalKey = "pastoral" | "louvor" | "educacao";
type ModeKey = "presencial" | "ead";

const GOALS: { key: GoalKey; label: string; icon: typeof BookOpen }[] = [
  { key: "pastoral", label: "Pastoral / Teológico", icon: BookOpen },
  { key: "louvor", label: "Louvor / Adoração", icon: Music },
  { key: "educacao", label: "Educação Cristã", icon: GraduationCap },
];

const MODES: { key: ModeKey; label: string }[] = [
  { key: "presencial", label: "Presencial" },
  { key: "ead", label: "A Distância — EaD" },
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

  const waMsg = encodeURIComponent(
    done
      ? `Olá! Tenho interesse em ${RECOMMENDATIONS[goal!].title} (${mode === "ead" ? "EaD" : "Presencial"}).`
      : "Olá! Gostaria de saber mais sobre os cursos do Seminário Multiplicador.",
  );

  return (
    <section id="guia" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              <Compass className="h-3.5 w-3.5" />
              Guia Ministerial Interativo
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Descubra seu Caminho Ministerial
            </h2>
            <p className="mt-4 text-muted-foreground">
              Responda duas perguntas e receba uma recomendação personalizada de curso alinhada
              ao seu chamado e à sua realidade.
            </p>
          </div>

          <Card className="border-border bg-card shadow-sm">
            <CardContent className="space-y-8 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pergunta 1
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  Qual é o seu objetivo ministerial?
                </h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {GOALS.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setGoal(key)}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all",
                        goal === key
                          ? "border-primary bg-primary/5 dark:border-gold dark:bg-gold/10"
                          : "border-border hover:border-primary/40 dark:hover:border-gold/40",
                      )}
                    >
                      <Icon className={cn("h-5 w-5", goal === key ? "text-primary dark:text-gold" : "text-muted-foreground")} />
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pergunta 2
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  Qual sua preferência de modalidade?
                </h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {MODES.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setMode(key)}
                      className={cn(
                        "rounded-xl border p-4 text-left text-sm font-semibold transition-all",
                        mode === key
                          ? "border-primary bg-primary/5 dark:border-gold dark:bg-gold/10"
                          : "border-border hover:border-primary/40 dark:hover:border-gold/40",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {done && rec && (
                <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-transparent to-primary/10 p-6">
                  <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                    <CheckCircle2 className="h-4 w-4" /> Recomendação para você
                  </div>
                  <h4 className="font-display text-2xl font-bold">{rec.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {rec.body} Modalidade escolhida:{" "}
                    <span className="font-semibold text-foreground">
                      {mode === "ead" ? "A Distância (EaD)" : "Presencial"}
                    </span>
                    .
                  </p>
                  <Button
                    asChild
                    className="mt-5 bg-[#25D366] text-white hover:bg-[#20b858]"
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
    <section id="polos" className="border-b border-border bg-cream/40 py-20 dark:bg-card/30 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Polos e Parcerias
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Uma estrutura pensada para o seu chamado.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {HUBS.map((h) => (
            <Card key={h.name} className="border-border bg-card transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-7">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                  {h.tag}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold">{h.name}</h3>
                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-gold" />
                  <span>{h.address}</span>
                </div>
                <p className="mt-3 text-sm italic text-muted-foreground">{h.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-display text-xl font-semibold">
              Parcerias Universitárias — EaD
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Formação a distância com o respaldo de instituições reconhecidas.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="flex items-center justify-center rounded-2xl border border-border bg-background p-6 text-center transition-colors hover:border-gold/60"
              >
                <div>
                  <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <p className="font-display text-sm font-semibold">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/85 p-8 text-primary-foreground shadow-xl sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16 dark:from-card dark:to-background">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Contato
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Dê o próximo passo em seu chamado.
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Fale com nossa equipe pelo WhatsApp, e-mail ou visite nossa sede em Bangu.
              Teremos alegria em atender você.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-gold text-gold-foreground hover:bg-gold/90"
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
                className="h-12 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="mailto:contato@setemrj.com.br">
                  <Mail className="mr-2 h-4 w-4" /> Enviar E-mail
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ContactItem icon={Phone} title="Telefone / WhatsApp">
              (21) 97180-3049
            </ContactItem>
            <ContactItem icon={Mail} title="E-mail">
              contato@setemrj.com.br
            </ContactItem>
            <ContactItem icon={MapPin} title="Endereço">
              Av. de Santa Cruz, 6197
              <br />
              Bangu, Rio de Janeiro — RJ
              <br />
              CEP 21820-020
            </ContactItem>
            <ContactItem icon={Clock} title="Atendimento">
              A partir de segunda-feira, 14:00
            </ContactItem>
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
}: {
  icon: typeof Phone;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur">
      <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-gold/20 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/70">
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-primary-foreground">{children}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Church className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-bold">
                Seminário Teológico Multiplicador
              </p>
              <p className="text-xs text-muted-foreground">
                Formação bíblica e ministerial · Rio de Janeiro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/seminario_multiplicador"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
              @seminario_multiplicador
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Copyright Seminário Teológico Multiplicador. Todos os
            direitos reservados.
          </p>
          <p>Av. de Santa Cruz, 6197 — Bangu, RJ · (21) 97180-3049</p>
        </div>
      </div>
    </footer>
  );
}
