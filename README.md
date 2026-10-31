# 💼 Dee Design: Sales Agent

A Claude Code **sales agent** for Diana's freelance UX/UI and product design business. It qualifies leads, writes proposals, quotes projects, preps discovery calls, drafts follow-ups, and keeps the pipeline up to date.

## Structure
```
.claude/agents/sales-agent.md     # The agent definition (persona, rules, workflows)
sales/
├── profile.md                    # Who Diana is: skills, case studies, links (fill in the TODOs)
├── offers-and-pricing.md         # Packages, rates, discount rules
├── ideal-client.md               # Ideal clients, red flags, 0–100 lead scoring rubric
├── playbook.md                   # Weekly lead-gen rhythm, call script, objections, follow-ups
├── templates/
│   ├── upwork-proposal.md        # Upwork/Contra cover letter
│   ├── cold-email.md             # Cold email, LinkedIn DM, reconnect, polite decline
│   └── project-proposal.md       # Full 3-option proposal document
└── pipeline/leads.csv            # Lead tracker
```

## Setup (10 minutes)
1. Fill in every `[[TODO]]` in `sales/profile.md` and `sales/offers-and-pricing.md`. The agent never invents facts or prices.
2. Delete the example row in `sales/pipeline/leads.csv`.

## How to use it
In Claude Code inside this repo, mention the agent or ask naturally:

| You say | You get |
|---|---|
| `@sales-agent score this Upwork post: <paste>` | Score out of 100, a verdict, red flags, and a tailored proposal |
| `@sales-agent write a cold email to <company/URL>` | Research plus a personalized email with a micro-audit insight |
| `@sales-agent quote: SaaS dashboard redesign, 12 screens` | A 3-option quote using your packages |
| `@sales-agent prep my call with <company>` | Company brief, UX hypotheses, and an agenda |
| `@sales-agent client says it's too expensive` | An objection reply that reframes and offers a smaller first step |
| `@sales-agent weekly review` | Pipeline stats, stale leads, and the top 3 actions with drafts |

> The agent **drafts only**. You review and send every message yourself.
