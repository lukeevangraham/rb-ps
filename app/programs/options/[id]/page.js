import { fetchAPI, extendedDayOptionsQuery } from "@/lib/api";
import ExtendedDay from "@/components/School/ExtendedDayOption/ExtendedDayOption";

export async function generateStaticParams() {
  const programData = await fetchAPI(
    `/ps-programs-st?populate[extendedDayOptions][populate]=*`
  );

  return programData.data.attributes.extendedDayOptions.map((program) => ({
    id: program.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const param = await params;

  const option = await fetchAPI(
    `/ps-programs-st?populate[extendedDayOptions][populate]=*`
  );

  // const prepData = await

  return {
    title: option.data.attributes.extendedDayOptions[param.id - 2].Name,
    description: option.data.attributes.extendedDayOptions[param.id - 2].Summary
      ? option.data.attributes.extendedDayOptions[param.id - 2].Summary.replace(
          /<[^>]*>?/gm,
          ""
        )
      : null,
    openGraph: {
      title: option.data.attributes.extendedDayOptions[param.id - 2].Name,
      description: option.data.attributes.extendedDayOptions[param.id - 2]
        .Summary
        ? option.data.attributes.extendedDayOptions[
            param.id - 2
          ].Summary.replace(/<[^>]*>?/gm, "")
        : null,
    },
  };

  // return {
  //   title: option.data.attributes.extendedDayOptions[params.id - 1].Name,
  //   description: option.data.attributes.extendedDayOptions[params.id - 1]
  //     .Summary
  //     ? option.data.attributes.extendedDayOptions[
  //         params.id - 1
  //       ].Summary.replace(/<[^>]*>?/gm, "")
  //     : null,
  //   openGraph: {
  //     title: option.data.attributes.extendedDayOptions[params.id - 1].Name,
  //     description: option.data.attributes.extendedDayOptions[params.id - 1]
  //       .Summary
  //       ? option.data.attributes.extendedDayOptions[
  //           params.id - 1
  //         ].Summary.replace(/<[^>]*>?/gm, "")
  //       : null,
  //   },
  // };
}

const ExtendedDayOption = async ({ params }) => {
  const param = await params;
  return <ExtendedDay id={param.id} />;
};

export default ExtendedDayOption;
