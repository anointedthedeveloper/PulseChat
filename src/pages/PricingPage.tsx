import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PageLayout from "@/components/layout/PageLayout";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: null,
    description: "Perfect for side projects and small teams.",
    features: ["Up to 5 team members", "3 active projects", "Basic GitHub integration", "7-day message history", "Community support"],
    cta: "Get Started",
    href: "/auth",
    highlighted: false,
    external: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/user/month",
    description: "Advanced tools for growing engineering teams.",
    features: ["Unlimited members", "Unlimited projects", "Full GitHub Actions sync", "Unlimited message history", "Priority support", "Custom workspace tools"],
    cta: "Start Free Trial",
    href: "/auth?mode=signup",
    highlighted: true,
    external: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: null,
    description: "Scale with security and dedicated resources.",
    features: ["SAML & SSO", "Audit logs & compliance", "Self-hosted runners", "Dedicated success manager", "Custom SLA", "Onboarding & training"],
    cta: "Contact Sales",
    href: "mailto:anointedthedeveloper@gmail.com",
    highlighted: false,
    external: true,
  },
];

const faqs = [
  { q: "Can I switch plans later?", a: "Yes, upgrade or downgrade at any time from your workspace settings." },
  { q: "Is there a free trial for Pro?", a: "Pro comes with a 14-day free trial — no credit card required." },
  { q: "What counts as a project?", a: "Any workspace project with linked files and a repo counts toward your plan limit." },
  { q: "How does billing work?", a: "Pro is billed per user per month. Enterprise pricing is custom — contact us for a quote." },
];

const PricingPage = () => {
  const { user } = useAuth();
  return (
    <PageLayout maxWidth="xl">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
          Pricing
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-5">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Choose the plan that's right for your team. All plans include core chat and GitHub integration.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3 mb-20">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.07 }}
            className={`relative flex flex-col rounded-3xl p-8 ${plan.highlighted ? "border-2 border-primary bg-card/90 shadow-2xl shadow-primary/10" : "border border-border/60 bg-card/50"} backdrop-blur-xl`}>
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-3">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl font-bold tracking-tight text-foreground">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-sm text-muted-foreground leading-6">{plan.description}</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            {plan.external ? (
              <a href={plan.href} className="w-full rounded-xl py-3 text-sm font-semibold text-center border border-border bg-background/80 hover:bg-muted text-foreground transition-colors block">
                {plan.cta}
              </a>
            ) : (
              <Link to={plan.href} className={`w-full rounded-xl py-3 text-sm font-semibold text-center block transition-all ${plan.highlighted ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/20" : "border border-border bg-background/80 hover:bg-muted text-foreground"}`}>
                {plan.cta}
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently asked questions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-foreground mb-2">{item.q}</p>
              <p className="text-sm text-muted-foreground leading-6">{item.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default PricingPage;
