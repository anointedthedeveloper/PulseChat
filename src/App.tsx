import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import WorkspacePage from "./pages/WorkspacePage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import AuthRoutePage from "./pages/AuthRoutePage.tsx";
import ChatRoutePage from "./pages/ChatRoutePage.tsx";
import EditorPage from "./pages/EditorPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import ProjectEditorPage from "./pages/ProjectEditorPage.tsx";
import FeaturesPage from "./pages/FeaturesPage.tsx";
import ChangelogPage from "./pages/ChangelogPage.tsx";
import RoadmapPage from "./pages/RoadmapPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import RootLayout from "./components/layout/RootLayout.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<ChatRoutePage />} />
                <Route path="/auth" element={<AuthRoutePage />} />
                <Route path="/workspace" element={<WorkspacePage />} />
                <Route path="/workspace/tasks" element={<WorkspacePage />} />
                <Route path="/workspace/projects" element={<WorkspacePage />} />
                <Route path="/workspace/github" element={<WorkspacePage />} />
                <Route path="/editor/:owner/:repo/:branch" element={<EditorPage />} />
                <Route path="/editor/:owner/:repo" element={<EditorPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/project/:projectId/editor" element={<ProjectEditorPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/changelog" element={<ChangelogPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
