# Publish plan: button carousel

- **When:** Monday 2 Nov 2026, 12:00 Yerevan (08:00 UTC)
- **Account:** @pixel___academy (Composio account `instagram_sermo-lemosi`, IG user id `29416401021286679`)
- **Images:** `slide-01.jpg` … `slide-05.jpg` in this folder, fetched by Instagram from GitHub raw:
  `https://raw.githubusercontent.com/dianauiux/asdasd/claude/pixel-academy-dee-smm-agent-mq6gta/content/pixel-academy/2026-11-02-button-carousel/slide-0N.jpg`
- **Caption:** `caption.txt`
- **Dry run (31 Oct):** carousel container `18125091212315545` created from these URLs and reached `FINISHED`; not published. Containers expire in ~24h, so the real run creates a fresh one.

## Steps the scheduled task runs
1. `INSTAGRAM_GET_IG_USER_CONTENT_PUBLISHING_LIMIT` — quota check
2. `INSTAGRAM_CREATE_CAROUSEL_CONTAINER` with the 5 `child_image_urls` + caption
3. Poll `INSTAGRAM_GET_POST_STATUS` until `FINISHED`
4. `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH` with the container id
5. Fetch the permalink with `INSTAGRAM_GET_IG_MEDIA` and report it
