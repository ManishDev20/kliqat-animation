import React, {useEffect, useState} from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {loadFont} from "@remotion/google-fonts/Poppins";
import {A} from "./config";

loadFont();

const FPS = 30;
const BLACK = "#050505";
const WHITE = "#FFFFFF";
const PURPLE = "#7C3AED";
const SOFT_PURPLE = "#F1ECFF";
const INK = "#151515";
const MUTED = "#858585";
const LINE = "#E8E8E8";
const SOFT = "#F6F6F6";

const easeOut = (x: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
const appear = (f: number, start = 0, distance = 10) => {
  const p = easeOut(interpolate(f, [start, start + 10], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}));
  return {opacity: p, transform: `translateY(${(1 - p) * distance}px)`};
};

const Wordmark = ({white = false, width = 240}: {white?: boolean; width?: number}) => (
  <Img src={staticFile("logo.svg")} style={{width, filter: white ? "none" : "invert(1)"}} />
);

const Camera = ({children, zoom = 1, x = 0, y = 0, rotate = 0}: {children: React.ReactNode; zoom?: number; x?: number; y?: number; rotate?: number}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const breathe = Math.sin(f / 18) * 0.0025;
  const z = zoom + breathe;
  return (
    <AbsoluteFill style={{overflow: "hidden", background: WHITE}}>
      <AbsoluteFill style={{transform: `translate(${x}px, ${y}px) scale(${z}) rotate(${rotate}deg)`, transformOrigin: "50% 50%"}}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Kinetic = ({text, size = 120, color = WHITE, align = "left", delay = 0, weight = 700}: {text: string; size?: number; color?: string; align?: "left" | "center"; delay?: number; weight?: number}) => {
  const f = useCurrentFrame();
  const words = text.split(" ");
  return (
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", gap: "0 .22em", maxWidth: 1450, fontFamily: A.font, fontSize: size, fontWeight: weight, letterSpacing: "-.065em", lineHeight: .88, color, textAlign: align}}>
      {words.map((word, i) => {
        const p = spring({frame: Math.max(0, f - delay - i * 3), fps: FPS, config: {damping: 18, stiffness: 190, mass: .55}});
        return <span key={`${word}-${i}`} style={{opacity: p, transform: `translateY(${(1 - p) * 70}px) scale(${.86 + p * .14})`, transformOrigin: "50% 100%", display: "inline-block"}}>{word}</span>;
      })}
    </div>
  );
};

const TinyLabel = ({children, color = MUTED}: {children: React.ReactNode; color?: string}) => (
  <div style={{fontFamily: A.font, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color}}>{children}</div>
);

const Pill = ({children, active = false}: {children: React.ReactNode; active?: boolean}) => (
  <div style={{fontFamily: A.font, fontSize: 12, fontWeight: 600, color: active ? WHITE : MUTED, background: active ? BLACK : SOFT, padding: "9px 13px", borderRadius: 999}}>{children}</div>
);

const PhotoTile = ({i, selected = false, small = false}: {i: number; selected?: boolean; small?: boolean}) => {
  const tones = ["#D9D6D2", "#E8E2DC", "#CBCBCB", "#DDD8E8", "#C9C9C9", "#E6E6E6", "#D6D1CC", "#D7D4DE"];
  return (
    <div style={{position: "relative", height: small ? 92 : 150, borderRadius: 12, overflow: "hidden", background: tones[i % tones.length], border: selected ? `3px solid ${PURPLE}` : "1px solid rgba(0,0,0,.08)", boxSizing: "border-box"}}>
      <div style={{position: "absolute", width: small ? 35 : 55, height: small ? 35 : 55, borderRadius: "50%", background: "rgba(255,255,255,.58)", top: "23%", left: "34%"}} />
      <div style={{position: "absolute", width: "75%", height: "35%", borderRadius: "50% 50% 0 0", background: "rgba(40,40,40,.16)", bottom: -5, left: "12%"}} />
      {selected && <div style={{position: "absolute", right: 9, top: 9, width: 23, height: 23, borderRadius: "50%", background: PURPLE, color: WHITE, display: "grid", placeItems: "center", fontFamily: A.font, fontSize: 13, fontWeight: 700}}>✓</div>}
    </div>
  );
};

const AppChrome = ({active = "Projects", children}: {active?: string; children: React.ReactNode}) => (
  <div style={{position: "absolute", inset: 70, border: `1px solid ${LINE}`, borderRadius: 20, background: WHITE, overflow: "hidden", boxShadow: "0 30px 90px rgba(0,0,0,.10)"}}>
    <div style={{position: "absolute", left: 0, top: 0, bottom: 0, width: 220, background: "#FAFAFA", borderRight: `1px solid ${LINE}`, padding: 22, boxSizing: "border-box"}}>
      <div style={{fontFamily: A.font, fontWeight: 800, fontSize: 18, color: INK, letterSpacing: "-.05em", marginBottom: 28}}>kliqAt</div>
      {['Dashboard', 'Projects', 'Clients', 'Team', 'Finance'].map((x) => (
        <div key={x} style={{height: 38, display: "flex", alignItems: "center", gap: 9, borderRadius: 9, padding: "0 11px", boxSizing: "border-box", marginBottom: 5, background: x === active ? SOFT_PURPLE : "transparent", color: x === active ? PURPLE : MUTED, fontFamily: A.font, fontSize: 12, fontWeight: x === active ? 700 : 500}}>
          <span style={{width: 7, height: 7, borderRadius: 2, background: x === active ? PURPLE : "#C8C8C8"}} />{x}
        </div>
      ))}
      <div style={{position: "absolute", left: 22, right: 22, bottom: 24, fontFamily: A.font, fontSize: 10, color: MUTED}}>STUDIO WORKSPACE</div>
    </div>
    <div style={{position: "absolute", left: 220, top: 0, right: 0, height: 64, borderBottom: `1px solid ${LINE}`, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box"}}>
      <div style={{fontFamily: A.font, fontSize: 14, fontWeight: 700, color: INK}}>{active}</div>
      <div style={{marginLeft: "auto", width: 30, height: 30, borderRadius: "50%", background: BLACK}} />
    </div>
    {children}
  </div>
);

const Cursor = ({x, y, click = false, delay = 0}: {x: number; y: number; click?: boolean; delay?: number}) => {
  const f = useCurrentFrame();
  const p = spring({frame: Math.max(0, f - delay), fps: FPS, config: {damping: 16, stiffness: 240}});
  return (
    <div style={{position: "absolute", left: x, top: y, zIndex: 30, opacity: p}}>
      <div style={{width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "4px solid transparent", borderTop: "25px solid #111", transform: "rotate(-18deg)", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.25))"}} />
      {click && <div style={{position: "absolute", left: -13, top: -13, width: 30, height: 30, border: `2px solid ${PURPLE}`, borderRadius: "50%", opacity: .8, transform: `scale(${1 + Math.sin(f * .6) * .15})`}} />}
    </div>
  );
};

const SceneFrame = ({children, bg = WHITE}: {children: React.ReactNode; bg?: string}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: f, fps, config: {damping: 22, stiffness: 170, mass: .65}});
  return <AbsoluteFill style={{background: bg, opacity: p, transform: `scale(${.985 + p * .015})`}}>{children}</AbsoluteFill>;
};

const Intro = () => {
  const f = useCurrentFrame();
  const p = spring({frame: f, fps: FPS, config: {damping: 16, stiffness: 170}});
  return <SceneFrame bg={BLACK}>
    <div style={{position: "absolute", inset: 0, display: "grid", placeItems: "center", overflow: "hidden"}}>
      <div style={{position: "absolute", width: 26, height: 26, borderRadius: "50%", background: PURPLE, left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${Math.max(.2, p * 46)})`}} />
      <div style={{position: "absolute", inset: 0, background: BLACK, opacity: interpolate(f, [0, 16, 26], [1, .12, 0], {extrapolateRight: "clamp"})}} />
      <div style={{position: "absolute", left: 90, top: 82}}><TinyLabel color="#9A9A9A">A workspace built for</TinyLabel></div>
      <div style={{position: "absolute", left: 86, top: 170}}><Kinetic text="PHOTOGRAPHERS." size={150} color={WHITE} /></div>
      <div style={{position: "absolute", right: 92, bottom: 82, fontFamily: A.font, color: WHITE, fontSize: 16, fontWeight: 600, letterSpacing: ".08em"}}>KLIQAT</div>
    </div>
  </SceneFrame>;
};

const Account = () => {
  const f = useCurrentFrame();
  const fields = ["Your name", "Studio name", "Email address"];
  return <SceneFrame>
    <Camera zoom={1.02} x={-8}>
      <div style={{position: "absolute", left: 150, top: 145, width: 620}}>
        <TinyLabel color={PURPLE}>01 / START</TinyLabel>
        <div style={{marginTop: 28}}><Kinetic text="Create your workspace." size={92} color={INK} /></div>
        <div style={{marginTop: 25, fontFamily: A.font, fontSize: 18, color: MUTED, lineHeight: 1.5, maxWidth: 570}}>One account for your shoots, clients, team, delivery and money.</div>
      </div>
      <div style={{position: "absolute", left: 940, top: 115, width: 680, height: 770, border: `1px solid ${LINE}`, borderRadius: 26, padding: 52, boxSizing: "border-box", boxShadow: "0 30px 100px rgba(0,0,0,.08)"}}>
        <div style={{fontFamily: A.font, fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-.05em"}}>kliqAt</div>
        <div style={{marginTop: 70, fontFamily: A.font, fontSize: 30, fontWeight: 700, color: INK, letterSpacing: "-.04em"}}>Set up your account</div>
        {fields.map((x, i) => <div key={x} style={{marginTop: i === 0 ? 35 : 20, ...appear(f, 8 + i * 5, 12)}}>
          <div style={{fontFamily: A.font, fontSize: 11, color: MUTED, marginBottom: 8}}>{x}</div>
          <div style={{height: 54, border: `1px solid ${i === 0 && f > 18 ? PURPLE : "#DCDCDC"}`, borderRadius: 10, display: "flex", alignItems: "center", padding: "0 15px", fontFamily: A.font, fontSize: 15, color: i === 0 && f < 18 ? "#B4B4B4" : INK, boxShadow: i === 0 && f > 18 ? `0 0 0 3px ${SOFT_PURPLE}` : "none"}}>{i === 0 && f < 18 ? "Type your name" : ["Aarav Sharma", "Aarav Studio", "hello@aaravstudio.com"][i]}</div>
        </div>)}
        <div style={{marginTop: 35, height: 56, borderRadius: 11, background: BLACK, color: WHITE, display: "grid", placeItems: "center", fontFamily: A.font, fontSize: 14, fontWeight: 700, transform: `translateY(${f > 34 ? 0 : 7}px)`, opacity: interpolate(f, [30, 38], [0, 1], {extrapolateRight: "clamp"})}}>Create workspace <span style={{display: "inline-block", marginLeft: 8, color: "#C5A9FF"}}>→</span></div>
      </div>
      <Cursor x={1440} y={825} click delay={34}/>
    </Camera>
  </SceneFrame>;
};

const UploadShoot = () => {
  const f = useCurrentFrame();
  const progress = interpolate(f, [22, 52], [0, 100], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <SceneFrame>
    <AppChrome active="Projects">
      <div style={{position: "absolute", left: 255, top: 100, right: 45}}>
        <div style={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
          <div><TinyLabel color={PURPLE}>02 / BUILD THE SHOOT</TinyLabel><div style={{marginTop: 18}}><Kinetic text="Start with the shoot." size={72} color={INK} /></div></div>
          <div style={{background: BLACK, color: WHITE, padding: "12px 18px", borderRadius: 9, fontFamily: A.font, fontSize: 12, fontWeight: 700}}>+ New project</div>
        </div>
        <div style={{marginTop: 42, display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 20}}>
          <div style={{border: `1px solid ${LINE}`, borderRadius: 18, padding: 26, height: 430, boxSizing: "border-box"}}>
            <div style={{fontFamily: A.font, fontSize: 12, color: MUTED}}>PROJECT</div>
            <div style={{fontFamily: A.font, fontSize: 24, fontWeight: 750, color: INK, marginTop: 10}}>Aarav & Meera — Wedding</div>
            <div style={{display: "flex", gap: 8, marginTop: 18}}><Pill active>Wedding</Pill><Pill>24 Aug 2026</Pill><Pill>Jaipur</Pill></div>
            <div style={{marginTop: 34, border: `2px dashed #D6D6D6`, borderRadius: 14, height: 210, display: "grid", placeItems: "center", background: "#FCFCFC"}}>
              <div style={{textAlign: "center"}}><div style={{fontFamily: A.font, fontSize: 30, fontWeight: 800, color: PURPLE}}>↑</div><div style={{fontFamily: A.font, fontSize: 14, fontWeight: 700, color: INK, marginTop: 6}}>Drop your shoot data</div><div style={{fontFamily: A.font, fontSize: 11, color: MUTED, marginTop: 5}}>RAW files, folders, metadata</div></div>
            </div>
          </div>
          <div style={{border: `1px solid ${LINE}`, borderRadius: 18, padding: 26, height: 430, boxSizing: "border-box"}}>
            <div style={{fontFamily: A.font, fontSize: 12, color: MUTED}}>UPLOAD QUEUE</div>
            <div style={{marginTop: 20}}>{["RAW_01 — 124 files", "CEREMONY — 86 files", "PORTRAITS — 42 files"].map((x,i)=><div key={x} style={{marginBottom: 25}}><div style={{display: "flex", justifyContent: "space-between", fontFamily: A.font, fontSize: 12, color: INK}}><span>{x}</span><span>{Math.round(Math.min(100, Math.max(0, progress - i * 17)))}%</span></div><div style={{height: 7, borderRadius: 99, background: SOFT, marginTop: 9}}><div style={{height: 7, width: `${Math.min(100, Math.max(0, progress - i * 17))}%`, background: PURPLE, borderRadius: 99}}/></div></div>)}</div>
            <div style={{marginTop: 55, padding: 15, borderRadius: 12, background: "#FAFAFA", fontFamily: A.font, fontSize: 11, color: MUTED}}>Everything lands inside the project — ready for the next step.</div>
          </div>
        </div>
      </div>
    </AppChrome>
  </SceneFrame>;
};

const ClientSelection = () => {
  const f = useCurrentFrame();
  const selected = [1, 2, 4, 6];
  return <SceneFrame>
    <Camera zoom={1.03} x={-12} y={-6}>
      <div style={{position: "absolute", inset: 0, background: "#F5F5F5"}} />
      <div style={{position: "absolute", left: 110, top: 95, right: 110}}><TinyLabel color={PURPLE}>03 / CLIENT SELECTION</TinyLabel><div style={{marginTop: 22}}><Kinetic text="Let the client choose." size={94} color={INK} /></div></div>
      <div style={{position: "absolute", left: 165, top: 330, width: 1180, background: WHITE, borderRadius: 24, border: `1px solid ${LINE}`, padding: 28, boxSizing: "border-box", boxShadow: "0 30px 100px rgba(0,0,0,.10)"}}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}><div><div style={{fontFamily: A.font, fontSize: 22, fontWeight: 750, color: INK}}>Aarav & Meera</div><div style={{fontFamily: A.font, fontSize: 11, color: MUTED, marginTop: 4}}>Client selection gallery</div></div><div style={{display: "flex", gap: 8}}><Pill>148 photos</Pill><div style={{background: PURPLE, color: WHITE, padding: "9px 15px", borderRadius: 999, fontFamily: A.font, fontSize: 12, fontWeight: 700}}>Share gallery ↗</div></div></div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 22}}>{Array.from({length: 8}).map((_,i)=><PhotoTile key={i} i={i} selected={selected.includes(i) && f > 18 + i * 2}/>)}</div>
        <div style={{marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center"}}><div style={{fontFamily: A.font, fontSize: 12, color: MUTED}}><b style={{color: INK}}>{selected.filter(i => f > 18 + i * 2).length}</b> photos selected</div><div style={{background: BLACK, color: WHITE, borderRadius: 9, padding: "12px 18px", fontFamily: A.font, fontSize: 12, fontWeight: 700}}>Confirm selection</div></div>
      </div>
      <Cursor x={1130} y={590} click delay={18}/>
      <div style={{position: "absolute", right: 120, bottom: 72, fontFamily: A.font, fontSize: 13, color: INK, fontWeight: 700, opacity: interpolate(f, [34, 42], [0,1], {extrapolateRight: "clamp"})}}>CLIENT LINK SENT ✓</div>
    </Camera>
  </SceneFrame>;
};

const EditorFlow = () => {
  const f = useCurrentFrame();
  const travel = easeOut(interpolate(f, [18, 45], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}));
  return <SceneFrame bg={BLACK}>
    <div style={{position: "absolute", left: 110, top: 90}}><TinyLabel color="#9A9A9A">04 / TEAM WORKFLOW</TinyLabel><div style={{marginTop: 22}}><Kinetic text="Approved. Send it on." size={104} color={WHITE} /></div></div>
    <div style={{position: "absolute", left: 140, right: 140, top: 410, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <div style={{width: 360, padding: 24, borderRadius: 18, background: "#111111", border: "1px solid #292929"}}><div style={{fontFamily: A.font, fontSize: 11, color: "#9A9A9A"}}>SELECTED BY CLIENT</div><div style={{fontFamily: A.font, fontSize: 25, fontWeight: 750, color: WHITE, marginTop: 10}}>38 approved photos</div><div style={{display: "flex", gap: 6, marginTop: 18}}>{[0,1,2,3,4].map(i=><PhotoTile key={i} i={i+1} small />)}</div></div>
      <div style={{position: "relative", width: 500, height: 3, background: "#272727"}}><div style={{position: "absolute", left: `${travel * 90}%`, top: -6, width: 14, height: 14, borderRadius: "50%", background: PURPLE, boxShadow: `0 0 0 8px rgba(124,58,237,.16)`}}/><div style={{position: "absolute", inset: 0, width: `${travel * 100}%`, background: PURPLE}}/></div>
      <div style={{width: 360, padding: 24, borderRadius: 18, background: WHITE}}><div style={{fontFamily: A.font, fontSize: 11, color: MUTED}}>EDITOR</div><div style={{fontFamily: A.font, fontSize: 25, fontWeight: 750, color: INK, marginTop: 10}}>Retouching queue</div><div style={{marginTop: 18, height: 44, borderRadius: 9, background: SOFT_PURPLE, display: "flex", alignItems: "center", padding: "0 13px", fontFamily: A.font, fontSize: 12, color: PURPLE, fontWeight: 700}}>Aarav & Meera — 38 files</div><div style={{fontFamily: A.font, fontSize: 11, color: MUTED, marginTop: 12}}>Status: {f > 42 ? "IN EDITING" : "ASSIGNED"}</div></div>
    </div>
    <div style={{position: "absolute", bottom: 82, left: 140, fontFamily: A.font, fontSize: 14, color: "#A5A5A5"}}>No exports. No scattered folders. Just an assignment.</div>
  </SceneFrame>;
};

const Delivery = () => {
  const f = useCurrentFrame();
  const ready = f > 18;
  return <SceneFrame>
    <Camera zoom={1.02}>
      <div style={{position: "absolute", left: 120, top: 100}}><TinyLabel color={PURPLE}>05 / DELIVERY</TinyLabel><div style={{marginTop: 20}}><Kinetic text="Edited. Approved. Delivered." size={90} color={INK} /></div></div>
      <div style={{position: "absolute", left: 140, top: 340, width: 820, height: 510, borderRadius: 22, border: `1px solid ${LINE}`, padding: 26, boxSizing: "border-box", background: WHITE}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}><div><div style={{fontFamily: A.font, fontSize: 22, fontWeight: 750, color: INK}}>Final gallery</div><div style={{fontFamily: A.font, fontSize: 11, color: MUTED, marginTop: 5}}>Aarav & Meera — 38 edited photos</div></div><div style={{padding: "8px 12px", borderRadius: 999, background: ready ? "#E8F8EE" : SOFT, color: ready ? "#1C7A42" : MUTED, fontFamily: A.font, fontSize: 11, fontWeight: 700}}>{ready ? "READY" : "PROCESSING"}</div></div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 24}}>{Array.from({length: 8}).map((_,i)=><PhotoTile key={i} i={i+3} small />)}</div>
        <div style={{display: "flex", gap: 10, marginTop: 22}}><div style={{background: BLACK, color: WHITE, borderRadius: 9, padding: "12px 18px", fontFamily: A.font, fontSize: 12, fontWeight: 700}}>Deliver to client ↗</div><div style={{border: `1px solid ${LINE}`, color: INK, borderRadius: 9, padding: "12px 18px", fontFamily: A.font, fontSize: 12, fontWeight: 700}}>Download ZIP</div></div>
      </div>
      <div style={{position: "absolute", right: 150, top: 390, width: 430, padding: 26, borderRadius: 20, background: BLACK, color: WHITE, transform: `translateY(${interpolate(f,[20,38],[30,0],{extrapolateRight:"clamp"})}px)`, opacity: interpolate(f,[18,32],[0,1],{extrapolateRight:"clamp"})}}><TinyLabel color="#999">CLIENT DELIVERY</TinyLabel><div style={{fontFamily: A.font, fontSize: 28, fontWeight: 750, marginTop: 15}}>Your photos are ready.</div><div style={{fontFamily: A.font, fontSize: 12, color: "#A0A0A0", marginTop: 12}}>Private gallery • 38 photos • 1 link</div><div style={{marginTop: 28, height: 46, background: PURPLE, borderRadius: 9, display: "grid", placeItems: "center", fontFamily: A.font, fontSize: 12, fontWeight: 700}}>Open gallery</div></div>
    </Camera>
  </SceneFrame>;
};

const Finance = () => {
  const f = useCurrentFrame();
  const paid = f > 18;
  return <SceneFrame>
    <AppChrome active="Finance">
      <div style={{position: "absolute", left: 255, top: 96, right: 45}}>
        <TinyLabel color={PURPLE}>06 / MONEY</TinyLabel><div style={{marginTop: 18}}><Kinetic text="Get paid. Stay organized." size={76} color={INK} /></div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 38}}>
          {[['Revenue','₹ 1,84,000'],['Pending','₹ 42,000'],['Paid','₹ 1,42,000']].map(([a,b],i)=><div key={a} style={{padding: 22, border: `1px solid ${LINE}`, borderRadius: 16}}><div style={{fontFamily: A.font, fontSize: 11, color: MUTED}}>{a}</div><div style={{fontFamily: A.font, fontSize: 29, fontWeight: 750, color: i===2 && paid ? PURPLE : INK, marginTop: 12}}>{b}</div></div>)}
        </div>
        <div style={{marginTop: 18, display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 14}}>
          <div style={{border: `1px solid ${LINE}`, borderRadius: 16, padding: 22}}><div style={{fontFamily: A.font, fontSize: 11, color: MUTED}}>RECENT PAYMENTS</div>{['Aarav & Meera — ₹ 65,000','Vayrea Studio — ₹ 48,000','CN Films — ₹ 29,000'].map((x,i)=><div key={x} style={{display: "flex", justifyContent: "space-between", padding: "17px 0", borderBottom: i<2 ? `1px solid ${LINE}` : "none", fontFamily: A.font, fontSize: 12, color: INK}}><span>{x}</span><span style={{color: i===0 && paid ? PURPLE : MUTED}}>{i===0 && paid ? "PAID ✓" : "PAID"}</span></div>)}</div>
          <div style={{border: `1px solid ${LINE}`, borderRadius: 16, padding: 22}}><div style={{fontFamily: A.font, fontSize: 11, color: MUTED}}>INVOICE</div><div style={{fontFamily: A.font, fontSize: 21, fontWeight: 750, color: INK, marginTop: 12}}>INV-2026-0824</div><div style={{fontFamily: A.font, fontSize: 12, color: MUTED, marginTop: 7}}>Aarav & Meera</div><div style={{marginTop: 30, padding: 14, borderRadius: 10, background: SOFT_PURPLE, color: PURPLE, fontFamily: A.font, fontSize: 12, fontWeight: 700}}>Generate & share invoice ↗</div></div>
        </div>
      </div>
    </AppChrome>
  </SceneFrame>;
};

