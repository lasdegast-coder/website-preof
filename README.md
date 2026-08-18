# Impact Connect — website

Statische website voor Impact Connect: internships, thesis-plekken, events en programma's
voor studenten die impact willen maken naast hun studie.

Gebouwd met pure HTML/CSS/JS — **geen build-stap, geen dependencies, geen Node.js nodig.**
Precies zoals de Thermal Compost Systems-site.

---

## Bestanden

```
index.html               Home
internships.html         Partner internships
thesis.html              Thesis internships
other-internships.html   Other internships
events.html              Events
programmes.html          Programmes
about.html               About us

styles.css               Ontwerpsysteem: kleuren, layout, animaties
data.js                  ALLE inhoud: vacatures, events, programma's, partners
icons.js                 De 25 icoontjes (Lucide) als SVG
script.js                Alle werking: zoeken, filteren, detailpaneel, formulier

assets/logos/            Bedrijfslogo's en het UU-logo
assets/team/             Teamportretten (600x600) en de groepsfoto (1400x933)
serve.py                 Lokale previewserver (alleen voor ontwikkelen)
```

---

## Bekijken

Dubbelklik gewoon `index.html`. Verder niets nodig.

Wil je liever een echte server (aanrader tijdens het werken, dan zie je wijzigingen
meteen zonder cache-gedoe):

```bash
python3 serve.py
```

Open daarna http://127.0.0.1:8124. Stoppen met Ctrl+C.

---

## Iets aanpassen

**Teksten op een pagina** — open het HTML-bestand van die pagina en pas de tekst aan.
De koppen, alinea's en knoppen staan er gewoon als leesbare HTML in.

**Een internship, event of programma toevoegen of wijzigen** — open `data.js`.
Daar staan alle lijsten:

| Lijst             | Waarvoor                                             |
|-------------------|------------------------------------------------------|
| `INTERNSHIPS`     | Internships (`kind: "partner"` of `kind: "open"`)     |
| `THESIS`          | Thesis-plekken                                       |
| `WORKSTUDENT`     | Werkstudent-banen                                    |
| `EVENTS`          | De eventskalender                                    |
| `PROGRAMMES_DATA` | De 111 programma's                                   |
| `WALL`            | De partnermuur op de homepage                        |
| `THEMES`          | Themakleuren en -namen                               |

Een item kopiëren, aanpassen en opslaan is genoeg — de tellers, filters en de
zoekfunctie passen zich vanzelf aan.

> Partner-internships komen automatisch op `internships.html`, de rest op
> `other-internships.html`. Dat wordt bepaald door `kind: "partner"`.

**Kleuren of lettertypes** — bovenaan `styles.css` staan alle kleuren als variabelen.
Verander die op één plek en de hele site verandert mee.

**Een logo toevoegen** — zet het bestand in `assets/logos/`, voeg het toe aan `LOGOS`
bovenin `script.js`, en verwijs ernaar met `logo: "naam"` in `data.js`.

**De programma's komen live uit een Google Sheet.** In `data.js` staat
`PROGRAMME_SHEETS` met per categorie het adres van een gepubliceerd tabblad. Je past
de sheet aan, de bezoeker ververst, en de wijziging staat erop — `data.js` hoeft niet
mee. Een categorie met een leeg adres komt uit `PROGRAMMES_DATA` in dit bestand, en
gaat het ophalen mis, dan valt de site daar automatisch op terug zodat de pagina nooit
leeg is.

Een tabblad toevoegen: publiceer het (Bestand → Delen → Publiceren op internet →
tabblad → CSV), plak het adres in `PROGRAMME_SHEETS` en zet de categorie erbij in
`PROGRAMME_CATS` ernaast. De kopregel moet `Programme Name | Description | Sign up
date | Duration | Language | Experience level | URL | Location | Costs` zijn; de
volgorde van de kolommen maakt niet uit.

**Een teamlid wijzigen** — het team staat als gewone HTML onderaan `about.html`,
onder "The people you'll meet". Naam, functie en foto staan bij elkaar in één blokje.
Een nieuwe foto zet je vierkant in `assets/team/`; 600x600 is ruim genoeg. Uitsnijden
kan zonder extra programma's:

```bash
sips -c 4000 4000 origineel.jpg --out vierkant.jpg
sips -Z 600 vierkant.jpg --out assets/team/naam.jpg
```

(Het eerste getal is de zijde van het vierkant in de originele foto — neem de kortste
zijde van het origineel. De uitsnede wordt vanuit het midden gemaakt.)

---

## Online zetten

Het is een statische site, dus elke webhost werkt. Sleep de map naar **Netlify Drop**,
**Vercel** of **Cloudflare Pages**, of zet de bestanden via GitHub Pages online
(zoals bij Thermal Compost Systems). `serve.py` en deze README hoeven niet mee.

Voor een eigen domein op GitHub Pages: maak een bestand `CNAME` met daarin alleen
de domeinnaam.

---

## Nog te doen

Een paar dingen zijn bewust nog placeholders, net als in de vorige versie:

- **Het afspraakformulier verstuurt niets.** Je doorloopt de vier stappen en krijgt een
  bevestiging te zien, maar er wordt geen mail of bericht verstuurd. Er moet nog een
  backend of formulierdienst (bijv. Formspree of Netlify Forms) achter.
- **De WhatsApp-community-knop** op `events.html` wijst nog naar `#`, en de QR-code
  is een placeholder.
- **Noah's achternaam ontbreekt** op de teampagina, die staat er nu alleen met
  zijn voornaam.
- **Foto's ontbreken buiten het team.** De teamportretten zijn echt; bij de events,
  de categoriepanelen en het citaat staat nog een getekende illustratie in de huisstijl.
- **De opportunities zijn voorbeelden.** De events zijn echt, de internships en
  thesis-plekken zijn nog verzonnen.

---

## Ontwerp

- **Stijl:** editorial, aards en warm — papier, bosgroen en terracotta
- **Kleur:** diep bosgroen (`#13352A`) + terracotta (`#C2683A`) op bone (`#F4EFE3`)
- **Merkteken:** de Vollers Bridge, een dekbalk met daaronder een boog. Nagetekend als
  SVG naar het merkboard (`impact-connect/Logo Impact Connect.JPG`). Het staat in één
  functie, `bridgeMark()` bovenin `script.js`, die header, footer en formulier voedt.
  Het woordmerk is de lockup van het board: Impact · brug · Connect

- **Typografie:** Fraunces (koppen) + Familjen Grotesk (tekst), via Google Fonts
- **Animaties:** scroll-reveals, marquees en hover-panelen via `transform`/`opacity`,
  met respect voor `prefers-reduced-motion`
- **Sneltoets:** ⌘K (of Ctrl+K) opent de zoekbalk over alle opportunities heen
- **Bewaarde items** worden onthouden in je browser (`localStorage`)
