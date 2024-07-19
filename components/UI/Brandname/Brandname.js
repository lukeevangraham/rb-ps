import classes from "./Brandname.module.scss"

const Brandname = ({ footer }) => (
  <div className={footer ? `${classes.Brandname} ${classes.FromFooter}` : `${classes.Brandname}`}>
    RBCPC
    <br />
    Preschool
  </div>
);

export default Brandname;
