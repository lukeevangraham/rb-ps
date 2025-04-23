import { fetchAPI, parentAndChildQuery } from "@/lib/api";
import ParentAndChildClass from "@/components/School/ParentAndChildClass/ParentAndChildClass";

export async function generateStaticParams() {
  const programData = await fetchAPI(`/ps-programs-st?${parentAndChildQuery}`);

  return programData.data.attributes.parentAndChildPrograms.map((program) => ({
    id: program.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const selectedClass = await fetchAPI(
    `/ps-programs-st?${parentAndChildQuery}`
  );

  return {
    title: selectedClass.data.attributes.parentAndChildPrograms[id - 1].Title,
    description: selectedClass.data.attributes.parentAndChildPrograms[
      id - 1
    ].Overview.replace(/<[^>]*>?/gm, ""),
    openGraph: {
      title: selectedClass.data.attributes.parentAndChildPrograms[id - 1].Title,
      description: selectedClass.data.attributes.parentAndChildPrograms[
        id - 1
      ].Overview.replace(/<[^>]*>?/gm, ""),
    },
  };
}

const ParentAndChildProgram = async ({ params }) => {
  const { id } = await params;
  return <ParentAndChildClass id={id} />;
};

export default ParentAndChildProgram;
