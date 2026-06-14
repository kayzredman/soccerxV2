import type { ApiFixture, ApiStandingEntry, ApiTeam } from './types.js';

const STATUS_MAP: Record<string, string> = {
  TBD: 'SCHEDULED',
  NS: 'SCHEDULED',
  '1H': 'LIVE',
  HT: 'LIVE',
  '2H': 'LIVE',
  ET: 'LIVE',
  BT: 'LIVE',
  P: 'LIVE',
  LIVE: 'LIVE',
  FT: 'FINISHED',
  AET: 'FINISHED',
  PEN: 'FINISHED',
  SUSP: 'POSTPONED',
  INT: 'POSTPONED',
  PST: 'POSTPONED',
  CANC: 'CANCELED',
  ABD: 'CANCELED',
  AWD: 'FINISHED',
  WO: 'FINISHED',
};

export function mapMatchStatus(apiStatus: string): 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'CANCELED' | 'POSTPONED' {
  return (STATUS_MAP[apiStatus] ?? 'SCHEDULED') as any;
}

const STAGE_PATTERNS: [RegExp, string][] = [
  [/group/i, 'GROUP'],
  [/round of 32/i, 'R32'],
  [/round of 16/i, 'R16'],
  [/quarter/i, 'QF'],
  [/semi/i, 'SF'],
  [/3rd place|third place/i, 'THIRD_PLACE'],
  [/final$/i, 'FINAL'],
];

export function mapStage(round: string): 'GROUP' | 'R32' | 'R16' | 'QF' | 'SF' | 'FINAL' | 'THIRD_PLACE' {
  for (const [pattern, stage] of STAGE_PATTERNS) {
    if (pattern.test(round)) return stage as any;
  }
  return 'GROUP';
}

export function extractGroupLetter(groupName: string): string {
  const match = groupName.match(/Group\s+([A-L])/i);
  return match ? match[1].toUpperCase() : groupName.slice(-1).toUpperCase();
}

const COUNTRY_FLAG: Record<string, string> = {
  USA: '\u{1F1FA}\u{1F1F8}', MEX: '\u{1F1F2}\u{1F1FD}', CAN: '\u{1F1E8}\u{1F1E6}',
  BRA: '\u{1F1E7}\u{1F1F7}', ARG: '\u{1F1E6}\u{1F1F7}', GER: '\u{1F1E9}\u{1F1EA}',
  FRA: '\u{1F1EB}\u{1F1F7}', ESP: '\u{1F1EA}\u{1F1F8}', ENG: '\u{1F3F4}',
  ITA: '\u{1F1EE}\u{1F1F9}', POR: '\u{1F1F5}\u{1F1F9}', NED: '\u{1F1F3}\u{1F1F1}',
  BEL: '\u{1F1E7}\u{1F1EA}', CRO: '\u{1F1ED}\u{1F1F7}', JPN: '\u{1F1EF}\u{1F1F5}',
  KOR: '\u{1F1F0}\u{1F1F7}', AUS: '\u{1F1E6}\u{1F1FA}', SEN: '\u{1F1F8}\u{1F1F3}',
  GHA: '\u{1F1EC}\u{1F1ED}', CMR: '\u{1F1E8}\u{1F1F2}', MAR: '\u{1F1F2}\u{1F1E6}',
  NGA: '\u{1F1F3}\u{1F1EC}', URU: '\u{1F1FA}\u{1F1FE}', COL: '\u{1F1E8}\u{1F1F4}',
  ECU: '\u{1F1EA}\u{1F1E8}', SUI: '\u{1F1E8}\u{1F1ED}', DEN: '\u{1F1E9}\u{1F1F0}',
  SWE: '\u{1F1F8}\u{1F1EA}', POL: '\u{1F1F5}\u{1F1F1}', TUR: '\u{1F1F9}\u{1F1F7}',
  IRN: '\u{1F1EE}\u{1F1F7}', KSA: '\u{1F1F8}\u{1F1E6}', TUN: '\u{1F1F9}\u{1F1F3}',
  EGY: '\u{1F1EA}\u{1F1EC}', RSA: '\u{1F1FF}\u{1F1E6}', NZL: '\u{1F1F3}\u{1F1FF}',
  CRC: '\u{1F1E8}\u{1F1F7}', PAN: '\u{1F1F5}\u{1F1E6}', JAM: '\u{1F1EF}\u{1F1F2}',
  HUN: '\u{1F1ED}\u{1F1FA}', SRB: '\u{1F1F7}\u{1F1F8}', UKR: '\u{1F1FA}\u{1F1E6}',
};

export function countryCodeToFlag(code: string | null): string {
  if (!code) return '\u{1F3F3}';
  return COUNTRY_FLAG[code.toUpperCase()] ?? '\u{1F3F3}';
}

export interface MappedTeam {
  name: string;
  code: string;
  flagEmoji: string;
  apiTeamId: number;
}

export function mapTeam(apiTeam: ApiTeam): MappedTeam {
  return {
    name: apiTeam.team.name,
    code: (apiTeam.team.code ?? apiTeam.team.name.slice(0, 3)).toUpperCase(),
    flagEmoji: countryCodeToFlag(apiTeam.team.code),
    apiTeamId: apiTeam.team.id,
  };
}

export interface MappedMatch {
  stage: string;
  kickoffAt: Date;
  venue: string | null;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  externalRef: string;
  apiHomeTeamId: number;
  apiAwayTeamId: number;
  meta: Record<string, unknown>;
}

export function mapFixture(f: ApiFixture): MappedMatch {
  return {
    stage: mapStage(f.league.round),
    kickoffAt: new Date(f.fixture.date),
    venue: f.fixture.venue.name ?? null,
    homeScore: f.goals.home,
    awayScore: f.goals.away,
    status: mapMatchStatus(f.fixture.status.short),
    externalRef: `apifootball:${f.fixture.id}`,
    apiHomeTeamId: f.teams.home.id,
    apiAwayTeamId: f.teams.away.id,
    meta: {
      round: f.league.round,
      referee: f.fixture.referee,
      city: f.fixture.venue.city,
      score: f.score,
    },
  };
}
