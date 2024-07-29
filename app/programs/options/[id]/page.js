import { fetchAPI, extendedDayOptionsQuery } from "@/lib/api";
import ExtendedDay from "@/components/School/ExtendedDayOption/ExtendedDayOption";

export async function generateStaticParams() {
  const programData = await fetchAPI(
    `/ps-programs-st?${extendedDayOptionsQuery}`
  );

  return programData.data.attributes.extendedDayOptions.map((program) => ({
    id: program.id.toString(),
  }));
}

const ExtendedDayOption = ({ params }) => <ExtendedDay id={params.id} />;

export default ExtendedDayOption;
