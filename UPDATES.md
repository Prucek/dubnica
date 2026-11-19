# Aktualizácia klubových dát

Web číta členov z verejného registra chess.sk (klub 60301), ligové výsledky
a rozpisy z piatich overených turnajov Chess-Results 2026/2027.
Zobrazený čas „Načítané zo zdrojov“ je čas získania dát, nie čas poslednej
zmeny ratingu alebo výsledku u organizátora.

## Lokálne

- `npm ci`
- `npm run sync:data` — získa a overí všetky zdroje; pri chybe ponechá posledný platný súbor.
- `npm test`
- `npm run audit:results` — online kontrola všetkých odkazov vo výsledkoch (sezóna a účasť Dubnice).
- `npm run build`
- `npm run publish:static` — aktualizuje sledovaný adresár `dubnica/`.
- `npm run preview`

Konfigurácia turnajov a sezóny je v `scripts/club-sources.json`.
Predvolenú sezónu a odkazy v archíve udržuje `src/data/results.ts`.
Pri prechode na novú sezónu treba aktualizovať oba súbory.
Hodnoty ELO, rapid a blitz sa preberajú presne z chess.sk; nejde o priame
denné načítanie ratingov z FIDE. Členstvo sa preberá z registra, nie z ligových súpisiek.

## Automatická obnova cez GitHub Actions

Workflow `.github/workflows/refresh-club-data.yml` obnovuje zdroje každé tri
hodiny a dá sa spustiť aj ručne. Po úspešnom overení vytvorí snapshot
`public/data/club.json`, zostaví web, uloží dáta a statický výstup do
vetvy `main` a nasadí `dist/` na GitHub Pages.

Aktivácia po odoslaní zmien do repozitára:

1. V Settings → Pages nastavte Source na GitHub Actions.
2. Povoľte Actions a zápis workflow do repozitára, ak ho obmedzujú nastavenia.
3. V Actions spustite Refresh club data → Run workflow.

Táto lokálna úprava ešte neaktivuje workflow na GitHube. Plán beží na
predvolenej vetve repozitára; GitHub môže plánované behy oneskoriť
a pri dlhodobej neaktivite verejného repozitára pozastaviť.
Automatické nasadenie je súčasťou tohto workflow, preto sa nespolieha na
spustenie ďalšieho workflow botovým commitom.

Otvorená stránka kontroluje vlastný dátový súbor každých 15 minút. Starší
snapshot je pribalený ako záloha; po 24 hodinách stránka upozorní na
oneskorenú obnovu. Výpadok zdroja nevymaže existujúcich členov ani zápasy.

Aktuality zobrazujú posledné ukončené kolo každého dubnického družstva.
Derby D–E sa zobrazuje raz. Skóre 0:0 sa nepovažuje za odohraný výsledok;
voľno sa nepovažuje za zápas. Rozpis ukazuje len budúce zápasy, ich
domácich/hostí a čas. Pri tréningu sa používa pravidelný rozvrh klubu
(utorok 17:00 žiaci, 18:00 ostatní), nie informácia o výnimkách či sviatkoch.
Všetky časy sa vyhodnocujú v Europe/Bratislava.
Štvrtá liga B21 má päť šachovníc, desať kôl a dubnické družstvá F a G.
Pri individuálnom čase zápasu má prednosť žrebovanie pred všeobecným
časom kola; rozpor dátumov v zdroji sa viditeľne označí.

Facebook skupina má iba priamy odkaz. Skupinové API Meta bolo zrušené
22. apríla 2024; stránka nenačítava externý widget SociableKIT.

Historické výsledky 2013/14, 2014/15 a 2015/16 majú opravené turnaje
106096, 139659 a 180567. Nesúvisiace turnaje uvedené pre nižšie ligy
2013/14 a 2016/17 boli odstránené; neoverené náhrady sa nezobrazujú.
