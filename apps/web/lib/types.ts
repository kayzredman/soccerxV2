export interface Tournament {
  id: string; slug: string; name: string;
  startsAt: string; endsAt: string; format: string;
}

export interface Group {
  id: string; tournamentId: string; letter: string;
}

export interface Team {
  id: string; tournamentId: string; name: string;
  code: string; flagEmoji: string; groupId: string | null;
}

export interface Match {
  id: string; tournamentId: string; stage: string;
  kickoffAt: string; venue: string | null;
  homeTeamId: string | null; awayTeamId: string | null;
  homeScore: number | null; awayScore: number | null;
  status: string; externalRef: string | null; meta: any;
}

export interface LeaderboardEntry {
  userId: string; totalPoints: number; rank: number;
}

export interface League {
  id: string; name: string; code: string; ownerUserId: string;
}

// TLA code to flag emoji mapping
var FLAG_MAP: Record<string, string> = {
  ALG: "\u{1F1E9}\u{1F1FF}", ARG: "\u{1F1E6}\u{1F1F7}", AUS: "\u{1F1E6}\u{1F1FA}",
  AUT: "\u{1F1E6}\u{1F1F9}", BEL: "\u{1F1E7}\u{1F1EA}", BIH: "\u{1F1E7}\u{1F1E6}",
  BRA: "\u{1F1E7}\u{1F1F7}", CAN: "\u{1F1E8}\u{1F1E6}", CIV: "\u{1F1E8}\u{1F1EE}",
  CPV: "\u{1F1E8}\u{1F1FB}", CRO: "\u{1F1ED}\u{1F1F7}", CUW: "\u{1F1E8}\u{1F1FC}",
  CZE: "\u{1F1E8}\u{1F1FF}", ECU: "\u{1F1EA}\u{1F1E8}", EGY: "\u{1F1EA}\u{1F1EC}",
  ENG: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",
  ESP: "\u{1F1EA}\u{1F1F8}", FRA: "\u{1F1EB}\u{1F1F7}", GER: "\u{1F1E9}\u{1F1EA}",
  GHA: "\u{1F1EC}\u{1F1ED}", HAI: "\u{1F1ED}\u{1F1F9}", IRN: "\u{1F1EE}\u{1F1F7}",
  IRQ: "\u{1F1EE}\u{1F1F6}", JOR: "\u{1F1EF}\u{1F1F4}", JPN: "\u{1F1EF}\u{1F1F5}",
  KOR: "\u{1F1F0}\u{1F1F7}", KSA: "\u{1F1F8}\u{1F1E6}", MAR: "\u{1F1F2}\u{1F1E6}",
  MEX: "\u{1F1F2}\u{1F1FD}", NOR: "\u{1F1F3}\u{1F1F4}", NZL: "\u{1F1F3}\u{1F1FF}",
  PAN: "\u{1F1F5}\u{1F1E6}", PAR: "\u{1F1F5}\u{1F1FE}", QAT: "\u{1F1F6}\u{1F1E6}",
  RSA: "\u{1F1FF}\u{1F1E6}", SCO: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
  SEN: "\u{1F1F8}\u{1F1F3}", SUI: "\u{1F1E8}\u{1F1ED}", TUR: "\u{1F1F9}\u{1F1F7}",
  URY: "\u{1F1FA}\u{1F1FE}", USA: "\u{1F1FA}\u{1F1F8}",
  COL: "\u{1F1E8}\u{1F1F4}", NGA: "\u{1F1F3}\u{1F1EC}", PER: "\u{1F1F5}\u{1F1EA}",
  POL: "\u{1F1F5}\u{1F1F1}", POR: "\u{1F1F5}\u{1F1F9}", SRB: "\u{1F1F7}\u{1F1F8}",
  UKR: "\u{1F1FA}\u{1F1E6}", DEN: "\u{1F1E9}\u{1F1F0}", SWE: "\u{1F1F8}\u{1F1EA}",
  ITA: "\u{1F1EE}\u{1F1F9}", NED: "\u{1F1F3}\u{1F1F1}", CMR: "\u{1F1E8}\u{1F1F2}",
  TUN: "\u{1F1F9}\u{1F1F3}", CHI: "\u{1F1E8}\u{1F1F1}", JAM: "\u{1F1EF}\u{1F1F2}",
  HON: "\u{1F1ED}\u{1F1F3}", CRC: "\u{1F1E8}\u{1F1F7}",
};

export function getFlag(code: string): string {
  return FLAG_MAP[code] || "\u{1F3F3}\u{FE0F}";
}
