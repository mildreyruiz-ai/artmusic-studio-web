(function(){
  var D=window.STUDIO_DATA||{};
  var L=function(){return window.AMG_LANG==='it'?'it':'en';};
  var tx=function(v){return v&&typeof v==='object'?(v[L()]||v.en||''):(v||'');};
  var UI={
    sample:{en:'Sample content — edit assets/studio-data.js',it:'Contenuto di esempio — modifica assets/studio-data.js'},
    st:{preproduction:{en:'Pre-production',it:'Pre-produzione'},recording:{en:'Recording',it:'In registrazione'},mixing:{en:'Mixing',it:'In mixaggio'},mastering:{en:'Mastering',it:'In mastering'}},
    since:{en:'Since',it:'Dal'},soon:{en:'Coming soon',it:'Prossimamente'},listen:{en:'Listen →',it:'Ascolta →'},play:{en:'Play video',it:'Riproduci video'},credits:{en:'Selected credits',it:'Crediti selezionati'},source:{en:'Source →',it:'Fonte →'}
  };
  var u=function(k){return tx(UI[k]);};
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  var banner=function(list){return list.some(function(x){return x.sample;})?'<div class="draftbanner">'+esc(u('sample'))+'</div>':'';};
  function ytId(url){var m=String(url||'').match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);return m?m[1]:'';}
  function monthLabel(s){var m=String(s||'').match(/^(\d{4})-(\d{2})/);if(!m)return esc(s);return new Date(+m[1],+m[2]-1,1).toLocaleDateString(L()==='it'?'it-IT':'en-GB',{month:'long',year:'numeric'});}

  var R={
    inproduction:function(el,lim){
      var a=(D.inProduction||[]).slice(0,lim||99);
      return banner(a)+'<div class="news">'+a.map(function(x){
        var live=x.status==='recording'||x.status==='mixing';
        return '<article class="ncard reveal in"><span class="badge'+(live?' live':'')+'"><i></i>'+esc(tx(UI.st[x.status])||x.status)+'</span><h4>'+esc(x.artist)+'</h4><div class="proj">'+esc(tx(x.project))+'</div><div class="note2">'+esc(tx(x.note))+'</div>'+(x.since?'<div class="since">'+esc(u('since'))+' '+monthLabel(x.since)+'</div>':'')+'</article>';}).join('')+'</div>';
    },
    recordings:function(el,lim){
      var a=(D.recordings||[]).slice(0,lim||99);
      return '<div class="albums">'+a.map(function(x){
        var cv='<div class="cover">'+(x.cover?'<img src="'+esc(x.cover)+'" alt="'+esc(x.title)+'" loading="lazy">':'<span>'+esc(x.title)+'</span>')+'</div>';
        return '<div class="album reveal in">'+cv+'<h5>'+esc(x.title)+'</h5><p>'+esc(x.artist)+(x.year?' · '+esc(x.year):'')+'</p>'+(x.link?'<a href="'+esc(x.link)+'" target="_blank" rel="noopener">'+esc(u('listen'))+'</a>':'')+'</div>';}).join('')+'</div>';
    },
    videos:function(el,lim){
      var a=(D.videos||[]).slice(0,lim||99);
      return banner(a)+'<div class="videos">'+a.map(function(x,i){
        var id=ytId(x.url),fr=id?'<img src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg" alt="'+esc(tx(x.title))+'" loading="lazy"><button class="play" type="button" data-yt="'+id+'" aria-label="'+esc(u('play'))+'"><span></span></button>':'<div class="soon">'+esc(u('soon'))+'</div>';
        return '<div class="video reveal in"><div class="frame">'+fr+'</div><h5>'+esc(tx(x.title))+'</h5><p>'+esc(tx(x.text))+'</p></div>';}).join('')+'</div>';
    },
    team:function(el){
      var a=D.team||[],c=el.dataset.compact;
      return banner(a)+'<div class="team'+(c?' compact':'')+'">'+a.map(function(x){
        return '<div class="person reveal in"><div class="ph">'+(x.photo?'<img src="'+esc(x.photo)+'" alt="'+esc(x.name)+'">':esc(x.name.charAt(0)))+'</div><div><h4>'+esc(x.name)+'</h4><div class="role">'+esc(tx(x.role))+'</div><p>'+esc(tx(x.bio))+'</p></div></div>';}).join('')+'</div>';
    },

    engineer:function(el){
      var a=(D.team||[])[0];if(!a)return '';
      var c=el.dataset.compact,cr=(a.credits||[]);
      var credits=(!c&&cr.length)?'<div class="credits"><div class="kicker" style="color:var(--amber);margin:26px 0 6px"><span class="ch" style="background:var(--amber)"></span>'+esc(u('credits'))+'</div>'+cr.map(function(x){return '<div class="cr"><div><b>'+esc(x.artist)+'</b>'+(x.project?' — '+esc(tx(x.project)):'')+'<span>'+esc(tx(x.note))+'</span></div>'+(x.link?'<a href="'+esc(x.link)+'" target="_blank" rel="noopener">'+esc(u('source'))+'</a>':'')+'</div>';}).join('')+'</div>':'';
      return banner([a])+'<div class="engineer reveal in'+(c?' compact':'')+'"><div class="ph">'+(a.photo?'<img src="'+esc(a.photo)+'" alt="'+esc(a.name)+'">':esc(a.name.charAt(0)))+'</div><div><h2>'+esc(a.name)+'</h2><div class="role">'+esc(tx(a.role))+'</div><p>'+esc(tx(a.bio))+'</p>'+(c?'':(a.style?'<p>'+esc(tx(a.style))+'</p>':''))+credits+'</div></div>';
    },
    mics:function(){
      var a=D.mics||[];
      return banner(a)+'<div class="mics">'+a.map(function(g){return '<div class="group reveal in"><h4>'+esc(tx(g.group))+'</h4><ul>'+g.items.map(function(i){return '<li>'+esc(i)+'</li>';}).join('')+'</ul></div>';}).join('')+'</div>';
    },
    instruments:function(){
      var a=D.instruments||[];
      return banner(a)+'<div class="insts">'+a.map(function(g){return '<div class="group reveal in"><h4>'+esc(tx(g.group))+'</h4><ul>'+g.items.map(function(i){return '<li>'+(i.b?'<b>'+esc(i.b)+'</b> — ':'')+esc(tx(i.n))+'</li>';}).join('')+'</ul></div>';}).join('')+'</div>';
    }
  };
  function render(){
    document.querySelectorAll('[data-render]').forEach(function(el){
      var f=R[el.dataset.render];if(f)el.innerHTML=f(el,+el.dataset.limit||0);
    });
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-yt]');if(!b)return;
    var fr=b.parentNode;
    fr.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  });
  document.addEventListener('amg-lang',render);
  render();
})();
