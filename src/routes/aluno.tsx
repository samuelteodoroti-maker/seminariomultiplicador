import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, ArrowLeft, Lock, Mail, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-multiplicador.png";

export const Route = createFileRoute("/aluno")({
  head: () => ({
    meta: [
      { title: "Portal do Aluno — Seminário Multiplicador" },
      {
        name: "description",
        content:
          "Acesso exclusivo para alunos do Seminário Teológico Batista Multiplicador. Gerencie sua formação, horários e documentos.",
      },
      { property: "og:title", content: "Portal do Aluno — Seminário Teológico Batista Multiplicador" },
      {
        property: "og:description",
        content:
          "Acesso exclusivo para alunos do Seminário Teológico Batista Multiplicador.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlunoPage,
});

function LogoLink({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-3 rounded-lg", className)}
    >
      <img
        src={logoAsset}
        alt="Seminário Teológico Batista Multiplicador"
        className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
      />
      <span className="hidden font-display text-base font-bold text-foreground sm:inline">
        Multiplicador
      </span>
    </Link>
  );
}

function AlunoPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <LogoLink />
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden h-9 rounded-full px-3 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              <Link to="/">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Voltar ao site
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-60" />
        <Card className="w-full max-w-md animate-fade-up border-border/80 bg-card/95 shadow-elegant backdrop-blur">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LogIn className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Portal do Aluno
            </h1>
            <CardDescription className="text-sm text-muted-foreground">
              Acesso exclusivo para alunos matriculados no Seminário Teológico Batista Multiplicador.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="aluno@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {notice && (
                <div className="rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-foreground">
                  <p className="flex items-start gap-2">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      Portal em desenvolvimento. Entre em contato com a secretaria para mais informações.
                    </span>
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="h-11 w-full rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30"
              >
                Entrar <LogIn className="ml-1.5 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 flex flex-col gap-3 text-center text-sm text-muted-foreground">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao site institucional
              </Link>
              <p className="text-xs">
                Problemas para acessar? Fale com a secretaria durante o atendimento.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border/70 bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Seminário Teológico Batista Multiplicador. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
