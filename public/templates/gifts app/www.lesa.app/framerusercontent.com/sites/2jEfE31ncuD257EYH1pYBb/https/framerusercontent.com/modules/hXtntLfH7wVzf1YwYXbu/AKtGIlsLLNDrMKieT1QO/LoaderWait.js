import{createElement as _createElement}from"react";import*as React from"react";const KEY_DONE="loader_done";const KEY_ORIGIN="loader_time_origin";export function WaitAndRemountHero(Component){return props=>{// 1. Initialize hidden to force a "fresh" mount when we eventually show it.
//    This ensures Framer Motion sees a transition from "nothing" to "something".
const[show,setShow]=React.useState(false);// 2. We use a key to force React to treat this as a unique instance
//    on every refresh. This fixes the "animations don't work" issue.
const[uniqueKey,setUniqueKey]=React.useState("");React.useEffect(()=>{// Check if we are in a browser environment
if(typeof window==="undefined")return;const currentOrigin=String(performance.timeOrigin);const storedOrigin=sessionStorage.getItem(KEY_ORIGIN);const isDone=sessionStorage.getItem(KEY_DONE)==="1";// Detect if this is a Refresh or a New Tab
// If origins don't match, it's a new page load event (Refresh)
const isReload=storedOrigin!==currentOrigin;if(isReload||!isDone){// CASE: First visit OR Refresh
// 1. Update the origin to the current one
sessionStorage.setItem(KEY_ORIGIN,currentOrigin);// 2. Remove 'done' so we know we are in 'loading' state
sessionStorage.removeItem(KEY_DONE);// 3. Keep 'show' false and set a timeout
const t=window.setTimeout(()=>{sessionStorage.setItem(KEY_DONE,"1");setUniqueKey(currentOrigin)// Set key to current time
;setShow(true);},2100);return()=>window.clearTimeout(t);}else{// CASE: Same session, navigating back/forth
// Show immediately without delay
setUniqueKey(storedOrigin||"ssr");setShow(true);}},[]);// If we shouldn't show yet, render null (or your Loader component)
if(!show)return null;// KEY FIX: The 'key' prop forces React to destroy and recreate the
// component tree. This guarantees Framer Motion animations fire
// from their 'initial' state every time this mounts.
return /*#__PURE__*/_createElement(Component,{...props,key:uniqueKey});};}
export const __FramerMetadata__ = {"exports":{"WaitAndRemountHero":{"type":"reactHoc","name":"WaitAndRemountHero","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./LoaderWait.map