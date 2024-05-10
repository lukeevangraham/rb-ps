import qs from "qs";
import Image from "next/image";
import { fetchAPI, getGlobalInfo } from "../lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";

import classes from "./page.module.scss";

const homeDataQuery = qs.stringify({
  populate: {
    Sections: {
      on: {
        "section.heading-above-columns": {
          populate: { Column: { populate: "*" } },
        },
        "section.video-beside-text": { populate: "*" },
        "section.hero": { populate: "*" },
        "section.testimonies": { populate: { Testimony: { populate: "*" } } },
      },
    },
  },
  // populate: {
  //   Sections: { populate: "*" },
  // },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-home?${homeDataQuery}`, {
      // fetchAPI(`/ps-home?populate[Sections][populate]=*`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export default async function Home() {
  const [globalData, homeData] = await getData();

  // console.log("HD: ", homeData.data.attributes);

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.Home}>
        {homeData.data.attributes.Sections.map((section, index) => (
          <Sections sectionData={section} key={index} />
        ))}
        <section className={`u-padding-y-large ${classes.Programs}`}>
          <div className="row">
            <h2>Our Programs</h2>

            <div className={classes.Programs__Group}>
              <div className={classes.Programs__Group__Program}>
                <div className={classes.Programs__Group__Program__Top}>
                  <div className={classes.Programs__Group__Program__Top__Image}>
                    <Image
                      src={`https://res.cloudinary.com/dzekujbym/image/upload/v1714594173/costume_6fc5fb6730.jpg?updated_at=2024-05-02T05:26:44.957Z`}
                      alt="Test text"
                      fill
                    />
                  </div>
                  <div className={classes.Programs__Group__Program__Top__Text}>
                    <h5>
                      Parent & Child <br /> Classes
                    </h5>
                  </div>
                </div>
                <div className={classes.Programs__Group__Program__Body}>
                  <div
                    className={classes.Programs__Group__Program__Body__TopInfo}
                  >
                    For children 1-3 years of age. Designed around parent and
                    child learning together.
                  </div>
                  <div className={classes.Programs__Group__Program__Body__List}>
                    <div>Classes for 12-24 months</div>
                    <div>Classes for 24-36 months</div>
                  </div>
                </div>
              </div>
              <div className={classes.Programs__Group__Program}>
                <div className={classes.Programs__Group__Program__Top}>
                  <div className={classes.Programs__Group__Program__Top__Image}>
                    <Image
                      src={`https://res.cloudinary.com/dzekujbym/image/upload/v1715369436/vets_84edf5977f.jpg?updated_at=2024-05-10T19:30:36.840Z`}
                      alt="Test text"
                      fill
                    />
                  </div>
                  <div className={classes.Programs__Group__Program__Top__Text}>
                    <h5>Preschool</h5>
                  </div>
                </div>
                <div className={classes.Programs__Group__Program__Body}>
                  <div
                    className={classes.Programs__Group__Program__Body__TopInfo}
                  >
                    Age is determined by your child's age on September 1, {new Date().getFullYear()}. 
                  </div>
                  <div className={classes.Programs__Group__Program__Body__List}>
                    <div>Classes for 2 year olds</div>
                    <div>Classes for 3 year olds</div>
                    <div>Classes for 4/5 year olds</div>
                  </div>
                </div>
              </div>
              <div className={classes.Programs__Group__Program}>
                <div className={classes.Programs__Group__Program__Top}>
                  <div className={classes.Programs__Group__Program__Top__Image}>
                    <Image
                      src={`https://res.cloudinary.com/dzekujbym/image/upload/v1715369436/shopping_d1f4a6dcab.jpg?updated_at=2024-05-10T19:30:36.821Z`}
                      alt="Test text"
                      fill
                    />
                  </div>
                  <div className={classes.Programs__Group__Program__Top__Text}>
                    <h5>Options</h5>
                  </div>
                </div>
                <div className={classes.Programs__Group__Program__Body}>
                  <div
                    className={classes.Programs__Group__Program__Body__TopInfo}
                  >
                    There are different ways to extend your enrolled 3 and 4/5 year old's time with us.
                  </div>
                  <div className={classes.Programs__Group__Program__Body__List}>
                    <div>Extended Day (6 hr classes)</div>
                    <div>Lunch Bunch</div>
                    <div>Early Drop Off</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
