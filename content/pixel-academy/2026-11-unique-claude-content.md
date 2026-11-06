# Pixel Academy · «Այն, ինչ շատերը չգիտեն» · Claude բովանդակություն + comment→DM համակարգ

Սկզբունք՝ չենք կրկնում այն, ինչ բոլորն են ասում («Claude-ը կայք է սարքում»)։ Ցույց ենք տալիս հնարքներ, որ մարդիկ չգիտեն կամ չեն օգտագործում, և մեր իրական աշխատանքը։
Ամեն reel վերջանում է comment keyword-ով → ավտոմատ DM → follow → guide։

---

## Մաս 1 · 8 «քչերը գիտեն» reel Claude Design-ի և կայքերի մասին

### U1 · Claude-ը ստուգում է իր դիզայնը սքրինշոթով
- Hook. «Claude-ը կարող է նայել իր սարքած կայքին և ուղղել սխալները։ Քչերն են սա օգտագործում»
- Ինչ է. Claude Code-ում Claude-ը բացում է կայքը բրաուզերում (Playwright), անում է screenshot, նայում է և ինքն ուղղում։ Մեր բոլոր carousel-ներն ու cover-ները հենց այդպես են արվել։
- Prompt. `After you build it, open the page in a browser, take a screenshot at 390px and 1440px, compare it with the reference, and fix the top 3 differences.`
- Keyword. **CLAUDE**

### U2 · «Գողացիր» ռիթմը, ոչ թե կոդը
- Hook. «Թույն կայք ես տեսել։ Մի պատճենիր։ Վերցրու նրա "DNA"-ն»
- Ինչ է. Claude-ին տուր կայքի screenshot և խնդրիր դուրս բերել համակարգը՝ տառատեսակի սանդղակը, spacing-ի քայլը, գույների քանակը, animation-ի տևողությունները։ Հետո քո բրենդով նոր դիզայն այդ կանոններով։
- Prompt. `Analyze this screenshot. Extract the design system only: type scale, spacing scale, number of colors, corner radius, motion durations. Don't copy content or layout. Then apply these rules to my brand: [colors, fonts].`
- Կարևոր. ուրիշի կոդը կամ դիզայնը չենք պատճենում, վերցնում ենք սկզբունքները։
- Keyword. **DNA**

### U3 · Animation-ը սկսիր «motion spec»-ից
- Hook. «Ինչու՞ են AI animation-ները էժան տեսք ունենում։ Որովհետև չես տալիս թվերը»
- Ինչ է. Նախ խնդրիր motion spec (տևողություն, easing, stagger), հետո նոր կոդ։
- Prompt. `Before coding, write a motion spec table: element, trigger, duration (ms), easing (cubic-bezier), delay/stagger. Use 150–400ms, one easing curve for the whole page. Then implement it.`
- Keyword. **ANIMATION**

