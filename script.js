// script.js - key generation and image upload
function genKey(){
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const groups = 4;
  const per = 4;
  const out = [];
  for(let g=0; g<groups; g++){
    let p = "";
    for(let i=0;i<per;i++) p += chars.charAt(Math.floor(Math.random()*chars.length));
    out.push(p);
  }
  return out.join("-");
}

const keyBox = document.getElementById('keyBox');
const genBtn = document.getElementById('genBtn');
const copyBtn = document.getElementById('copyBtn');
const regenBtn = document.getElementById('regenBtn');
const imgInput = document.getElementById('imgUpload');
const avatar = document.getElementById('avatarPreview');
const heroImg = document.getElementById('heroImg');
const restoreBtn = document.getElementById('restoreBtn');

function setKey(k){
  keyBox.textContent = k;
  keyBox.animate([{transform:'scale(.98)'},{transform:'scale(1)'}],{duration:180});
}

document.getElementById('genBtn').addEventListener('click', ()=> setKey(genKey()));
document.getElementById('regenBtn').addEventListener('click', ()=> setKey(genKey()));

document.getElementById('copyBtn').addEventListener('click', async ()=>{
  const text = keyBox.textContent.trim();
  if(!text || text.includes('—')){ alert('Please generate a key first'); return; }
  try{
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied ✓';
    setTimeout(()=> copyBtn.textContent = 'Copy Key',1300);
  }catch(e){
    alert('Copy failed — browser may block clipboard access');
  }
});

imgInput.addEventListener('change',(ev)=>{
  const f = ev.target.files && ev.target.files[0];
  if(!f) return;
  const url = URL.createObjectURL(f);
  avatar.src = url;
  heroImg.src = url;
});

restoreBtn.addEventListener('click', ()=>{
  // restore original bundled image
  const bundled = heroImg.getAttribute('src');
  avatar.src = bundled;
  heroImg.src = bundled;
});

// generate initial key on load
window.addEventListener('load', ()=>{
  setKey(genKey());
});
