import Section from '../components/ui/Section';
import PhotoGallery from '../components/gallery/PhotoGallery';
import { galleryPhotos } from '../data/gallery';

export default function GalleryPage() {
  return (
    <Section title="Fotogaléria">
      <PhotoGallery photos={galleryPhotos} />
    </Section>
  );
}
