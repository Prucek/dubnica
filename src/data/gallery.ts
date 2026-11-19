export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
  category: 'match' | 'tournament' | 'club' | 'history';
}

const base = import.meta.env.BASE_URL;

const emilAlbums = [
  ['2025-26-extraliga-6', 'Extraliga 2025/2026, 6. kolo', 'match', 6],
  ['2025-26-extraliga-4', 'Extraliga 2025/2026, 4. kolo', 'match', 5],
  ['2022-23-extraliga-11', 'Extraliga 2022/2023, 11. kolo', 'match', 3],
  ['2022-23-extraliga-10', 'Extraliga 2022/2023, 10. kolo', 'match', 3],
  ['2022-23-extraliga-9', 'Extraliga 2022/2023, 9. kolo', 'match', 3],
  ['2021-22-extraliga', 'Extraliga 2021/2022', 'match', 4],
  ['2021-22-extraliga-osuske', 'Extraliga 2021/2022, Osuské', 'match', 2],
  ['me-seniorov', 'Majstrovstvá Európy seniorov', 'tournament', 2],
  ['2019-20-extraliga-7-8', 'Extraliga 2019/2020, 7. a 8. kolo', 'match', 2],
  ['2019-20-extraliga-6', 'Extraliga 2019/2020, 6. kolo', 'match', 3],
  ['2019-20-extraliga-1', 'Extraliga 2019/2020, 1. kolo', 'match', 2],
  ['2017-18-extraliga', 'Extraliga 2017/2018', 'match', 6],
  ['2016-17-extraliga', 'Extraliga 2016/2017', 'match', 3],
  ['2015-16-extraliga-2', 'Extraliga 2015/2016, 2. kolo', 'match', 3],
  ['motuzovci-open-2015', 'Motúzovci Open 2015', 'tournament', 4],
  ['2014-15-extraliga', 'Extraliga 2014/2015, 1. dvojkolo', 'match', 1],
] as const;

const emilArchive: GalleryPhoto[] = emilAlbums.flatMap(([slug, caption, category, count]) =>
  Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const filename = `${slug}-${String(number).padStart(2, '0')}.jpg`;

    return {
      src: `${base}images/emil/${filename}`,
      alt: `${caption}, fotografia ${number}`,
      caption,
      category,
    };
  }),
);

export const galleryPhotos: GalleryPhoto[] = emilArchive;
