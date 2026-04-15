function showPage(id, btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  window.scrollTo({top:0,behavior:'instant'});
  setTimeout(kickReveal,60);
}

// SCROLL REVEAL
function kickReveal(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('visible'), i*55);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.07,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.page.active .reveal:not(.visible)').forEach(el=>obs.observe(el));
}

// Initial reveal
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.page.active .reveal').forEach((el,i)=>{
    setTimeout(()=>el.classList.add('visible'), 100 + i*70);
  });
});

// NOTES FILTER
function filterNotes(cat, btn){
  document.querySelectorAll('.ntab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.ncard').forEach(c=>{
    c.style.display = (cat==='all'||c.dataset.cat===cat) ? '' : 'none';
  });
}

// THEME TOGGLE
let dark=true;
function toggleTheme(){
  dark=!dark;
  document.body.classList.toggle('light',!dark);
  document.getElementById('themeBtn').textContent = dark?'☀️':'🌙';
}