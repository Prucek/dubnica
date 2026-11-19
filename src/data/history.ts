import type { HistorySection } from '../types';

const base = import.meta.env.BASE_URL;

export const historySections: HistorySection[] = [
  {
    decade: '1949–1960',
    title: 'Začiatky organizovaného šachu',
    events: [
      {
        year: '1949',
        text: 'Organizovaný šach v Dubnici začal, keď skupina hráčov založila oddiel v Trenčianskych Tepliciach.',
      },
      {
        year: '1952',
        text: 'Priateľský zápas proti Starej Turej. Oddiel viedli Michal Šimko, Dr. Lendvay, holič Weber a učiteľ Rosůlek.',
        photos: [
          { src: `${base}images/history/zapas.jpg`, alt: 'Zápas z 50. rokov', caption: 'Šachový zápas z raných rokov klubu' },
        ],
      },
      {
        year: '1955–1956',
        text: 'Oddelenie od Trenčianskych Teplíc — vznikla šachová sekcia TJ Spartak Dubnica nad Váhom.',
      },
      {
        year: '1957–1961',
        text: 'Budovanie tímu a vedenia. Sekciu viedli Michal Šimko a Černák. Medzi hráčmi: Šušaník, Prukner, Hruboš, Horváth, Šimko, Slotík, Podolec, Podolcová, Dobiš, Lasch, Jankech.',
        photos: [
          { src: `${base}images/history/ziak.jpg`, alt: 'Mladý šachista', caption: 'Mládežnícky šach v Dubnici' },
        ],
      },
    ],
  },
  {
    decade: '1961–1970',
    title: 'Vzostup do krajskej súťaže',
    events: [
      {
        year: '1961',
        text: 'Do oddilu prišli Kycl a Filadelfi.',
        photos: [
          { src: `${base}images/history/kycl.jpg`, alt: 'Oldřich Kycl', caption: 'Oldřich Kycl — dlhoročný predseda klubu' },
        ],
      },
      {
        year: '1961/1962',
        text: 'Pokus o postup do krajskej súťaže. Jarný zápas v Považskom Podhradí (vlakom, potom pešo k Váhu, potom trajektom). Postup sa nepodaril.',
        photos: [
          { src: `${base}images/history/hrad.jpg`, alt: 'Považské Podhradie', caption: 'Považské Podhradie' },
        ],
      },
      {
        year: '1962',
        text: 'Nový výbor: Šimko, Kycl a Filadelfi.',
      },
      {
        year: '1962/1963',
        text: 'Dramatický postup — po remíze s Liptovským Mikulášom (5:3, 3:5) postúpili oba tímy. Podolcová vynikala na povinnej ženskej šachovnici. Štyria hráči odišli pre spor o členské, ale tím sa udržal.',
      },
      {
        year: 'Koniec 60. rokov',
        text: 'Reorganizácia — vznikli národné ligy. Dubnica úspešne súťažila v II. lige (skupina E), postúpila do I. SNL a vznikol aj tím „B".',
        photos: [
          { src: `${base}images/history/marco.jpg`, alt: 'Šachisti z 60. rokov' },
          { src: `${base}images/history/lojzo.jpg`, alt: 'Šachisti z 60. rokov' },
        ],
      },
    ],
  },
  {
    decade: '1970–1980',
    title: 'Fischerova éra a zlatý vek',
    events: [
      {
        year: '70. roky',
        text: 'Šachový boom — členská základňa sa rozrástla o ďalších 20 členov. Klub začal organizovať turnaje.',
      },
      {
        year: '1974',
        text: 'Klub hostil Majstrovstvá Slovenska jednotlivcov.',
      },
      {
        year: '1977',
        text: 'Oldřich Kycl sa stal predsedom. Vo výbore: Sorkovský, Gašpar, Cyprian, Hočala, Kadlec, Ján Struhár. Šesť tímov súťažilo v ligách.',
      },
      {
        year: '1977/1978',
        text: 'Postup do SNL s hráčmi: Prukner, Hujo, Struhár, Šajtlava, Niščanský, Sorkovský, Lotharides, Šimko V., Kováčik, Dačo a posilami z Trenčína.',
        photos: [
          { src: `${base}images/history/prukner.jpg`, alt: 'Prukner', caption: 'Prukner — člen postupovej zostavy' },
        ],
      },
      {
        year: '1978–1982',
        text: 'Medzinárodný majster Jiří Fichtl hral za Dubnicu — v priemere cca 9 bodov z 11 na prvej šachovnici.',
        photos: [
          { src: `${base}images/history/fichtl.jpg`, alt: 'IM Jiří Fichtl', caption: 'IM Jiří Fichtl' },
        ],
      },
      {
        year: '1979',
        text: 'Organizácia Medzinárodných majstrovstiev ČSSR v šachu v Hoteli Jalta v Trenčianskych Tepliciach (17.11. – 7.12.1979). Až 200 divákov. Hrali GM Uhlmann, GM Hort a GM Smejkal. Vyhral Smejkal pred Ftáčnikom a Hortom.',
        photos: [
          { src: `${base}images/history/TrTep1979SpolocneFoto-m.jpg`, alt: 'Spoločné foto — M ČSSR 1979', caption: 'Účastníci Majstrovstiev ČSSR 1979, Trenčianske Teplice' },
          { src: `${base}images/history/TrTep1979Smejkal-m.jpg`, alt: 'GM Smejkal', caption: 'GM Smejkal — víťaz turnaja' },
          { src: `${base}images/history/TrTep1979Ftacnik-m.jpg`, alt: 'Ftáčnik', caption: 'Ftáčnik' },
          { src: `${base}images/history/TrTep1979Hort-m.jpg`, alt: 'GM Hort', caption: 'GM Vlastimil Hort' },
        ],
      },
    ],
  },
  {
    decade: '1980–2000',
    title: 'Úspechy a extraliga',
    events: [
      {
        year: '1980/1981',
        text: 'Najväčší historický úspech: 2. miesto v SNL! Zostava: Fichtl, Prukner, Pavlík, Kováčik, Sečkár, Šajtlava, Vavruš, Cyprian, Šimko V., Dačo, Struhár, Vyhlídal.',
      },
      {
        year: '1983/1984',
        text: 'Zostup z SNL na päť rokov — pôsobenie v krajských a II. ligových súťažiach.',
      },
      {
        year: '1995/1996',
        text: 'Jednoročný návrat do I. ligy.',
      },
      {
        year: '1998/1999',
        text: 'Návrat do najvyššej súťaže (Extraliga) — odvtedy trvalé pôsobenie.',
      },
    ],
  },
  {
    decade: '2000–2010',
    title: 'Stabilizácia v Extralige',
    events: [
      {
        year: '1999–2006',
        text: 'Nepretržité pôsobenie v Extralige. V roku 2000 Karol Motúz vyhral Open Tatry. V sezóne 2005/06 klub dosiahol výborné 5. miesto v Extralige a B tím postúpil do 1. ligy.',
      },
      {
        year: '2006/2007',
        text: 'Prvá sezóna B tímu v 1. lige. A tím bojoval o záchranu v Extralige — dramatický záver s víťazstvom 7:1 nad Žilinou v poslednom kole.',
      },
      {
        year: '2007/2008',
        text: 'Prvé trojkolo v histórii Extraligy. Černoušek porazil GM Ftáčnika. Smutná správa — odchod dlhoročného predsedu Oldřicha Kycla vo veku 82 rokov.',
      },
      {
        year: '2008/2009',
        text: 'Laco Salai dosiahol 6. miesto na Majstrovstvách sveta v riešení šachových úloh v Jūrmale. A tím úspešne bojoval o záchranu, konečné 10. miesto.',
      },
      {
        year: '2009/2010',
        text: 'Prekvapivé víťazstvo nad favoritom Dunajovom. B tím dokončil najúspešnejší ročník v 1. lige — 3. miesto.',
      },
    ],
  },
  {
    decade: '2010–2020',
    title: 'Rekordné sezóny',
    events: [
      {
        year: '2010/2011',
        text: 'Udržanie miesta v najvyššej lige víťazstvom nad Prievidzou (5:3). Výborný vstup B tímu do sezóny — 1. miesto po úvodných kolách.',
      },
      {
        year: '2011/2012',
        text: 'Vladimír Vojtek zvíťazil na Open Tatry 2011 a splnil IM normu! Dubnica pokračovala v extraligovej sérii a poslala Prievidzu s tromi GM do 1. ligy.',
      },
      {
        year: '2012/2013',
        text: 'Bezprecedentných 6 bodov z dvojkola v Extralige. Celkové 6. miesto — 4. najlepší výsledok v histórii. B tím postúpil z 2. ligy na 1. miesto. E tím vyhral 4. ligu.',
      },
      {
        year: '2013/2014',
        text: 'Infarktový záver Extraligy — klub sa zachránil v posledných minútach posledného kola. Marta Motázová to opísala ako zážitok blízky „klinickej smrti".',
      },
      {
        year: '2016/2017',
        text: 'Klub nasadil rekordných osem tímov (A–H) v rôznych ligových súťažiach od Extraligy po 4. ligu.',
      },
    ],
  },
  {
    decade: '2020–súčasnosť',
    title: 'Nová generácia',
    events: [
      {
        year: '2020/2021',
        text: 'Sezóna ovplyvnená pandémiou COVID-19.',
      },
      {
        year: '2021–2024',
        text: 'Návrat do normálu. Klub pokračuje v pôsobení v Extralige a nižších ligách. V sezóne 2023/24 dosiahol 5. miesto v ECo-C Extralige.',
      },
      {
        year: '2025/2026',
        text: 'Úspechy Dubnice presahujú družstvové súťaže. Vladimír Vojtek v roku 2025 vyhral 71. Tatranský pohár a zopakoval triumf z roku 2011. Karol Motúz obsadil 7. miesto na majstrovstvách Európy seniorov. Obaja získali v januári 2026 ocenenie mesta za reprezentáciu dubnického šachu.',
        sources: [{ label: 'Mesto Dubnica — ocenení šachisti', url: 'https://www.dubnica.eu/udalosti-v-meste/aktuality/v-roku-2025-domov-z-najvyssej-sutaze-prinieslo-medailu-22-dubnickych-sportovcov-a-sportovkyn-4147sk.html' }],
      },
      {
        year: '2026/2027 — sedem družstiev, päť ligových úrovní',
        text: 'Dubnické družstvá A až G nastupujú od Extraligy cez 1., 2. a 3. ligu až po 4. ligu. Klub tak spája najvyššiu súťaž s priestorom na získavanie zápasových skúseností v nižších ligách. Odbornú prácu s mládežou aj dospelými dlhodobo rozvíja tréner Peter Bombek; pravidelné spoločné tréningy sú súčasťou klubového života.',
        sources: [{ label: 'Mesto Dubnica — tréningy a klubová práca', url: 'https://www.dubnica.eu/udalosti-v-meste/aktuality/v-roku-2025-domov-z-najvyssej-sutaze-prinieslo-medailu-22-dubnickych-sportovcov-a-sportovkyn-4147sk.html' }],
      },
    ],
  },
];
