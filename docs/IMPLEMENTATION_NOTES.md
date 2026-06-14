# SoccerX implementation notes

## Doc synthesis highlights
- The product doc positions SoccerX as a **39-day daily-return social game** with the bracket as the spine.
- The decisions log updates two important implementation choices:
  - **Magic-link auth** for v1 instead of Clerk-first
  - **Groups-only bracket at launch** with knockouts deferred to the second wave
- Definitions establish that scoring and lock semantics must be treated as authoritative when label wording conflicts elsewhere.

## Frontend design choices in this starter
- **Mobile-first** pages and touch-sized controls
- **Motion used sparingly** for hierarchy and delight, not decoration
- **Component style inspired by modern community patterns** without depending on proprietary code
- **Server-first layout** with leaf client components for animation
- **Predictable IA**:
  - landing sells the product loop
  - bracket handles selection
  - daily handles the habit loop
  - leaderboard handles social pressure
  - me handles explanation and confidence

## Immediate backlog after this starter
1. Real auth and session state
2. Tournament + fixtures data integration
3. Pick persistence with lock validation
4. Score-event audit UI
5. League creation / join flows
6. OG image generation + share actions