const Team = () => {
  const f = useCurrentFrame();
  const people = [['YOU', 'Photographer', PURPLE], ['MAYA', 'Editor', BLACK], ['ROHAN', 'Retoucher', '#666'], ['NEHA', 'Manager', '#AAA']];
  return <SceneFrame bg={BLACK}>
    <div style={{position: "absolute", left: 120, top: 90}}><TinyLabel color="#969696">07 / TEAM</TinyLabel><div style={{marginTop: 22}}><Kinetic text="Everyone sees the same work." size={96} color={WHITE} /></div></div>
    <div style={{position: "absolute", left: 150, right: 150, top: 395, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14}}>
      {people.map(([name, role, color],i)=><div key={name} style={{background: "#111", border: "1px solid #292929", borderRadius: 18, padding: 22, transform: `translateY(${interpolate(f,[i*3,i*3+12],[35,0],{extrapolateRight:"clamp"})}px)`, opacity: interpolate(f,[i*3,i*3+10],[0,1],{extrapolateRight:"clamp"})}}><div style={{width: 48, height: 48, borderRadius: "50%", background: color, color: WHITE, display: "grid", placeItems: "center", fontFamily: A.font, fontSize: 10, fontWeight: 800}}>{name[0]}</div><div style={{fontFamily: A.font, color: WHITE, fontSize: 17, fontWeight: 750, marginTop: 18}}>{name}</div><div style={{fontFamily: A.font, color: "#8A8A8A", fontSize: 11, marginTop: 4}}>{role}</div><div style={{marginTop: 24, height: 5, background: "#252525", borderRadius: 99}}><div style={{height: 5, width: `${55+i*11}%`, background: i===0 ? PURPLE : "#777", borderRadius: 99}}/></div><div style={{fontFamily: A.font, color: "#8A8A8A", fontSize: 10, marginTop: 8}}>{4+i} active assignments</div></div>)}
    </div>
    <div style={{position: "absolute", left: 150, bottom: 80, fontFamily: A.font, color: "#999", fontSize: 13}}>Projects • assignments • approvals • delivery — connected.</div>
  </SceneFrame>;
};

