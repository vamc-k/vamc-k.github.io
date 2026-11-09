# Scenes

Each scene is its own clip in `out/scenes/` (1080x1920, 30 fps, rendered at 0.66x). `out/scenes/contact.png` shows start/middle/end of each.
Every clip fades in/out of cream on its own, so clips can be dropped, reordered or replaced freely.

| # | Clip | Length @0.66x | What it shows | Motion | Where to edit |
|---|---|---|---|---|---|
| 1 | `01-opening.mp4` | 7.1 s | Temple screen: maroon border, gold-framed couple photo drops in, towers rise, names in gold | page's own scroll + blur-slide text | `src/Hero.tsx` (text, timing); photo = page screen |
| 2 | `02-invite.mp4` | 7.2 s | "We cordially Invite" then names and parents' lines | page's own scroll | `seq/invite` footage; retime in `src/Root.tsx` (`* 1.15`) |
| 3 | `03-events.mp4` | 12.5 s | Haldi, Pellikoduku, Wedding, Vratam cards deal in, fan out, Wedding lifts | card-stack | `src/Events.tsx`, `EVENTS_T` in `src/lib.ts`; card text = page `EVENTS` |
| 4 | `04-couple.mp4` | 7.6 s | Spotlight finds the couple, camera swings in, they lift, petals fall | spotlight-hero-card | `src/Couple.tsx` |
| 5 | `05-venue-join.mp4` | 8.3 s | Photo frame, then venue name, then clock-wipe to "Join us" + "RSVP via the link" | clock-wipe | `src/Root.tsx` (wipe), `WIPE` in `src/lib.ts` |
| 6 | `06-finale.mp4` | 6.2 s | Names draw on in maroon, then date and blessing line, polaroids falling | letterspace-materialize | `src/Finale.tsx`, `NAME_DRAW` in `src/lib.ts` |

Notes: scene 5 opens on a mostly empty cream screen (the photo frame leaving) before the venue appears; it is the weakest scene and the best candidate to replace.

## Choose / replace / reorder
- Edit `scenes.json`: set `"enabled": false` to drop a scene, reorder the list, or point `"file"` at any 1080x1920 mp4 (sound optional).
- `python3 assemble.py` joins them (dip-to-cream between scenes; adds the music track from `scenes.json`; `--no-music` skips it).
- The assembled cut is longer than the master video because the master crossfades scenes into each other (barn-door, dissolves, clock-wipe).
  The master film is still `Invitation` (`out/invite-066x-bgm.mp4`).

## Re-render one scene after editing code
`npx remotion render src/index.ts Scene-03-events out/scenes/03-events.mp4 --props=props-scene.json` (or `./render_scenes.sh` for all).
Speed is a prop (`{"speed":0.66}`; try 1 or 0.5). Footage needs the capture step in `README.md` first.
