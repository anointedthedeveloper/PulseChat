import { motion } from "framer-motion";
import { Rocket, Sparkles, Wrench } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import useSEO from "@/hooks/useSEO";

const entries = [
  {
    version: "v1.3.0",
    date: "June 2025",
    tag: "New",
    tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    icon: Sparkles,
    iconColor: "from-emerald-500 to-teal-600",
    changes: [
      "Project Editor — open any project's linked repo in a full IDE with file tree, syntax highlighting, and commit support",
      "Pricing page with Free, Pro, and Enterprise plans",
      "Footer pages: Features, Changelog, Roadmap, About, Blog, Privacy, Terms",
      "Shared PageLayout with sticky nav and consistent footer across all pages",
      "Contact email wired to anointedthedeveloper@gmail.com",
    ],
  },
  {
    version: "v1.2.0",
    date: "May 2025",
    tag: "Improved",
    tagColor: "bg-sky-500/15 text-sky-400 border-sky-500/20",
    icon: Wrench,
    iconColor: "from-sky-500 to-blue-600",
    changes: [
      "Workspace projects now support file imports from linked repos",
      "RepoFileBrowser: terminal tab, npm sandbox, and browser preview",
      "Split-view mode for code + preview side by side",
      "Branch switching in the file browser",
    ],
  },
  {
    version: "v1.1.0",
    date: "April 2025",
    tag: "Improved",
    tagColor: "bg-sky-500/15 text-sky-400 border-sky-500/20",
    icon: Wrench,
    iconColor: "from-violet-500 to-purple-600",
    changes: [
      "Voice & video calls via WebRTC with STUN/TURN",
      "Screen sharing and self-preview picture-in-picture",
      "Voice notes recording and playback",
      "Push notifications and PWA app badge for unread count",
    ],
  },
  {
    version: "v1.0.0",
    date: "March 2025",
    tag: "Launch",
    tagColor: "bg-primary/15 text-primary border-primary/20",
    icon: Rocket,
    iconColor: "from-primary to-violet-600",
    changes: [
      "Initial public release",
      "Real-time messaging with Supabase Realtime",
      "GitHub integration: link repos, browse files, create issues from messages",
      "Workspaces, channels, tasks, and projects",
      "Themes: Default, Ocean, Forest, Rose — dark & light mode",
    ],
  },
];

const ChangelogPage = () => {
  useSEO({
    title: "Changelog",
    description: "Every update, improvement, and fix shipped to RepoRoom — version history from v1.0 to the latest release.",
    path: "/changelog",
  });
  return (
  <PageLayout maxWidth="md">
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
        Changelog
      </span>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">What's new</h1>
      <p className="text-lg text-muted-foreground">Every update, improvement, and fix — in one place.</p>
    </motion.div>

    {/* Timeline */}
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border/60" />
      <div className="space-y-10">
        {entries.map((entry, i) => {
          const Icon = entry.icon;
          return (
            <motion.div key={entry.version} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.08 }}
              className="relative pl-14">
              {/* Timeline dot */}
              <div className={`absolute left-0 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${entry.iconColor} shadow-lg`}>
                <Icon className="h-5 w-5 text-white" />
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-foreground">{entry.version}</span>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${entry.tagColor}`}>{entry.tag}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{entry.date}</span>
                </div>
                <ul className="space-y-2.5">
                  {entry.changes.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </PageLayout>
  );
};

export default ChangelogPage;
