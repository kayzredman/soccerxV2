# After extracting this overlay

## 1. Check pnpm-workspace.yaml

Make sure it includes `packages/*`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "workers/*"
```

## 2. Add API key to both .env files

```bash
echo 'FOOTBALL_DATA_API_KEY=your_key_here' >> .env
echo 'FOOTBALL_DATA_API_KEY=your_key_here' >> packages/db/.env
```

## 3. Install

```bash
pnpm install
```

## 4. Run ingest

```bash
npx tsx scripts/ingest-tournament.ts
```
