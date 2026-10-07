import React from "react";
import {AbsoluteFill,Img,Sequence,interpolate,spring,useCurrentFrame,useVideoConfig} from "remotion";
import {loadFont} from "@remotion/google-fonts/Poppins";
import {A} from "./config";

loadFont();

type ScreenProps={dark?:boolean};

const FadeText=({children,size=72,dark=false,delay=0,weight=600}:{children:React.ReactNode;size?:number;dark?:boolean;delay?:number;weight?:number})=>{
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({frame:Math.max(0,f-delay),fps,config:{damping:22,stiffness:180,mass:.65}});
  return <div style={{fontFamily:A.font,fontSize:size,fontWeight:weight,letterSpacing:"-.055em",lineHeight:.98,color:dark?A.ink:A.white,opacity:p,transform:`translateY(${(1-p)*26}px)`}}>{children}</div>;
};

const Bar=({children,active=false}:{children:React.ReactNode;active?:boolean})=><div style={{height:38,padding:"0 14px",display:"flex",alignItems:"center",gap:9,borderRadius:9,background:active?"#F0EAFE":"transparent",color:active?A.purple:A.muted,fontFamily:A.font,fontSize:13,fontWeight:active?600:500}}>{children}</div>;

const Sidebar=({active="Projects"}:{active?:string})=><div style={{position:"absolute",left:0,top:0,bottom:0,width:238,background:"#FBFBFB",borderRight:`1px solid ${A.line}`,padding:"28px 20px",boxSizing:"border-box"}}>
  <div style={{fontFamily:A.font,fontWeight:700,fontSize:18,letterSpacing:"-.04em",color:A.ink,marginBottom:30}}>CN FILMS PHOTOGRAPHY</div>
  <Bar active={active==="Dashboard"}>◉ <span>Dashboard</span></Bar>
  <Bar active={active==="Projects"}>▣ <span>Projects</span></Bar>
  <Bar active={active==="Team"}>♢ <span>Team</span></Bar>
  <Bar active={active==="Settings"}>⚙ <span>Settings</span></Bar>
  <div style={{position:"absolute",left:20,right:20,bottom:30}}>
    <div style={{fontFamily:A.font,fontSize:11,color:A.muted,marginBottom:8}}>STORAGE</div>
    <div style={{fontFamily:A.font,fontSize:12,color:A.ink}}>106.4 MB of 20.0 GB</div>
    <div style={{height:4,borderRadius:5,background:"#EDEDED",marginTop:8}}><div style={{height:4,width:"7%",background:A.purple,borderRadius:5}}/></div>
  </div>
</div>;

const Top={position:"absolute" as const,left:238,right:0,top:0,height:72,borderBottom:`1px solid ${A.line}`,display:"flex",alignItems:"center",padding:"0 30px",boxSizing:"border-box" as const};

const Cursor=({x,y,delay=0}:{x:number;y:number;delay?:number})=>{
 const f=useCurrentFrame();
 const p=spring({frame:Math.max(0,f-delay),fps:30,config:{damping:20,stiffness:180}});
 return <div style={{position:"absolute",left:x,top:y,zIndex:20,opacity:p,transform:`translate(0,0) scale(${.9+p*.1})`,width:18,height:24,filter:"drop-shadow(0 2px 3px rgba(0,0,0,.25))"}}>
   <div style={{width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderTop:"20px solid #111",transform:"rotate(-18deg)"}}/>
 </div>;
};

const Intro=()=> <AbsoluteFill style={{background:A.black,display:"grid",placeItems:"center"}}>
  <Img src={A.logo} style={{width:390}}/>
  <div style={{position:"absolute",bottom:76,left:88,fontFamily:A.font,fontSize:15,letterSpacing:".16em",color:"#8C8C8C"}}>THE WORKSPACE FOR PHOTOGRAPHERS</div>
</AbsoluteFill>;

