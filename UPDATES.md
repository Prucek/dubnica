# Dáta a FTP nasadenie

Web je pripravený pre https://rucek.sk/dubnica/. Cez FTP sa nahráva celý
obsah zostaveného priečinka dubnica/ vrátane api/.
Hosting potrebuje PHP 7.4 alebo novšie, rozšírenie cURL, povolené odchádzajúce
HTTPS spojenia a zapisovateľný systémový dočasný priečinok. Databáza ani cron
nie sú potrebné. GitHub Actions nasadzujú kód; obnova ligových dát prebieha
na hostingu pri návšteve stránky.

## Automatické FTP nasadenie

Workflow `.github/workflows/deploy-ftp.yml` po každom pushi do `main`
spustí testy, zostaví web a nahrá obsah `dist/` na FTP server `rucek.sk:21`.
Dá sa spustiť aj ručne cez Actions → Deploy to rucek.sk → Run workflow.
Prenáša aj PHP rozhranie a obrázky. Nepoužíva úplné vymazanie cieľového
priečinka; synchronizuje súbory spravované týmto nasadením.

V repozitári nastavte Settings → Secrets and variables → Actions:

- `FTP_USERNAME` — FTP používateľ.
- `FTP_PASSWORD` — FTP heslo.
- `FTP_SERVER_DIR` — presný priečinok webu z pohľadu FTP účtu, s koncovým
  lomítkom, napríklad `/public_html/dubnica/`. Príklad treba nahradiť
  skutočnou cestou hostingu. Ak je FTP účet obmedzený priamo na tento
  priečinok, môže to byť `./`.

Bez všetkých troch hodnôt workflow skončí pred nahrávaním a pomenuje
chýbajúce nastavenie. Heslo nepatrí do zdrojových súborov ani do commitu.

## Obnova pri návšteve

Pri otvorení stránky JavaScript požiada vlastné PHP rozhranie
api/source.php o stránky piatich súťaží Chess-Results a register členov
chess.sk (klub 60301). PHP sťahuje iba zdroje z pevného zoznamu;
JavaScript spracuje HTML v oddelenom dokumente a zobrazí výsledky,
poradie družstiev, nasledujúce zápasy a členov. Externé HTML sa nevkladá
do stránky ako iframe ani ako aktívny obsah.

Server uchováva každú zdrojovú stránku desať minút v cache mimo verejného
priečinka webu. Otvorená stránka opakuje kontrolu každých 15 minút.
Bez návštev sa dáta nesťahujú; ďalšia návšteva obnoví neaktuálnu cache.
Čas „Načítané zo zdrojov“ označuje najstaršie načítanie zo všetkých použitých
zdrojov, nie čas poslednej zmeny výsledku u organizátora.

Pri výpadku zostanú posledné úspešne načítané dáta uložené v prehliadači,
prípadne pribalená záložná verzia. Stránka upozorní na neúspešnú obnovu.
Zmena štruktúry zdrojových stránok môže vyžadovať úpravu parsera.

## Zostavenie a overenie

- npm ci
- npm run sync:data — aktualizuje pribalenú zálohu; pri chybe ju zachová.
- npm test — kontroluje spracovanie výsledkov a rozpisov.
- npm run test:browser-parsers — online porovná oba HTML adaptéry pre všetky zdroje.
- npm run build — pripraví aj konfiguráciu PHP rozhrania.
- npm run publish:static — aktualizuje FTP výstup dubnica/.
- php -S 127.0.0.1:8080 -t . — náhľad na http://127.0.0.1:8080/dubnica/.

Samotný Vite preview nespúšťa PHP. Úplnú obnovu treba skúšať cez PHP server
alebo na hostingu. Po FTP nahratí otvorte web a overte nový čas načítania.
Pri probléme s obnovou skontrolujte PHP/cURL, odchádzajúce HTTPS spojenia,
platné CA certifikáty a práva k systémovému dočasnému priečinku.

Sezónu a zdroje určuje scripts/club-sources.json; zostavenie skopíruje
konfiguráciu do public/api/sources.json. Pri novej sezóne aktualizujte aj
src/data/results.ts, obnovte zálohu a znovu zostavte web.

## Pravidlá zobrazovania

Členstvo a ratingy sa preberajú z chess.sk, nie z ligových súpisiek ani
priamo z FIDE. Aktuality ukazujú posledné ukončené kolo každého družstva;
derby sa zobrazuje raz, skóre 0:0 sa nepovažuje za ukončený zápas.
Rozpis používa časové pásmo Europe/Bratislava a individuálny čas zápasu
má prednosť pred všeobecným časom kola. Rozpor dátumov sa označí.
Štvrtá liga B21 má päť šachovníc, desať kôl a družstvá F a G.

Tréningy používajú pravidelný rozvrh klubu (utorok 17:00 žiaci, 18:00
ostatní); automatické výnimky pre sviatky a zrušené tréningy nie sú dostupné.
Facebook zostáva priamym odkazom.
