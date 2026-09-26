"use strict";
const phrases = [
  {zh:"你",py:"nǐ",en:"you"},
  {zh:"您",py:"nín",en:"you (respectful)"},
  {zh:"好",py:"hǎo",en:"good / well"},
  {zh:"你好",py:"nǐ hǎo",en:"hello"},
  {zh:"您好",py:"nín hǎo",en:"hello (respectful)"},
  {zh:"们",py:"men",en:"plural suffix for people"},
  {zh:"你们",py:"nǐmen",en:"you (plural)"},
  {zh:"你们好",py:"nǐmen hǎo",en:"hello (to a group)"},
  {zh:"大家",py:"dàjiā",en:"everyone"},
  {zh:"大家好",py:"dàjiā hǎo",en:"hello, everyone"},
  {zh:"老师",py:"lǎoshī",en:"teacher"},
  {zh:"学生",py:"xuésheng",en:"student"},
  {zh:"同学",py:"tóngxué",en:"classmate / fellow student"},
  {zh:"谢谢",py:"xièxie",en:"thank you"},
  {zh:"不客气",py:"bú kèqi",en:"you’re welcome"},
  {zh:"再见",py:"zàijiàn",en:"goodbye"}
];
const speakerIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
document.querySelector("#vocabulary-list").innerHTML = phrases.map((p,i)=>`<tr><th scope="row" lang="zh-Hans">${p.zh}</th><td class="phrase-pinyin">${p.py}</td><td class="phrase-english">${p.en}</td><td><button type="button" class="speak-button" data-phrase="${i}" aria-label="Hear ${p.zh} with a device voice" title="Device pronunciation">${speakerIcon}</button></td></tr>`).join("");
for (const type of ["pinyin","english"]) document.querySelector(`#show-${type}`).addEventListener("change", e=>document.querySelector("#vocabulary-list").classList.toggle(`hide-${type}`,!e.target.checked));
document.querySelector("#vocabulary-list").addEventListener("click",e=>{
  const button=e.target.closest("[data-phrase]"); if(!button)return;
  const status=document.querySelector("#speech-status");
  if(!("speechSynthesis" in window)){status.textContent="Device pronunciation is unavailable in this browser. Please use your lesson recording.";return;}
  const voice=window.speechSynthesis.getVoices().find(v=>/^(zh[-_](CN|TW)|cmn)([-_]|$)/i.test(v.lang));
  if(!voice){status.textContent="No Mandarin device voice is available. Please use your lesson recording for pronunciation.";return;}
  window.speechSynthesis.cancel();const phrase=phrases[Number(button.dataset.phrase)];const utterance=new SpeechSynthesisUtterance(phrase.zh);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.85;
  status.textContent=`Device pronunciation: ${phrase.zh}. This is a synthetic voice, not the lesson recording.`;
  utterance.onerror=()=>{status.textContent="The device voice could not play. Please use your lesson recording.";};window.speechSynthesis.speak(utterance);
});
if("speechSynthesis" in window)window.speechSynthesis.getVoices();

const exercises=[
 {q:"You meet a new friend. Say hello.",answer:"你好！",py:"Nǐ hǎo!"},
 {q:"You meet your teacher. Greet them respectfully.",answer:"您好！",py:"Nín hǎo!"},
 {q:"You walk into a classroom. Say “Hello, everyone.”",answer:"大家好！",py:"Dàjiā hǎo!"},
 {q:"Two friends are waiting for you. Greet both of them.",answer:"你们好！",py:"Nǐmen hǎo!"},
 {q:"A friend says 谢谢. What do you say back?",answer:"不客气！",py:"Bú kèqi!"},
 {q:"Class is over. Say goodbye.",answer:"再见！",py:"Zàijiàn!"},
 {q:"Which greeting is respectful: 你好 or 您好?",answer:"您好",py:"Nín hǎo — 您 is the respectful form of “you.”"},
 {q:"Someone helps you. How do you thank them?",answer:"谢谢！",py:"Xièxie!"},
 {q:"Which means “you” when speaking to several people: 你, 您, or 你们?",answer:"你们",py:"Nǐmen — you (plural)."},
 {q:"What does 学生 mean?",answer:"Student",py:"Xuésheng"},
 {q:"What does 再见 mean?",answer:"Goodbye",py:"Zàijiàn"}
];
document.querySelector('#practice-list').innerHTML=exercises.map((e,i)=>`<li><p id="exercise-${i}">${e.q}</p><details><summary aria-describedby="exercise-${i}"><span class="show-label">Show answer</span><span class="hide-label">Hide answer</span></summary><div class="answer"><strong>${e.answer}</strong><span>${e.py}</span></div></details></li>`).join('');
const audio=document.querySelector("#lesson-audio"),audioStatus=document.querySelector("#audio-status");let localAudioURL=null;
function loadAudio(src,message){audio.src=src;audio.hidden=false;audioStatus.textContent=message;audio.load();}
audio.addEventListener("error",()=>{audioStatus.textContent="This recording could not be loaded. Try another audio file from your device.";audio.hidden=true;});
if(window.LESSON_AUDIO)loadAudio(window.LESSON_AUDIO,"Lesson recording");
document.querySelector("#audio-file").addEventListener("change",e=>{const file=e.target.files[0];if(!file)return;if(!file.type.startsWith("audio/")&&!/\.(mp3|wav|m4a|ogg|aac|flac|webm)$/i.test(file.name)){audioStatus.textContent="Please choose an audio file, such as MP3, M4A, or WAV.";return;}audio.pause();if(localAudioURL)URL.revokeObjectURL(localAudioURL);localAudioURL=URL.createObjectURL(file);loadAudio(localAudioURL,`Ready to listen: ${file.name}. Local file · not uploaded.`);});
window.addEventListener("pagehide",()=>{if(localAudioURL)URL.revokeObjectURL(localAudioURL);if("speechSynthesis" in window)window.speechSynthesis.cancel();});
