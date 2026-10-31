# SMM Agents: Pixel Academy & Dee Design

Two Claude Code subagents for Diana Hakobyan's social media.

| Agent | File | Voice | Channels |
|---|---|---|---|
| `pixel-academy-smm` | `.claude/agents/pixel-academy-smm.md` | Academy, "we", Armenian | Instagram (carousels, reels, stories), content calendars, Buffer/Later CSV |
| `dee-design-smm` | `.claude/agents/dee-design-smm.md` | Diana, "I" | Instagram @dee_uxuidesign, LinkedIn (FIG.0X), Medium, inquiry DMs |

## Usage

Open this repo in Claude Code and ask naturally; Claude routes to the right agent by its description. Or name it:

```
Use pixel-academy-smm: carousel about why users don't click a button
Use pixel-academy-smm: content calendar for November with a scheduling CSV
Use dee-design-smm: LinkedIn post + FIG.0X banner on AI agents replacing junior design tasks
Use dee-design-smm: reply to this project inquiry DM: "..."
```

Run `/agents` in Claude Code to view or edit them.

## Output

When asked to save, agents write to:

```
content/
├── pixel-academy/   # YYYY-MM-DD-slug.md, calendar-YYYY-MM.md, schedule-YYYY-MM.csv
└── dee-design/
    ├── instagram/
    ├── linkedin/
    └── medium/
```

## Keeping voices separate

- Pixel Academy: teacher first, max 5 slides, 5 to 8 word Armenian titles, "Օնլայն" only, no blue, platform not live yet.
- Dee Design: no em-dashes, no filler words, no credential flex, every post has a comment question and save line.
- Cross-promotion only when the topic naturally overlaps.
