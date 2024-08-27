import Layout from "@/components/UI/Layout/Layout";
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

const Tour = async () => {
  const [globalData] = await getData();

  let contactForm = (
    <form onSubmit={console.log("Submitted!")}>
      <input
        type="text"
        name="firstName"
        placeholder="Your First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Your Last Name"
        required
      />
      <input type="tel" name="phone" placeholder="Your Phone" />
      <input type="email" name="email" placeholder="Your Email" required />
      <select name="dayOfWeek">
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
      </select>
      <select name="time">
        <option value="9:00 am">9:00 am</option>
        <option value="9:30 am">9:30 am</option>
        <option value="10:00 am">10:00 am</option>
      </select>
    </form>
  );
  return (
    <Layout global={globalData.data.attributes}>
      <div className="u-padding-y-large">
        <div className="row">
          <div className={classes.Tour}>{contactForm}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Tour;
