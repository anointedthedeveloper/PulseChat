import { ArrowRight, Github, LayoutDashboard, MessageSquare, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_hsl(var(--accent)/0.12),_transparent_24%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--background)))]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">ChatFlow</p>
              <p className="text-[11px] text-muted-foreground">Chat, projects, repos, and workspace tools in one place</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="rounded-xl border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground">
              Sign in
            </Link>
            <Link to="/auth" className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Get Started
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center py-12 lg:py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Developer workspace messaging
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Turn chat into actual project work without leaving the conversation.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                ChatFlow combines team chat, GitHub repo tools, project tracking, and an in-app IDE surface so your team can discuss, plan, inspect code, and ship from one shared workspace.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/auth" className="inline-flex items-center gap-2 rounded-2xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_hsl(var(--primary)/0.28)]">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/auth?mode=signup" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground">
                  Create account
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Github, label: "GitHub Actions", text: "Link repos, create issues, and move from chat to repo work." },
                  { icon: Workflow, label: "Projects", text: "Connect repos to projects and keep imported files organized." },
                  { icon: LayoutDashboard, label: "Workspace", text: "Chat, dashboard, and IDE views in one responsive shell." },
                ].map((item) => (
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
              <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/85 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Workspace Command Center</p>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">Live</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Track team activity, linked repos, imported files, and project progress from one place.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
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
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
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
      </div>
    </div>
  );
};

export default LandingPage;
