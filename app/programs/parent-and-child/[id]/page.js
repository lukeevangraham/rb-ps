import { fetchAPI, parentAndChildQuery } from "@/lib/api";
import ParentAndChildClass from "@/components/School/ParentAndChildClass/ParentAndChildClass";

export async function generateStaticParams() {
  const programData = await fetchAPI(`/ps-programs-st?${parentAndChildQuery}`, {
    cache: "no-store",
  });

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
      url: `/programs/parent-and-child/${id}`,
      type: "website",
      images: [
        {
          url: "https://res.cloudinary.com/dzekujbym/image/upload/v1745624911/rbcpc_Prechool_OG_6efb2b8eec.jpg?updated_at=2025-04-25T23:48:31.780Z",
          width: 1200,
          height: 630,
          alt: "RBCPC Preschool",
        },
      ],
    },
  };
}

const ParentAndChildProgram = async ({ params }) => {
  const { id } = await params;
  return <ParentAndChildClass id={id} />;
};

export default ParentAndChildProgram;
