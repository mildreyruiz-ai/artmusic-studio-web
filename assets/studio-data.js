/* ============================================================
   ART MUSIC STUDIO — CONTENT FILE
   Edit this file to update In Production, Recordings, Videos, Team,
   Microphones, Instruments and the Booking calendar.
   Every text is bilingual: { en:'…', it:'…' }.
   Items with  sample:true  show a "sample content" banner — delete the flag
   (or the whole item) once the information is real.
   ============================================================ */
window.STUDIO_DATA = {

  /* ---------- BOOKING / GOOGLE CALENDAR ----------
     calendarId : the Google Calendar that holds the studio's booked days
                  (make it public: Settings → Access permissions → "Make available to public")
     apiKey     : a Google Cloud API key with "Google Calendar API" enabled,
                  restricted to your website's domain
     Leave both empty and the calendar runs in DEMO mode (no real availability).
     endpoint   : optional. If set (Formspree / Cloudflare Worker URL) the request is
                  sent automatically; if empty it opens the visitor's email app. */
  booking: {
    calendarId: '',
    apiKey: '',
    email: 'info@artmusicstudio.it',
    timeZone: 'Europe/Rome',
    monthsAhead: 6,
    endpoint: ''
  },

  /* ---------- IN PRODUCTION ----------
     status: 'preproduction' | 'recording' | 'mixing' | 'mastering' */
  inProduction: [
    { sample:true, artist:'Artist name', project:{en:'New album (working title)',it:'Nuovo album (titolo provvisorio)'}, status:'recording', since:'2026-10', note:{en:'Tracking the full band live in the Sala presa.',it:'Registrazione della band al completo dal vivo nella Sala presa.'} },
    { sample:true, artist:'Artist name', project:{en:'Second record',it:'Secondo disco'}, status:'mixing', since:'2026-09', note:{en:'Mixing on the 40-channel console.',it:'Mixaggio sulla console a 40 canali.'} },
    { sample:true, artist:'Artist name', project:{en:'Single',it:'Singolo'}, status:'mastering', since:'2026-10', note:{en:'Final mastering before release.',it:'Mastering finale prima dell\'uscita.'} }
  ],

  /* ---------- LATEST RECORDINGS ----------
     cover: optional image path e.g. 'assets/img/covers/name.jpg'; link: optional URL (Spotify, Bandcamp…) */
  recordings: [
    { artist:'Le Orme', title:'Sulle ali di un sogno', year:'', cover:'', link:'' },
    { artist:'Angela Baraldi', title:'Tornano Sempre', year:'', cover:'', link:'' },
    { artist:'Le Luci della Centrale Elettrica', title:'Costellazioni', year:'', cover:'', link:'' },
    { artist:'Giorgio Canali & Rossofuoco', title:'Nostra Signora della Dinamite', year:'', cover:'', link:'' },
    { artist:'Giorgio Canali & Rossofuoco', title:'Rojo', year:'', cover:'', link:'' },
    { artist:'Frigidaire Tango / AA. VV.', title:'Songs From the Freezer Box', year:'', cover:'', link:'' }
  ],

  /* ---------- VIDEOS (YouTube) ----------
     url: any YouTube link (watch, youtu.be, shorts, embed). Leave url:'' for a "coming soon" tile. */
  videos: [
    { sample:true, url:'', title:{en:'Studio reel',it:'Reel dello studio'}, text:{en:'A look inside the rooms and the sessions.',it:'Uno sguardo sulle sale e sulle sessioni.'} },
    { sample:true, url:'', title:{en:'Live session',it:'Sessione dal vivo'}, text:{en:'A full band tracked live.',it:'Una band registrata dal vivo.'} },
    { sample:true, url:'', title:{en:'Behind the console',it:'Dietro la console'}, text:{en:'Mixing at the 40-channel desk.',it:'Mixaggio alla console a 40 canali.'} }
  ],

  /* ---------- TEAM ---------- photo: optional path e.g. 'assets/img/piotto.jpg' */
  team: [
    { sample:true, name:'Diego Piotto', role:{en:'Sound engineer',it:'Fonico'}, photo:'',
      bio:{en:'Diego Piotto is the sound engineer at Art Music Studio in Bassano del Grappa. He works behind the console on tracking and mixing sessions, and takes the same care on stage: Giorgio Canali & Rossofuoco call him their studio and live sound engineer, and the head of their production structure, Psicolabel.',
           it:'Diego Piotto è il fonico di Art Music Studio a Bassano del Grappa. Lavora alla console nelle sessioni di registrazione e mixaggio e porta la stessa cura sul palco: Giorgio Canali & Rossofuoco lo descrivono come il loro fonico di studio e live e il responsabile della loro struttura di produzione, Psicolabel.'},
      style:{en:'(To complete with Diego\'s CV: training, years of experience, how he works, the kind of artist he works best with.)',
             it:'(Da completare con il CV di Diego: formazione, anni di esperienza, modo di lavorare, tipo di artista con cui lavora meglio.)'},
      credits:[
        { artist:'Giorgio Canali & Rossofuoco', project:{en:'Studio and live sound engineer',it:'Fonico di studio e live'}, note:{en:'Described by the band as their studio and live sound engineer and head of their production structure, Psicolabel (interview, December 2023).',it:'Descritto dalla band come il loro fonico di studio e live e responsabile della struttura di produzione Psicolabel (intervista, dicembre 2023).'}, link:'https://alligatore.blogspot.com/2023/12/in-palude-con-giorgio-canali-e.html' },
        { artist:'Michele Polga', project:{en:'Little Magic',it:'Little Magic'}, note:{en:'Recorded on 31 May 2013 at Art Music Studio by Diego Piotto (released 2015).',it:'Registrato il 31 maggio 2013 ad Art Music Studio da Diego Piotto (uscito nel 2015).'}, link:'https://caligolarecords.bandcamp.com/album/little-magic' },
        { artist:'Soundwave × Avid', project:{en:'Workshop at La Distilleria',it:'Workshop a La Distilleria'}, note:{en:'Two-day workshop hosted at La Distilleria Recording Studios, Bassano del Grappa, August 2019.',it:'Workshop di due giorni ospitato a La Distilleria Recording Studios, Bassano del Grappa, agosto 2019.'}, link:'https://www.audiofader.com/tag/la-distilleria/' }
      ] }
  ],

  /* ---------- MICROPHONES ---------- */
  mics: [
    { sample:true, group:{en:'Dynamic',it:'Dinamici'}, items:['Shure SM57','Shure SM58','Sennheiser MD 421'] },
    { sample:true, group:{en:'Condenser',it:'A condensatore'}, items:['Neumann U87','AKG C414','Neumann KM184'] },
    { sample:true, group:{en:'Ribbon',it:'A nastro'}, items:['Royer R-121'] }
  ],

  /* ---------- INSTRUMENTS ---------- */
  instruments: [
    { group:{en:'Keys',it:'Tastiere'}, items:[{n:{en:'Grand piano',it:'Pianoforte a coda'}},{n:{en:'Hammond organ',it:'Organo Hammond'}}] },
    { sample:true, group:{en:'Drums',it:'Batterie'}, items:[{n:{en:'Drum kit',it:'Batteria'},b:'Brand'}] },
    { sample:true, group:{en:'Guitars',it:'Chitarre'}, items:[{n:{en:'Electric guitar',it:'Chitarra elettrica'},b:'Brand'}] },
    { sample:true, group:{en:'Amplifiers',it:'Amplificatori'}, items:[{n:{en:'Guitar amp',it:'Ampli chitarra'},b:'Brand'},{n:{en:'Bass amp',it:'Ampli basso'},b:'Brand'}] }
  ]
};
