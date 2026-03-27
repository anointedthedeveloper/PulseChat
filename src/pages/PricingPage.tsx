import { Check, MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for side projects and small teams.",
    features: [
      "Up to 5 team members",
      "3 active projects",
      "Basic GitHub integration",
      "7-day message history",
      "Community support",
    ],
    cta: "Get Started",
    href: "/auth",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/user/month",
    description: "Advanced tools for growing engineering teams.",
    features: [
      "Unlimited members",
      "Unlimited projects",
      "Full GitHub Actions sync",
      "Unlimited message history",
      "Priority support",
      "Custom workspace tools",
    ],
    cta: "Start Free Trial",
    href: "/auth?mode=signup",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Scale with security and dedicated resources.",
    features: [
      "SAML & SSO",
      "Audit logs & compliance",
      "Self-hosted runners",
      "Dedicated success manager",
      "Custom SLA",
      "Onboarding & training",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@reporoom.dev",
    highlighted: false,
    external: true,
  },
];

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.18),_transparent_22%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--background)))]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="h-9 w-9 rounded-xl border border-border bg-card/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <MessageSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">RepoRoom</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Link to="/dashboard" className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Dashboard
              </Link>
            ) : (
              <Link to="/auth" className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Sign in
              </Link>
            )}
          </div>
        </header>

        {/* Hero */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Choose the plan that's right for your team. All plans include core chat and GitHub integration.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06 }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.highlighted
                  ? "border-2 border-primary bg-card/80 shadow-2xl shadow-primary/10"
                  : "border border-border/70 bg-card/50"
              } backdrop-blur-xl`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-sm font-medium text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-6">{plan.description}</p>
              </div>
              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground/90">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.external ? (
                <a
                  href={plan.href}
                  className="w-full rounded-xl py-3 text-sm font-semibold text-center transition-all bg-background/80 border border-border hover:bg-background text-foreground"
                >
                  {plan.cta}
                </a>
              ) : (
                <Link
                  to={plan.href}
                  className={`w-full rounded-xl py-3 text-sm font-semibold text-center transition-all block ${
                    plan.highlighted
                      ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-background/80 border border-border hover:bg-background text-foreground"
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ strip */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { q: "Can I switch plans later?", a: "Yes, upgrade or downgrade at any time from your workspace settings." },
            { q: "Is there a free trial for Pro?", a: "Pro comes with a 14-day free trial — no credit card required." },
            { q: "What counts as a project?", a: "Any workspace project with linked files and a repo counts toward your plan limit." },
          ].map((item) => (
            <div key={item.q} className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
              <h4 className="text-sm font-semibold text-foreground mb-2">{item.q}</h4>
              <p className="text-xs text-muted-foreground leading-6">{item.a}</p>
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-xs text-muted-foreground pb-8">
          &copy; {new Date().getFullYear()} RepoRoom. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default PricingPage;
