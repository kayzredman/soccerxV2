import type { ESPNScoreboard, ESPNNewsResponse, ESPNSummary } from "./espn-types";

var ESPN_BASE = "https://site.api.espn.com";
var LEAGUE = "fifa.world";

async function espnFetch(path: string) {
  try {
    var res = await fetch(ESPN_BASE + path, { cache: "no-store" });
    if (!res.ok) { console.error("ESPN error:", res.status, path); return null; }
    return res.json();
  } catch (e) { console.error("ESPN fetch failed:", path, e); return null; }
}

export function getScoreboard(): Promise<ESPNScoreboard | null> {
  return espnFetch("/apis/site/v2/sports/soccer/" + LEAGUE + "/scoreboard");
}

export function getNews(limit: number = 10): Promise<ESPNNewsResponse | null> {
  return espnFetch("/apis/site/v2/sports/soccer/" + LEAGUE + "/news?limit=" + limit);
}

export function getMatchSummary(eventId: string): Promise<ESPNSummary | null> {
  return espnFetch("/apis/site/v2/sports/soccer/" + LEAGUE + "/summary?event=" + eventId);
}

export function getStandings() {
  return espnFetch("/apis/site/v2/sports/soccer/" + LEAGUE + "/standings");
}
