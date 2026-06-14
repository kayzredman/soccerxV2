# SoccerX - API-Football Integration & Ingest

## Overview

This overlay adds a complete **API-Football v3 integration** to SoccerX.

It uses **3 API calls** to pull all WC2026 data (free tier = 100/day):

| Call | Endpoint | Data |
|------|----------|------|
| 1 | `GET /standings?league=1&season=2026` | Groups + team assignments |
| 2 | `GET /teams?league=1&season=2026` | All 48 teams |
| 3 | `GET /fixtures?league=1&season=2026` | All 104 matches |

## Setup

### 1. Add your API key to `.env`

```env
FOOTBALL_DATA_API_KEY=your_api_football_key_here
```

### 2. Install new package

```bash
pnpm install
```

### 3. Run the ingest

```bash
npx tsx scripts/ingest-tournament.ts
```

### 4. Verify data

```bash
docker exec -it lotris_postgres psql -U lotris -d soccerx_v2 -c "SELECT count(*) FROM soccerx.teams;"
docker exec -it lotris_postgres psql -U lotris -d soccerx_v2 -c "SELECT count(*) FROM soccerx.matches;"
```

## Live Score Updates

During the tournament, run every 5 minutes:

```bash
npx tsx scripts/update-live-scores.ts
```

## API-Football Constants

| Key | Value |
|-----|-------|
| WC2026 League ID | `1` |
| WC2026 Season | `2026` |
| Auth header | `x-apisports-key` |
| Base URL | `https://v3.football.api-sports.io` |
