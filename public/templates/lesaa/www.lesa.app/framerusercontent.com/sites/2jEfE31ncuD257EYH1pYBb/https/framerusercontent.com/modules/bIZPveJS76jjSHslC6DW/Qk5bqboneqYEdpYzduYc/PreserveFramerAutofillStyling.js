import{jsx as _jsx}from"react/jsx-runtime";import{forwardRef,useCallback,useEffect,useRef}from"react";export function preserveFramerAutofillStyling(Component){return /*#__PURE__*/forwardRef(function PreserveFramerAutofillStyling(props,ref){// User request: Keep existing override behavior, and add a robust Safari placeholder color fix without changing canvas structure or controls.
const rootRef=useRef(null);const styleElRef=useRef(null);const observerRef=useRef(null);const rafRef=useRef(null);const delayedRafRef=useRef(null);const delayedTimeoutRef=useRef(null);const lateTimeoutRef=useRef(null);const fieldListenerCleanupsRef=useRef([]);const globalListenerCleanupsRef=useRef([]);const spellcheckStateRef=useRef(new Map);const previousNodeRef=useRef(null);const setRefs=useCallback(node=>{rootRef.current=node;if(typeof ref==="function"){ref(node);}else if(ref&&typeof ref==="object"){ref.current=node;}},[ref]);useEffect(()=>{if(typeof window==="undefined"||typeof document==="undefined")return;const root=rootRef.current;if(!root)return;const cleanupAttributes=()=>{if(previousNodeRef.current){previousNodeRef.current.removeAttribute("data-af-preserve");previousNodeRef.current.removeAttribute("data-af-preserve-id");previousNodeRef.current.removeAttribute("data-af-preserve-scope");previousNodeRef.current=null;}const tagged=root.querySelectorAll("[data-af-preserve-id]");tagged.forEach(node=>{if(node instanceof HTMLElement){node.removeAttribute("data-af-preserve-id");}});};const removeStyleTag=()=>{if(styleElRef.current?.parentNode){styleElRef.current.parentNode.removeChild(styleElRef.current);}styleElRef.current=null;};const cleanupFieldListeners=()=>{fieldListenerCleanupsRef.current.forEach(cleanup=>cleanup());fieldListenerCleanupsRef.current=[];};const cleanupGlobalListeners=()=>{globalListenerCleanupsRef.current.forEach(cleanup=>cleanup());globalListenerCleanupsRef.current=[];};const restoreSpellcheckState=()=>{spellcheckStateRef.current.forEach((state,input)=>{input.spellcheck=state.propertyValue;if(state.hadAttribute){if(state.attributeValue===null){input.setAttribute("spellcheck","");}else{input.setAttribute("spellcheck",state.attributeValue);}}else{input.removeAttribute("spellcheck");}});spellcheckStateRef.current.clear();};const clearScheduledApply=()=>{if(rafRef.current!==null){window.cancelAnimationFrame(rafRef.current);rafRef.current=null;}if(delayedRafRef.current!==null){window.cancelAnimationFrame(delayedRafRef.current);delayedRafRef.current=null;}if(delayedTimeoutRef.current!==null){window.clearTimeout(delayedTimeoutRef.current);delayedTimeoutRef.current=null;}if(lateTimeoutRef.current!==null){window.clearTimeout(lateTimeoutRef.current);lateTimeoutRef.current=null;}};const getTargetFields=()=>{if(root instanceof HTMLInputElement||root instanceof HTMLTextAreaElement){return[root];}const fields=root.querySelectorAll("input, textarea");return Array.from(fields).filter(field=>{if(!(field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement)){return false;}if(field instanceof HTMLInputElement){const type=(field.type||"text").toLowerCase();return type==="text"||type==="email"||type==="search"||type==="url"||type==="tel"||type==="password"||type==="number";}return true;});};const ensureStyleTag=()=>{if(!styleElRef.current){const style=document.createElement("style");style.setAttribute("data-af-preserve-style","true");document.head.appendChild(style);styleElRef.current=style;}return styleElRef.current;};const getAuthoredStyles=field=>{const computed=window.getComputedStyle(field);const probeContainer=document.createElement("div");probeContainer.setAttribute("aria-hidden","true");probeContainer.style.position="fixed";probeContainer.style.left="-99999px";probeContainer.style.top="0";probeContainer.style.opacity="0";probeContainer.style.pointerEvents="none";const probe=field.cloneNode(false);probe.removeAttribute("value");if(probe instanceof HTMLInputElement){probe.value="";}else{probe.value="";probe.textContent="";}probeContainer.appendChild(probe);document.body.appendChild(probeContainer);const probeComputed=window.getComputedStyle(probe);const computedPlaceholderStyle=window.getComputedStyle(field,"::placeholder");const probePlaceholderStyle=window.getComputedStyle(probe,"::placeholder");const computedPlaceholderColor=computedPlaceholderStyle.color;const probePlaceholderColor=probePlaceholderStyle.color;const computedPlaceholderOpacity=computedPlaceholderStyle.opacity;const probePlaceholderOpacity=probePlaceholderStyle.opacity;const inlineColor=field.style.color;const authoredColorCandidate=inlineColor||probeComputed.color||computed.color||"inherit";const authoredBackgroundCandidate=probeComputed.backgroundColor||computed.backgroundColor||"transparent";const authoredPlaceholderColorCandidate=probePlaceholderColor||computedPlaceholderColor||"";const authoredPlaceholderOpacityCandidate=probePlaceholderOpacity||computedPlaceholderOpacity||"1";document.body.removeChild(probeContainer);const parentColor=field.parentElement?window.getComputedStyle(field.parentElement).color:"";const parentBackground=field.parentElement?window.getComputedStyle(field.parentElement).backgroundColor:"";const resolvedColor=authoredColorCandidate==="rgb(0, 0, 0)"&&parentColor&&parentColor!=="rgb(0, 0, 0)"?parentColor:authoredColorCandidate;const resolvedBackground=authoredBackgroundCandidate==="rgba(0, 0, 0, 0)"&&parentBackground&&parentBackground!=="rgba(0, 0, 0, 0)"?parentBackground:authoredBackgroundCandidate;return{computed,color:resolvedColor,backgroundColor:resolvedBackground,placeholderColor:authoredPlaceholderColorCandidate,placeholderOpacity:authoredPlaceholderOpacityCandidate};};const applyRules=()=>{const fields=getTargetFields();if(fields.length===0)return;cleanupFieldListeners();cleanupAttributes();const scopeId=`af-scope-${Math.random().toString(36).slice(2,10)}`;root.setAttribute("data-af-preserve","true");root.setAttribute("data-af-preserve-scope",scopeId);previousNodeRef.current=root;const rules=[];fields.forEach((field,index)=>{if(field instanceof HTMLInputElement){const inputType=(field.type||"text").toLowerCase();const nameSignal=`${field.name||""} ${field.id||""}`;const shouldDisableSpellcheck=inputType==="text"||inputType==="email"||/(^|[^a-z])(name|email)([^a-z]|$)/i.test(nameSignal);if(shouldDisableSpellcheck&&!spellcheckStateRef.current.has(field)){spellcheckStateRef.current.set(field,{hadAttribute:field.hasAttribute("spellcheck"),attributeValue:field.getAttribute("spellcheck"),propertyValue:field.spellcheck});field.spellcheck=false;field.setAttribute("spellcheck","false");}}const authored=getAuthoredStyles(field);const style=authored.computed;const bg=authored.backgroundColor||"transparent";const colorFallback=authored.color||style.color||"inherit";const preferredColor=`var(--token-08a4b50c-5b6d-474c-b02e-0eed39fd9a36, ${colorFallback})`;const placeholderColor=authored.placeholderColor&&authored.placeholderColor!=="rgb(0, 0, 0)"&&authored.placeholderColor!=="rgba(0, 0, 0, 1)"?authored.placeholderColor:"rgba(238, 238, 238, 0.7)";const placeholderOpacity=authored.placeholderOpacity||"1";const fontFamily=style.fontFamily||"inherit";const fontSize=style.fontSize||"inherit";const fontWeight=style.fontWeight||"inherit";const fontStyle=style.fontStyle||"normal";const lineHeight=style.lineHeight||"normal";const letterSpacing=style.letterSpacing||"normal";const textTransform=style.textTransform||"none";const textAlign=style.textAlign||"start";const fieldId=`${scopeId}-${index}`;field.setAttribute("data-af-preserve-id",fieldId);const selectorBase=`[data-af-preserve-scope="${scopeId}"] [data-af-preserve-id="${fieldId}"]`;const webkitAutofillVariants=[`${selectorBase}:-webkit-autofill`,`${selectorBase}:-webkit-autofill:hover`,`${selectorBase}:-webkit-autofill:focus`];const standardAutofillVariants=[`${selectorBase}:autofill`,`${selectorBase}:autofill:hover`,`${selectorBase}:autofill:focus`];const autofillVariants=[...webkitAutofillVariants,...standardAutofillVariants];const pushPlaceholderRule=selector=>{rules.push(`
${selector}::placeholder
{
    color: ${placeholderColor} !important;
    -webkit-text-fill-color: ${placeholderColor} !important;
    caret-color: ${preferredColor} !important;
    opacity: ${placeholderOpacity} !important;
}`);rules.push(`
${selector}::-webkit-input-placeholder
{
    color: ${placeholderColor} !important;
    -webkit-text-fill-color: ${placeholderColor} !important;
    caret-color: ${preferredColor} !important;
    opacity: ${placeholderOpacity} !important;
}`);rules.push(`
${selector}::-moz-placeholder
{
    color: ${placeholderColor} !important;
    opacity: ${placeholderOpacity} !important;
}`);};rules.push(`
${selectorBase}
{
    -webkit-text-fill-color: ${preferredColor} !important;
    color: ${preferredColor} !important;
    caret-color: ${preferredColor} !important;
}`);rules.push(`
${selectorBase}:focus
{
    -webkit-text-fill-color: ${preferredColor} !important;
    color: ${preferredColor} !important;
    caret-color: ${preferredColor} !important;
}`);rules.push(`
${selectorBase}:focus-visible
{
    -webkit-text-fill-color: ${preferredColor} !important;
    color: ${preferredColor} !important;
    caret-color: ${preferredColor} !important;
}`);rules.push(`
${selectorBase}:invalid
{
    -webkit-text-fill-color: ${preferredColor} !important;
    color: ${preferredColor} !important;
    caret-color: ${preferredColor} !important;
}`);rules.push(`
${selectorBase}:user-invalid
{
    -webkit-text-fill-color: ${preferredColor} !important;
    color: ${preferredColor} !important;
    caret-color: ${preferredColor} !important;
}`);pushPlaceholderRule(selectorBase);pushPlaceholderRule(`${selectorBase}:focus`);pushPlaceholderRule(`${selectorBase}:focus-visible`);pushPlaceholderRule(`${selectorBase}:invalid`);pushPlaceholderRule(`${selectorBase}:user-invalid`);autofillVariants.forEach(variant=>{pushPlaceholderRule(variant);});const pushAutofillRule=selector=>{rules.push(`
${selector}
{
    -webkit-text-fill-color: ${preferredColor} !important;
    color: ${preferredColor} !important;
    caret-color: ${preferredColor} !important;
    -webkit-box-shadow: 0 0 0 1000px ${bg} inset !important;
    box-shadow: 0 0 0 1000px ${bg} inset !important;
    background-color: ${bg} !important;
    font-family: ${fontFamily} !important;
    font-size: ${fontSize} !important;
    font-weight: ${fontWeight} !important;
    font-style: ${fontStyle} !important;
    line-height: ${lineHeight} !important;
    letter-spacing: ${letterSpacing} !important;
    text-transform: ${textTransform} !important;
    text-align: ${textAlign} !important;
    transition: background-color 99999s ease-in-out 0s !important;
}`);};webkitAutofillVariants.forEach(variant=>{pushAutofillRule(variant);});standardAutofillVariants.forEach(variant=>{pushAutofillRule(variant);});const eventHandler=()=>{scheduleApply();};field.addEventListener("focus",eventHandler);field.addEventListener("blur",eventHandler);field.addEventListener("input",eventHandler);field.addEventListener("change",eventHandler);fieldListenerCleanupsRef.current.push(()=>{field.removeEventListener("focus",eventHandler);field.removeEventListener("blur",eventHandler);field.removeEventListener("input",eventHandler);field.removeEventListener("change",eventHandler);});});const styleTag=ensureStyleTag();styleTag.textContent=rules.join("\n");};const scheduleApply=()=>{clearScheduledApply();rafRef.current=window.requestAnimationFrame(()=>{applyRules();rafRef.current=null;});delayedTimeoutRef.current=window.setTimeout(()=>{delayedRafRef.current=window.requestAnimationFrame(()=>{applyRules();delayedRafRef.current=null;});delayedTimeoutRef.current=null;},80);lateTimeoutRef.current=window.setTimeout(()=>{applyRules();lateTimeoutRef.current=null;},260);};scheduleApply();if(typeof MutationObserver!=="undefined"){observerRef.current=new MutationObserver(()=>{scheduleApply();});observerRef.current.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:["style","class"]});}const onVisibilityOrPageShow=()=>{scheduleApply();};window.addEventListener("pageshow",onVisibilityOrPageShow);document.addEventListener("visibilitychange",onVisibilityOrPageShow);globalListenerCleanupsRef.current.push(()=>window.removeEventListener("pageshow",onVisibilityOrPageShow));globalListenerCleanupsRef.current.push(()=>document.removeEventListener("visibilitychange",onVisibilityOrPageShow));return()=>{clearScheduledApply();if(observerRef.current){observerRef.current.disconnect();observerRef.current=null;}cleanupFieldListeners();cleanupGlobalListeners();restoreSpellcheckState();removeStyleTag();cleanupAttributes();};},[]);return /*#__PURE__*/_jsx(Component,{ref:setRefs,...props});});}
export const __FramerMetadata__ = {"exports":{"preserveFramerAutofillStyling":{"type":"reactHoc","name":"preserveFramerAutofillStyling","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./PreserveFramerAutofillStyling.map