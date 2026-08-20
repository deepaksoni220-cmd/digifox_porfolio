// Component to disable/enable page scrolling based on active state
import{jsx as _jsx}from"react/jsx-runtime";import{useEffect}from"react";import{addPropertyControls,ControlType}from"framer";/**
 * Scroll Control
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */export default function ScrollControl(props){const{isActive,style}=props;useEffect(()=>{if(typeof window==="undefined")return;if(isActive){// Store current scroll position
const scrollY=window.scrollY;const scrollbarWidth=window.innerWidth-document.documentElement.clientWidth;// Disable scrolling completely
document.body.style.position="fixed";document.body.style.top=`-${scrollY}px`;document.body.style.width="100%";document.body.style.overflow="hidden";document.body.style.paddingRight=`${scrollbarWidth}px`;// Prevent scroll events
const preventScroll=e=>{e.preventDefault();e.stopPropagation();return false;};window.addEventListener("wheel",preventScroll,{passive:false});window.addEventListener("touchmove",preventScroll,{passive:false});return()=>{// Restore scrolling
const scrollYValue=parseInt(document.body.style.top||"0")*-1;document.body.style.position="";document.body.style.top="";document.body.style.width="";document.body.style.overflow="";document.body.style.paddingRight="";window.scrollTo(0,scrollYValue);// Remove event listeners
window.removeEventListener("wheel",preventScroll);window.removeEventListener("touchmove",preventScroll);};}},[isActive]);return /*#__PURE__*/_jsx("div",{style:{...style,position:"relative",width:"100%",height:"100%",pointerEvents:"none"}});}addPropertyControls(ScrollControl,{isActive:{type:ControlType.Boolean,title:"Active",defaultValue:false,enabledTitle:"Disable Scroll",disabledTitle:"Enable Scroll"}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"ScrollControl","slots":[],"annotations":{"framerContractVersion":"1","framerSupportedLayoutWidth":"any-prefer-fixed","framerSupportedLayoutHeight":"any-prefer-fixed"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./ScrollControl_2.map