### U4 · Scroll animation առանց գրադարանի
- Hook. «2026-ին scroll animation-ի համար JavaScript պետք չէ»
- Ինչ է. CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`). Ժամանակակից բրաուզերների ֆունկցիա է, քչերն են օգտագործում։
- Prompt. `Animate each section as it enters the viewport using CSS scroll-driven animations (animation-timeline: view()). No JavaScript. Add a fallback for browsers without support and respect prefers-reduced-motion.`
- Keyword. **SCROLL**

### U5 · Անուններով խնդրիր, ոչ թե «սիրուն»
- Hook. «Մի գրիր "սիրուն animation"։ Գրիր գործիքի անունը»
- Ինչ է. Կոնկրետ գրադարաններ՝ GSAP (ScrollTrigger), Framer Motion (React), Lenis (smooth scroll), View Transitions API (էջերի անցում)։ Անունը տալիս ես, արդյունքը կտրուկ լավանում է։
- Prompt. `Use GSAP with ScrollTrigger: pin the hero, scale the product image from 0.8 to 1 while scrolling, then release. Add Lenis for smooth scrolling.`
- Keyword. **GSAP**

### U6 · Claude-ը որպես art director
- Hook. «Կայքը պատրաստ է։ Հիմա խնդրիր Claude-ին քննադատել այն»
- Prompt. `Act as a senior art director. Critique this page harshly: hierarchy, spacing, contrast, consistency. List the 5 biggest problems by impact, then fix only the top 3.`
- Keyword. **CLAUDE**

### U7 · Կոդից Figma, ոչ միայն Figma-ից կոդ
- Hook. «Բոլորը Figma-ից կոդ են սարքում։ Իսկ հակառակը գիտե՞ս»
- Ինչ է. Figma-ի պաշտոնական MCP connector-ով Claude-ը կարող է կոդով սարքած էջը տեղափոխել Figma որպես խմբագրվող շերտեր։ Դիզայները շարունակում է Figma-ում։
- Keyword. **FIGMA**
- Նկարելուց առաջ փորձիր քո հաշվով։

### U8 · Design tokens մեկ ֆայլով
- Hook. «Դիզայները և ծրագրավորողը վիճում են գույների համար։ Մեկ ֆայլ լուծում է»
- Prompt. `Export all colors, fonts, spacing and radii from this page as design tokens in tokens.json and as CSS variables with light and dark themes.`
- Keyword. **TOKENS**

---

## Մաս 2 · AI agent-ները որպես թիմ («թիմ չունե՞ս, հավաքիր agent-ներով»)

### A1 · Reel. «Թիմ չունեմ։ Ունեմ 6 agent» (մեր իրական օրինակը + ինչ կարելի է ավելացնել)
| Agent | Ինչ է անում | Մեզ մոտ |
|---|---|---|
| SMM | caption-ներ, պլան, carousel, ժամանակացույց | ✅ աշխատում է |
| Analyst | երկուշաբթի ռեպորտ, լավագույն/վատագույն պոստ | ✅ աշխատում է |
| Content designer | cover-ներ, highlights, storyboard-ներ | ✅ աշխատում է |
| Sales | պատասխանների սևագրեր հարցումներին, follow-up նամակներ Gmail-ում | 🔜 կարելի է ավելացնել |
| Student support | FAQ-ի պատասխաններ, դասացուցակի հիշեցումներ | 🔜 |
| Research | մրցակիցներ, AI նորություններ, թրենդներ շաբաթը մեկ | 🔜 |

Ձայնի առանցքը. «Agent-ը թիմակից է, որ աշխատում է գիշերը։ Բայց վերջնական որոշումը միշտ մարդունն է»։
Keyword. **AGENT**

### A2 · Reel. «Ինչպես agent-ին տալ "պաշտոն"»
Agent-ի ֆայլի 5 բաժին. Դեր · Նպատակ · Գործիքներ · Կանոններ (ինչ չի կարելի) · Ինչպես ստուգել աշխատանքը։
Keyword. **AGENT**

### A3 · Reel. «Sales agent-ը չի ուղարկում նամակը։ Գրում է սևագիրը»
Ինչու է կարևոր. AI-ը պատրաստում է, մարդը ուղարկում է։ Այսպես սխալը չի հասնում հաճախորդին։
Keyword. **SALES**

---

## Մաս 3 · Connector-ների ցանկ (guide-ի համար)

| Connector | Ինչի համար | Ում |
|---|---|---|
| Figma | դիզայն ↔ կոդ, էկրանների կարդալ | դիզայներ |
| Canva | Claude Design-ի աշխատանքը Canva-ում շարունակել | դիզայներ, SMM |
| Notion | պլաններ, դասընթացի նյութեր, նոթեր | բոլորը |
| Google Drive | ֆայլեր, վիդեոներ | բոլորը |
| Gmail | նամակների սևագրեր, հարցումներ | sales |
| Google Calendar | հանդիպումներ, դասացուցակ | բոլորը |
| Slack | թիմի հաղորդագրություններ | թիմ |
| Asana / Linear / Jira | առաջադրանքներ | PM, թիմ |
| GitHub | կոդ, կայքի թարմացում | developer, vibe coding |
| Vercel | կայքի հրապարակում, analytics | vibe coding |
| Higgsfield | նկար և վիդեո գեներացիա | SMM, մարքեթինգ |
| Composio | Instagram և 500+ ծառայություններ մեկ տեղից | SMM |

Ցանկը փոխվում է։ Guide-ը հրապարակելուց առաջ ստուգիր Claude-ի Connectors բաժինը։

---

## Մաս 4 · Comment → Follow → Guide ավտոմատ համակարգ

### Ինչով սարքել
**ManyChat** (Meta-ի պաշտոնական գործընկեր, Instagram-ի համար)։ Կոդ պետք չէ։ Ունի «comment keyword» trigger և follow-ի ստուգում։
Ինչու ոչ ինքներս. Instagram-ի API-ով սա պահանջում է անընդհատ աշխատող սերվեր և Meta-ի հատուկ թույլտվություններ (messages, comments)։ ManyChat-ն արդեն ունի դրանք։

### Flow
1. **Trigger.** comment-ում կա keyword (CLAUDE, AGENT, ANIMATION...) կոնկրետ reel-ի տակ
2. **Հրապարակային պատասխան comment-ին** (ավտոմատ, 3 տարբերակ հերթափոխով)
   - «Ուղարկեցինք անձնական նամակով 📩»
   - «Ստուգիր նամակներդ 🙂»
   - «Guide-ը քո DM-ում է ✨»
3. **DM 1**
   ```
   Բարև 🙂 Guide-ը պատրաստ է։
   Ստանալու համար հետևիր @pixel___academy էջին և սեղմիր կոճակը 👇
   [Հետևեցի ✅]
   ```
4. **Ստուգում.** Կոճակը սեղմելիս ManyChat-ը ստուգում է՝ հետևո՞ւմ է, թե ոչ
   - **Այո →** DM 2
   - **Ոչ →**
     ```
     Կարծես դեռ չես հետևում 🙂 Հետևիր @pixel___academy-ին և նորից սեղմիր կոճակը։
     [Հետևեցի ✅]
     ```
5. **DM 2**
   ```
   Ահա քո guide-ը 👇
   [հղում]

   Եթե ուզես սովորել սա մեզ հետ, գրիր «ԴԱՍԸՆԹԱՑ», ու կպատմենք Claude Design դասընթացի մասին։
   ```

### Կանոններ
- Instagram-ը թույլ է տալիս մեկ ավտոմատ պատասխան comment-ին։ Երբ մարդը սեղմում է կոճակը, բացվում է 24 ժամվա պատուհան հետագա նամակների համար։
- Follow-ը խնդրիր քաղաքավարի, մեկ անգամ։ Չափազանց պնդելը նյարդայնացնում է։
- Guide-ը պետք է իսկապես օգտակար լինի, թե չէ մարդիկ unfollow կանեն։
- ManyChat-ի պլանը և գինը ստուգիր նրանց կայքում։

### Guide-ներ, որ պետք է պատրաստել (lead magnets)
| Keyword | Guide |
|---|---|
| CLAUDE | 10 prompt Claude Design-ի համար (կայք, landing, art director) |
| ANIMATION | Motion spec ձևանմուշ + 5 animation prompt |
| SCROLL / GSAP | Scroll animation-ների 6 prompt |
| AGENT | Agent-ի ֆայլի ձևանմուշ (Դեր · Նպատակ · Գործիքներ · Կանոններ · Ստուգում) |
| SALES | Sales agent-ի կանոններ + 3 նամակի ձևանմուշ |
| TOKENS | Design tokens checklist |
| CONNECT | Connector-ների ցանկ՝ ում ինչ է պետք |

Ձևաչափ. 1-էջանոց PDF կամ Notion էջ, Pixel-ի բրենդով։

---

## Reel-ի վերջի CTA (ձայնով, դեմքով)
«Գրիր comment-ում «CLAUDE», ու կուղարկենք 10 prompt, որ ես ինքս եմ օգտագործում»
«Գրիր «AGENT», ու կուղարկենք agent-ի ձևանմուշը, որով աշխատում է մեր թիմը»
