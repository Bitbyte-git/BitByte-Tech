import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Showcase from '../components/Showcase';
import DesignGallery from '../components/DesignGallery';
import Footer from '../components/Footer';

export default function WebsiteShowcasePage() {
  const [galleryPage, setGalleryPage] = useState(null);

  const openGallery = (site) => {
    setGalleryPage({ slug: site.slug, category: site.category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setGalleryPage(null);
    setTimeout(() => {
      const el = document.getElementById('showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  useEffect(() => {
    document.title = galleryPage
      ? `${galleryPage.category} Designs - WebCraft Studio`
      : 'Website Showcase - Bit Byte Technologies';
  }, [galleryPage]);

  if (galleryPage) {
    return (
      <DesignGallery
        slug={galleryPage.slug}
        categoryName={galleryPage.category}
        onBack={goBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#081426]">
      <Navbar />
      <main>
        <Showcase onViewDesigns={openGallery} />
      </main>
      <Footer />
    </div>
  );
}


