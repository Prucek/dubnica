export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
  category: 'match' | 'tournament' | 'club' | 'history';
}

const base = import.meta.env.BASE_URL;

export const galleryPhotos: GalleryPhoto[] = [
  { src: `${base}images/history/TrTep1979SpolocneFoto.jpg`, alt: 'Majstrovstvá ČSSR 1979', caption: 'Účastníci Majstrovstiev ČSSR 1979, Trenčianske Teplice', category: 'tournament' },
  { src: `${base}images/history/TrTep1979Smejkal-m.jpg`, alt: 'GM Smejkal', caption: 'GM Smejkal — víťaz turnaja M ČSSR 1979', category: 'tournament' },
  { src: `${base}images/history/TrTep1979Hort-m.jpg`, alt: 'GM Vlastimil Hort', caption: 'GM Vlastimil Hort — M ČSSR 1979', category: 'tournament' },
  { src: `${base}images/history/TrTep1979Ftacnik-m.jpg`, alt: 'Ftáčnik', caption: 'Ftáčnik — M ČSSR 1979', category: 'tournament' },
  { src: `${base}images/history/zapas.jpg`, alt: 'Šachový zápas z 50. rokov', caption: 'Šachový zápas z raných rokov klubu', category: 'match' },
  { src: `${base}images/history/fichtl.jpg`, alt: 'IM Jiří Fichtl', caption: 'IM Jiří Fichtl — hral za Dubnicu 1978–1982', category: 'club' },
  { src: `${base}images/history/kycl.jpg`, alt: 'Oldřich Kycl', caption: 'Oldřich Kycl — dlhoročný predseda klubu', category: 'club' },
  { src: `${base}images/history/prukner.jpg`, alt: 'Prukner', caption: 'Prukner — člen postupovej zostavy', category: 'club' },
  { src: `${base}images/history/marco.jpg`, alt: 'Šachisti z 60. rokov', caption: 'Šachisti Dubnice — 60. roky', category: 'club' },
  { src: `${base}images/history/lojzo.jpg`, alt: 'Šachisti z 60. rokov', caption: 'Šachisti Dubnice — 60. roky', category: 'club' },
  { src: `${base}images/history/ziak.jpg`, alt: 'Mladý šachista', caption: 'Mládežnícky šach v Dubnici', category: 'club' },
  { src: `${base}images/history/hrad.jpg`, alt: 'Považské Podhradie', caption: 'Považské Podhradie — miesto zápasu 1961/62', category: 'history' },
];
