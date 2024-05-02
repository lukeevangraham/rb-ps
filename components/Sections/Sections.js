import Hero from "./Hero/Hero";

const sectionComponents = {
    "section.hero": Hero
}

// DISPLAY A SECTION INDIVIDUALLY
const Sections = ({ sectionData }) => {

    const SectionComponent = sectionComponents[sectionData.__component];

    if (!SectionComponent) {
        return null
    }

    // DISPLAY THE SECTION
    return <SectionComponent data={sectionData} />
}

export default Sections;