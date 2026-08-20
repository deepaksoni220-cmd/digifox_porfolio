import{t as e}from"./rolldown-runtime.Dh6celcD.mjs";import{B as t,N as n,P as r,R as i,T as a,g as o,k as s,l as c,s as l}from"./react.BWCb6a-A.mjs";function u(e){return o(function(i,a){let o=s(null),l=s(null),u=s(null),d=s(null),f=s(null),p=s(null),m=s(null),h=s([]),g=s([]),_=s(new Map),v=s(null),y=n(e=>{o.current=e,typeof a==`function`?a(e):a&&typeof a==`object`&&(a.current=e)},[a]);return r(()=>{if(t===void 0||typeof document>`u`)return;let e=o.current;if(!e)return;let n=()=>{v.current&&=(v.current.removeAttribute(`data-af-preserve`),v.current.removeAttribute(`data-af-preserve-id`),v.current.removeAttribute(`data-af-preserve-scope`),null),e.querySelectorAll(`[data-af-preserve-id]`).forEach(e=>{e instanceof HTMLElement&&e.removeAttribute(`data-af-preserve-id`)})},r=()=>{l.current?.parentNode&&l.current.parentNode.removeChild(l.current),l.current=null},i=()=>{h.current.forEach(e=>e()),h.current=[]},a=()=>{g.current.forEach(e=>e()),g.current=[]},s=()=>{_.current.forEach((e,t)=>{t.spellcheck=e.propertyValue,e.hadAttribute?e.attributeValue===null?t.setAttribute(`spellcheck`,``):t.setAttribute(`spellcheck`,e.attributeValue):t.removeAttribute(`spellcheck`)}),_.current.clear()},c=()=>{d.current!==null&&(t.cancelAnimationFrame(d.current),d.current=null),f.current!==null&&(t.cancelAnimationFrame(f.current),f.current=null),p.current!==null&&(t.clearTimeout(p.current),p.current=null),m.current!==null&&(t.clearTimeout(m.current),m.current=null)},y=()=>{if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)return[e];let t=e.querySelectorAll(`input, textarea`);return Array.from(t).filter(e=>{if(!(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement))return!1;if(e instanceof HTMLInputElement){let t=(e.type||`text`).toLowerCase();return t===`text`||t===`email`||t===`search`||t===`url`||t===`tel`||t===`password`||t===`number`}return!0})},b=()=>{if(!l.current){let e=document.createElement(`style`);e.setAttribute(`data-af-preserve-style`,`true`),document.head.appendChild(e),l.current=e}return l.current},x=e=>{let n=t.getComputedStyle(e),r=document.createElement(`div`);r.setAttribute(`aria-hidden`,`true`),r.style.position=`fixed`,r.style.left=`-99999px`,r.style.top=`0`,r.style.opacity=`0`,r.style.pointerEvents=`none`;let i=e.cloneNode(!1);i.removeAttribute(`value`),i instanceof HTMLInputElement?i.value=``:(i.value=``,i.textContent=``),r.appendChild(i),document.body.appendChild(r);let a=t.getComputedStyle(i),o=t.getComputedStyle(e,`::placeholder`),s=t.getComputedStyle(i,`::placeholder`),c=o.color,l=s.color,u=o.opacity,d=s.opacity,f=e.style.color||a.color||n.color||`inherit`,p=a.backgroundColor||n.backgroundColor||`transparent`,m=l||c||``,h=d||u||`1`;document.body.removeChild(r);let g=e.parentElement?t.getComputedStyle(e.parentElement).color:``,_=e.parentElement?t.getComputedStyle(e.parentElement).backgroundColor:``;return{computed:n,color:f===`rgb(0, 0, 0)`&&g&&g!==`rgb(0, 0, 0)`?g:f,backgroundColor:p===`rgba(0, 0, 0, 0)`&&_&&_!==`rgba(0, 0, 0, 0)`?_:p,placeholderColor:m,placeholderOpacity:h}},S=()=>{let t=y();if(t.length===0)return;i(),n();let r=`af-scope-${Math.random().toString(36).slice(2,10)}`;e.setAttribute(`data-af-preserve`,`true`),e.setAttribute(`data-af-preserve-scope`,r),v.current=e;let a=[];t.forEach((e,t)=>{if(e instanceof HTMLInputElement){let t=(e.type||`text`).toLowerCase(),n=`${e.name||``} ${e.id||``}`;(t===`text`||t===`email`||/(^|[^a-z])(name|email)([^a-z]|$)/i.test(n))&&!_.current.has(e)&&(_.current.set(e,{hadAttribute:e.hasAttribute(`spellcheck`),attributeValue:e.getAttribute(`spellcheck`),propertyValue:e.spellcheck}),e.spellcheck=!1,e.setAttribute(`spellcheck`,`false`))}let n=x(e),i=n.computed,o=n.backgroundColor||`transparent`,s=`var(--token-08a4b50c-5b6d-474c-b02e-0eed39fd9a36, ${n.color||i.color||`inherit`})`,c=n.placeholderColor&&n.placeholderColor!==`rgb(0, 0, 0)`&&n.placeholderColor!==`rgba(0, 0, 0, 1)`?n.placeholderColor:`rgba(238, 238, 238, 0.7)`,l=n.placeholderOpacity||`1`,u=i.fontFamily||`inherit`,d=i.fontSize||`inherit`,f=i.fontWeight||`inherit`,p=i.fontStyle||`normal`,m=i.lineHeight||`normal`,g=i.letterSpacing||`normal`,v=i.textTransform||`none`,y=i.textAlign||`start`,b=`${r}-${t}`;e.setAttribute(`data-af-preserve-id`,b);let S=`[data-af-preserve-scope="${r}"] [data-af-preserve-id="${b}"]`,w=[`${S}:-webkit-autofill`,`${S}:-webkit-autofill:hover`,`${S}:-webkit-autofill:focus`],T=[`${S}:autofill`,`${S}:autofill:hover`,`${S}:autofill:focus`],E=[...w,...T],D=e=>{a.push(`
${e}::placeholder
{
    color: ${c} !important;
    -webkit-text-fill-color: ${c} !important;
    caret-color: ${s} !important;
    opacity: ${l} !important;
}`),a.push(`
${e}::-webkit-input-placeholder
{
    color: ${c} !important;
    -webkit-text-fill-color: ${c} !important;
    caret-color: ${s} !important;
    opacity: ${l} !important;
}`),a.push(`
${e}::-moz-placeholder
{
    color: ${c} !important;
    opacity: ${l} !important;
}`)};a.push(`
${S}
{
    -webkit-text-fill-color: ${s} !important;
    color: ${s} !important;
    caret-color: ${s} !important;
}`),a.push(`
${S}:focus
{
    -webkit-text-fill-color: ${s} !important;
    color: ${s} !important;
    caret-color: ${s} !important;
}`),a.push(`
${S}:focus-visible
{
    -webkit-text-fill-color: ${s} !important;
    color: ${s} !important;
    caret-color: ${s} !important;
}`),a.push(`
${S}:invalid
{
    -webkit-text-fill-color: ${s} !important;
    color: ${s} !important;
    caret-color: ${s} !important;
}`),a.push(`
${S}:user-invalid
{
    -webkit-text-fill-color: ${s} !important;
    color: ${s} !important;
    caret-color: ${s} !important;
}`),D(S),D(`${S}:focus`),D(`${S}:focus-visible`),D(`${S}:invalid`),D(`${S}:user-invalid`),E.forEach(e=>{D(e)});let O=e=>{a.push(`
${e}
{
    -webkit-text-fill-color: ${s} !important;
    color: ${s} !important;
    caret-color: ${s} !important;
    -webkit-box-shadow: 0 0 0 1000px ${o} inset !important;
    box-shadow: 0 0 0 1000px ${o} inset !important;
    background-color: ${o} !important;
    font-family: ${u} !important;
    font-size: ${d} !important;
    font-weight: ${f} !important;
    font-style: ${p} !important;
    line-height: ${m} !important;
    letter-spacing: ${g} !important;
    text-transform: ${v} !important;
    text-align: ${y} !important;
    transition: background-color 99999s ease-in-out 0s !important;
}`)};w.forEach(e=>{O(e)}),T.forEach(e=>{O(e)});let k=()=>{C()};e.addEventListener(`focus`,k),e.addEventListener(`blur`,k),e.addEventListener(`input`,k),e.addEventListener(`change`,k),h.current.push(()=>{e.removeEventListener(`focus`,k),e.removeEventListener(`blur`,k),e.removeEventListener(`input`,k),e.removeEventListener(`change`,k)})});let o=b();o.textContent=a.join(`
`)},C=()=>{c(),d.current=t.requestAnimationFrame(()=>{S(),d.current=null}),p.current=t.setTimeout(()=>{f.current=t.requestAnimationFrame(()=>{S(),f.current=null}),p.current=null},80),m.current=t.setTimeout(()=>{S(),m.current=null},260)};C(),typeof MutationObserver<`u`&&(u.current=new MutationObserver(()=>{C()}),u.current.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`style`,`class`]}));let w=()=>{C()};return t.addEventListener(`pageshow`,w),document.addEventListener(`visibilitychange`,w),g.current.push(()=>t.removeEventListener(`pageshow`,w)),g.current.push(()=>document.removeEventListener(`visibilitychange`,w)),()=>{c(),u.current&&=(u.current.disconnect(),null),i(),a(),s(),r(),n()}},[]),c(e,{ref:y,...i})})}var d=e((()=>{i(),l(),a()}));export{u as n,d as t};
//# sourceMappingURL=PreserveFramerAutofillStyling.COglfYq9.mjs.map