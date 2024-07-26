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

const getData = async (params) => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${preschoolQuery}`),
  ]);

  // console.log(
  //   "HERE: ",
  //   res[1].data.attributes.preschoolPrograms.map((program) => ({
  //     id: program.id,
  //   }))
  // );

  return res;
};

const PreschoolProgram = ({ params }) => {
  // const [globalData, setGlobalData] = useState(null);
  // const [programData, setProgramData] = useState(null);
  // const [preschoolData, setPreschoolData] = useState(null);

  // useEffect(() => {
  //   getData(params.id).then((res) => {
  //     setGlobalData(res[0]);
  //     setProgramData(
  //       res[1].data.attributes.preschoolPrograms.filter(
  //         (program) => program.id == params.id
  //       )[0]
  //     );
  //     setPreschoolData(res[1].data.attributes);
  //   });
  // }, [params]);

  return (
    <>
      <PreschoolClass id={params.id} />
      {/* {globalData && globalData.data ? (
        <Layout global={globalData.data.attributes}>
          <main className={classes.Program}>
            <div className="u-padding-y-medium">
              <h1>{programData.Title}</h1>
              <div
                className={classes.Program__Overview}
                dangerouslySetInnerHTML={{ __html: programData.Overview }}
              />
            </div>
            <section
              className={`u-padding-y-medium ${classes.Program__ClassList}`}
            >
              <div className="row">
                <h3>
                  Our program offerings for{" "}
                  {`${preschoolData.schoolYearBeginning}/${
                    preschoolData.schoolYearBeginning + 1
                  }`}
                </h3>
                <ClassList program={programData} />
              </div>
            </section>
            <section className="u-padding-y-medium u-max-width-p">
              <div dangerouslySetInnerHTML={{ __html: programData.Details }} />
            </section>
          </main>
        </Layout>
      ) : (
        <div>Loading...</div>
      )} */}
    </>
  );
};

export default PreschoolProgram;
