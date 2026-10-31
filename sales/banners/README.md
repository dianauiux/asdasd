# Dee Design banner set 01: "Product design that moves numbers"

9 banners, 1080×1350 (4:5), for LinkedIn carousel / Instagram feed. Source: `index.html` (pure HTML/CSS, no stock photos; the portrait is Diana's own from the CV).

**Font:** the CSS asks for `Clash Display` first and falls back to `Outfit`. The rendered PNGs here use Outfit (Clash Display can't be downloaded in this environment). To get the true Clash Display look: open `index.html` on a machine with Clash Display installed and re-render, or rebuild in Figma with Clash Display Medium for headlines and Inter Regular for small labels.

**Palette:** electric blue `#2E52B8` / deep blue `#17307C` · orange `#F2591A` / hot `#FF7A2F` · cream `#F4EEE6` · ink `#121212`.
**Chrome:** glass chip `DD` top-left, `↘` top-right, small lowercase meta labels, soft grain over everything, glass cards with a 1px white/35% border.

## Rebuild
```
cp -r fonts img index.html render.js /somewhere && cd /somewhere && mkdir out && node render.js
```

## Banner copy and captions

| # | Banner headline | Use it for | Caption (LinkedIn, short) |
|---|---|---|---|
| 01 | **MORE THAN JUST PIXELS** | Profile intro / carousel cover | Design is the part of the product users can feel. I design the part they can measure. FinTech, AI, Web3. |
| 02 | **FROM 14 MINUTES ↘ DOWN TO SIX** (time to first trade · completion 52% → 71%) | Proof post | A new user used to need 14 minutes to reach a first trade. After the redesign, six. What changed was the order of the steps, not the colors. |
| 03 | **OPEN THE FIRST WIN.** (the most expensive screen is the one before the first win) | Opinion post, fintech onboarding | In fintech, every minute before the first win is a minute for doubt. Which screen is standing between your users and theirs? |
| 04 | **PRODUCT DESIGN ISN'T JUST MAKING IT PRETTY** (it's KYC, onboarding, the first trade, and the number that moves after launch) | Hot take / positioning | "Make it look nice" is not a brief. "Get a first-time user to a first trade in under 6 minutes" is a brief. |
| 05 | **NEXT GEN PRODUCTS · 20 26** (research led · data driven · dev ready) | Trend / year post, AI products | Every AI product is adding an agent this quarter. Almost none of them tell the user what the agent is about to do. |
| 06 | **A C T I V A T E** (designing the screen where users decide to stay) | Value post, activation | Activation is one screen. Users decide to stay or leave on it. I spend most of a project there. |
| 07 | **FOCUS ON THE FLOW THAT LOSES MONEY** (KYC · onboarding · dashboard) | Founder-facing offer | Founders don't need more screens. They need to know which screen loses the money. Send me your product link and I'll point at it. |
| 08 | **SELECTED CASE STUDIES** (fintech · web3 · ai · swipe to explore) | Carousel divider before case slides | Three products, three numbers that moved: 52→71% trade completion, 58→81% wallet connection, +28% weekly active users. |
| 09 | **SEND ME YOUR LINK.** (fintech · ai · web3 · deedesign.me) | CTA / last slide | Building in FinTech, AI or Web3? Send me your product link. I'll reply with the first three things I'd look at. |

## Suggested carousel order (LinkedIn PDF)
01 → 04 → 03 → 02 → 06 → 07 → 08 → 05 → 09

## Alt copy (same layouts, swap the text)
- 01: `MORE THAN JUST / SCREENS`
- 02: `FROM 4 CLICKS ↘ / DOWN TO TWO` (Web3 top tasks)
- 03: `CONNECT / THE / WALLET.` (wallet success 58% → 81%)
- 06: `R E T A I N` / `C O N V E R T`
- 07: `FOCUS ON / THE SCREEN / THAT LOSES / USERS`
- 09: `MAKE / THE FIRST / MOVE.`
