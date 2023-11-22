# VroomReviews - Prosjekt 2, IT2810

VroomReviews er en web-applikasjon for å vurdere ulike biler. På denne web-applikasjonen kan man få en oversikt over biler fra ulike merker. Man kan søke på biler, og filtrere på ulike egenskaper for å finne biler man ønsker å se lese mer er om. Man kan gi biler en vurdering, for å hjelpe andre med å bestemme seg for hvilken bil de kan ha lyst til å kjøpe. Prosjektet er laget av gruppe 25 i emnet IT2810 ved NTNU. I denne README-filen finnes all detaljert dokumentasjon for dette prosjekt. Den beskriver hvilke valg vi har tatt og hvordan vi har gått fram for å oppfylle de ulike tekniske kravene til prosjektet.

## Kloning av prosjekt

For å kjøre prosjektet lokalt må man klone prosjektet. Dette kan gjøres ved å bruke denne kommandoen i terminalen: `git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-25/prosjekt-2.git`. Man bruke menyen for kloning på gitlab.

## Bygging

For å gjøre prosjektet klart for kjøring må man åpne to terminaler. I den ene går man inn i backend med `cd backend` og i den andre inn i frontend: `cd frontend`. Prosjektet er konfigurert til å bygge med npm. I begge terminaler kjøres `npm install` for å forberede prosjektet for å kunne kjøre.

## Kjøring av applikasjonen

