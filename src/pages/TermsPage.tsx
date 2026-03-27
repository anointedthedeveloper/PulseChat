import { MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using RepoRoom, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.",
  },
  {
    title: "Use of the Service",
    body: "You may use RepoRoom for lawful purposes only. You agree not to use the service to transmit harmful, offensive, or illegal content, or to attempt to gain unauthorised access to any part of the platform.",
  },
  {
    title: "Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at anointedthedeveloper@gmail.com if you suspect unauthorised use.",
  },
  {
    title: "Intellectual Property",
    body: "RepoRoom and its original content, features, and functionality are owned by Anointed the Developer and are protected by applicable intellectual property laws. Your content remains yours — you grant us a limited licence to store and display it as part of the service.",
  },
  {
    title: "Third-Party Services",
    body: "RepoRoom integrates with GitHub and Supabase. Your use of those services is governed by their respective terms of service. We are not responsible for the availability or content of third-party services.",
  },
  {
    title: "Disclaimer of Warranties",
    body: "RepoRoom is provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of harmful components.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, Anointed the Developer shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.",
  },
  {
    title: "Changes to Terms",
    body: "We may update these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms. We will notify users of material changes via email or an in-app notice.",
  },
  {
    title: "Contact",
    body: "Questions about these Terms? Contact us at anointedthedeveloper@gmail.com.",
  },
];

const TermsPage = () => {
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
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Terms of Service</h1>
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

export default TermsPage;
