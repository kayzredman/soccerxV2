import type { ApiResponse, ApiFixture, ApiTeam, ApiStandingsResponse } from './types.js';

const BASE_URL = 'https://api.football-data.org/v4';

export interface ApiFootballClientOptions {
  apiKey: string;
}

export class ApiFootballClient {
  private apiKey: string;

  constructor(opts: ApiFootballClientOptions) {
    this.apiKey = opts.apiKey;
  }

  private async request(endpoint: string): Promise<any> {
    const url = BASE_URL + endpoint;

    const res = await fetch(url, {
      headers: {
        'X-Auth-Token': this.apiKey,
      },
    });

    const remaining = res.headers.get('x-requests-available');
    const limit = res.headers.get('x-requestcounter-reset');
    console.log('[football-data.org] ' + endpoint + ' — remaining: ' + (remaining || '?') + ', resets: ' + (limit || '?'));

    if (!res.ok) {
      const body = await res.text();
      throw new Error('football-data.org error ' + res.status + ': ' + body);
    }

    return res.json();
  }

  async getTeams() {
    return this.request('/competitions/WC/teams');
  }

  async getMatches() {
    return this.request('/competitions/WC/matches');
  }

  async getStandings() {
    return this.request('/competitions/WC/standings');
  }

  async getTodayMatches() {
    const today = new Date().toISOString().slice(0, 10);
    return this.request('/competitions/WC/matches?dateFrom=' + today + '&dateTo=' + today);
  }
}

export const WC2026_LEAGUE_ID = 1;
export const WC2026_SEASON = 2026;
