(function(){
  var form=document.getElementById('sessionform'),calEl=document.getElementById('cal');
  if(!form||!calEl)return;
  var C=(window.STUDIO_DATA&&window.STUDIO_DATA.booking)||{};
  var L=function(){return window.AMG_LANG==='it'?'it':'en';};
  var S={
    prev:{en:'Previous month',it:'Mese precedente'},next:{en:'Next month',it:'Mese successivo'},
    free:{en:'Available',it:'Disponibile'},busy:{en:'Booked',it:'Occupato'},sel:{en:'Selected',it:'Selezionato'},
    demo:{en:'Demo mode: the calendar is not connected to Google Calendar yet, so every future day is shown as available.',it:'Modalità demo: il calendario non è ancora collegato a Google Calendar, quindi ogni giorno futuro risulta disponibile.'},
    err:{en:'Could not load live availability. All future days are shown; the studio will confirm.',it:'Impossibile caricare la disponibilità in tempo reale. Tutti i giorni futuri sono mostrati; lo studio confermerà.'},
    none:{en:'No days selected yet.',it:'Nessun giorno selezionato.'},
    needDay:{en:'Please select at least one day.',it:'Seleziona almeno un giorno.'},
    needSvc:{en:'Please choose at least one service.',it:'Scegli almeno un servizio.'},
    needInfo:{en:'Please enter your name and a valid email.',it:'Inserisci il tuo nome e un\'email valida.'},
    sent:{en:'Thank you! Your request has been sent. The studio will get back to you.',it:'Grazie! La richiesta è stata inviata. Lo studio ti risponderà.'},
    fail:{en:'Sending failed. Please email us directly.',it:'Invio non riuscito. Scrivici direttamente via email.'},
    opening:{en:'Opening your email app with the request ready to send…',it:'Apro la tua app di posta con la richiesta pronta da inviare…'},
    remove:{en:'Remove',it:'Rimuovi'}
  };
  var t=function(k){return S[k][L()];};
  var pad=function(n){return (n<10?'0':'')+n;};
  var key=function(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());};
  var today=new Date();today.setHours(0,0,0,0);
  var maxM=C.monthsAhead||6;
  var view=new Date(today.getFullYear(),today.getMonth(),1);
  var busy={},selected={},live=false,failed=false;

  function addBusy(a,b){ // a inclusive, b exclusive (Date)
    for(var d=new Date(a);d<b;d.setDate(d.getDate()+1))busy[key(d)]=1;
  }
  function load(){
    if(!C.calendarId||!C.apiKey){draw();return;}
    var min=new Date(today),max=new Date(today.getFullYear(),today.getMonth()+maxM+1,1);
    var url='https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(C.calendarId)+'/events?singleEvents=true&orderBy=startTime&maxResults=2500&timeMin='+encodeURIComponent(min.toISOString())+'&timeMax='+encodeURIComponent(max.toISOString())+'&key='+encodeURIComponent(C.apiKey);
    fetch(url).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(j){
      (j.items||[]).forEach(function(e){
        if(e.status==='cancelled'||e.transparency==='transparent')return;
        var s=e.start||{},en=e.end||{};
        if(s.date){addBusy(new Date(s.date+'T00:00:00'),new Date(en.date+'T00:00:00'));}
        else if(s.dateTime){var a=new Date(s.dateTime),b=new Date(en.dateTime||s.dateTime);var a0=new Date(a.getFullYear(),a.getMonth(),a.getDate()),b0=new Date(b.getFullYear(),b.getMonth(),b.getDate()+1);
          if(en.dateTime&&b.getHours()===0&&b.getMinutes()===0)b0.setDate(b0.getDate()-1);addBusy(a0,b0);}
      });
      live=true;draw();
    }).catch(function(){failed=true;draw();});
  }
  function draw(){
    var loc=L()==='it'?'it-IT':'en-GB';
    var first=new Date(view),lead=(first.getDay()+6)%7,dim=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
    var canPrev=view>new Date(today.getFullYear(),today.getMonth(),1),canNext=view<new Date(today.getFullYear(),today.getMonth()+maxM,1);
    var dows=[];for(var i=0;i<7;i++)dows.push(new Date(2024,0,1+i).toLocaleDateString(loc,{weekday:'short'}));
    var h='<div class="cal-head"><button type="button" data-nav="-1" aria-label="'+t('prev')+'"'+(canPrev?'':' disabled')+'>‹</button><b>'+view.toLocaleDateString(loc,{month:'long',year:'numeric'})+'</b><button type="button" data-nav="1" aria-label="'+t('next')+'"'+(canNext?'':' disabled')+'>›</button></div><div class="cal-grid">';
    dows.forEach(function(d){h+='<div class="dow">'+d+'</div>';});
    for(var p=0;p<lead;p++)h+='<button class="pad" tabindex="-1" disabled></button>';
    for(var n=1;n<=dim;n++){
      var d=new Date(view.getFullYear(),view.getMonth(),n),k=key(d),past=d<today,b=!!busy[k],on=!!selected[k];
      h+='<button type="button" data-d="'+k+'" class="'+(b?'busy ':'')+(on?'on':'')+'"'+((past||b)?' disabled':'')+' aria-pressed="'+on+'">'+n+'</button>';
    }
    h+='</div><div class="cal-legend"><span>▢ '+t('free')+'</span><span>▨ '+t('busy')+'</span><span style="color:var(--amber)">■ '+t('sel')+'</span></div>';
    if(!C.calendarId||!C.apiKey)h+='<div class="cal-note">'+t('demo')+'</div>';
    else if(failed)h+='<div class="cal-note">'+t('err')+'</div>';
    calEl.innerHTML=h;drawSel();
  }
  function fmt(k){return new Date(k+'T00:00:00').toLocaleDateString(L()==='it'?'it-IT':'en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});}
  function drawSel(){
    var ks=Object.keys(selected).sort(),el=document.getElementById('sel');
    el.innerHTML=ks.length?ks.map(function(k){return '<span class="tag">'+fmt(k)+'<button type="button" data-rm="'+k+'" aria-label="'+t('remove')+'">×</button></span>';}).join(''):'<span class="hint" style="margin:0">'+t('none')+'</span>';
  }
  calEl.addEventListener('click',function(e){
    var n=e.target.closest('[data-nav]'),d=e.target.closest('[data-d]');
    if(n){view=new Date(view.getFullYear(),view.getMonth()+ +n.dataset.nav,1);draw();}
    else if(d){var k=d.dataset.d;if(selected[k])delete selected[k];else selected[k]=1;draw();}
  });
  document.getElementById('sel').addEventListener('click',function(e){var r=e.target.closest('[data-rm]');if(r){delete selected[r.dataset.rm];draw();}});
  document.addEventListener('amg-lang',draw);

  // preselect service from ?service=
  var m=location.search.match(/service=([\w-]+)/);
  if(m)[].forEach.call(form.querySelectorAll('input[name=service]'),function(i){if(i.value===decodeURIComponent(m[1]))i.checked=true;});

  var msg=document.getElementById('formmsg');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var days=Object.keys(selected).sort(),svc=[].map.call(form.querySelectorAll('input[name=service]:checked'),function(i){return i.nextElementSibling.textContent.trim();});
    var name=form.name.value.trim(),email=form.email.value.trim();
    if(!days.length){msg.textContent=t('needDay');return;}
    if(!svc.length){msg.textContent=t('needSvc');return;}
    if(!name||!/^\S+@\S+\.\S+$/.test(email)){msg.textContent=t('needInfo');return;}
    var it=L()==='it',lines=[];
    lines.push((it?'Nome: ':'Name: ')+name);
    lines.push('Email: '+email);
    if(form.phone.value)lines.push((it?'Telefono: ':'Phone: ')+form.phone.value);
    if(form.artist.value)lines.push((it?'Artista/band: ':'Artist/band: ')+form.artist.value);
    lines.push('');lines.push(it?'Servizi richiesti:':'Services requested:');svc.forEach(function(s){lines.push('- '+s);});
    lines.push('');lines.push(it?'Giorni richiesti:':'Days requested:');days.forEach(function(k){lines.push('- '+fmt(k)+' ('+k+')');});
    if(form.msg.value){lines.push('');lines.push((it?'Progetto: ':'Project: ')+form.msg.value);}
    var subject=(it?'Richiesta sessione — ':'Session request — ')+name+' ('+days[0]+(days.length>1?' +'+(days.length-1):'')+')';
    var body=lines.join('\n');
    if(C.endpoint){
      fetch(C.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:name,email:email,phone:form.phone.value,artist:form.artist.value,services:svc,days:days,message:form.msg.value,subject:subject,text:body})})
        .then(function(r){if(!r.ok)throw 0;msg.textContent=t('sent');form.reset();selected={};draw();}).catch(function(){msg.textContent=t('fail');});
    }else{
      msg.textContent=t('opening');
      location.href='mailto:'+(C.email||'info@artmusicstudio.it')+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    }
  });
  draw();load();
})();
