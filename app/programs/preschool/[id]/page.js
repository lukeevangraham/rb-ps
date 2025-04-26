import QueryString from "qs";
import PreschoolClass from "@/components/School/PreschoolClass/PreschoolClass";
import { getGlobalInfo, fetchAPI } from "@/lib/api";

import classes from "./page.module.scss";

export async function generateStaticParams() {
  const programData = await fetchAPI(`/ps-programs-st?${preschoolQuery}`);

  return programData.data.attributes.preschoolPrograms.map((program) => ({
    id: program.id.toString(),
  }));
}

const preschoolQuery = QueryString.stringify({
  populate: {
    preschoolPrograms: { populate: "*" },
  },
});

export async function generateMetadata({ params }) {
  const program = await fetchAPI(`/ps-programs-st?${preschoolQuery}`);

  return {
    title: program.data.attributes.preschoolPrograms[params.id - 1].Title,
    description: program.data.attributes.preschoolPrograms[
      params.id - 1
    ].Overview.replace(/<[^>]*>?/gm, ""),
    openGraph: {
      title: program.data.attributes.preschoolPrograms[params.id - 1].Title,
      description: program.data.attributes.preschoolPrograms[
        params.id - 1
      ].Overview.replace(/<[^>]*>?/gm, ""),
      url: `/programs/preschool/${params.id}`,
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

// const getData = async (params) => {
//   const res = await Promise.all([
//     getGlobalInfo(),
//     fetchAPI(`/ps-programs-st?${preschoolQuery}`),
//   ]);

//   // console.log(
//   //   "HERE: ",
//   //   res[1].data.attributes.preschoolPrograms.map((program) => ({
//   //     id: program.id,
//   //   }))
//   // );

//   return res;
// };

const PreschoolProgram = ({ params }) => {
  return (
    <>
      <PreschoolClass id={params.id} />
    </>
  );
};

export default PreschoolProgram;
