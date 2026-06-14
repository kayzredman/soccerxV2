export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/bracket', label: 'Bracket' },
  { href: '/daily', label: 'Daily Picks' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/me', label: 'My Game' }
];

export const heroStats = [
  { label: 'Tournament Days', value: '39' },
  { label: 'Matches', value: '104' },
  { label: 'Daily Return Loops', value: '1–2 picks/day' },
  { label: 'League Invite Code', value: '8-char' }
];

export const features = [
  {
    title: 'Bracket as the spine',
    body: 'Build the tournament journey once and let live updates, progression paths, and social pressure do the rest.'
  },
  {
    title: 'Daily-return game loop',
    body: 'Bonus questions create reasons to come back every match-day instead of waiting for knockout drama.'
  },
  {
    title: 'Mini-leagues that stick',
    body: 'Invite-only leagues, rank climbs, and share surfaces become the retention engine.'
  },
  {
    title: 'Score ledger trust',
    body: 'Future API integration can explain every point with immutable score events and reversible corrections.'
  }
];

export const leaderboard = [
  { rank: 1, name: 'Kwame Blitz', points: 840, streak: '+42', country: 'GH' },
  { rank: 2, name: 'Atlas Eleven', points: 820, streak: '+28', country: 'NG' },
  { rank: 3, name: 'Goal Oracle', points: 815, streak: '+19', country: 'ZA' },
  { rank: 4, name: 'Box Midfield', points: 788, streak: '+15', country: 'GH' },
  { rank: 5, name: 'Press Trigger', points: 760, streak: '+11', country: 'KE' }
];

export const todayQuestions = [
  {
    title: 'Who scores first in Spain vs Brazil?',
    meta: 'Worth 10 points · Locks at kickoff',
    options: ['Spain', 'Brazil', 'No goal scorer in regular time']
  },
  {
    title: 'Over or under 2.5 goals in Ghana vs Japan?',
    meta: 'Worth 5 points · Locks at kickoff',
    options: ['Over 2.5', 'Under 2.5']
  }
];

export const bracketGroups = [
  {
    group: 'Group A',
    teams: ['Ghana', 'Mexico', 'Japan', 'Senegal']
  },
  {
    group: 'Group B',
    teams: ['Brazil', 'Canada', 'Netherlands', 'Korea']
  },
  {
    group: 'Group C',
    teams: ['Spain', 'Cameroon', 'USA', 'Uruguay']
  }
];
