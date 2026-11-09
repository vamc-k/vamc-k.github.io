#!/bin/sh
# Render every scene as its own clip. Usage: ./render_scenes.sh [props-file]
P=${1:-props-scene.json}
mkdir -p out/scenes
for id in 01-opening 02-invite 03-events 04-couple 05-venue-join 06-finale; do
  npx remotion render src/index.ts "Scene-$id" "out/scenes/$id.mp4" --codec=h264 --crf=17 --props="$P" || exit 1
done
