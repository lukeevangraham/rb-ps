import Hero from "./Hero/Hero";
import ImageBesideText from "./ImageBesideText/ImageBesideText";
import VideoBesideText from "./VideoBesideText/VideoBesideText";
import HeadingAboveColumns from "./HeadingAboveColumns/HeadingAboveColumns";
import HeadingAboveCards from "./HeadingAboveCards/HeadingAboveCards";
import Testimonies from "./Testimonies/Testimonies";

const sectionComponents = {
  "section.hero": Hero,
  "section.image-beside-text": ImageBesideText,
  "section.video-beside-text": VideoBesideText,
  "section.heading-above-columns": HeadingAboveColumns,
  "section.testimonies": Testimonies,
  "section.heading-above-cards": HeadingAboveCards,
};

// DISPLAY A SECTION INDIVIDUALLY
const Sections = ({ sectionData }) => {
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }

  // DISPLAY THE SECTION
  return <SectionComponent data={sectionData} />;
};

export default Sections;
