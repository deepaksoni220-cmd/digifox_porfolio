// Date display component með íslensku sniði og textastíl
// Supports normal formatted dates or relative date terms in Icelandic or English.
// Relative output uses proper (basic) Icelandic declension when language = "IS"
// and natural English phrasing when language = "EN".
// Relative outputs are returned in sentence case.
import{jsx as _jsx}from"react/jsx-runtime";import{useMemo}from"react";import{addPropertyControls,ControlType}from"framer";/**
 * Icelandic / English Date Display
 *
 * Displays formatted dates in multiple formats (full, long, short, numeric)
 * and supports an optional "relative" mode that returns relative time strings
 * in either Icelandic ("IS") or English ("EN").
 *
 * Props:
 * - date: source date
 * - format: full / long / short / numeric
 * - order: dmy / ymd / mdy
 * - relative: when true, returns relative strings (language-aware)
 * - language: "IS" or "EN"
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */export default function IcelandicDate(props){const{date,format,order,relative,language,font,color,style}=props;// helper: Sentence Case (first letter capitalized)
const sentenceCase=txt=>txt&&txt.length>0?txt.charAt(0).toUpperCase()+txt.slice(1):txt;// helper: Icelandic dative numeral forms commonly used with "fyrir"
const dativeNumber=n=>{if(n===2)return"tveimur";if(n===3)return"\xferemur";if(n===4)return"fj\xf3rum";return String(n);};const formatted=useMemo(()=>{if(!date)return"—";try{const d=new Date(date);const today=new Date;const normalize=x=>new Date(x.getFullYear(),x.getMonth(),x.getDate());const diffMs=normalize(today).getTime()-normalize(d).getTime();const diffDays=Math.round(diffMs/864e5);const monthsDiff=(()=>{let months=(today.getFullYear()-d.getFullYear())*12+(today.getMonth()-d.getMonth());if(today.getDate()<d.getDate())months-=1;return months;})();const yearsDiff=Math.floor(monthsDiff/12);const weeks=Math.floor(diffDays/7);// RELATIVE MODE (language-aware)
if(relative){if(language==="EN"){// English relative phrases
if(diffDays===0)return sentenceCase("today");if(diffDays===1)return sentenceCase("yesterday");if(diffDays>1&&diffDays<7)return sentenceCase(`${diffDays} days ago`);if(monthsDiff<=0&&weeks===1)return sentenceCase("1 week ago");if(monthsDiff<=0&&weeks>1&&weeks<5)return sentenceCase(`${weeks} weeks ago`);if(monthsDiff===1)return sentenceCase("last month");if(monthsDiff>1&&monthsDiff<12)return sentenceCase(`${monthsDiff} months ago`);if(yearsDiff===1)return sentenceCase("last year");if(yearsDiff>1)return sentenceCase(`${yearsDiff} years ago`);}else{// Icelandic relative phrases with basic declension
if(diffDays===0)return sentenceCase("\xed dag");if(diffDays===1)return sentenceCase("\xed g\xe6r");if(diffDays>1&&diffDays<7){const num=dativeNumber(diffDays);return sentenceCase(`fyrir ${num} d\xf6gum`);}if(monthsDiff<=0&&weeks===1)return sentenceCase("fyrir viku");if(monthsDiff<=0&&weeks>1&&weeks<5){const num=dativeNumber(weeks);return sentenceCase(`fyrir ${num} vikum`);}if(monthsDiff===1)return sentenceCase("\xed s\xed\xf0asta m\xe1nu\xf0i");if(monthsDiff>1&&monthsDiff<12){const num=dativeNumber(monthsDiff);return sentenceCase(`fyrir ${num} m\xe1nu\xf0um`);}if(yearsDiff===1)return sentenceCase("\xed fyrra");if(yearsDiff>1){const num=dativeNumber(yearsDiff);return sentenceCase(`fyrir ${num} \xe1rum`);}}// fall through to formatted if nothing matched (e.g., future dates)
}// month and weekday names per language
const monthsIS=["Jan\xfaar","Febr\xfaar","Mars","Apr\xedl","Ma\xed","J\xfan\xed","J\xfal\xed","\xc1g\xfast","September","Okt\xf3ber","N\xf3vember","Desember"];const weekdaysIS=["Sunnudagur","M\xe1nudagur","\xferi\xf0judagur","Mi\xf0vikudagur","Fimmtudagur","F\xf6studagur","Laugardagur"];const monthsEN=["January","February","March","April","May","June","July","August","September","October","November","December"];const weekdaysEN=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];const day=d.getDate();const month=d.getMonth();const year=d.getFullYear();const weekday=d.getDay();// choose arrays based on language
const monthsArr=language==="EN"?monthsEN:monthsIS;const weekdaysArr=language==="EN"?weekdaysEN:weekdaysIS;// long-style ordering (with month name), WITHOUT trailing dot on day
const longByOrder=()=>{if(order==="ymd")return`${year} ${monthsArr[month]} ${day}`;if(order==="mdy")return`${monthsArr[month]} ${day}, ${year}`;return`${day} ${monthsArr[month]} ${year}`;};// numeric-style ordering (with /)
const numericByOrder=()=>{if(order==="ymd")return`${year}/${month+1}/${day}`;if(order==="mdy")return`${month+1}/${day}/${year}`;return`${day}/${month+1}/${year}`;};if(format==="full"){// weekday first, then follow chosen order
return`${weekdaysArr[weekday]}, ${longByOrder()}`;}else if(format==="long"){return longByOrder();}else if(format==="short"){const yy=String(year).slice(-2);const mm=String(month+1).padStart(2,"0");const dd=String(day).padStart(2,"0");if(order==="dmy")return`${dd}.${mm}.${yy}`;if(order==="mdy")return`${mm}.${dd}.${yy}`;return`${yy}.${mm}.${dd}`;}return numericByOrder();}catch{return"—";}},[date,format,order,relative,language]);return /*#__PURE__*/_jsx("span",{style:{...font,color,...style,width:"max-content",display:"inline-block"},lang:language==="EN"?"en":"is","aria-label":formatted,children:formatted});}addPropertyControls(IcelandicDate,{date:{type:ControlType.Date,title:"Date",displayTime:false,defaultValue:new Date().toJSON()},relative:{type:ControlType.Boolean,title:"Relative",defaultValue:false},language:{type:ControlType.Enum,title:"Language",options:["IS","EN"],optionTitles:["IS","EN"],defaultValue:"IS",displaySegmentedControl:true},format:{type:ControlType.Enum,title:"Format",options:["full","long","short","numeric"],optionTitles:["Full","Long","Short","Numeric"],defaultValue:"long",displaySegmentedControl:true},order:{type:ControlType.Enum,title:"Order",options:["dmy","ymd","mdy"],optionTitles:["Date month year","Year month date","Month date year"],defaultValue:"dmy"},font:{type:ControlType.Font,title:"Font",controls:"extended",defaultFontType:"sans-serif",defaultValue:{fontSize:"22px",variant:"Semibold",letterSpacing:"-0.01em",lineHeight:"1.2em"}},color:{type:ControlType.Color,title:"Text Color",defaultValue:"#000000"}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"IcelandicDate","slots":[],"annotations":{"framerSupportedLayoutHeight":"auto","framerContractVersion":"1","framerSupportedLayoutWidth":"auto"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./IcelandicDate_new.map