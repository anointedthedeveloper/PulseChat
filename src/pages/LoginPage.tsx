import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, UserPlus, Shield, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (!username.trim()) {
          setError("Username is required");
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, username);
        if (error) setError(error.message);
      } else {
        const { error } = await signIn(email, password);
        if (error) setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    const next = !isSignUp;
    setIsSignUp(next);
    setSearchParams(next ? { mode: "signup" } : {});
    setError("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_hsl(var(--accent)/0.12),_transparent_26%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--background)))]">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full bg-primary/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent/10 blur-[110px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Welcome back
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-foreground">
                Workspace chat that actually connects to the way teams ship.
              </h1>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Sign in to jump back into chats, GitHub-linked projects, and your in-app workspace tools.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  "Linked repos and project-aware file imports",
                  "Chat-to-issue workflow for faster triage",
                  "IDE surfaces that live beside your collaboration flow",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/65 px-4 py-3 backdrop-blur-xl">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-md justify-self-center"
          >
            <div className="rounded-[30px] border border-border/70 bg-card/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:p-8">
              <div className="mb-8 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary"
                >
                  <MessageSquare className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <h1 className="text-3xl font-semibold text-foreground">ChatFlow</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isSignUp ? "Create your account and step into the workspace." : "Sign in and continue where your team left off."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            required
            minLength={6}
          />

          {error && (
            <p className="text-xs text-destructive text-center">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
          >
            {loading ? "..." : isSignUp ? "Create Account" : "Sign In"}
            {!loading && (isSignUp ? <UserPlus className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />)}
          </motion.button>
              </form>

              <button
                onClick={toggleMode}
                className="w-full text-center text-xs text-muted-foreground mt-4 hover:text-foreground transition-colors"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>

              <div className="mt-8 flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">Back to home</Link>
                <span>Built for collaborative shipping</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
