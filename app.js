"use strict";
const phrases = [
  {zh:"你",py:"nǐ",en:"you",audio:"./assets/words/item-001.wav"},
  {zh:"您",py:"nín",en:"you (respectful)",audio:"./assets/words/item-002.wav"},
  {zh:"好",py:"hǎo",en:"good / well",audio:"./assets/words/item-003.wav"},
  {zh:"你好",py:"nǐ hǎo",en:"hello",audio:"./assets/words/item-004.wav"},
  {zh:"您好",py:"nín hǎo",en:"hello (respectful)",audio:"./assets/words/item-005.wav"},
  {zh:"们",py:"men",en:"plural suffix for people",audio:"./assets/words/item-006.wav"},
  {zh:"你们",py:"nǐmen",en:"you (plural)",audio:"./assets/words/item-007.wav"},
  {zh:"你们好",py:"nǐmen hǎo",en:"hello (to a group)",audio:"./assets/words/item-008.wav"},
  {zh:"大家",py:"dàjiā",en:"everyone",audio:"./assets/words/item-009.wav"},
  {zh:"大家好",py:"dàjiā hǎo",en:"hello, everyone",audio:"./assets/words/item-010.wav"},
  {zh:"老师",py:"lǎoshī",en:"teacher",audio:"./assets/words/item-011.wav"},
  {zh:"学生",py:"xuésheng",en:"student",audio:"./assets/words/item-012.wav"},
  {zh:"同学",py:"tóngxué",en:"classmate / fellow student",audio:"./assets/words/item-013.wav"},
  {zh:"谢谢",py:"xièxie",en:"thank you",audio:"./assets/words/item-014.wav"},
  {zh:"不客气",py:"bú kèqi",en:"you’re welcome",audio:"./assets/words/item-015.wav"},
  {zh:"再见",py:"zàijiàn",en:"goodbye",audio:"./assets/words/item-016.wav"}
];
const speakerIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
document.querySelector("#vocabulary-list").innerHTML = phrases.map(p=>`<tr><th scope="row" lang="zh-Hans">${p.zh}</th><td class="phrase-pinyin">${p.py}</td><td class="phrase-english">${p.en}</td><td><button type="button" class="speak-button" data-audio-src="${p.audio}" data-audio-label="${p.zh}" aria-label="Play recording of ${p.zh}" title="Play recording">${speakerIcon}</button></td></tr>`).join("");
for (const type of ["pinyin","english"]) document.querySelector(`#show-${type}`).addEventListener("change", e=>document.querySelector("#vocabulary-list").classList.toggle(`hide-${type}`,!e.target.checked));
const wordAudio=new Audio();let activeAudioButton=null;
function clearActiveAudioButton(){if(activeAudioButton){activeAudioButton.classList.remove("is-playing");activeAudioButton=null;}}
wordAudio.addEventListener("ended",clearActiveAudioButton);
wordAudio.addEventListener("error",()=>{document.querySelector("#audio-feedback").textContent="This pronunciation recording could not be played.";clearActiveAudioButton();});
document.addEventListener("click",e=>{
  const button=e.target.closest("[data-audio-src]");if(!button)return;
  wordAudio.pause();wordAudio.currentTime=0;clearActiveAudioButton();
  activeAudioButton=button;button.classList.add("is-playing");wordAudio.src=button.dataset.audioSrc;
  document.querySelector("#audio-feedback").textContent=`Playing ${button.dataset.audioLabel}.`;
  wordAudio.play().catch(()=>{document.querySelector("#audio-feedback").textContent="This pronunciation recording could not be played.";clearActiveAudioButton();});
});

const exercises=[
 {q:"You meet a new friend. Say hello.",answer:"你好！",py:"Nǐ hǎo!",audio:"./assets/words/item-004.wav"},
 {q:"You meet your teacher. Greet them respectfully.",answer:"您好！",py:"Nín hǎo!",audio:"./assets/words/item-005.wav"},
 {q:"You walk into a classroom. Say “Hello, everyone.”",answer:"大家好！",py:"Dàjiā hǎo!",audio:"./assets/words/item-010.wav"},
 {q:"Two friends are waiting for you. Greet both of them.",answer:"你们好！",py:"Nǐmen hǎo!",audio:"./assets/words/item-008.wav"},
 {q:"A friend says 谢谢. What do you say back?",answer:"不客气！",py:"Bú kèqi!",audio:"./assets/words/item-015.wav"},
 {q:"Class is over. Say goodbye.",answer:"再见！",py:"Zàijiàn!",audio:"./assets/words/item-016.wav"},
 {q:"Which greeting is respectful: 你好 or 您好?",answer:"您好",py:"Nín hǎo — 您 is the respectful form of “you.”",audio:"./assets/words/item-005.wav"},
 {q:"Someone helps you. How do you thank them?",answer:"谢谢！",py:"Xièxie!",audio:"./assets/words/item-014.wav"},
 {q:"Which means “you” when speaking to several people: 你, 您, or 你们?",answer:"你们",py:"Nǐmen — you (plural).",audio:"./assets/words/item-007.wav"},
 {q:"What does 学生 mean?",answer:"Student",py:"Xuésheng"},
 {q:"What does 再见 mean?",answer:"Goodbye",py:"Zàijiàn"}
];
document.querySelector('#practice-list').innerHTML=exercises.map((e,i)=>`<li><p id="exercise-${i}">${e.q}</p><details><summary aria-describedby="exercise-${i}"><span class="show-label">Show answer</span><span class="hide-label">Hide answer</span></summary><div class="answer"><strong>${e.answer}</strong><span>${e.py}</span>${e.audio?`<button type="button" class="speak-button answer-audio" data-audio-src="${e.audio}" data-audio-label="${e.answer}" aria-label="Play recording of ${e.answer}" title="Play recording">${speakerIcon}</button>`:""}</div></details></li>`).join('');
const lessonPanelToggle=document.querySelector("#lesson-panel-toggle");
function setLessonPanel(open){document.documentElement.classList.toggle("lessons-hidden",!open);lessonPanelToggle.setAttribute("aria-expanded",String(open));lessonPanelToggle.querySelector(".toggle-label").textContent=open?"Hide lessons":"Show lessons";try{localStorage.setItem("lesson-panel-open",String(open));}catch{}}
let lessonPanelOpen=true;try{lessonPanelOpen=localStorage.getItem("lesson-panel-open")!=="false";}catch{}
setLessonPanel(lessonPanelOpen);lessonPanelToggle.addEventListener("click",()=>setLessonPanel(lessonPanelToggle.getAttribute("aria-expanded")!=="true"));
const audio=document.querySelector("#lesson-audio"),audioStatus=document.querySelector("#audio-status");
function loadAudio(src,message){audio.src=src;audioStatus.textContent=message;audio.load();}
audio.addEventListener("error",()=>{audioStatus.textContent="The lesson recording could not be loaded. Please try again later.";});
if(window.LESSON_AUDIO)loadAudio(window.LESSON_AUDIO,"Full lesson audio");
document.querySelector("#skip-intro").addEventListener("click",()=>{
  const jumpToIntroEnd=()=>{audio.currentTime=Math.min(80,Number.isFinite(audio.duration)?audio.duration:80);audioStatus.textContent="Skipped to 1:20";audio.play().catch(()=>{audioStatus.textContent="Skipped to 1:20 · Press play to continue";});};
  if(audio.readyState>=1)jumpToIntroEnd();else audio.addEventListener("loadedmetadata",jumpToIntroEnd,{once:true});
});
window.addEventListener("pagehide",()=>{wordAudio.pause();});
