# Queer Hangouts hjemmeside

Denne hjemmesiden skal fungere som et samlested for offentlig informasjon knyttet til Queer Hangout i Drammen.

I dette dokumentet finner du nødvendig informasjon for både innholdsredaktører og utviklere. Les gjerne punktet om [personvern og sikkerhet](#personvern-og-sikkerhet) før du begynner.

<p align="center">
  <img src="./content/images/Logo_QH_svg.svg" title="Queer Hangout logo" alt="Ypsilon bridge with rainbow colors" width="50%" height="auto">
</p>

## Personvern og sikkerhet

Vær oppmerksom på at alt som publiseres på denne nettsiden er **offentlig informasjon**. Dette gjelder både innholdet som publiseres på nettsiden, men også selve koden.

Det må derfor aldri lagres sensitiv informasjon eller passord i dette Github-repoet. Dersom du har behov for lagring av sensitiv data og trenger bistand med dette, ta kontakt med Levi.

---

## For innholdsredaktører

I denne nettsiden holder vi kode og innhold adskilt, slik at alle kan redigere nettsidens innhold uten å måtte kunne kode.

### Hvordan opprette ny side

Skal du opprette en ny underside på nettsiden gjør du dette ved å lage en `.mdx` (Markdown) fil i mappen `/content/pages`.

For eksempel, skal du lage en ny underside med tittelen **Om oss**, lager du en ny fil med filnavnet `/content/pages/om-oss.mdx`.

Filen må ha følgende struktur. **Det er viktig at frontmatter (alt mellom de tre bindestrekene helt øverst) skrives på dette formatet.**

For å gjøre det enklere for deg selv kan du ta utgangspunkt i malen som ligger i `/templates/page.mdx`. Her ligger også forklaring på hva de forskjellige feltene er.

```
---
title: Om oss
description: En beskrivelse av siden på mindre enn 150 tegn
slug: /om-oss
menu: 1
---

# Om oss

Queer Hangout er en sosial møteplass for voksne bosatt i Drammen og omegn.

## Hvor møtes vi?

Vi møtes 2 ganger i måneden, enten på Criollo eller Strømsø knutepunkt.

```

### Frontmatter

**Frontmatter** er den delen av en `.mdx` fil som befinner seg helt øverst, med tre bindestreker (`---`) over og under. Frontmatter brukes til å lagre metadata om siden. Denne metadataen brukes til å generere kode for den ferdige nettsiden.

#### Felter

For denne nettsiden har vi 4 obligatoriske felter som må fylles ut for hver nettside. Disse står forklart under.

- **title**: Tittelen til siden. Denne tittelen vil vises i menyen øverst på siden, på fanen i nettleseren, og i treff på søkemotorer.

- **description**: En kort beskrivelse av innholdet til siden. Denne beskrivelsen vil vises i treff på søkemotorer. **OBS - Må være under 150 tegn**.

- **slug**: En adresse til siden. F.eks. hvis nettsiden har domenet `https://queerhangout.no`, og `slug` settes til å være `/om-oss`, så vil nettsideadressen til siden være `https://queerhangout.no/om-oss`. **OBS - Må starte med `/`, og kun inneholde tegn som er gyldige i en URL**

- **menu**: Hvorvidt siden skal vises i menyen, og i så fall hvilken sortering den skal ha. Dersom `menu` settes til `-1` vil ikke siden være synlig i menyen. Alle sider med `menu` satt til et positivt tall vil sorteres og vises i stigende rekkefølge i menyen. **OBS - Må være et positivt heltall eller `-1`**

---

## For utviklere

Denne nettsiden er skrevet i **Gatsby.js**, som er et rammeverk basert på **React**. Til styling brukes **Tailwindcss** og **Material Tailwind**.

Hele nettsiden er statisk generert ved bygg, og hostes via **Vercel** sitt CDN.

### Kjøre prosjektet lokalt

#### Krav

For å kjøre prosjektet trenger du å ha **Node.js** og **npm** installert lokalt på din maskin.

#### Installer

- Installer avhengigheter med kommando `npm ci`

#### Kjør utviklingsserver

- Kjør utviklingsserver med hot reload med kommando `npm run develop`.
- Åpne nettleseren din på `http://localhost:8000`
- Graphql playground er tilgjengelig på `http://localhost:8000/__qraphql`

#### Kjør produksjonsbygg lokalt

- Bygg nettsiden med `npm run build`
- Server den ferdigbyggede statiske siden med `npm run serve`
- Åpne nettleseren din på `http://localhost:9000`. **OBS** statisk produksjonsbygg vil ikke oppdatere seg ved kodeendringer.
