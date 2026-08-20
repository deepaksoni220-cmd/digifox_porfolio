import{jsx as _jsx,jsxs as _jsxs,Fragment as _Fragment}from"react/jsx-runtime";import{useRef,useState}from"react";/**
 * Spotlight Gradient Hover Effect - Purple Theme (Universal & Layout Safe!)
 *
 * Creates a smooth, elegant spotlight effect with #7880F0 purple color
 * Available in 4 intensity presets with increasing size and brightness
 *
 * ✅ Does NOT touch your background color - completely universal
 * ✅ Does NOT break your layout - uses absolute positioned overlay
 * ✅ Works with any background color or gradient
 * ✅ Preserves all existing styles and positioning
 * ✅ Respects border radius - no corner bleeding
 * ✅ Stays behind content - set your text/images to z-index: 2 or higher
 *
 * Presets:
 * - Subtle: 900px, 0.08 opacity - Gentle and professional
 * - Medium: 1100px, 0.12 opacity - Balanced and noticeable
 * - Strong: 1300px, 0.16 opacity - Bold and engaging
 * - Intense: 1500px, 0.22 opacity - Maximum impact
 *
 * Usage:
 * 1. Select any Frame or element on the canvas
 * 2. Apply one of the intensity overrides from the Properties panel
 * 3. Set your text/image elements to z-index: 2 or higher to keep them on top
 *//**
 * Subtle Spotlight - Most Elegant
 *
 * Perfect for: Professional pricing cards, minimal feature sections
 * Size: 900px | Opacity: 0.08 | Gentle and refined
 */export function withSpotlightSubtle(Component){return props=>{const[mousePosition,setMousePosition]=useState({x:0,y:0});const[isHovering,setIsHovering]=useState(false);const elementRef=useRef(null);const handleMouseMove=event=>{if(!elementRef.current)return;const rect=elementRef.current.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;setMousePosition({x,y});if(props.onMouseMove){props.onMouseMove(event);}};const handleMouseEnter=event=>{setIsHovering(true);if(props.onMouseEnter){props.onMouseEnter(event);}};const handleMouseLeave=event=>{setIsHovering(false);if(props.onMouseLeave){props.onMouseLeave(event);}};return /*#__PURE__*/_jsxs(_Fragment,{children:[isHovering&&/*#__PURE__*/_jsx("div",{style:{position:"absolute",top:elementRef.current?.offsetTop||0,left:elementRef.current?.offsetLeft||0,width:elementRef.current?.offsetWidth||0,height:elementRef.current?.offsetHeight||0,pointerEvents:"none",opacity:1,transition:"opacity 0.3s ease",background:`radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 128, 240, 0.08), transparent 40%)`,borderRadius:"16px",zIndex:1,overflow:"hidden"}}),/*#__PURE__*/_jsx(Component,{...props,ref:elementRef,onMouseMove:handleMouseMove,onMouseEnter:handleMouseEnter,onMouseLeave:handleMouseLeave,style:{...props.style,position:"relative",overflow:"hidden"}})]});};}/**
 * Medium Spotlight - Balanced
 *
 * Perfect for: Feature cards, product showcases, general UI cards
 * Size: 1100px | Opacity: 0.12 | Noticeable and elegant
 */export function withSpotlightMedium(Component){return props=>{const[mousePosition,setMousePosition]=useState({x:0,y:0});const[isHovering,setIsHovering]=useState(false);const elementRef=useRef(null);const handleMouseMove=event=>{if(!elementRef.current)return;const rect=elementRef.current.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;setMousePosition({x,y});if(props.onMouseMove){props.onMouseMove(event);}};const handleMouseEnter=event=>{setIsHovering(true);if(props.onMouseEnter){props.onMouseEnter(event);}};const handleMouseLeave=event=>{setIsHovering(false);if(props.onMouseLeave){props.onMouseLeave(event);}};return /*#__PURE__*/_jsxs(_Fragment,{children:[isHovering&&/*#__PURE__*/_jsx("div",{style:{position:"absolute",top:elementRef.current?.offsetTop||0,left:elementRef.current?.offsetLeft||0,width:elementRef.current?.offsetWidth||0,height:elementRef.current?.offsetHeight||0,pointerEvents:"none",opacity:1,transition:"opacity 0.3s ease",background:`radial-gradient(1100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 128, 240, 0.12), transparent 40%)`,borderRadius:"16px",zIndex:1,overflow:"hidden"}}),/*#__PURE__*/_jsx(Component,{...props,ref:elementRef,onMouseMove:handleMouseMove,onMouseEnter:handleMouseEnter,onMouseLeave:handleMouseLeave,style:{...props.style,position:"relative",overflow:"hidden"}})]});};}/**
 * Strong Spotlight - Prominent
 *
 * Perfect for: Interactive cards, hover-focused sections, testimonials
 * Size: 1300px | Opacity: 0.16 | Bold and engaging
 */export function withSpotlightStrong(Component){return props=>{const[mousePosition,setMousePosition]=useState({x:0,y:0});const[isHovering,setIsHovering]=useState(false);const elementRef=useRef(null);const handleMouseMove=event=>{if(!elementRef.current)return;const rect=elementRef.current.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;setMousePosition({x,y});if(props.onMouseMove){props.onMouseMove(event);}};const handleMouseEnter=event=>{setIsHovering(true);if(props.onMouseEnter){props.onMouseEnter(event);}};const handleMouseLeave=event=>{setIsHovering(false);if(props.onMouseLeave){props.onMouseLeave(event);}};return /*#__PURE__*/_jsxs(_Fragment,{children:[isHovering&&/*#__PURE__*/_jsx("div",{style:{position:"absolute",top:elementRef.current?.offsetTop||0,left:elementRef.current?.offsetLeft||0,width:elementRef.current?.offsetWidth||0,height:elementRef.current?.offsetHeight||0,pointerEvents:"none",opacity:1,transition:"opacity 0.3s ease",background:`radial-gradient(1300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 128, 240, 0.16), transparent 40%)`,borderRadius:"16px",zIndex:1,overflow:"hidden"}}),/*#__PURE__*/_jsx(Component,{...props,ref:elementRef,onMouseMove:handleMouseMove,onMouseEnter:handleMouseEnter,onMouseLeave:handleMouseLeave,style:{...props.style,position:"relative",overflow:"hidden"}})]});};}/**
 * Intense Spotlight - Maximum Impact
 *
 * Perfect for: Hero sections, CTAs, primary action cards
 * Size: 1500px | Opacity: 0.22 | Maximum brightness and coverage
 */export function withSpotlightIntense(Component){return props=>{const[mousePosition,setMousePosition]=useState({x:0,y:0});const[isHovering,setIsHovering]=useState(false);const elementRef=useRef(null);const handleMouseMove=event=>{if(!elementRef.current)return;const rect=elementRef.current.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;setMousePosition({x,y});if(props.onMouseMove){props.onMouseMove(event);}};const handleMouseEnter=event=>{setIsHovering(true);if(props.onMouseEnter){props.onMouseEnter(event);}};const handleMouseLeave=event=>{setIsHovering(false);if(props.onMouseLeave){props.onMouseLeave(event);}};return /*#__PURE__*/_jsxs(_Fragment,{children:[isHovering&&/*#__PURE__*/_jsx("div",{style:{position:"absolute",top:elementRef.current?.offsetTop||0,left:elementRef.current?.offsetLeft||0,width:elementRef.current?.offsetWidth||0,height:elementRef.current?.offsetHeight||0,pointerEvents:"none",opacity:1,transition:"opacity 0.3s ease",background:`radial-gradient(1500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 128, 240, 0.22), transparent 40%)`,borderRadius:"16px",zIndex:1,overflow:"hidden"}}),/*#__PURE__*/_jsx(Component,{...props,ref:elementRef,onMouseMove:handleMouseMove,onMouseEnter:handleMouseEnter,onMouseLeave:handleMouseLeave,style:{...props.style,position:"relative",overflow:"hidden"}})]});};}
export const __FramerMetadata__ = {"exports":{"withSpotlightSubtle":{"type":"reactHoc","name":"withSpotlightSubtle","annotations":{"framerContractVersion":"1"}},"withSpotlightStrong":{"type":"reactHoc","name":"withSpotlightStrong","annotations":{"framerContractVersion":"1"}},"withSpotlightIntense":{"type":"reactHoc","name":"withSpotlightIntense","annotations":{"framerContractVersion":"1"}},"withSpotlightMedium":{"type":"reactHoc","name":"withSpotlightMedium","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Feature_Hover.map