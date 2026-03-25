import { useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import type { GithubRepo } from "@/hooks/useGithub";

export interface WorkspaceGithubRepo {
  id: string;
  workspace_id: string;
  repo_owner: string;
  repo_name: string;
  repo_full_name: string;
  repo_description: string | null;
  default_branch: string;
  created_by: string;
  created_at: string;
}

export interface GithubMessageLink {
  id: string;
  workspace_id: string;
  channel_id: string | null;
  message_id: string;
  github_type: "issue";
  repo_owner: string;
  repo_name: string;
  repo_full_name: string;
  external_number: number;
  external_title: string;
  external_url: string;
  created_by: string;
  created_at: string;
}

export function useWorkspaceGithub() {
  const { user } = useAuth();
  const [linkedRepos, setLinkedRepos] = useState<WorkspaceGithubRepo[]>([]);
  const [messageLinks, setMessageLinks] = useState<GithubMessageLink[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLinkedRepos = useCallback(async (workspaceId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from("workspace_github_repos")
      .select("*")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: true });

    setLinkedRepos((data as WorkspaceGithubRepo[]) || []);
    setLoading(false);
  }, []);

  const fetchMessageLinks = useCallback(async (workspaceId: string) => {
    const { data } = await supabase
      .from("github_message_links")
      .select("*")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false });

    setMessageLinks((data as GithubMessageLink[]) || []);
  }, []);

  const linkRepo = useCallback(async (workspaceId: string, repo: GithubRepo) => {
    if (!user) return { ok: false, error: "You must be signed in" };

    const [repo_owner, repo_name] = repo.full_name.split("/");
    const { data, error } = await supabase
      .from("workspace_github_repos")
      .upsert({
        workspace_id: workspaceId,
        repo_owner,
        repo_name,
        repo_full_name: repo.full_name,
        repo_description: repo.description,
        default_branch: repo.default_branch,
        created_by: user.id,
      } as never, { onConflict: "workspace_id,repo_full_name" })
      .select()
      .single();

    if (error) return { ok: false, error: error.message };

    setLinkedRepos((prev) => {
      const next = prev.filter((item) => item.id !== (data as WorkspaceGithubRepo).id && item.repo_full_name !== repo.full_name);
      return [...next, data as WorkspaceGithubRepo].sort((a, b) => a.repo_full_name.localeCompare(b.repo_full_name));
    });

    return { ok: true, data: data as WorkspaceGithubRepo };
  }, [user]);

  const unlinkRepo = useCallback(async (repoLinkId: string) => {
    const { error } = await supabase
      .from("workspace_github_repos")
      .delete()
      .eq("id", repoLinkId);

    if (error) return { ok: false, error: error.message };

    setLinkedRepos((prev) => prev.filter((repo) => repo.id !== repoLinkId));
    return { ok: true };
  }, []);

  const saveIssueLink = useCallback(async (
    workspaceId: string,
    channelId: string | null,
    messageId: string,
    repoFullName: string,
    issue: { number: number; title: string; html_url: string },
  ) => {
    if (!user) return { ok: false, error: "You must be signed in" };

    const [repo_owner, repo_name] = repoFullName.split("/");
    const { data, error } = await supabase
      .from("github_message_links")
      .insert({
        workspace_id: workspaceId,
        channel_id: channelId,
        message_id: messageId,
        github_type: "issue",
        repo_owner,
        repo_name,
        repo_full_name: repoFullName,
        external_number: issue.number,
        external_title: issue.title,
        external_url: issue.html_url,
        created_by: user.id,
      } as never)
      .select()
      .single();

    if (error) return { ok: false, error: error.message };

    setMessageLinks((prev) => [data as GithubMessageLink, ...prev]);
    return { ok: true, data: data as GithubMessageLink };
  }, [user]);

  return {
    linkedRepos,
    messageLinks,
    loading,
    fetchLinkedRepos,
    fetchMessageLinks,
    linkRepo,
    unlinkRepo,
    saveIssueLink,
  };
}
