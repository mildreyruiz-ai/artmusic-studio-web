
(function(){
  var IT=window.AMG_IT||{};
  var N=function(s){return s.replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();};
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  var items=[],htmlEls=[],skip={SCRIPT:1,STYLE:1};
  document.querySelectorAll('body *').forEach(function(el){
    if(skip[el.tagName]||el.closest('svg'))return;
    for(var i=0;i<htmlEls.length;i++){if(htmlEls[i].contains(el))return;}
    var k=N(el.innerHTML);
    if(IT[k]&&!el.querySelector('span,svg,img')){items.push({el:el,en:el.innerHTML,it:IT[k],html:1});htmlEls.push(el);return;}
    el.childNodes.forEach(function(n){
      if(n.nodeType===3){var tk=N(n.textContent);if(IT[tk])items.push({node:n,en:n.textContent,it:IT[tk]});}
    });
    if(el.tagName==='IMG'&&IT[N(el.alt)])items.push({el:el,alt:1,en:el.alt,it:IT[N(el.alt)]});
    if(el.dataset&&el.dataset.phIt)items.push({el:el,ph:1,en:el.getAttribute('placeholder'),it:el.dataset.phIt});
  });
  var meta=document.querySelector('meta[name=description]'),enT=document.title,enD=meta&&meta.content;
  var itT=document.querySelector('title').getAttribute('data-it'),itD=meta&&meta.getAttribute('data-it');
  function set(l){
    items.forEach(function(x){
      var v=l==='it'?x.it:x.en;
      if(x.html)x.el.innerHTML=v;
      else if(x.alt)x.el.alt=v;
      else if(x.ph)x.el.setAttribute('placeholder',v);
      else{var m=x.en.match(/^\s*/)[0],e=x.en.match(/\s*$/)[0];x.node.textContent=l==='it'?m+v+e:x.en;}
    });
    document.documentElement.lang=l;
    if(itT)document.title=l==='it'?itT:enT;
    if(meta&&itD)meta.content=l==='it'?itD:enD;
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===l?'true':'false');});
    try{localStorage.setItem('amg-lang',l);}catch(e){}
    window.AMG_LANG=l;
    document.dispatchEvent(new CustomEvent('amg-lang',{detail:l}));
  }
  document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){set(b.dataset.lang);});});
  var q=(location.search.match(/lang=(it|en)/)||[])[1],s=null;
  try{s=localStorage.getItem('amg-lang');}catch(e){}
  var l=q||s||((navigator.language||'').toLowerCase().indexOf('it')===0?'it':'en');
  window.AMG_LANG='en'; if(l==='it')set('it');

  // lightbox
  var lb=document.createElement('div');lb.className='lightbox';lb.innerHTML='<img alt="">';document.body.appendChild(lb);
  lb.addEventListener('click',function(){lb.classList.remove('on');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on');});
  document.querySelectorAll('.gallery img').forEach(function(im){im.addEventListener('click',function(){lb.firstChild.src=im.src;lb.firstChild.alt=im.alt;lb.classList.add('on');});});

  // forms -> mailto
  var f=document.getElementById('bookform');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();
    var it=window.AMG_LANG==='it',lines=[],name='';
    [].forEach.call(f.elements,function(el){
      if(!el.id||el.type==='submit'||el.tagName==='BUTTON')return;
      var lab=document.querySelector('label[for="'+el.id+'"]'),lt=lab?lab.textContent.trim():el.name;
      if(el.type==='checkbox'){var sp=el.parentNode.querySelector('span');if(el.checked)lines.push((sp?sp.textContent:lt));return;}
      if(el.name==='name')name=el.value;
      if(el.name==='msg')return;
      if(el.value)lines.push(lt+': '+el.value);
    });
    var msg=document.getElementById('f-msg');if(msg&&msg.value){lines.push('');lines.push(msg.value);}
    var subj=(it?f.dataset.subjectIt:f.dataset.subjectEn)||(it?'Richiesta sessione — ':'Session request — ');
    location.href='mailto:'+(f.dataset.mail||'info@artmusicstudio.it')+'?subject='+encodeURIComponent(subj+name)+'&body='+encodeURIComponent(lines.join('\n'));
  });
})();
