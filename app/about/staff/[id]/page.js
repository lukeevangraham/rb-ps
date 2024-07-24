import classes from "./page.module.scss";

import StaffModal from "@/components/School/StaffModal/StaffModal";

const StaffMemberInfo = ({ params: { id } }) => {
  return <div className={classes.StaffMemberInfo}>{id}</div>;
};

export default StaffMemberInfo;
