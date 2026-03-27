import { MessageSquare, ArrowLeft, Menu, X, Github, Mail, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "Changelog", path: "/changelog" },
  { label: "Roadmap", path: "/roadmap" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
];

interface Props {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const PageLayout = ({ children, maxWidth = "lg" }: Props) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const widthClass = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
  }[maxWidth];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.12),_transparent_55%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--background)))]">
      {/* Sticky nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className={cn("mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3", widthClass)}>
          {/* Left: back + logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Link to="/" className="flex items-center gap-2 ml-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary shadow-sm">
                <MessageSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground hidden sm:block">RepoRoom</span>
            </Link>
          </div>

          {/* Center: page links (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === l.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: auth CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link to="/dashboard" className="hidden sm:inline-flex rounded-xl gradient-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/auth" className="hidden sm:inline-flex rounded-xl border border-border bg-background/70 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  Sign in
                </Link>
                <Link to="/auth" className="rounded-xl gradient-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-sm">
                  Get Started
                </Link>
              </>
            )}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  location.pathname === l.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {l.label}
              </Link>
            ))}
            {!user && (
              <Link to="/auth" onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                Sign in
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className={cn("mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-0", widthClass)}>
        {children}
      </main>

      {/* Shared footer */}
      <footer className={cn("mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-10", widthClass)}>
        <div className="border-t border-border/40 pt-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                  <MessageSquare className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">RepoRoom</span>
              </div>
              <p className="text-sm text-muted-foreground leading-6 max-w-xs">
                The developer messaging platform that ties your chat directly to your codebase and delivery workflow.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a href="https://github.com/anointedthedeveloper" target="_blank" rel="noopener noreferrer"
                  className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href="mailto:anointedthedeveloper@gmail.com"
                  className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Product</p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {[["Features", "/features"], ["Pricing", "/pricing"], ["Changelog", "/changelog"], ["Roadmap", "/roadmap"]].map(([label, path]) => (
                  <li key={path}><Link to={path} className="hover:text-primary transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Company</p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {[["About", "/about"], ["Blog", "/blog"], ["Privacy", "/privacy"], ["Terms", "/terms"]].map(([label, path]) => (
                  <li key={path}><Link to={path} className="hover:text-primary transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground border-t border-border/20 pt-6">
            <p>&copy; 2026 RepoRoom. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with <Sparkles className="h-3 w-3 text-primary" /> by{" "}
              <a href="https://github.com/anointedthedeveloper" target="_blank" rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors">
                Anointed the Developer
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
