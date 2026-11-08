import numpy as np, wave, subprocess, sys
SR=44100; BPM=120; BEAT=60/BPM; DUR=32.0
N=int(SR*DUR); L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(7)
def add(sig,t0,pan=0.0,gain=1.0):
    i=int(t0*SR); n=min(len(sig),N-i)
    if n<=0: return
    l=np.sqrt(0.5*(1-pan)); r=np.sqrt(0.5*(1+pan))
    L[i:i+n]+=sig[:n]*gain*l; R[i:i+n]+=sig[:n]*gain*r
def env(n,a,d,s,r):
    e=np.ones(n); a=int(a*SR); d=int(d*SR); r=int(r*SR)
    e[:a]=np.linspace(0,1,a,endpoint=False) if a>0 else 1
    if d>0 and a+d<n: e[a:a+d]=np.linspace(1,s,d)
    e[a+d:]=s
    if r>0 and r<n: e[-r:]*=np.linspace(1,0,r)
    return e
def hz(m): return 440*2**((m-69)/12)
def tone(f,dur,harm=(1,.5,.25,.12),vib=0.0,detune=0.0):
    t=np.arange(int(SR*dur))/SR
    ph=2*np.pi*f*t+ (vib*np.sin(2*np.pi*5.2*t) if vib else 0)
    s=sum(a*np.sin((k+1)*ph*(1+detune)) for k,a in enumerate(harm))
    return s
def lp(x,fc):  # one-pole lowpass
    a=np.exp(-2*np.pi*fc/SR); y=np.zeros_like(x); p=0.0
    for i in range(len(x)): p=(1-a)*x[i]+a*p; y[i]=p
    return y
# --- drone (tanpura: Sa Pa Sa Sa pluck cycle) ---
for k in range(int(DUR/ (BEAT*2))):
    t0=k*BEAT*2
    for j,(m,pan) in enumerate([(55,-.3),(62,.3),(67,-.1),(67,.1)]):  # C3 G3 C4 C4
        d=3.2; s=tone(hz(m-12 if j==0 else m-12),d,(1,.6,.5,.35,.25,.18),vib=0)
        s*=env(len(s),0.004,0.6,0.35,1.2)*np.exp(-np.arange(len(s))/SR/1.6)
        add(s,t0+j*BEAT*0.5,pan,0.055)
# --- pad: soft strings by bar ---
bars=['C','C','Am','Am','F','F','C','G','C','C','Am','Am','F','G','C','C']
CH={'C':[48,55,64,67],'Am':[45,52,60,64],'F':[41,53,60,65],'G':[43,50,59,62]}
for b,c in enumerate(bars):
    t0=b*4*BEAT; d=4*BEAT+0.9
    for m in CH[c]:
        s=tone(hz(m),d,(1,.35,.15),detune=0.0)+tone(hz(m)*1.004,d,(1,.3,.1))
        s=lp(s,1400)
        s*=env(len(s),1.1,0,1,1.4)
        add(s,t0,rng.uniform(-.5,.5),0.030)
# --- bansuri melody ---
E5,G5,A5,C6,D5,C5,B4=hz(76),hz(79),hz(81),hz(84),hz(74),hz(72),hz(71)
mel=[(2,2,E5),(4,1,G5),(5,1,A5),(6,2,G5),(8,2,E5),(10,1,D5),(11,1,C5),(12,4,D5),
(16,2,E5),(18,1,G5),(19,1,A5),(20,2,C6),(22,2,A5),(24,2,G5),(26,1,E5),(27,1,G5),(28,4,A5),
(32,2,G5),(34,1,A5),(35,1,G5),(36,2,E5),(38,2,D5),(40,2,E5),(42,1,G5),(43,1,E5),(44,4,D5),
(48,2,C5),(50,1,E5),(51,1,G5),(52,2,A5),(54,2,C6)]
for b,d,f in mel:
    dur=d*BEAT+0.5
    s=tone(f,dur,(1,.22,.08),vib=0.35)
    br=lp(rng.normal(0,1,len(s)),5000)*0.05
    s=(s+br)*env(len(s),0.06,0.2,0.75,0.5)
    add(s,b*BEAT,0.15,0.11)
# finale: bell hit at beat 56 (28.0 s) + resolved tail
for m,g in [(60,.16),(67,.10),(72,.12),(76,.09),(79,.07)]:
    s=tone(hz(m),4.0,(1,.5,.33,.2,.1)); s*=np.exp(-np.arange(len(s))/SR/1.4)*env(len(s),0.003,0,1,0.4)
    add(s,56*BEAT,0,g)
for m in [48,55,60,64,67]:
    s=tone(hz(m),4.5,(1,.3,.1)); s*=env(len(s),0.6,0,1,2.5); add(s,56*BEAT,0,0.05)
# bell accents on bar starts (temple-bell shimmer)
for b in [0,4,8,12]:
    s=tone(hz(84),2.5,(1,.4,.2,.1)); s*=np.exp(-np.arange(len(s))/SR/0.7)*env(len(s),0.002,0,1,0.3)
    add(s,b*4*BEAT,0.25,0.05)
# --- soft percussion ---
def thump(f0=95,dur=0.35):
    t=np.arange(int(SR*dur))/SR; f=f0*np.exp(-t*9)+55
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*9)
def tick(dur=0.06):
    n=rng.normal(0,1,int(SR*dur)); n=n-lp(n,3500)
    return n*np.exp(-np.arange(len(n))/SR/0.012)
for b in range(int(DUR/(BEAT*4))):
    t0=b*4*BEAT
    if t0<3.9: continue
    add(thump(),t0,0,0.30); add(thump(80,0.3),t0+2.5*BEAT,0,0.14)
    for e in range(8):
        add(tick(),t0+e*BEAT*0.5,0.2 if e%2 else -0.2,0.035 if e%2==0 else 0.02)
# --- master ---
fi=np.minimum(1,np.arange(N)/SR/0.8); fo=np.minimum(1,np.maximum(0,(DUR-np.arange(N)/SR)/2.0))
L*=fi*fo; R*=fi*fo
# gentle reverb: few comb taps
def verb(x):
    y=x.copy()
    for d,g in [(0.073,.32),(0.121,.26),(0.187,.2),(0.263,.14)]:
        k=int(d*SR); y[k:]+=x[:-k]*g
    return y
L=verb(L); R=verb(np.roll(R,int(0.011*SR)))
pk=max(abs(L).max(),abs(R).max()); L/=pk; R/=pk
st=np.stack([L,R],1)*0.89
pcm=(st*32767).astype('<i2')
with wave.open('/tmp/bgm_raw.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
subprocess.run(['ffmpeg','-loglevel','error','-y','-i','/tmp/bgm_raw.wav','-c:a','libmp3lame','-q:a','2',sys.argv[1]],check=True)
print('ok')
