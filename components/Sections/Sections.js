import dynamic from "next/dynamic";
import FAQs from "./FAQs/FAQs";
// import Hero from "./Hero/Hero";
const Hero = dynamic(() => import("../Sections/Hero/Hero"));
import HeadingAboveButton from "./HeadingAboveButton/HeadingAboveButton";
import HeadingAboveCards from "./HeadingAboveCards/HeadingAboveCards";
import HeadingAboveColumns from "./HeadingAboveColumns/HeadingAboveColumns";
import HeadingAboveFiles from "./HeadingAboveFiles/HeadingAboveFiles";
import ImageBesideText from "./ImageBesideText/ImageBesideText";
import RichText from "./RichText/RichText";
import Testimonies from "./Testimonies/Testimonies";
import VideoBesideText from "./VideoBesideText/VideoBesideText";

const sectionComponents = {
  "section.fa-qs": FAQs,
  "section.hero": Hero,
  "section.heading-above-button": HeadingAboveButton,
  "section.heading-above-cards": HeadingAboveCards,
  "section.heading-above-columns": HeadingAboveColumns,
  "section.image-beside-text": ImageBesideText,
  "section.rich-text": RichText,
  "section.testimonies": Testimonies,
  "section.video-beside-text": VideoBesideText,
  "section.heading-above-files": HeadingAboveFiles,
};

// DISPLAY A SECTION INDIVIDUALLY
const Sections = ({ sectionData, fromProgramsPage, fromHome, keyData }) => {
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }

  // DISPLAY THE SECTION
  return (
    <SectionComponent
      data={sectionData}
      keyData={keyData}
      fromProgramsPage={fromProgramsPage ? fromProgramsPage : null}
      fromHome={fromHome ? fromHome : null}
    />
  );
};

export default Sections;