const Finale = () => {
  const f = useCurrentFrame();
  const p = spring({frame: f, fps: FPS, config: {damping: 20, stiffness: 150}});
  return <SceneFrame bg={BLACK}>
    <div style={{position: "absolute", inset: 0, display: "grid", placeItems: "center"}}>
      <div style={{position: "absolute", width: 520, height: 520, borderRadius: "50%", border: `1px solid rgba(124,58,237,.38)`, transform: `scale(${.7 + p*.4})`, opacity: .7}} />
      <div style={{position: "absolute", width: 310, height: 310, borderRadius: "50%", background: PURPLE, transform: `scale(${.15 + p*.85})`, opacity: .12}} />
      <div style={{textAlign: "center", position: "relative"}}>
        <Wordmark white width={370}/>
        <div style={{marginTop: 42}}><Kinetic text="ONE PLACE. EVERY SHOOT." size={62} color={WHITE} align="center" /></div>
        <div style={{fontFamily: A.font, fontSize: 14, color: "#9A9A9A", marginTop: 22, letterSpacing: ".08em"}}>CLIENTS · PROJECTS · FILES · TEAM · FINANCE · DELIVERY</div>
      </div>
    </div>
  </SceneFrame>;
};

const beats = [0, 45, 105, 180, 255, 330, 405, 480, 555];

const AudioTrack = () => <Audio src={staticFile("kliqat-audio-mix.mp3")} volume={1}/>;

export const KliqAtFilm = ({prototype = false}: {prototype?: boolean}) => {
  return <AbsoluteFill style={{background: BLACK}}>
    <AudioTrack />
    <Sequence from={0} durationInFrames={58}><Intro/></Sequence>
    <Sequence from={54} durationInFrames={70}><Account/></Sequence>
    <Sequence from={118} durationInFrames={92}><UploadShoot/></Sequence>
    <Sequence from={204} durationInFrames={82}><ClientSelection/></Sequence>
    <Sequence from={280} durationInFrames={78}><EditorFlow/></Sequence>
    <Sequence from={352} durationInFrames={86}><Delivery/></Sequence>
    <Sequence from={432} durationInFrames={83}><Finance/></Sequence>
    <Sequence from={505} durationInFrames={66}><Team/></Sequence>
    <Sequence from={563} durationInFrames={37}><Finale/></Sequence>
  </AbsoluteFill>;
};
