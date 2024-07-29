import QueryString from "qs";
import { fetchAPI, parentAndChildQuery } from "@/lib/api";
import ParentAndChildClass from "@/components/School/ParentAndChildClass/ParentAndChildClass";

export async function generateStaticParams() {
  const programData = await fetchAPI(`/ps-programs-st?${parentAndChildQuery}`);

  return programData.data.attributes.parentAndChildPrograms.map(
    (program) => ({
      id: program.id.toString(),
    })
  );
}

const ParentAndChildProgram = ({ params }) => (
  <ParentAndChildClass id={params.id} />
);

export default ParentAndChildProgram;
