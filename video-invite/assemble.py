#!/usr/bin/env python3
"""Join the enabled scenes in scenes.json into one video (dip-to-cream between scenes, optional music).
Any scene can be replaced by pointing its "file" at another 1080x1920 mp4 (audio optional)."""
import json, subprocess, sys, os
M = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'scenes.json'))
use_music = '--no-music' not in sys.argv
sc = [s for s in M['scenes'] if s.get('enabled', True)]
def has_audio(f):
    r = subprocess.run(['ffprobe','-v','error','-select_streams','a','-show_entries','stream=index','-of','csv=p=0',f],capture_output=True,text=True)
    return bool(r.stdout.strip())
def dur(f):
    return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
cmd = ['ffmpeg','-y','-loglevel','error']; fc = []; labels = []; total = 0.0
for i, s in enumerate(sc):
    cmd += ['-i', s['file']]
for i, s in enumerate(sc):
    d = dur(s['file']); total += d
    fc.append(f"[{i}:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0xfbf2d6,fps=30,setsar=1,format=yuv420p[v{i}]")
    if has_audio(s['file']):
        fc.append(f"[{i}:a]aresample=44100,aformat=channel_layouts=stereo,atrim=0:{d:.3f},asetpts=PTS-STARTPTS[a{i}]")
    else:
        fc.append(f"anullsrc=r=44100:cl=stereo,atrim=0:{d:.3f},asetpts=PTS-STARTPTS[a{i}]")
    labels.append(f"[v{i}][a{i}]")
fc.append(''.join(labels) + f"concat=n={len(sc)}:v=1:a=1[v][a]")
amap = '[a]'
if use_music and M.get('music') and os.path.exists(M['music']):
    cmd += ['-i', M['music']]; mi = len(sc)
    vol = M.get('music_volume', 0.5)
    fc.append(f"[{mi}:a]atrim=0:{total:.3f},afade=t=in:d=0.8,afade=t=out:st={max(0,total-2.5):.3f}:d=2.5,volume={vol}[m]")
    fc.append("[a][m]amix=inputs=2:duration=first:normalize=0[am]"); amap = '[am]'
cmd += ['-filter_complex', ';'.join(fc), '-map', '[v]', '-map', amap, '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', M.get('output', 'out/assembled.mp4')]
os.makedirs(os.path.dirname(M.get('output', 'out/assembled.mp4')) or '.', exist_ok=True)
subprocess.run(cmd, check=True)
print('wrote', M.get('output'), f'({total:.1f}s, {len(sc)} scenes)')
