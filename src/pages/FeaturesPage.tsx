import { Zap, Shield, GitBranch, Users, Bell, Mic, Video, FileText, Palette, Smartphone, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import useSEO from "@/hooks/useSEO";

const features = [
  { icon: MessageSquare, title: "Real-time Messaging", desc: "Instant delivery with reply threading, edit & delete, emoji reactions, and quoted context.", color: "from-violet-500 to-purple-600" },
  { icon: GitBranch, title: "GitHub Integration", desc: "Link repos, convert messages to issues, browse files, and commit changes without leaving the app.", color: "from-slate-600 to-slate-800" },
  { icon: FileText, title: "Project File Editor", desc: "Import repo files into projects, edit them in a full IDE with syntax highlighting, and push commits directly.", color: "from-sky-500 to-blue-600" },
  { icon: Users, title: "Team Workspaces", desc: "Create workspaces, invite members, manage roles, and collaborate across channels.", color: "from-emerald-500 to-green-600" },
  { icon: Video, title: "Voice & Video Calls", desc: "WebRTC-powered audio and video calls with screen sharing and self-preview picture-in-picture.", color: "from-rose-500 to-pink-600" },
  { icon: Mic, title: "Voice Notes", desc: "Record and send voice messages inline in any conversation.", color: "from-orange-500 to-amber-600" },
  { icon: Bell, title: "Push Notifications", desc: "Stay in the loop with push notifications and unread badge counts on the app icon.", color: "from-yellow-500 to-orange-500" },
  { icon: Shield, title: "Secure by Default", desc: "Row-level security on every table. Only members of a workspace can read its data.", color: "from-teal-500 to-cyan-600" },
  { icon: Palette, title: "Themes", desc: "Default, Ocean, Forest, Rose, and Doodle — dark and light mode for each.", color: "from-fuchsia-500 to-pink-600" },
  { icon: Smartphone, title: "PWA", desc: "Install RepoRoom as a native-like app on any device. Works offline for cached content.", color: "from-indigo-500 to-violet-600" },
  { icon: Zap, title: "Typing Indicators", desc: "See who's typing in real time so conversations feel alive and responsive.", color: "from-amber-500 to-yellow-500" },
  { icon: FileText, title: "File Sharing", desc: "Share images, videos, documents, and PDFs with an inline lightbox viewer.", color: "from-cyan-500 to-sky-600" },
];

const FeaturesPage = () => {
  useSEO({
    title: "Features",
    description: "Explore everything RepoRoom offers — real-time messaging, GitHub integration, WebRTC calls, voice notes, file sharing, themes, PWA, and more for developer teams.",
    path: "/features",
  });
  return (
  <PageLayout maxWidth="xl">
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
        <Zap className="h-3 w-3 text-primary" /> What's inside
      </span>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-5">
        Everything your dev team needs
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-8">
        RepoRoom is built from the ground up for engineering teams — chat, code, and delivery unified in one place.
      </p>
    </motion.div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {features.map((f, i) => (
        <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.03 }}
          className="group rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-xl hover:border-primary/30 hover:bg-card/80 transition-all">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} mb-4 shadow-lg`}>
            <f.icon className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1.5">{f.title}</p>
          <p className="text-xs text-muted-foreground leading-5">{f.desc}</p>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      className="mt-16 rounded-3xl border border-primary/20 bg-primary/5 p-10 text-center">
      <h2 className="text-2xl font-bold text-foreground mb-3">Ready to ship faster?</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">Join teams already using RepoRoom to keep chat tied to their codebase.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/auth" className="inline-flex items-center gap-2 rounded-2xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20">
          Get started free <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/pricing" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
          View pricing
        </Link>
      </div>
    </motion.div>
  </PageLayout>
  );
};

export default FeaturesPage;
