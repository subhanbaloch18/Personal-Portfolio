"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiGitBranch, FiCode, FiUsers, FiGithub, FiExternalLink } from "react-icons/fi";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  bio: string | null;
}

interface Repo {
  name: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  description: string | null;
  fork: boolean;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python:     "#3776ab",
  CSS:        "#1572b6",
  HTML:       "#e34f26",
  Shell:      "#89e051",
};

export default function GitHubStats() {
  const [user, setUser]             = useState<GitHubUser | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [topLangs, setTopLangs]     = useState<string[]>([]);
  const [topRepos, setTopRepos]     = useState<Repo[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/subhanbaloch18"),
          fetch("https://api.github.com/users/subhanbaloch18/repos?per_page=100&sort=stars"),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("fetch failed");
        const userData: GitHubUser = await userRes.json();
        const reposData: Repo[]    = await reposRes.json();

        const stars = reposData.reduce((acc, r) => acc + r.stargazers_count, 0);

        const langCount: Record<string, number> = {};
        reposData.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
        const langs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([l]) => l);

        const starred = reposData
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 4);

        setUser(userData);
        setTotalStars(stars);
        setTopLangs(langs);
        setTopRepos(starred);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHub();
  }, []);

  const stats = user
    ? [
        { icon: FiCode,     value: user.public_repos, label: "Repositories" },
        { icon: FiStar,     value: totalStars,         label: "Total Stars" },
        { icon: FiUsers,    value: user.followers,     label: "Followers" },
        { icon: FiGitBranch,value: user.following,     label: "Following" },
      ]
    : [];

  return (
    <section
      id="github"
      className="section-padding"
      style={{ position: "relative", zIndex: 5, backgroundColor: "#0d2137" }}
    >
      <motion.h2
        className="section-heading"
        data-number="★"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        GitHub Activity
      </motion.h2>

      {loading && (
        <div style={{
          display: "flex", alignItems: "center", gap: "0.8rem",
          color: "#8892b0", fontFamily: "var(--font-mono)", fontSize: "0.85rem",
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{ width: 16, height: 16, border: "2px solid #64ffda44", borderTopColor: "#64ffda", borderRadius: "50%" }}
          />
          Fetching live GitHub data...
        </div>
      )}

      {error && !loading && (
        <p style={{ color: "#8892b0", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
          Couldn&apos;t load GitHub data. Check out{" "}
          <a href="https://github.com/subhanbaloch18" target="_blank" rel="noopener noreferrer"
            style={{ color: "#64ffda", textDecoration: "none" }}>
            github.com/subhanbaloch18 ↗
          </a>
        </p>
      )}

      {!loading && !error && (
        <>
          {/* Stat cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
            maxWidth: "720px",
            marginBottom: "2.5rem",
          }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(100,255,218,0.4)" }}
                style={{
                  background: "rgba(17,34,64,0.6)",
                  border: "1px solid rgba(100,255,218,0.08)",
                  borderRadius: "12px",
                  padding: "1.4rem 1rem",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
              >
                <s.icon style={{ color: "#64ffda", fontSize: "1.3rem", margin: "0 auto 0.5rem", display: "block" }} />
                <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "#ccd6f6", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#8892b0", marginTop: "0.35rem", fontFamily: "var(--font-mono)" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top languages */}
          {topLangs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: "2.5rem" }}
            >
              <p style={{
                color: "#8892b0", fontSize: "0.8rem",
                fontFamily: "var(--font-mono)", marginBottom: "0.9rem",
              }}>
                // top languages
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {topLangs.map((lang, i) => {
                  const color = LANG_COLORS[lang] || "#64ffda";
                  return (
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ scale: 1.08 }}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.4rem",
                        fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                        color, border: `1px solid ${color}44`,
                        borderRadius: "6px", padding: "5px 13px",
                        background: `${color}0e`, cursor: "default",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
                      {lang}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Top repos */}
          {topRepos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p style={{
                color: "#8892b0", fontSize: "0.8rem",
                fontFamily: "var(--font-mono)", marginBottom: "0.9rem",
              }}>
                // top repositories
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
                gap: "1rem",
                maxWidth: "900px",
              }}>
                {topRepos.map((repo, i) => {
                  const color = LANG_COLORS[repo.language || ""] || "#64ffda";
                  return (
                    <motion.a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ borderColor: "rgba(100,255,218,0.3)", translateY: -4 }}
                      style={{
                        display: "flex", flexDirection: "column", gap: "0.6rem",
                        background: "rgba(17,34,64,0.55)",
                        border: "1px solid rgba(100,255,218,0.08)",
                        borderRadius: "12px", padding: "1.2rem 1.4rem",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <FiGithub style={{ color: "#8892b0", fontSize: "0.9rem" }} />
                          <span style={{ color: "#64ffda", fontWeight: 600, fontSize: "0.88rem", fontFamily: "var(--font-mono)" }}>
                            {repo.name}
                          </span>
                        </div>
                        <FiExternalLink style={{ color: "#8892b088", fontSize: "0.85rem" }} />
                      </div>
                      {repo.description && (
                        <p style={{ color: "#8892b0", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
                          {repo.description.slice(0, 80)}{repo.description.length > 80 ? "…" : ""}
                        </p>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "auto" }}>
                        {repo.language && (
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "#8892b0", fontFamily: "var(--font-mono)" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
                            {repo.language}
                          </span>
                        )}
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "#8892b0", fontFamily: "var(--font-mono)" }}>
                          <FiStar size={11} />
                          {repo.stargazers_count}
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* View all link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ marginTop: "2rem" }}
          >
            <a
              href="https://github.com/subhanbaloch18"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.82rem",
                color: "#64ffda", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                opacity: 0.8, transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
            >
              <FiGithub /> View all repositories on GitHub ↗
            </a>
          </motion.div>
        </>
      )}
    </section>
  );
}