const Onboarding=()=>{const f=useCurrentFrame();const progress=interpolate(f,[0,32],[0,1],{extrapolateRight:"clamp"});return <AbsoluteFill style={{background:"#FAFAFA",display:"flex",alignItems:"center",justifyContent:"center"}}>
  <div style={{width:1320,height:760,background:A.white,border:"1px solid #EAEAEA",borderRadius:24,boxShadow:"0 30px 100px rgba(0,0,0,.08)",display:"flex",overflow:"hidden"}}>
    <div style={{width:390,background:A.black,padding:48,boxSizing:"border-box",color:A.white}}>
      <div style={{fontFamily:A.font,fontSize:18,fontWeight:700}}>KliqAt</div>
      <div style={{marginTop:110,fontFamily:A.font,fontSize:42,fontWeight:600,letterSpacing:"-.05em",lineHeight:1}}>Set up your<br/>workspace.</div>
      <div style={{marginTop:28,fontFamily:A.font,fontSize:15,lineHeight:1.55,color:"#A1A1A1"}}>Everything you need to run your photography business, in one place.</div>
      <div style={{marginTop:90,fontFamily:A.font,fontSize:12,color:"#A1A1A1"}}>01 / 03</div>
    </div>
    <div style={{flex:1,padding:"70px 78px",boxSizing:"border-box"}}>
      <div style={{fontFamily:A.font,fontSize:13,color:A.purple,fontWeight:600,letterSpacing:".08em"}}>WELCOME TO KLIQAT</div>
      <div style={{marginTop:20,fontFamily:A.font,fontSize:42,fontWeight:600,letterSpacing:"-.05em",color:A.ink}}>Tell us about your studio.</div>
      <div style={{marginTop:42,fontFamily:A.font,fontSize:13,color:A.muted}}>Studio name</div>
      <div style={{marginTop:9,height:58,border:"1px solid #DADADA",borderRadius:10,padding:"0 18px",display:"flex",alignItems:"center",fontFamily:A.font,fontSize:16,color:A.ink}}>CN FILMS PHOTOGRAPHY</div>
      <div style={{marginTop:22,fontFamily:A.font,fontSize:13,color:A.muted}}>What do you shoot?</div>
      <div style={{display:"flex",gap:10,marginTop:9}}>{["Weddings","Portraits","Commercial"].map((x,i)=><div key={x} style={{padding:"13px 18px",borderRadius:9,border:`1px solid ${i===0?A.purple:"#DDD"}`,background:i===0?"#F5F0FF":"#fff",fontFamily:A.font,fontSize:13,color:A.ink}}>{x}</div>)}</div>
      <div style={{marginTop:52,height:5,background:"#ECECEC",borderRadius:5}}><div style={{height:5,width:`${progress*100}%`,background:A.purple,borderRadius:5}}/></div>
      <div style={{marginTop:24,display:"flex",justifyContent:"flex-end"}}><div style={{background:A.black,color:A.white,borderRadius:9,padding:"13px 24px",fontFamily:A.font,fontSize:14,fontWeight:600}}>Continue →</div></div>
    </div>
  </div>
</AbsoluteFill>};

const Dashboard=()=> <AbsoluteFill style={{background:A.white}}>
  <Sidebar active="Dashboard"/>
  <div style={Top}><div style={{fontFamily:A.font,fontSize:20,fontWeight:600,color:A.ink}}>Dashboard</div><div style={{marginLeft:"auto",fontFamily:A.font,fontSize:13,color:A.muted}}>Chandan Sharma</div></div>
  <div style={{position:"absolute",left:290,top:125,right:60}}>
    <FadeText dark size={54}>Good morning.</FadeText>
    <div style={{fontFamily:A.font,fontSize:15,color:A.muted,marginTop:12}}>Here’s what’s happening across your studio.</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginTop:45}}>
      {[["Active projects","03"],["Files","174"],["Deliveries","23"]].map(([a,b])=><div key={a} style={{border:"1px solid #E8E8E8",borderRadius:16,padding:25}}><div style={{fontFamily:A.font,fontSize:13,color:A.muted}}>{a}</div><div style={{fontFamily:A.font,fontSize:42,fontWeight:600,color:A.ink,marginTop:18}}>{b}</div></div>)}
    </div>
  </div>
</AbsoluteFill>;

