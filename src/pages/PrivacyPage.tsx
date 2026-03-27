import { MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your email address, username, and display name when you create an account. We also collect content you create within the platform, including messages, project files, and workspace data.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to provide and improve the RepoRoom service, send you notifications you've opted into, and respond to your support requests. We do not sell your personal data to third parties.",
  },
  {
    title: "GitHub Integration",
    body: "When you connect your GitHub account, we request only the minimum permissions necessary. Your source code remains on GitHub — we only access metadata and content you explicitly choose to import into your workspace.",
  },
  {
    title: "Data Storage",
    body: "Your data is stored securely using Supabase (PostgreSQL) with row-level security enabled on every table. Only authenticated members of a workspace can access its data.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies to maintain your session. We do not use tracking or advertising cookies.",
  },
  {
    title: "Your Rights",
    body: "You may request deletion of your account and associated data at any time by contacting us at anointedthedeveloper@gmail.com. We will process your request within 30 days.",
  },
  {
    title: "Contact",
    body: "If you have any questions about this Privacy Policy, please contact us at anointedthedeveloper@gmail.com.",
  },
];

const PrivacyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.14),_transparent_22%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--background)))]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 py-6">
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

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground mb-10">Last updated: June 2025</p>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-xl">
                <h2 className="text-sm font-semibold text-foreground mb-3">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-7">{s.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <footer className="mt-16 text-center text-xs text-muted-foreground pb-8">
          &copy; {new Date().getFullYear()} RepoRoom. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPage;
