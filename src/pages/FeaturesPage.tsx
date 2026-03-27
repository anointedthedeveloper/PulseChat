import { MessageSquare, ArrowLeft, Zap, Shield, GitBranch, Users, Bell, Mic, Video, FileText, Palette, Smartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: MessageSquare, title: "Real-time Messaging", desc: "Instant delivery with reply threading, edit & delete, emoji reactions, and quoted context." },
  { icon: GitBranch, title: "GitHub Integration", desc: "Link repos, convert messages to issues, browse files, and commit changes without leaving the app." },
  { icon: FileText, title: "Project File Editor", desc: "Import repo files into projects, edit them in a full IDE, and push commits directly." },
  { icon: Users, title: "Team Workspaces", desc: "Create workspaces, invite members, manage roles, and collaborate across channels." },
  { icon: Video, title: "Voice & Video Calls", desc: "WebRTC-powered audio and video calls with screen sharing and self-preview PiP." },
  { icon: Mic, title: "Voice Notes", desc: "Record and send voice messages inline in any conversation." },
  { icon: Bell, title: "Push Notifications", desc: "Stay in the loop with push notifications and unread badge counts on the app icon." },
  { icon: Shield, title: "Secure by Default", desc: "Row-level security on every table. Only members of a workspace can read its data." },
  { icon: Palette, title: "Themes", desc: "Default, Ocean, Forest, Rose, and Doodle — dark and light mode for each." },
  { icon: Smartphone, title: "PWA", desc: "Install RepoRoom as a native-like app on any device. Works offline for cached content." },
  { icon: Zap, title: "Typing Indicators", desc: "See who's typing in real time so conversations feel alive." },
  { icon: FileText, title: "File Sharing", desc: "Share images, videos, documents, and PDFs with an inline lightbox viewer." },
];

const FeaturesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.14),_transparent_22%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--background)))]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6">
        <header className="flex items-center gap-3 mb-16">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-xl border border-border bg-card/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">RepoRoom</span>
          </Link>
        </header>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Everything your dev team needs</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            RepoRoom is built from the ground up for engineering teams — chat, code, and delivery in one place.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.04 }}
              className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-2">{f.title}</p>
              <p className="text-xs text-muted-foreground leading-6">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/auth" className="inline-flex items-center gap-2 rounded-2xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg">
            Get started free
          </Link>
        </div>

        <footer className="mt-16 text-center text-xs text-muted-foreground pb-8">
          &copy; {new Date().getFullYear()} RepoRoom. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default FeaturesPage;