const Projects=()=>{const f=useCurrentFrame();const cards=[["VAYERA SHOOT","RITIKA PODDAR - 24 Aug 2026","38 files","In editing"],["Chandan - Chameli","Chandan - 12 Dec 2026","74 files","In editing"],["Anushka and Virat","Virat - 27 Aug 2026","62 files","Delivered"]];return <AbsoluteFill style={{background:A.white}}>
  <Sidebar/><div style={Top}><div style={{fontFamily:A.font,fontSize:20,fontWeight:600,color:A.ink}}>Projects</div><div style={{marginLeft:"auto",border:"1px solid #DDD",borderRadius:8,padding:"9px 15px",fontFamily:A.font,fontSize:12,color:A.ink}}>+ New project</div></div>
  <div style={{position:"absolute",left:290,top:125,right:55}}>
    <FadeText dark size={48}>Every shoot, in one list.</FadeText>
    <div style={{display:"flex",gap:8,marginTop:28}}>{["Draft","Awaiting selection","In editing","Ready for delivery","Delivered"].map(x=><div key={x} style={{fontFamily:A.font,fontSize:11,color:x==="In editing"?A.purple:A.muted,borderRadius:20,padding:"7px 11px",background:x==="In editing"?"#F3EDFF":"#F5F5F5"}}>{x}</div>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginTop:30}}>
      {cards.map(([title,sub,files,status],i)=><div key={title} style={{border:"1px solid #E7E7E7",borderRadius:16,overflow:"hidden",opacity:interpolate(f,[i*8, i*8+14],[0,1],{extrapolateRight:"clamp"}),transform:`translateY(${interpolate(f,[i*8,i*8+14],[25,0],{extrapolateRight:"clamp"})}px)`}}>
        <div style={{height:150,background:i===2?"#ECE9F6":i===1?"#F0F0F0":"#E9E7E5",display:"grid",placeItems:"center"}}><div style={{width:70,height:70,borderRadius:"50%",border:"1px solid rgba(0,0,0,.15)"}}/></div>
        <div style={{padding:20}}><div style={{fontFamily:A.font,fontSize:18,fontWeight:600,color:A.ink}}>{title}</div><div style={{fontFamily:A.font,fontSize:11,color:A.muted,marginTop:6}}>{sub}</div><div style={{marginTop:20,display:"flex",justifyContent:"space-between",fontFamily:A.font,fontSize:11,color:A.muted}}><span>{files}</span><span>{status}</span></div></div>
      </div>)}
    </div>
  </div>
  <Cursor x={1190} y={610} delay={18}/>
</AbsoluteFill>};

const ProjectDetail=()=> <AbsoluteFill style={{background:A.white}}>
  <Sidebar/><div style={Top}><div style={{fontFamily:A.font,fontSize:13,color:A.muted}}>Projects / </div><div style={{fontFamily:A.font,fontSize:13,fontWeight:600,color:A.ink,marginLeft:5}}>Anushka and Virat</div></div>
  <div style={{position:"absolute",left:290,top:112,right:55}}>
    <div style={{display:"flex",alignItems:"center"}}><FadeText dark size={46}>Anushka and Virat</FadeText><div style={{marginLeft:18,padding:"7px 11px",borderRadius:20,background:"#F0EAFE",fontFamily:A.font,fontSize:11,color:A.purple}}>Delivered</div></div>
    <div style={{fontFamily:A.font,fontSize:14,color:A.muted,marginTop:10}}>Virat - Wedding - 27 Aug 2026</div>
    <div style={{display:"flex",gap:9,marginTop:30}}>{["Files (62)","Selections (0)","Assignments (8)","Deliverables (0)"].map((x,i)=><div key={x} style={{padding:"11px 15px",borderRadius:8,background:i===0?A.black:"#F5F5F5",color:i===0?A.white:A.muted,fontFamily:A.font,fontSize:12}}>{x}</div>)}</div>
    <div style={{marginTop:28,border:"1px solid #E5E5E5",borderRadius:16,padding:22}}>
      <div style={{fontFamily:A.font,fontSize:12,color:A.muted}}>PROJECT OVERVIEW</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginTop:18}}>{[["Files","62"],["Selected","0"],["Assigned","8"]].map(([x,y])=><div key={x}><div style={{fontFamily:A.font,fontSize:12,color:A.muted}}>{x}</div><div style={{fontFamily:A.font,fontSize:30,fontWeight:600,color:A.ink,marginTop:8}}>{y}</div></div>)}</div>
    </div>
  </div>
</AbsoluteFill>;

