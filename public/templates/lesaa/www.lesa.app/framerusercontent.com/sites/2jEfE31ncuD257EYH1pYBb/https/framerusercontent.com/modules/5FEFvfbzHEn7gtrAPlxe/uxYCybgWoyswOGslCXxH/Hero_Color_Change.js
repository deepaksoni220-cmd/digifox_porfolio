import{jsx as _jsx}from"react/jsx-runtime";import{useState,useEffect,useRef,useCallback}from"react";// ─────────────────────────────────────────────────────────────────────
// ALTERED VERSION of HeroColorSyncWithBand_v9_responsive.
// Separate file — v9 is untouched.
//
// Change from v9: the old Slide 1 (flat blue, #5964F0) is gone, so every
// remaining slide shifts down one index and the deck is 5 slides, not 6.
//
//   old index 1 (mesh / night navy)     → index 0
//   old index 2 (pink + ground band)    → index 1
//   old index 3 (#FD64B7 pink)          → index 2
//   old index 4 (#5FEF90 green)         → index 3
//   old index 5 (#010E26 navy)          → index 4
//
// Removal is described as temporary, so the mesh and band configs are
// shifted in place rather than rewritten — putting the blue slide back
// means re-inserting one entry in SLIDE_COLORS_RGB, one null at the head
// of buildBands, and bumping TOTAL_SLIDES and MESH_SLIDE_INDEX back up.
//
// Nothing about the band or mesh mechanism itself changed.
// ─────────────────────────────────────────────────────────────────────
const TOTAL_SLIDES=5;// Which slide (0-indexed) gets the vivid mesh / night-navy treatment.
// Now the first slide in the deck.
const MESH_SLIDE_INDEX=0;// Night window, in the visitor's LOCAL hour (0–23). Night is
// [NIGHT_START, 24) ∪ [0, NIGHT_END). 18:00 (6 PM) – 06:00 (6 AM).
const NIGHT_START_HOUR=18;const NIGHT_END_HOUR=6;// How often to re-check the clock. Real-time-enough without polling hard.
const CLOCK_CHECK_INTERVAL_MS=6e4;function isNightNow(){const hour=new Date().getHours();return hour>=NIGHT_START_HOUR||hour<NIGHT_END_HOUR;}// Colour every slide fades toward, and the colour of the section below.
const TARGET_COLOR_RGB={r:71,g:80,b:196}// #4750C4
;// Solid colour per slide. The entry at MESH_SLIDE_INDEX is unused — that
// slide is painted by the mesh gradient (day) or the flat navy (night)
// instead.
const SLIDE_COLORS_RGB=[{r:89,g:100,b:240},{r:255,g:160,b:211},{r:253,g:100,b:183},{r:95,g:239,b:144},{r:1,g:14,b:38}];// Night colour for the mesh slide — flat, no gradient.
const NIGHT_BASE_RGB={r:42,g:47,b:107}// #2A2F6B
;// Height of the mesh box at the top of the element. The colour anchors are
// positioned as percentages of this box, so keeping it at one viewport
// height is what stops them spreading thin on a hero several screens tall.
const MESH_BOX_HEIGHT="100vh";// Matched in order, first entry whose maxWidth covers the current viewport
// width wins. Mirrors Framer's phone / tablet / desktop breakpoints.
const GROUND_GEOMETRY_BY_WIDTH=[// Phone — wrapper is 95vh but the content only needs ~659px, so anchor
// to the content height in px, not the wrapper's vh.
{maxWidth:809,edge:"659px",fade:"160px"},// Tablet and desktop — illustration is viewport-sized here.
{maxWidth:Infinity,edge:"90vh",fade:"30vh"}];// Fallback for the very first render, before the width is known (and for
// SSR, where there is no window). Desktop is the safer default: the phone
// layout is the narrower special case.
const DEFAULT_GROUND_GEOMETRY=GROUND_GEOMETRY_BY_WIDTH[GROUND_GEOMETRY_BY_WIDTH.length-1];function resolveGroundGeometry(width){if(width===null)return DEFAULT_GROUND_GEOMETRY;return GROUND_GEOMETRY_BY_WIDTH.find(g=>width<=g.maxWidth)??DEFAULT_GROUND_GEOMETRY;}// Total band height. Only needs to reach the bottom of the element;
// generous on purpose so it covers even a very tall wrapper.
const GROUND_BAND_HEIGHT="300vh";// Fixed colour of the ground "mound" illustration. The band resolves to
// this colour and continues it past the illustration's edge.
const MOUND_COLOR_RGB={r:251,g:113,b:187}// #FB71BB
;// Linear interpolation between two colours, 0 = from, 1 = to.
function lerpRgb(from,to,t){return{r:Math.round(from.r+(to.r-from.r)*t),g:Math.round(from.g+(to.g-from.g)*t),b:Math.round(from.b+(to.b-from.b)*t)};}// Built per render rather than declared as a constant, because the ground
// slide's geometry depends on the current breakpoint.
function buildBands(geo){return[// Slide 1 — mesh gradient seam (day only). Fades across its whole
// height into the live base colour, ending exactly at the mesh
// box's bottom edge.
{top:`calc(${MESH_BOX_HEIGHT} - 340px)`,height:"340px",fadeIn:"340px"},// Slide 2 — ramps in above the illustration edge so it is fully
// opaque by the time it reaches it, then carries the mound's pink
// down past the artwork for the rest of the element.
{top:`calc(${geo.edge} - ${geo.fade})`,height:GROUND_BAND_HEIGHT,fadeIn:geo.fade,color:MOUND_COLOR_RGB},null,null,null];}// ── Mesh gradient (day) ─────────────────────────────────────────────
// Each layer holds full opacity for a plateau before fading, so the
// colours stay saturated instead of washing out into the base.
const MESH_BASE_RGB={r:168,g:130,b:230}// #A882E6
;const MESH_LAYERS=[// blue — top left
"radial-gradient(ellipse 120% 100% at 0% 0%, rgba(30,110,255,1) 0%, rgba(30,110,255,1) 24%, rgba(30,110,255,0) 86%)",// violet — top right
"radial-gradient(ellipse 110% 100% at 100% 0%, rgba(140,45,235,1) 0%, rgba(140,45,235,1) 24%, rgba(140,45,235,0) 86%)",// cyan — mid left
"radial-gradient(ellipse 74% 64% at 0% 50%, rgba(60,215,240,1) 0%, rgba(60,215,240,1) 22%, rgba(60,215,240,0) 80%)",// pink — mid right
"radial-gradient(ellipse 78% 74% at 100% 52%, rgba(255,110,200,1) 0%, rgba(255,110,200,1) 22%, rgba(255,110,200,0) 80%)",// mint / yellow-green — bottom left
"radial-gradient(ellipse 92% 86% at 0% 100%, rgba(120,250,200,1) 0%, rgba(120,250,200,1) 22%, rgba(120,250,200,0) 82%)",// bright yellow — bottom centre
"radial-gradient(ellipse 68% 64% at 40% 100%, rgba(255,240,95,1) 0%, rgba(255,240,95,1) 20%, rgba(255,240,95,0) 76%)",// peach — bottom right
"radial-gradient(ellipse 84% 78% at 100% 100%, rgba(255,170,105,1) 0%, rgba(255,170,105,1) 22%, rgba(255,170,105,0) 80%)"];function isElementVisible(element){if(!element||typeof window==="undefined")return false;const style=window.getComputedStyle(element);const rect=element.getBoundingClientRect();return style.display!=="none"&&style.visibility!=="hidden"&&style.opacity!=="0"&&rect.width>0&&rect.height>0;}export function withHeroColorSyncBand(Component){return props=>{// Starts at 0, which is now the mesh slide — so the very first
// paint is already the correct treatment for slide 1 rather than a
// flat colour that gets replaced once detection runs.
const[currentSlideIndex,setCurrentSlideIndex]=useState(0);const[scrollProgress,setScrollProgress]=useState(0);const[isNight,setIsNight]=useState(false);// Viewport width has to be state, not a ref: the band geometry is
// derived from it, so a breakpoint change must trigger a re-render.
// Null until mounted so SSR and first paint use the default.
const[viewportWidth,setViewportWidth]=useState(null);const viewportHeightRef=useRef(typeof window!=="undefined"?window.innerHeight:1080);const lastScrollRef=useRef(0);const rafIdRef=useRef(null);const slideCheckIntervalRef=useRef(null);const clockCheckIntervalRef=useRef(null);const detectActiveSlide=useCallback(()=>{if(typeof document==="undefined")return;const slideElements=document.querySelectorAll('[data-framer-name*="Slide"]');for(const element of slideElements){if(isElementVisible(element)){const frameName=element.getAttribute("data-framer-name")||"";const match=frameName.match(/Slide\s*(\d+)/i);if(match){const slideIndex=parseInt(match[1])-1;if(slideIndex>=0&&slideIndex<TOTAL_SLIDES){setCurrentSlideIndex(slideIndex);return;}}}}},[]);// Day/night, checked on mount and re-checked every minute so the
// hero flips live without needing a page refresh.
useEffect(()=>{if(typeof window==="undefined")return;setIsNight(isNightNow());clockCheckIntervalRef.current=setInterval(()=>{setIsNight(prev=>{const next=isNightNow();return next!==prev?next:prev;});},CLOCK_CHECK_INTERVAL_MS);return()=>{if(clockCheckIntervalRef.current)clearInterval(clockCheckIntervalRef.current);};},[]);useEffect(()=>{if(typeof window==="undefined")return;setViewportWidth(window.innerWidth);let resizeTimeout;const handleResize=()=>{clearTimeout(resizeTimeout);resizeTimeout=setTimeout(()=>{viewportHeightRef.current=window.innerHeight;// Only commit a width change if it actually crosses into
// a different geometry bucket. Mobile browsers fire
// resize on address-bar show/hide, and re-rendering the
// background on every one of those is pointless work.
setViewportWidth(prev=>{const next=window.innerWidth;if(prev===null)return next;return resolveGroundGeometry(prev)!==resolveGroundGeometry(next)?next:prev;});},150);};window.addEventListener("resize",handleResize,{passive:true});return()=>{window.removeEventListener("resize",handleResize);clearTimeout(resizeTimeout);};},[]);useEffect(()=>{if(typeof window==="undefined")return;detectActiveSlide();slideCheckIntervalRef.current=setInterval(detectActiveSlide,100);return()=>{if(slideCheckIntervalRef.current)clearInterval(slideCheckIntervalRef.current);};},[detectActiveSlide]);useEffect(()=>{if(typeof window==="undefined")return;const handleScroll=()=>{const scrollTop=window.lenis?.scroll||window.pageYOffset||document.documentElement.scrollTop;if(Math.abs(scrollTop-lastScrollRef.current)<2)return;lastScrollRef.current=scrollTop;const viewportHeight=viewportHeightRef.current;const fadeStart=viewportHeight*.2;const fadeDistance=viewportHeight;let newProgress=0;if(scrollTop>fadeStart){const raw=Math.min((scrollTop-fadeStart)/fadeDistance,1);newProgress=raw*raw*(3-2*raw);}if(Math.abs(newProgress-scrollProgress)>.001){setScrollProgress(newProgress);}};if(window.lenis){window.lenis.on("scroll",handleScroll);return()=>window.lenis.off("scroll",handleScroll);}else{const smoothUpdate=()=>{handleScroll();rafIdRef.current=requestAnimationFrame(smoothUpdate);};rafIdRef.current=requestAnimationFrame(smoothUpdate);return()=>{if(rafIdRef.current)cancelAnimationFrame(rafIdRef.current);};}},[scrollProgress]);// ── build background ────────────────────────────────────────
// backgroundImage, backgroundSize and backgroundPosition are three
// parallel comma-separated lists mapped positionally, so they are
// built together and must stay the same length.
const a=scrollProgress;const{r,g,b}=TARGET_COLOR_RGB;const isMeshSlide=currentSlideIndex===MESH_SLIDE_INDEX;const bands=buildBands(resolveGroundGeometry(viewportWidth));const images=[];const sizes=[];const positions=[];// Base colour of the current slide/mode, interpolated toward the
// scroll target. At night the mesh slide uses NIGHT_BASE_RGB
// (#2A2F6B, flat) instead of the mesh's lavender base — scroll fade
// still runs the same way, it just starts from a darker colour.
const start=isMeshSlide?isNight?NIGHT_BASE_RGB:MESH_BASE_RGB:SLIDE_COLORS_RGB[currentSlideIndex];const baseRgb=lerpRgb(start,TARGET_COLOR_RGB,a);// Scroll overlay — only meaningful for the mesh slide. Every other
// slide's flat colour already interpolates via backgroundColor
// itself, so there's nothing separate to fade there.
if(isMeshSlide&&a>0){images.push(`linear-gradient(rgba(${r},${g},${b},${a}), rgba(${r},${g},${b},${a}))`);sizes.push("100% 100%");positions.push("center top");}// Bottom band — any slide can have one, not just the mesh slide.
// Night mode on the mesh slide is the one case that skips it:
// there's no mesh box then, so nothing to seam.
const band=bands[currentSlideIndex];if(band&&!(isMeshSlide&&isNight)){// A fixed band colour still has to follow the scroll fade —
// otherwise an opaque band would freeze that strip at its
// original colour while everything around it moves toward the
// target. Bands without a fixed colour already use baseRgb,
// which is interpolated.
const c=band.color?lerpRgb(band.color,TARGET_COLOR_RGB,a):baseRgb;const rgba=alpha=>`rgba(${c.r},${c.g},${c.b},${alpha})`;// Stops are given as lengths rather than percentages so the
// ramp lands on a fixed position regardless of how tall the
// band itself is.
images.push(band.fadeIn?`linear-gradient(to bottom, ${rgba(0)} 0, ${rgba(1)} ${band.fadeIn}, ${rgba(1)} 100%)`:`linear-gradient(${rgba(1)}, ${rgba(1)})`);sizes.push(`100% ${band.height}`);positions.push(`center ${band.top}`);}// Mesh layers — day mode on the mesh slide only. The vivid
// colours; nothing sits under them but the base colour, which is
// why the gaps between blobs show base directly.
if(isMeshSlide&&!isNight){for(const layer of MESH_LAYERS){images.push(layer);sizes.push(`100% ${MESH_BOX_HEIGHT}`);positions.push("center top");}}const bgStyle={backgroundColor:`rgb(${baseRgb.r},${baseRgb.g},${baseRgb.b})`,backgroundImage:images.length?images.join(", "):"none",backgroundSize:sizes.length?sizes.join(", "):"cover",backgroundPosition:positions.length?positions.join(", "):"center top",backgroundRepeat:"no-repeat"};return /*#__PURE__*/_jsx(Component,{...props,style:{...props.style,...bgStyle,// Short and linear on purpose — a bouncy easing here made
// the colour lag behind the page on a fast scroll, which
// read as a hard cut where the next section began. Also
// covers the day↔night flip smoothly rather than a snap.
transition:"background-color 400ms linear"}});};}export default withHeroColorSyncBand;
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactHoc","name":"withHeroColorSyncBand","annotations":{"framerContractVersion":"1"}},"withHeroColorSyncBand":{"type":"reactHoc","name":"withHeroColorSyncBand","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Hero_Color_Change.map