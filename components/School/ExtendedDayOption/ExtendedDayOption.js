import Layout from "@/components/UI/Layout/Layout";
import { fetchAPI, getGlobalInfo, extendedDayOptionsQuery } from "@/lib/api";
import Button from "@/components/UI/Button/Button";

import classes from "./ExtendedDayOption.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${extendedDayOptionsQuery}`),
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
        <div className="u-padding-y-large">
          <div className="row">
            <div className="u-max-width-p">
              <h1>{extendedOptionData.Name}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: extendedOptionData.Summary }}
              />
              <div
                className={`u-margin-bottom-medium ${classes.ExtendedDayOption__Overview}`}
              >
                {extendedOptionData.Overview}
              </div>
              <div
                className={` u-margin-bottom-medium ${classes.ExtendedDayOption__Detail}`}
                dangerouslySetInnerHTML={{ __html: extendedOptionData.Detail }}
              />
              {extendedOptionData.button ? (
                <Button button={extendedOptionData.button} />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ExtendedDay;
