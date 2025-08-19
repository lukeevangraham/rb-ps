import Layout from "@/components/UI/Layout/Layout";
import { fetchAPI, getGlobalInfo, extendedDayOptionsQuery } from "@/lib/api";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";

import classes from "./ExtendedDayOption.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(
      `/ps-programs-st?populate[extendedDayOptions][populate]=*&populate[extendedDayOptions][Image][populate]=*`,
      { next: { revalidate: 0 } }
    ),
  ]);

  return res;
};

const ExtendedDay = async ({ id }) => {
  const [globalData, programData] = await getData();

  const extendedOptionData =
    programData.data.attributes.extendedDayOptions.filter(
      (program) => program.id == id
    )[0];

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.ExtendedDayOption}>
        {/* <div className="u-padding-y-large"> */}
        <div className="u-padding-y-large">
          <div className="row">
            <div className={`${classes.ExtendedDayOption__Top}`}>
              <div className="u-max-width-p">
                <h1>{extendedOptionData.Name}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: extendedOptionData.Summary,
                  }}
                />
                <div
                  className={`u-margin-bottom-medium ${classes.ExtendedDayOption__Top__Overview}`}
                >
                  {extendedOptionData.Overview}
                </div>
              </div>
              <div className={classes.ExtendedDayOption__Top__Image}>
                <Image
                  src={extendedOptionData.image.data[0].attributes.url}
                  alt={
                    extendedOptionData.image.data[0].attributes.alternativeText
                      ? extendedOptionData.image.data[0].attributes
                          .alternativeText
                      : "Kids eating food"
                  }
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.ExtendedDayOption__Detail}>
          <div className="row">
            <div className="u-max-width-p u-padding-y-large">
              <div
                className={` u-margin-bottom-medium`}
                dangerouslySetInnerHTML={{
                  __html: extendedOptionData.Detail,
                }}
              />
              {/* {extendedOptionData.button ? (
                <Button button={extendedOptionData.button} />
                ) : null} */}
              {extendedOptionData.Calendar &&
              extendedOptionData.Calendar.data ? (
                <Button
                  button={{
                    text: extendedOptionData.Calendar.data.attributes.name,
                    url: extendedOptionData.Calendar.data.attributes.url,
                    newTab: true,
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* </div> */}
      </main>
    </Layout>
  );
};

export default ExtendedDay;
