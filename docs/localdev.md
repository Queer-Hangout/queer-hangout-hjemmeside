# Sette opp lokalt utviklingsmiljø

Uansett om du skal redigere innhold eller kildekode, så er det enklest å sette opp et ordentlig utviklingsmiljø på din egen maskin.

Om du kun skal redigere én fil, og ikke har behov for støtteprogrammer, så kan du heller bruke Github sitt eget webgrensesnitt. Se i så fall Githubs egen dokumentasjon for dette.

## Programvarekrav

Installer følgende på din maskin:

- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Du trenger også en IDE, som er et program som lar deg redigere kode på et mer brukervennlig vis. Vi anbefaler [Visual Studio Code](https://code.visualstudio.com/).

## Klon repoet

1. Åpne et kommandolinje/terminal vindu, og naviger til mappen hvor du vil lagre repoet.
   - Vanligvis brukes `cd` commandoen til å flytte mellom mapper i terminalen.
2. Når du er i mappen hvor repoet skal lagres, kjør følgende kommando:
   - `git clone https://github.com/Queer-Hangout/queer-hangout-hjemmeside.git`

## Åpne repoet

Dette steget forutsetter at du har installert Visual Studio Code. Har du ikke det så får du klare deg selv.

1. Åpne Visual Studio Code
2. Trykk _Open folder_, naviger til repo mappen, og åpne den.

## Installer avhengigheter

I filen som heter `package.json` står det definert en liste med _dependencies_, altså kodepakker som noen andre har laget, som vi laster ned og bruker for vår egen nettside.

1. Åpne terminalen fra Visual Studio Code ved å velge _View_ -> _Terminal_ fra menyen.
2. Kjør følgende kommando:
   - `npm install`
3. Vent til alle pakker er installert.

## Kjør lokal devserver

Når man gjør kodeendringer er det nyttig å kunne se konsekvensen av endringene med en gang. Til dette bruker vi noe som heter en lokal devserver.

Den lokale devserveren oppdager kontinuerlig endringer i koden, og oppdaterer kjapt en lokal versjon av nettsiden som du kan åpne på din egen maskin.

1. Hvis du ikke har en åpen terminal, åpne en terminal ved å velge _View_ -> _Terminal_ fra menyen.
2. Kjør følgende kommando:
   - `npm run dev`
3. Åpne følgende URL i nettleseren din:
   - `http://localhost:3000`

## Kjør et statisk bygg

Når du er fornøyd med kodeendringene dine, så kan det være lurt å kjøre et statisk bygg før du sier deg ferdig.

I motsetning til devserveren, som oppdaterer siden du ser på kontinuerlig, så vil et statisk bygg bygge _hele_ nettsiden - altså alle undersidene - og du vil få beskjed om det er gjort noen grunnleggende kodefeil noe sted.

1. Dersom devserveren kjører, avslutt den ved å trykke `ctrl + C` i terminalvinduet.
2. Hvis du ikke har en åpen terminal, åpne en terminal ved å velge _View_ -> _Terminal_ fra menyen.
3. Kjør følgende kommando:
   - `npm run build`
4. Vent til bygget er ferdig.
5. Påse at du ikke har noen byggefeil.
6. Åpne følgende URL i nettleseren din:
   - `http://localhost:3000`
7. Påse at siden ser ut som ønsket, og at det ikke har kommet noen uønskede feil eller endringer.
