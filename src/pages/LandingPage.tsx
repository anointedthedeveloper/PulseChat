import {
  ArrowRight,
  Check,
  CheckCheck,
  Github,
  LayoutDashboard,
  MessageSquare,
  Monitor,
  Moon,
  Sparkles,
  Sun,
  TerminalSquare,
  Workflow,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";

const LandingPage = () => {
  const { user } = useAuth();
  const { mode, theme, setMode, setTheme } = useThemeContext();
  const themes = [
    { id: "default", color: "bg-violet-500", label: "Default" },
    { id: "ocean", color: "bg-cyan-500", label: "Ocean" },
    { id: "forest", color: "bg-green-500", label: "Forest" },
    { id: "rose", color: "bg-rose-500", label: "Rose" },
    { id: "doodle", color: "bg-purple-400", label: "Doodle" },
  ] as const;

  const featureCards = [
    { icon: Github, label: "GitHub Actions", text: "Link repos, turn messages into issues, and keep chat tied to delivery." },
    { icon: Workflow, label: "Projects", text: "Track tasks, imported files, and repo context inside the same workspace." },
    { icon: LayoutDashboard, label: "Workspace Views", text: "Switch between chat, dashboards, settings, and project tools without context loss." },
  ];

  const workflowSteps = [
    "$ reporoom open workspace",
    "> Summarize the bug thread and assign an owner",
    "> Link this discussion to github issue #42",
    "> Import src/hooks/useWebRTC.ts into the project view",
    "$ ship with context intact",
  ];

  const stats = [
    { value: "Chat + IDE", label: "One surface for discussion and execution" },
    { value: "Realtime", label: "Live messaging, presence, and calls" },
    { value: "Dev-first", label: "Built for teams that ship code together" },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.18),_transparent_22%),radial-gradient(circle_at_80%_20%,_hsl(var(--accent)/0.14),_transparent_20%),radial-gradient(circle_at_bottom_right,_hsl(var(--primary)/0.10),_transparent_26%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--background)))]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 py-4 sm:py-6 lg:px-10">
        <header className="sticky top-4 z-50 flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur-xl shadow-lg shadow-black/5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary shadow-[0_14px_30px_hsl(var(--primary)/0.28)]">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">RepoRoom</p>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
                  <Monitor className="h-3 w-3" />
                  Best on Laptop
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">Chat, projects, repos, and workspace tools in one place</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className="rounded-xl border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground">
                  Dashboard
                </Link>
                <Link to="/chat" className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Open Chat
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth" className="rounded-xl border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground">
                  Sign in
                </Link>
                <Link to="/auth" className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </header>

        <main className="flex flex-1 items-center py-12 lg:py-16">
          <div className="grid w-full items-start gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-xl">
                <TerminalSquare className="h-3.5 w-3.5 text-primary" />
                Developer workspace messaging
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                A chat homepage that feels like a developer console, not just another landing page.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                RepoRoom combines team conversation, project structure, GitHub context, and in-app workspace tools so your team can move from “what should we do?” to “it’s shipped” in one flow.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/70 bg-card/65 p-4 backdrop-blur-xl">
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] border border-border/70 bg-card/65 p-5 backdrop-blur-xl">
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Appearance</p>
                    <p className="mt-1 text-sm text-muted-foreground">Pick a mode and color profile before you enter the workspace.</p>
                  </div>
                  <div className="flex gap-3">
                    {(["dark", "light"] as const).map((appearanceMode) => (
                      <button
                        key={appearanceMode}
                        onClick={() => setMode(appearanceMode)}
                        className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                          mode === appearanceMode
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {appearanceMode === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                          {appearanceMode === "dark" ? "Dark" : "Light"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {themes.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        className={`rounded-2xl border px-3 py-3 text-xs font-medium transition-all ${
                          theme === option.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <span className="flex flex-col items-center gap-2">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full ${option.color}`}>
                            {theme === option.id && <Check className="h-3.5 w-3.5 text-white" />}
                          </span>
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <>
                    <Link to="/chat" className="inline-flex items-center gap-2 rounded-2xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_hsl(var(--primary)/0.28)]">
                      Open Chat
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground">
                      Open dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="inline-flex items-center gap-2 rounded-2xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_hsl(var(--primary)/0.28)]">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/auth?mode=signup" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground">
                      Create account
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {featureCards.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/70 bg-card/65 p-4 backdrop-blur-xl">
                    <item.icon className="h-4 w-4 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }} className="relative">
              <div className="absolute -left-6 top-6 hidden h-28 w-28 rounded-full bg-primary/20 blur-3xl lg:block" />
              <div className="absolute -right-8 bottom-4 hidden h-28 w-28 rounded-full bg-accent/20 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-[linear-gradient(180deg,rgba(10,14,24,0.96),rgba(7,10,18,0.98))] p-5 shadow-[0_28px_90px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_34%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">
                      reporoom.dev
                    </div>
                  </div>

                  <div className="mt-4 rounded-[26px] border border-emerald-400/18 bg-[#07111b] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="flex items-center justify-between border-b border-emerald-400/10 pb-3">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-300/80">Developer Console</p>
                        <p className="mt-1 text-sm font-semibold text-slate-100">Command Center</p>
                      </div>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                        live
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 font-mono text-[12px] leading-6 text-slate-300">
                      {workflowSteps.map((line, index) => (
                        <motion.div
                          key={line}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + index * 0.06 }}
                          className="flex gap-3"
                        >
                          <span className="w-5 text-emerald-400">{line.startsWith("$") ? "$" : ">"}</span>
                          <span className={line.startsWith("$") ? "text-emerald-300" : "text-slate-300"}>{line.replace(/^[>$]\s?/, "")}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          <MessageSquare className="h-3.5 w-3.5 text-primary" />
                          Active thread
                        </div>
                        <p className="mt-3 text-sm font-semibold text-slate-100">“Calls are failing after accept”</p>
                        <div className="mt-3 space-y-2 text-xs text-slate-400">
                          <div className="flex items-center justify-between">
                            <span>Owner</span>
                            <span className="text-slate-200">Frontend</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Status</span>
                            <span className="text-amber-300">Investigating</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Linked</span>
                            <span className="text-slate-200">Issue + file import</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          <Wrench className="h-3.5 w-3.5 text-primary" />
                          Workspace tools
                        </div>
                        <div className="mt-3 space-y-2">
                          {[
                            "Issue linking from messages",
                            "Repo file import into projects",
                            "Realtime team chat and presence",
                            "Dashboard visibility across workstreams",
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                              <CheckCheck className="h-3.5 w-3.5 text-emerald-300" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">GitHub</p>
                      <p className="mt-2 text-sm font-semibold text-foreground">Convert chat to issues</p>
                      <p className="mt-1 text-xs text-muted-foreground">Link repos to the workspace, then turn messages into tracked GitHub work.</p>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">IDE</p>
                      <p className="mt-2 text-sm font-semibold text-foreground">Preview, edit, commit</p>
                      <p className="mt-1 text-xs text-muted-foreground">Open repo files, preview README content, and commit changes without leaving the app.</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-border/70 bg-background/60 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Team Flow</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Discuss", "Assign", "Inspect", "Import", "Ship"].map((step) => (
                        <span key={step} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground">
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <footer className="flex flex-col gap-3 border-t border-border/60 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>RepoRoom is a developer platform for chat, GitHub-linked projects, and team execution.</p>
          <p>
            Developed by <span className="font-semibold text-foreground">Anointed the Developer</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
