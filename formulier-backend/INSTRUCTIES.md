# De formulieren aansluiten

Hierna komt elke ingevulde vraag binnen op **contact@impactconnectutrecht.com** én in een
Google Sheet, en krijgt de student een bevestiging. Dat geldt voor allebei de formulieren:
het afspraakformulier ("Plan an appointment") en het alumniverzoek.

Werkt hetzelfde als bij Thermal Compost Systems, dus dit zal bekend voorkomen.

Doe dit vanaf het account dat de mailbox `contact@impactconnectutrecht.com` beheert, of in
elk geval een account dat blijft bestaan. Het script draait onder het account dat het
publiceert, en de bevestigingen aan studenten komen ook van dat adres.

Reken op een kwartier. Je hebt niets nodig behalve een browser.

---

## 1. Maak de sheet aan

1. Ga naar [sheets.new](https://sheets.new) terwijl je bent ingelogd op dat account.
2. Geef het bestand bovenaan een naam, bijvoorbeeld **Aanvragen Impact Connect**.

Je hoeft er verder niets in te zetten, ook geen koprij. Het script maakt zelf twee
tabbladen aan: **Afspraken** en **Alumniverzoeken**, elk met de juiste kolommen. Komt er
later een vraag bij in een formulier, dan zet het script die kolom er vanzelf achter.

> Let op: deze sheet bevat namen en mailadressen van studenten. Publiceer hem **niet** op
> internet (dat is iets anders dan delen met je team, dat kan gewoon).

## 2. Plak het script erin

1. Klik in die sheet op **Extensies → Apps Script**. Er opent een nieuw tabblad.
2. Er staat wat voorbeeldcode in (`function myFunction() { }`). Selecteer alles en verwijder het.
3. Open `Code.gs` uit deze map, kopieer de volledige inhoud en plak die in het lege venster.
4. Klik op het opslaan-icoon (of Cmd+S).
5. Geef het project bovenaan een naam, bijvoorbeeld **Formulieren website**.

## 3. Doe de zelftest

Zo weet je of het mailen en het wegschrijven werken, nog voordat de site eraan hangt.

1. Kies bovenin bij het keuzemenu naast "Uitvoeren" de functie **zelftest**.
2. Klik op **Uitvoeren**.
3. Google vraagt nu om toestemming. Dat hoort zo:
   - Klik **Machtigingen controleren** en kies het account waarmee je bent ingelogd.
   - Er verschijnt een waarschuwing dat Google de app niet heeft geverifieerd. Dat klopt,
     het is jullie eigen script. Klik op **Geavanceerd** en daarna op
     **Ga naar Formulieren website (onveilig)**.
   - Klik **Toestaan**.
4. Controleer daarna:
   - er staan twee testmails in de inbox van contact@impactconnectutrecht.com, één met
     "Appointment request" en één met "Alumni request" in het onderwerp
   - in de sheet zijn de tabbladen **Afspraken** en **Alumniverzoeken** verschenen, elk met
     een vetgedrukte koprij en één regel eronder

Werkt dit niet, stop dan hier en geef door wat er misgaat.

## 4. Publiceer het script

1. Klik rechtsboven op **Implementeren → Nieuwe implementatie**.
2. Klik op het tandwiel naast "Type selecteren" en kies **Web-app**.
3. Vul in:
   - **Beschrijving:** formulieren website
   - **Uitvoeren als:** Ikzelf
   - **Wie heeft toegang:** **Iedereen**

   Die laatste instelling is nodig omdat een student die op de site een formulier
   invult niet is ingelogd bij Google. Zet je hem op "Iedereen met een Google-account",
   dan krijgt hij een inlogscherm te zien in plaats van dat zijn aanvraag verstuurd
   wordt.

   **"Iedereen" maakt de sheet niet openbaar.** Dat komt door de instelling erboven,
   "Uitvoeren als: Ikzelf": het script draait onder jouw account en dat mag bij de
   sheet. De bezoeker komt er zelf nooit bij, hij praat alleen met het script en dat
   geeft niets terug behalve `{"ok":true}`. Wat "Iedereen" wél betekent: iedereen die
   het adres kent kan er berichten naartoe sturen. Niet om iets uit te lezen, alleen om
   iets in te sturen. Daarom zit er een rem op van 60 aanvragen per dag, zie onderaan.
4. Klik **Implementeren**.
5. Er verschijnt een **web-app-URL** die begint met `https://script.google.com/macros/s/`
   en eindigt op `/exec`. **Kopieer die URL.**

## 5. Controleer de publicatie

Plak de URL in een browser en druk op enter. Je hoort te zien:

```
{"ok":true,"bericht":"Formulierverwerking Impact Connect staat klaar."}
```

Zie je in plaats daarvan een inlogscherm van Google, dan staat "Wie heeft toegang" nog
niet op **Iedereen**. Ga terug naar stap 4.

## 6. Zet de URL in de website

Open `data.js` en zet de URL tussen de aanhalingstekens:

```js
const FORM_ENDPOINT = "https://script.google.com/macros/s/.../exec";
```

Meer is het niet. Test daarna op de site zelf: doorloop het afspraakformulier en verstuur
het met je eigen mailadres. Je hoort binnen een minuut twee mails te krijgen (de aanvraag
en de bevestiging) en een nieuwe regel in het tabblad **Afspraken**.

---

## Zolang stap 6 nog niet gedaan is

Dan werken de formulieren gewoon, maar op de oude manier: aan het eind opent het
mailprogramma van de student met alles er al in, en die drukt zelf op versturen. Je krijgt
de aanvraag dus wel, alleen staat er niets in de sheet en krijgt de student geen
bevestiging. Datzelfde gebeurt als het versturen om wat voor reden dan ook mislukt, dus er
gaat nooit een aanvraag verloren doordat de techniek hapert.

## Later iets wijzigen

Pas je de code aan, dan moet je opnieuw publiceren, anders draait de oude versie door:
**Implementeren → Implementaties beheren → potloodje → Versie: Nieuwe versie →
Implementeren.** De URL blijft dan hetzelfde.

Voeg je een vraag toe aan een formulier op de site, zet hem dan ook in `VRAGEN` bovenin
`Code.gs`. Dan komt hij vanzelf in de mail en krijgt hij een eigen kolom in de sheet.

## Wat je verder moet weten

- De bevestigingen aan studenten worden verstuurd vanaf het account dat het script heeft
  gepubliceerd. Vertrekt die persoon, dan moet iemand anders het opnieuw publiceren vanaf
  zijn eigen account.
- **Er zit een rem op van 60 aanvragen per dag** (`MAX_PER_DAG` bovenin `Code.gs`). Het
  adres van het script staat in `data.js` en is dus voor iedereen te lezen; wie het kent
  kan het aanroepen. Zonder rem zou iemand er nepaanvragen doorheen kunnen jagen, en dan
  staat je inbox vol en is je dagelijkse mailquotum bij Google op. Zestig ingevulde
  formulieren op één dag haal je in de praktijk niet. Gebeurt het toch, dan valt de
  website automatisch terug op het mailprogramma van de student, dus die aanvraag komt
  alsnog binnen. De teller staat bij het script (Project-instellingen →
  Scripteigenschappen, de regel `teller`) en begint elke dag opnieuw.
- Google kent daarnaast een eigen dagelijkse limiet op het aantal verstuurde mails (100
  bij een gratis account, 1500 bij Workspace). Daar kom je met dit gebruik niet aan.
- Alle aanvragen blijven ook in de sheet staan. Raakt een mail kwijt in een spamfilter, dan
  is de aanvraag dus niet weg. In de sheet staat achteraan een lege kolom **Afgehandeld**,
  handig om zelf bij te houden wie je al geholpen hebt.
- **De sheet gaat vóór de mail.** Het script schrijft de regel eerst weg en mailt daarna
  pas. Zo staat een aanvraag er altijd in, ook als het mailen om wat voor reden dan ook
  mislukt. En gaat alleen de bevestiging aan de student mis (bijvoorbeeld door een
  adres dat niet bestaat), dan geldt de aanvraag nog steeds als geslaagd: jullie hebben
  hem, en de student hoeft hem niet opnieuw te versturen.
- Het adres waar alles naartoe gaat staat op twee plekken, en die moeten hetzelfde zijn:
  `ONTVANGER` bovenin `Code.gs` en `CONTACT_MAIL` bovenin `data.js`.
