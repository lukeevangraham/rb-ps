import Layout from "@/components/UI/Layout/Layout";
import Button from "@/components/UI/Button/Button";
import TourForm from "@/components/School/Tour/TourForm";
import { getGlobalInfo } from "@/lib/api";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    {
      next: { revaldate: 0 },
    },
  ]);

  return res;
};

export const metadata = {
  title: "Schedule A Tour",
  description:
    "Schedule a tour of RBCPC Preschool to experience our nurturing environment and engaging programs firsthand. Choose a convenient day and time to meet our staff and learn more about what we offer.",
  openGraph: {
    title: "Schedule A Tour",
    description:
      "Schedule a tour of RBCPC Preschool to experience our nurturing environment and engaging programs firsthand. Choose a convenient day and time to meet our staff and learn more about what we offer.",
    url: "/tour",
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

const Tour = async () => {
  const [globalData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <div className="u-padding-y-large">
        <div className="row">
          <h1>Schedule a tour</h1>
          <TourForm />
        </div>
      </div>
    </Layout>
  );
};

export default Tour;
