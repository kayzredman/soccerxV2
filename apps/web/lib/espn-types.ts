export interface ESPNTeam {
  id: string; abbreviation: string; displayName: string; shortDisplayName: string;
  logo?: string; color?: string;
}

export interface ESPNCompetitor {
  id: string; team: ESPNTeam; score: string; homeAway: string;
  winner?: boolean; linescores?: Array<{ period: number; value: number }>;
}

export interface ESPNStatus {
  clock: number; displayClock: string; period: number;
  type: { id: string; name: string; state: string; completed: boolean; detail: string; shortDetail: string; };
}

export interface ESPNEvent {
  id: string; name: string; shortName: string; date: string;
  status: ESPNStatus;
  competitions: Array<{
    id: string; venue?: { fullName: string; address?: { city: string; country: string } };
    competitors: ESPNCompetitor[];
    details?: Array<{ type: { text: string }; clock: { displayValue: string }; athletesInvolved?: Array<{ displayName: string }> }>;
  }>;
}

export interface ESPNScoreboard { events: ESPNEvent[]; }

export interface ESPNArticle {
  headline: string; description: string; published: string;
  links?: { web?: { href: string } };
  images?: Array<{ url: string; caption?: string }>;
}

export interface ESPNNewsResponse { articles: ESPNArticle[]; }

export interface ESPNStatistic { label: string; displayValue: string; name: string; }

export interface ESPNBoxscoreTeam {
  team: ESPNTeam;
  statistics: ESPNStatistic[];
}

export interface ESPNAthlete {
  id: string; displayName: string; shortName: string;
  headshot?: { href: string };
  jersey?: string;
  position?: { abbreviation: string };
}

export interface ESPNRosterEntry {
  athlete: ESPNAthlete;
  starter: boolean;
  jersey: string;
  position: { abbreviation: string; displayName: string };
  subbedIn?: boolean; subbedOut?: boolean;
}

export interface ESPNRoster {
  team: ESPNTeam;
  roster: ESPNRosterEntry[];
}

export interface ESPNKeyEvent {
  id: string;
  type: { text: string };
  clock: { displayValue: string };
  team?: ESPNTeam;
  text?: string;
  shortText?: string;
  participants?: Array<{ athlete: ESPNAthlete }>;
  athletesInvolved?: Array<{ displayName: string }>;
}

export interface ESPNSummary {
  boxscore: { teams: ESPNBoxscoreTeam[] };
  rosters: ESPNRoster[];
  keyEvents: ESPNKeyEvent[];
  commentary?: any[];
  header: {
    competitions: Array<{
      competitors: Array<{
        team: ESPNTeam; score: string; homeAway: string;
        linescores?: Array<{ period: number; value: number }>;
      }>;
      status: ESPNStatus;
      venue?: { fullName: string; address?: { city: string } };
    }>;
  };
  gameInfo?: { venue?: { fullName: string; address?: { city: string; country: string } }; attendance?: number };
  standings?: any;
  leaders?: any[];
  news?: { articles: ESPNArticle[] };
}