const Files=()=> <AbsoluteFill style={{background:A.white}}>
  <Sidebar/><div style={Top}><div style={{fontFamily:A.font,fontSize:13,color:A.muted}}>Projects / Anushka and Virat / </div><div style={{fontFamily:A.font,fontSize:13,fontWeight:600,color:A.ink,marginLeft:5}}>Files</div></div>
  <div style={{position:"absolute",left:290,top:112,right:55}}>
    <FadeText dark size={44}>Files</FadeText>
    <div style={{marginTop:24,display:"flex",gap:8}}>{["All - 62","Raw - 31","Selected - 0","Assigned - 8","Delivered - 23"].map((x,i)=><div key={x} style={{fontFamily:A.font,fontSize:12,padding:"9px 12px",borderRadius:7,background:i===0?A.black:"#F5F5F5",color:i===0?A.white:A.muted}}>{x}</div>)}</div>
    <div style={{marginTop:24,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>{["Haldi","Engagement","Unsorted","Wedding"].map((x,i)=><div key={x} style={{height:150,border:"1px solid #E6E6E6",borderRadius:14,padding:16,boxSizing:"border-box"}}><div style={{height:72,borderRadius:9,background:["#EAE4DE","#E8E8E8","#F0ECF6","#E3E3E3"][i]}}/><div style={{fontFamily:A.font,fontSize:13,fontWeight:600,color:A.ink,marginTop:13}}>{x}</div><div style={{fontFamily:A.font,fontSize:10,color:A.muted,marginTop:4}}>62 files</div></div>)}</div>
  </div>
</AbsoluteFill>;

const Team=()=> <AbsoluteFill style={{background:A.white}}>
  <Sidebar active="Team"/><div style={Top}><div style={{fontFamily:A.font,fontSize:20,fontWeight:600,color:A.ink}}>Team</div></div>
  <div style={{position:"absolute",left:290,top:125,right:55}}>
    <FadeText dark size={48}>Keep your team moving.</FadeText>
    <div style={{fontFamily:A.font,fontSize:14,color:A.muted,marginTop:10}}>Assignments stay visible from brief to approval.</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginTop:38}}>{["Assigned","In progress","Review","Approved"].map((x,i)=><div key={x} style={{background:"#F7F7F7",borderRadius:12,padding:15,minHeight:210}}><div style={{fontFamily:A.font,fontSize:12,fontWeight:600,color:i===3?A.purple:A.ink}}>{x}</div><div style={{marginTop:15,background:A.white,border:"1px solid #E7E7E7",borderRadius:10,padding:14,fontFamily:A.font,fontSize:12,color:A.ink}}>Anushka and Virat<div style={{fontSize:10,color:A.muted,marginTop:7}}>Wedding gallery</div></div></div>)}</div>
  </div>
</AbsoluteFill>;

const Outro=()=> <AbsoluteFill style={{background:A.black,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Img src={A.logo} style={{width:410}}/><div style={{width:500,height:4,background:A.purple,marginTop:48}}/><div style={{marginTop:34}}><FadeText size={34} weight={500}>All-in-one workspace for photographers.</FadeText></div></AbsoluteFill>;

export const KliqAtFilm=({prototype=false}:{prototype?:boolean})=>{
 if(prototype) return <AbsoluteFill>
   <Sequence from={0} durationInFrames={32}><Intro/></Sequence>
   <Sequence from={27} durationInFrames={42}><Onboarding/></Sequence>
   <Sequence from={64} durationInFrames={34}><Dashboard/></Sequence>
   <Sequence from={93} durationInFrames={57}><Projects/></Sequence>
 </AbsoluteFill>;
 return <AbsoluteFill>
   <Sequence from={0} durationInFrames={42}><Intro/></Sequence>
   <Sequence from={36} durationInFrames={66}><Onboarding/></Sequence>
   <Sequence from={96} durationInFrames={60}><Dashboard/></Sequence>
   <Sequence from={150} durationInFrames={84}><Projects/></Sequence>
   <Sequence from={228} durationInFrames={84}><ProjectDetail/></Sequence>
   <Sequence from={306} durationInFrames={72}><Files/></Sequence>
   <Sequence from={372} durationInFrames={66}><Team/></Sequence>
   <Sequence from={432} durationInFrames={108}><Outro/></Sequence>
 </AbsoluteFill>;
};