# Komme i gang med Git

Vi bruker Git og Github for versjonshåndtering av kildekoden. Om du ikke er kjent med disse verktøyene kan det være lurt å se noen Youtube videoer eller lese litt dokumentasjon for å få en introduksjon.

Guiden forutsetter at du har fulgt guiden [Sett opp lokalt utvilkingsmiljø](localdev.md).

## Instruksjoner

For forklaring av begreper og konsepter, se nederst i dokumentet.

### Åpne terminal

Åpne en terminal og naviger til repo mappen. Dersom du bruker Visual Studio Code, oppnår du dette ved å velge _View_ -> _Terminal_ fra menyen.

### Opprette ny branch

Dette steget er ikke nødvendig om det er første gang du gjør dette. Men fremover, dersom du har laget branches tidligere, er det lurt å alltid hente de nyeste endringene fra `main`, før du brancher ut fra den.

```
git checkout main && git pull
```

Lag så en ny branch, med en prefiks og et navn som er passende. For eksempel, hvis du skal lage en cookie banner, kan branchen hete `feature/cookie-banner`. Kommandoen vil da se slik ut:

```
git checkout -b feature/cookie-banner
```

### Utfør kodeendringer

Gjør de endringene du skal gjøre.

### Staging

Bruk følgende kommando for å stage en enkelt fil eller mappe:

```
git add <filnavn>
```

Eller for å stage alle endrede filer:

```
git add .
```

For å verifisere at du har staget riktige filer, kan du kjøre:

```
git status
```

Du vil da få en liste av endrede filer, hvor grønne er staget og røde ikke er staget. Filer som er staget vil inkluderes i neste commit.

### Commit til lokal branch

For å committe et sett med stagede filendringer, kjør følgende:

```
git commit -m "<COMMIT MESSAGE>"
```

Hvor `<COMMIT MESSAGE>` byttes ut med en beskrivelse av endringen. For eksempel, dersom du lagde et cookie banner, vil commit message være "Created cookie banner".

### Push til remote branch

Commiten din ligger på din lokale branch. For å kunne opprette en pull request mot main, må du pushe den til en remote versjon av din branch.

Dersom branchen din er ny, og ikke har en remote branch enda, kan du kjøre:

```
git push --set-upstream origin/<BRANCH NAVN>
```

Dersom branchen din allerede har en upstream, kjør:

```
git push
```

### Opprett pull request

Du kan opprette en pull request, enten ved å åpne repoet i Github og bruke deres webgrensesnitt, eller ved å åpne URLen direkte på `https://github.com/Queer-Hangout/queer-hangout-hjemmeside/compare/main...<BRANCH NAVN>` (sørg for å sette inn riktig branch navn)

### Se på preview

Vercel bot vil generere en preview for branchen din, og når denne er ferdig vil det dukke opp en lenke som en kommentar på pull requesten din. Se gjerne på preview og verifiser at alt er som det skal være.

### Be om code review

Få noen andre til å se over og godkjenne endringene. Når det er gjort, trykker du på "Merge". Endringene vil da publiseres i løpet av kort tid.

## Konsepter

### Branch

En branch er en utgreining fra en versjon av kildekoden. Hovedbranchen, altså versjonen som faktisk vises på https://queerhangout.no, heter `main`.

Når du skal gjøre et sett med kodeendringer som logisk henger sammen, så må du lage en egen branch for disse endringene.

Kort sagt vil si at du lager en kopi av `main`, og endringene du så gjør legges oppå denne versjonen. Når du er fornøyd med alle kodeendringene på din egen branch, så kan du flette denne inn i `main` igjen, og først da vil endringene dine vises på https://queerhangout.no.

#### Lokal og remote

Brancher kan være både lokal og remote. En lokal branch er en kopi av en branch som ligger lokalt på din maskin. Det er på den lokale branchen du gjør endringer når du jobber.

En remote branch er en versjon av branchen som er lastet opp på Github. Når du vil publisere endringene på din lokale branch, må du pushe fra lokal til remote. Dersom du vil hente endringer fra remote til lokal branch, må du pulle fra remote.

### Pull request

En branch flettes inn i `main` gjennom noe som kalles en _pull request_, som er en sikkerhetsfunksjon hvor en annen person må manuelt se over koden din og godkjenne den for at du skal få lov til å flette den mot `main`. Dette er for å unngå utilsiktede endringer.
