# Løsninger til prosjekt krav

Dette dokumentet inneholder beskrivelser av hvordan vi har valgt å oppfylle de ulike tekniske kravene som var stilt til prosjektet.

## Bruk av teknologi

#### React med Typescript

Prosjektet ble satt opp med Vite som tilbyr en enkel måte å sette opp et prosjekt i React. Det var ønskelige at prosjektet skulle settes opp med Typescript framfor Javascript ettersom dette sikrer at typedeklarering blir korrekt. Kompilatoren gjør typesjekk og sier ifra før kjøring om noen variabler har feil type. Først under kjøring konverteres koden til Javascript.

#### Bruk av state management

#### Egendefinert GraphQL backend

#### Bruk av gode og relevante komponenter

## Testing, utvikling og kvalitetskontroll

For å teste web-applikasjonen har vi laget tester av ulike typer. Dette er viktig for å kunne oppdage feil og problemet som kunne forblitt uoppdaget uten tester.

#### Komponent-tester

Vi har laget komponent-tester som tester props, state og brukerinteraksjon med komponenter.

#### Mock-tester

#### Snapshot-tester

Snapshot-tester er tester som sjekker sammenligner web-applikasjonen med et "snapshot", altså et slags "bilde" av hierarkiet av komponenter, og sjekker om disse er like.

#### Manuell testing av brukergrensesnitt

I tillegg har vi gjennomført kontinuerlig manuell testing av brukergrensesnittet for å oppdage mulige feil. Når vi gjør dette setter vi oss inn i scenarioet som en bruker og prøver å bruke web-applikasjonen med funksjonalitet som har blitt implementert.

#### Automatisert end-to-end testing

## Annet
