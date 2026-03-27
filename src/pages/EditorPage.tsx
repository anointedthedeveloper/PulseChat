import { useParams, useNavigate } from "react-router-dom";
import RepoFileBrowser from "@/components/github/RepoFileBrowser";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

const EditorPage = () => {
  const { owner, repo, branch } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If we set this flag it means the user clicked the expand button — not a reload
    const intentional = sessionStorage.getItem("rr-editor-nav");
    if (intentional) {
      sessionStorage.removeItem("rr-editor-nav");
      return;
    }

    const isReload =
      (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type === "reload" ||
      (performance as any).navigation?.type === 1;

    if (isReload) {
      navigate("/chat", { replace: true });
      return;
    }

    if (!user) {
      toast.error("Please log in to use the editor");
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!owner || !repo) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Invalid repository path</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <RepoFileBrowser
        owner={owner}
        repo={repo}
        defaultBranch={branch || "main"}
        onClose={() => navigate("/chat")}
        fullMode={true}
      />
    </div>
  );
};

export default EditorPage;
