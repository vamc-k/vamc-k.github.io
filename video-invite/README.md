# Wedding invitation video (9:16, 30 s)

Built from the live `/ourstory` page, rendered with Remotion.

1. Serve the page: `cd public/ourstory && python3 -m http.server 8123`
2. Capture frames/stills (Playwright, 540x960 @2x -> 1080x1920): `node capture.js raw` and `node capture_couple.js raw`,
   then convert `raw/<scene>/*.png` to JPEG in `public/seq/<scene>/` and copy the stills into `public/{title,events,couple}`.
3. `npm install`, then
   - with music: `npx remotion render src/index.ts Invitation out/invite-bgm.mp4`
   - without music: `npx remotion render src/index.ts Invitation out/invite-nobgm.mp4 --props=props-nobgm-066.json (speed is a prop: 1, 0.66 or 0.5)`

`src/lib.ts` holds the single shot timeline; `src/Sfx.tsx` holds the sound-effect pin table (frames are relative to each shot).
The background music (`public/audio/bgm-<speed%>.mp3`) is synthesised by `make_bgm.py`; swap it for any track.
