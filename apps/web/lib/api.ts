var API_BASE = process.env.API_ORIGIN || "http://localhost:4000";

export async function apiFetch(path: string) {
  try {
    var res = await fetch(API_BASE + "/api" + path, { cache: "no-store" });
    if (!res.ok) { console.error("API error:", res.status, path); return null; }
    return res.json();
  } catch (e) { console.error("API fetch failed:", path, e); return null; }
}

export function getTournament() { return apiFetch("/tournaments/default"); }
export function getTeams() { return apiFetch("/tournaments/default/teams"); }
export function getGroups() { return apiFetch("/tournaments/default/groups"); }
export function getMatches() { return apiFetch("/tournaments/default/matches"); }
export function getGlobalLeaderboard() { return apiFetch("/leaderboards/global"); }
export function getLeague(code: string) { return apiFetch("/leagues/" + code); }
