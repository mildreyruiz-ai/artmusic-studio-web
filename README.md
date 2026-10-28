# Art Music Studio — Website (under construction)

> **Status: under construction.** The design has been approved and the site is being completed. It is not published yet; the pages show a "Draft · not live" label until it goes online.
>
> *Estado: en construcción. El diseño está aprobado y el sitio se está completando. Todavía no está publicado; las páginas muestran la etiqueta "Draft · not live" hasta que salga online.*

Bilingual (English / Italian) website for **Art Music Studio**, the recording studio in Bassano del Grappa (Italy). The idea behind it: *"A studio you can move into"*. A full recording studio for anything from a solo voice to a large ensemble, with a live room that splits in two, four booths, and the option to stay on site and keep the session going.

It was split off from the Art Music Group concept as a standalone site, so the studio can speak directly to musicians and producers.

---

## At a glance

| | |
|---|---|
| Pages | 9 pages: Home, The Studio, Instruments, Recordings, Videos, Diego Piotto, Services, Stay, Book a session |
| Languages | English and Italian, switchable from the header |
| Stack | HTML5, CSS3 and vanilla JavaScript, no framework and no build step |
| Content | One data file (`studio-data.js`) feeds the recordings, videos, team, microphones and instruments |
| Booking | Calendar that reads availability from Google Calendar and sends the request by email |
| Images | 11 photos of the rooms, instruments and accommodation |

## What the site includes

- **Home:** a clear promise ("a studio you can move into"), two calls to action (book a session, discover the studio), and highlights of what is in production, the latest recordings, videos and the sound engineer.
- **The Studio:** the live room that divides in two, four booths, the tracking room with grand piano and Hammond organ, and the control room built around a 40-channel analogue console and a Pro Tools HD system.
- **Instruments:** pianos, organs, drums, amps and guitars available in the studio.
- **Recordings:** projects in production and the latest recordings, on one page.
- **Videos:** reels and visual material from the studio.
- **Diego Piotto:** the sound engineer's own page, with his selected credits and a booking button.
- **Services:** recording, mixing, mastering, live streaming, a rehearsal room with its own entrance, and accommodation, each with a "request this" button.
- **Stay:** Vista Brenta, ten beds in the same complex as the studios, with a kitchen on site.
- **Book a session:** the visitor picks the days on a calendar, chooses services and sends a request.

## Technical highlights

- **Content separated from design:** every text on the site, in both languages, lives in `assets/studio-data.js`. The studio can update recordings, videos or team members by editing one file, without touching the pages. Items still using sample content show a "sample content" banner until the real information replaces them.
- **Bilingual switch without reloading:** `i18n.js` holds the fixed texts in English and Italian, and the language toggle changes the whole page instantly.
- **Booking calendar:** `booking.js` is a custom calendar with month navigation, available and booked days, validation of the form, and bilingual messages. It reads availability from a public Google Calendar. Until a calendar is connected it runs in a clearly labelled demo mode, and the request can be sent to a form endpoint or to the studio's email as a fallback.
- **Lightweight and dependency-free:** a single stylesheet and a few small scripts.

## Marketing approach

- **Sell the experience, not just the gear:** the promise is that musicians can record, sleep upstairs and keep going, which sets the studio apart from a standard hourly-rental studio.
- **Make booking the main path:** the "Book a session" button is red, always visible in the header, and repeated across the site. Every service has its own request button.
- **Proof of quality:** a page for the sound engineer, a list of recordings and videos, and the real equipment (analogue console, Pro Tools HD, piano and Hammond).
- **Part of a larger brand:** the site links to Art Music Group and the Vista Brenta accommodation, so the studio benefits from the group's other projects.

## Project structure

```
artmusic-studio-web/
├── index.html, the-studio.html, instruments.html, recordings.html,
│   videos.html, diego-piotto.html, services.html, stay.html, book.html
├── assets/
│   ├── style.css       design system
│   ├── studio-data.js  all the editable content (EN / IT)
│   ├── i18n.js         fixed texts and language switch
│   ├── booking.js      booking calendar and form
│   ├── studio.js, site.js
│   └── img/            photos and logo
└── README.md
```

## Pending before launch

- Diego Piotto's CV: training, years of experience, working style and photo.
- Real entries for "In Production", videos and the microphone list.
- Google Calendar ID and API key for live availability, and an endpoint for the booking form.
- Then: page titles and descriptions, `hreflang` and structured data (`LocalBusiness`, `MusicRecordingStudio`), a sitemap, and removing the "Draft" label.

## Content and credits

- Design, front-end development and content structure: **Mildrey Ruiz**, as part of her work with Art Music.
- Photographs, logos and brand names belong to Art Music Studio.

## Development notes

Built with an AI-assisted workflow (Claude) for drafting and review. Design decisions, structure, content selection and checks are mine.

## License

© Mildrey Ruiz. All rights reserved. The code is shared for reference as a portfolio piece. Brand names, logos and photographs belong to their owners.

---

## Resumen en español

Sitio bilingüe (inglés e italiano) de **Art Music Studio**, el estudio de grabación de Bassano del Grappa. Está en construcción y el diseño ya está aprobado; todavía no está publicado.

La idea central es "un estudio al que puedes mudarte": sala en directo que se divide en dos, cuatro cabinas, sala de control con mesa analógica de 40 canales y Pro Tools HD, y alojamiento en el mismo complejo. Tiene 9 páginas (estudio, instrumentos, grabaciones, vídeos, el ingeniero de sonido, servicios, alojamiento y reservas), un calendario de reservas que lee la disponibilidad de Google Calendar, y todo el contenido en un único archivo editable, en dos idiomas, para que el estudio lo actualice sin tocar las páginas.

Antes de publicar faltan el CV de Diego Piotto, las grabaciones y vídeos reales, la lista de micrófonos, conectar el calendario y añadir SEO.
