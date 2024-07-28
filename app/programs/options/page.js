import { getGlobalInfo, fetchAPI, extendedDayOptionsQuery } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Link from "next/link";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${extendedDayOptionsQuery}`),
  ]);
  return res;
};

const Options = async () => {
  const [globalData, optionsData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      {console.log("OD: ", optionsData.data.attributes.extendedDayOptions)}
      <div className={`u-padding-y-large ${classes.Options}`}>
        <h1>Extended Day Options</h1>
        <div className="row">
          {optionsData.data.attributes.extendedDayOptions.map((option) => (
            <div key={option.id} className={`u-max-width-p ${classes.Options__Option}`}>
              <h2>
                <Link href={`./programs/options/${option.id}`}>
                  {option.Name}
                </Link>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: option.Summary }} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Options;
