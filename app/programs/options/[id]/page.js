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
      url: `/programs/options/${param.id}`,
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