Etter man har utført en av kommandoen under **[Bygging](readme.md#bygging)** kan man kjøre applikasjonen lokalt.

- #### Kjøring lokalt

Man kan kjøre applikasjonen lokalt ved å kjøre `npm run dev` i både **backend** for å koble til serveren, og i **frontend**. Da vil appen kjøres på en localhost med en lenke som dukker opp i terminalen for frontend.

## Testing

Testene for prosjektet kjøres ved `npm run test` i mappen **frontend**. Da vil alle testene for hver test-fil kjøres og resultatet av testene vises i terminalen.

For å kjøre end-to-end testene må man åpne en ny terminal og kjøre `npx cypress open` i **frontend**. Da åpnes en "launchpad" for cypress. Her velger du "E2E Testing" and deretter "Start E2E testing in Chrome". Et nettleser vindu vil åpnes der du kan trykke inn på de forskjellige E2E testene og se disse kjøre i et mindre vindu på siden.

## Løsninger til krav for prosjekt

Denne seksjonen inneholder beskrivelser av hvordan vi har valgt å oppfylle de ulike tekniske kravene som var stilt til prosjektet.

### Bruk av teknologi

#### React med Typescript

Prosjektet ble satt opp med Vite som tilbyr en enkel måte å sette opp et prosjekt i React. Det var ønskelige at prosjektet skulle settes opp med Typescript framfor Javascript ettersom dette sikrer at typedeklarering blir korrekt. Kompilatoren gjør typesjekk og sier ifra før kjøring om noen variabler har feil type. Først under kjøring konverteres koden til Javascript.

#### Bruk av state management

Vi har valgt å bruke apollo local state management. Dette oppnår vi ved å bruke apollo client, som er et state management bibliotek som bruker GraphQL for å interagere med en remote server. Apollo client har en cache kalt InMemoryCache. Denne brukes for å lagre data hentet fra queries til serveren slik at man raskere får tilgang dersom man spør om samme data ved senere anledning. Ved noen tilfeller ønsker vi å hente data på nytt, blant annet når man legger til en ny vurdering på en bil. Da brukes metoden "refetchQueries" når en vurdering legges til for å hente alle vurdering til en bil inkludert den nye fra serveren. Slik blir local state i cachen til Apollo client oppdatert med den nyeste informasjonen.

#### Egendefinert GraphQL backend

Prosjektet brukes Apollo sammen med GraphQL for backend. Vi har definert typene som blir brukt i graphQL spørringer i `typeDefs.ts`. Her har vi definert typer som "Car" og "Favorite", men også bestemt hvilke "queries" og "mutations" vi skal ha og hva disse skal returnerer. I `resolvers.ts` har vi skrevet "resolvere" for spørringene som binder graphQL spørringer sammen med databasen vår. Disse resolverne sier hva vi skal hente fra databasen og hvordan vi eventuelt skal filtrere eller manipulere resultatet.

Databasen vår er i MongoDB, og vi bruker "mongoose" for å koble til denne databasen. Ved hjelp av "mongoose" kan vi lage såkalte modeller som vi tar i bruk i resolverne vi lager for å knytte databasen vår til graphQL spørringer. Modellene våre er direkte tilknyttet en "collection" i databasen, og vi har modellene "Car", "UserFavorite", "Review" og "User".

#### Bruk av gode og relevante komponenter

##### Komponenter

**`AlertPopup`**: Denne komponenten brukes for å vise varsler blant annet når man har favorisert en bil eller lagt til vurdering. Den tar i bruk tredjeparts-komponentene "Alert" og "Snackbar" fra "mui".

**`CardForCar`**: Denne komponenten definerer hvordan en bil skal vises på de ulike sidene. Ved å klikke på denne kommer man til siden som korresponderer til bilen man trykket på.

**`DropdownMenu`**: Dropdown meny komponenten lager en dropdown meny som brukes flere ganger på siden for filtrering. Den tar inn ulike props slik som på hvilke alternativer den skal ha og hva som skjer når et valg er gjort.

**`FavoriteButton`**: Komponenten for hjerte som favoriserer eller fjerner favorisering av bil. Den bruker tredjeparts-komponent "Heart" og i tillegg `AlertPopup` for å vise varsel. Komponenten har "mutations" for å legge til som favoritt eller fjerne den for en spesifikk bil.

**`Header`**: Håndterer navigering mellom de forskjellige sidene.

**`ReviewSection`**: Komponenten brukes for å vise vurderinger for en bil og brukerens egen vurdering. Denne inneholder også funksjonaliteten for å legge til vurdering og fjerne vurdering for bruker. Det er også dette den har "mutations" for som er knyttet til graphQL og dermed database.

**`ScrollingMenu`**: Denne komponenten definerer "scrollingmenyen" som brukes på hjemsiden. Den tar i bruk en tredjeparts-komponent "ScrollMenu" og komponenten `CardForCar` brukes for å vise hvordan biler skal vises i "scrollingmenyen".

##### Pages

**`Homepage`**: Denne siden er hjem-siden som inneholder et antall `ScorllingMenu` som hver har biler av et spesielt type merke

**`Filterpage`**: Denne siden håndtere filtrering og søk av biler ved å bruke graphlQL spørringer. Siden har en søkebar, `DropdownMenu` og viser biler ved hjelp av `CardForCar`.

**`Carpage`**: Carpage siden har informasjon om en bil slik som hestekrefter, type, pris og antall dører. Den viser ratingen til bilen og ulike vuderinger. På denne siden har man også muligheten til å favorisere bilen eller fjerne favoriseringen. Siden brukes queries for å hente biler som er favorisert, vurdering for en bil, og brukerens vurdering av bilen. Denne siden bruker komponentene `FavoriteButton` og `ReviewSection`.

**`Favoritepage`**: Denne siden viser hvilke biler som brukeren har favorisert. Slik som Filterpage bruker den `CardForCar` for å vise biler og den bruker også `FavoriteButton` slik at man kan fjerne favoritter også på denne siden.

**`Reviewpage`**: "Reviewpage" viser hvilke biler som brukeren har vurdert. Siden viser hvor mange stjerner og hvilken kommentar brukeren ga bilen. Denne siden bruker også `CardForCar` for å vise biler.

### Testing, utvikling og kvalitetskontroll

For å teste web-applikasjonen har vi laget tester av ulike typer. Dette er viktig for å kunne oppdage feil og problemet som kunne forblitt uoppdaget uten tester.

#### Linting og prettier

For prosjektet bruker vi lint og prettier for å sjekke kodekvalitet. "lint errors" kan sjekkes ved å kjøre `npm run lint` i **frontend**. For å sjekke at alle "prettier" krav er overholdt kan man kjøre `npx prettier . --check` i både **frontend** og **backend**.

#### Komponent-tester

Vi har laget komponent-tester som tester props, state og brukerinteraksjon med komponenter. Alle individuelle kompnenter er testet. For `AlertPopup` er tester vi om teksten vises rett og om den lukkes med krysset. `CardForCar` testen sjekker om man kan klikke på et slikt "Card" for en bil og komme til den respektive siden. For `DropDownMenu` tester vi om man kan klikke på et alternativ og om den kan lukkes og åpnes. For dette kreves mocking av data, som det kommer mer om i neste seksjon. I tillegg har vi testet `FavoriteButton`, `Header`, `ReviewSection`, og `ScrollingMenu` ved å sjekke at deres hovedfunksjonalitet fungerer slik vi ønsker.

#### Mock-tester

I mange av komponenttestene våre har vi implementert mocking av data for å kunne teste komponentene. Dette har vi `DropDownMenu`, `FavoriteButton`, `ReviewSection` og `ScrollingMenu`. For `DropDownMenu` mocker vi noen alternativer for å sende som props til komponenten, mens for de andre komponentene mocker vi også queries for å teste komponentene. For `ReviewSection` mocker vi blant annet en "userReview" og i tillegg mockes resultatet vi får når "ADD_REVIEW" kalles. Slik kan vi teste alle funksjonaliteter for `ReviewSection` uten å måtte ta i bruk backend eller database.

#### Snapshot-tester

Snapshot-tester er tester som sjekker sammenligner web-applikasjonen med et "snapshot", altså et slags "bilde" av hierarkiet av komponenter, og sjekker om disse er like. Vi har tatt i bruk Snapshot-tester for `CardForCar`, `Header`, `AlertPopup`, `DropDownMenu`, `FavoriteButton`, `ReviewSection` og `ScrollingMenu`.

#### Manuell testing av brukergrensesnitt

I tillegg har vi gjennomført kontinuerlig manuell testing av brukergrensesnittet for å oppdage mulige feil. Når vi gjør dette setter vi oss inn i scenarioet som en bruker og prøver å bruke web-applikasjonen med funksjonalitet som har blitt implementert.

#### Automatisert end-to-end testing

Vi har laget automatiserte end-to-end tester ved hjelp av cypress. Dette er et rammeverk som gjør det enkelt å lage E2E tester for å teste alle deler av en applikasjon. Her har vi fokusert på å teste de delene som både tar i bruk viktig funksjon i frontend som er koblet til backenden. Vi tester blant annet det å legge til favoritter og vurderinger, og i tillegg filtreing og dynamisk lasting av ressurser. Informasjon om hvordan E2E testene kjøres finnes i **[Testing](readme.md#testing)**.

#### Backend testing

Gruppen har testet backend ved å ta i bruk manuell testing av graphQL queries ved hjelp av Apollo server. Når man kjører `npm run dev` i **backend** vil det åpnes en Apollo server i localhost:4000 der man kan teste graphQL "queries" og "mutations" som man har skrevet. Dette vil teste "resolverne" som man har skrevet i `resolvers.ts` og spørringene man har definert i `typeDefs.ts`. Disse testes da live mot databasen slik at man kan forsikre seg om de fungerer etter hensikten sin. Vi har testet alle de ulike spørringene og mutasjonene, men vi føler det er lite hensiktsmessig å dokumentere alle disse. Derfor dokumenterer vi noen av de. Dette blant noen av spørringene vi har testet:

**1. Hente bil basert på merke og modell**

```
query Car($company: String!, $model: String!) {
  car(company: $company, model: $model) {
    company
    model
    price
    horsepower
  }
}
```

variabler:

```
{
  "company": "Ferrari",
  "model": "Roma"
}
```

resultat:

```
{
  "data": {
    "car": {
      "company": "Ferrari",
      "model": "Roma",
      "price": "$218,750",
      "horsepower": "611 hp"
    }
  }
}
```

**2. Hente alle vurderinger som en bruker har lagt til**

```
query UserReviews($userId: Int!) {
  userReviews(userID: $userId) {
    review
    rating
    car {
      company
      model
    }
  }
}
```

variabler:

```
{
  "userId": 4
}
```

resultat:

```
{
  "data": {
    "userReviews": [
      {
        "review": "LETS GOOO SUPAFAAST",
        "rating": 5,
        "car": {
          "company": "Ferrari",
          "model": "812 Superfast"
        }
      },
      {
        "review": "WOW, great car. Sold it yesterday",
        "rating": 5,
        "car": {
          "company": "Ferrari",
          "model": "F8 Tributo"
        }
      }
    ]
  }
}
```

**3. Legge til en favorittbil**

```
mutation AddFavorite($userId: Int!, $car: ID!) {
  addFavorite(userID: $userId, car: $car) {
    userID
    car {
      company
      model
    }
  }
}
```

variabler:

```
{
  "userId": 4,
  "car": "6535729549c5199c143a1088"
}
```

resultat:

```
{
  "data": {
    "addFavorite": {
      "userID": 4,
      "car": {
        "company": "Ferrari",
        "model": "F8 Tributo"
      }
    }
  }
}
```

**4. Legge til vurdering på bil**

```
mutation AddReview($userId: Int!, $car: ID!, $rating: Int!, $review: String!, $username: String!) {
  addReview(userID: $userId, car: $car, rating: $rating, review: $review, username: $username) {
    review
    rating
    username
    car {
      company
      model
    }
  }
}
```

variabler:

```
{
  "userId": 4,
  "car": "6535729549c5199c143a1088",
  "rating": 4,
  "review": "Great car!",
  "username": "OJ"
}
```

resultat:

```
{
  "data": {
    "addReview": {
      "review": "Great car!",
      "rating": 4,
      "username": "OJ",
      "car": {
        "company": "Ferrari",
        "model": "F8 Tributo"
      }
    }
  }
}
```
