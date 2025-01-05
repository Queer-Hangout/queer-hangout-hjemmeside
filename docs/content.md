# Dokumentasjon for innholdsredaktører

I denne nettsiden holder vi kode og innhold adskilt, slik at alle kan redigere nettsidens innhold uten å måtte kunne kode.
Dog må man lære seg Markdown, og i noen tilfeller noe enkel HTML.

## Opprette ny side

### Filnavn

Hver side på nettsiden er definert via sin egen markdown (`.mdx`) med følgende stiformat: `/content/pages/{LANGUAGE}/{SLUG}.mdx`.

Det betyr at dersom du oppretter en fil med navn `/content/pages/no/om-oss.mdx`, så vil sidegeneratoren lage en underside på
nettsiden som får URL `https://queerhangout.no/no/om-oss`. Dersom du vil lage en tilsvarende side på engelsk, setter du filnavnet til `/content/pages/en/about-us`.

Et unntak fra denne regelen er filer med navn `index.mdx`, som får samme stinavn som mappenavnet. Atlså vil forsiden på norsk og engelsk ligge i `/content/pages/no/index.mdx` og `/content/pages/en/index.mdx`.

### Frontmatter

Hver `.mdx` fil har noe som kalles frontmatter, som er metadata som legges inn øverst i filen. Frontmatter er obligatorisk, og skrives på dette formatet:

```
---
title: Om oss
description: Queer Hangout er en møteplass for voksne skeive i Drammen.
menu: 1
---
```

- **title** - (Obligatorisk) Tittelen til siden. Denne tittelen vil vises i menyen øverst på siden, på fanen i nettleseren, og i treff på søkemotorer.
- **description** - (Obligatorisk) En kort beskrivelse av innholdet til siden. Denne beskrivelsen vil vises i treff på søkemotorer. **OBS - Må være under 150 tegn**.
- **menu** - Sorteringsnøkkel for hvor siden havner i menyen, hvor lavere tall kommer øverst. Utelates den så blir ikke siden tilgjengelig i hovedmenyen.

### Eksempel

`/content/pages/no/om-oss.mdx`

```
---
title: Om oss
description: En beskrivelse av siden på mindre enn 150 tegn
menu: 1
---

# Om oss

Queer Hangout er en sosial møteplass for voksne bosatt i Drammen og omegn.

## Hvor møtes vi?

Vi møtes 2 ganger i måneden, enten på Criollo eller Strømsø knutepunkt.

```

## Bruk av bilder

Skal du ha et bilde i siden, så må bildet først legges inn i mappen `/public/images`.

Bruk så vanlig markdown syntaks, men fjern `/public` fra filnavnet. Så hvis du har en bildefil med navn `/public/images/bilde.jpeg`, så skriver du `/images/bilde.jpeg` i markdown filen.

Bildesyntaks for markdown er `![Alt text](filename "Title")`

### Eksempel

```
![Beskriv bildet for synshemmede her.](/images/bilde.jpeg "Bildetittel - inkluder gjerne navn på fotograf")
```

## Lenker

### Intern lenke

For å lage lenke til en underside (på queerhangout.no), bruk følgende format:

```
[lenketekst](/no/om-oss)
```

### Ekstern lenke

For lenker til eksterne sider (utenfor queerhangout.no), bruk HTML på følgende format:

```
<a href="https://www.fri.no" rel="nofollow" target="_blank">lenketekst</a>
```

- `rel="nofollow"` feltet forteller søkemotorer at siden det lenkes til ikke er relatert til queerhangout.no

- `target="_blank"` gjør at lenken åpnes som en ny fane.
