import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{addPropertyControls,ControlType}from"framer";import{motion,useAnimation}from"framer-motion";import{useEffect,useState}from"react";/**
 * Logo Loader Component
 *
 * A loading animation that fills an SVG logo from bottom to top
 * with randomized speed variations for a more organic feel.
 *
 * @framerDisableUnlink
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 400
 * @framerIntrinsicHeight 200
 */export default function LogoLoader(props){const{logo,duration,baseOpacity,fillColor,backgroundColor,autoPlay,loop,pauseDuration,easingPreset,style}=props;const controls=useAnimation();const[fillProgress,setFillProgress]=useState(0);// Easing presets
const easingPresets={snappy:[.85,0,.15,1],bounce:[.68,-.55,.265,1.55],elastic:[.87,0,.13,1.5],aggressive:[.95,.05,.8,.04],smooth:[.65,0,.35,1],dramatic:[.22,1,.36,1],sharp:[.9,0,.1,1],playful:[.68,-.6,.32,1.6]};useEffect(()=>{if(!autoPlay)return;const animate=async()=>{// Reset immediately
controls.set({clipPath:"inset(100% 0% 0% 0%)"});setFillProgress(0);// Always have 1 pause, with 50% chance of a second pause
const numberOfPauses=Math.random()<.5?1:2;// Generate pause points
const pausePoints=[];// First pause can be anywhere from 15% to 85%
pausePoints.push(15+Math.random()*70);// If we have a second pause, make sure it's not too close to the first
if(numberOfPauses===2){let secondPause;do{secondPause=15+Math.random()*70;}while(Math.abs(secondPause-pausePoints[0])<20)// At least 20% apart
pausePoints.push(secondPause);}// Sort pause points
pausePoints.sort((a,b)=>a-b);// Build animation sequence
let currentProgress=0;let timeElapsed=0;for(let i=0;i<=pausePoints.length;i++){const targetProgress=i<pausePoints.length?pausePoints[i]:100;const progressDelta=targetProgress-currentProgress;// Calculate how much time this segment should take
const totalRemainingProgress=100-currentProgress;const totalRemainingTime=duration-timeElapsed-(numberOfPauses-i)*pauseDuration;const segmentDuration=progressDelta/totalRemainingProgress*totalRemainingTime;// Animate to next pause point (or to end)
await controls.start({clipPath:`inset(${100-targetProgress}% 0% 0% 0%)`,transition:{duration:segmentDuration,ease:easingPresets[easingPreset]}});timeElapsed+=segmentDuration;currentProgress=targetProgress;// Add pause if not at the end
if(i<pausePoints.length){await new Promise(resolve=>setTimeout(resolve,pauseDuration*1e3));timeElapsed+=pauseDuration;}}setFillProgress(100);// Loop if enabled
if(loop){await controls.start({clipPath:"inset(100% 0% 0% 0%)",transition:{duration:.2,ease:"easeOut"}});setFillProgress(0);setTimeout(()=>animate(),100);}};// Start immediately on mount
animate();},[autoPlay,duration,loop,pauseDuration,easingPreset,controls]);return /*#__PURE__*/_jsxs("div",{style:{...style,position:"relative",width:"100%",height:"100%",backgroundColor,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:[logo&&/*#__PURE__*/_jsx("img",{src:logo,alt:"Logo",style:{width:"100%",height:"100%",objectFit:"contain",opacity:baseOpacity,position:"absolute",top:0,left:0}}),logo&&/*#__PURE__*/_jsx(motion.div,{animate:controls,initial:{clipPath:"inset(100% 0% 0% 0%)"},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:/*#__PURE__*/_jsx("img",{src:logo,alt:"Logo filled",style:{width:"100%",height:"100%",objectFit:"contain",filter:fillColor?`brightness(0) saturate(100%)`:"none",...fillColor&&{backgroundColor:fillColor,mixBlendMode:"multiply"}}})}),!logo&&/*#__PURE__*/_jsx("div",{style:{color:"#999",fontSize:"14px",textAlign:"center",padding:"20px"},children:"Upload a logo in the properties panel"})]});}// Default props
LogoLoader.defaultProps={duration:3,baseOpacity:.4,backgroundColor:"transparent",autoPlay:true,loop:false,pauseDuration:.3,easingPreset:"smooth"};// Property Controls
addPropertyControls(LogoLoader,{logo:{type:ControlType.Image,title:"Logo"},duration:{type:ControlType.Number,title:"Duration",min:.5,max:20,step:.5,unit:"s",defaultValue:3,displayStepper:true},easingPreset:{type:ControlType.Enum,title:"Easing",options:["smooth","snappy","bounce","elastic","aggressive","dramatic","sharp","playful"],optionTitles:["Smooth","Snappy","Bounce","Elastic","Aggressive","Dramatic","Sharp","Playful"],defaultValue:"smooth",displaySegmentedControl:false},baseOpacity:{type:ControlType.Number,title:"Base Opacity",min:0,max:1,step:.05,defaultValue:.4,displayStepper:true},fillColor:{type:ControlType.Color,title:"Fill Color",defaultValue:"",description:"Leave empty to use original logo colors"},backgroundColor:{type:ControlType.Color,title:"Background",defaultValue:"transparent"},pauseDuration:{type:ControlType.Number,title:"Pause Length",min:.1,max:1,step:.1,unit:"s",defaultValue:.3,displayStepper:true,description:"Duration of hiccups (1-2 random pauses)"},autoPlay:{type:ControlType.Boolean,title:"Auto Play",defaultValue:true,enabledTitle:"On",disabledTitle:"Off"},loop:{type:ControlType.Boolean,title:"Loop",defaultValue:false,enabledTitle:"On",disabledTitle:"Off"}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"LogoLoader","slots":[],"annotations":{"framerDisableUnlink":"* @framerSupportedLayoutWidth fixed","framerIntrinsicHeight":"200","framerIntrinsicWidth":"400","framerSupportedLayoutHeight":"fixed","framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Logo_Loader.map