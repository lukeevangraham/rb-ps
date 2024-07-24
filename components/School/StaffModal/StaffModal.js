import Image from "next/image";
import classes from "./StaffModal.module.scss";

const StaffModal = ({ memberData }) => {
  return (
    <>
      <div className={classes.StaffModal}>
        <div>
          <h3>
            {memberData.attributes.FirstName} {memberData.attributes.LastName}
          </h3>
          <h5>{memberData.attributes.Title}</h5>
          <h6>
            {" "}
            <a href={`mailto:${memberData.attributes.Email}`}>
              {memberData.attributes.Email}
            </a>
          </h6>
          <p>{memberData.attributes.Bio}</p>
        </div>
        <div className={classes.StaffModal__Image}>
          <Image
            src={memberData.attributes.Image.data.attributes.url}
            alt={
              memberData.attributes.Image.data.alternativeText
                ? memberData.attributes.Image.data.alternativeText
                : `Photo of ${memberData.attributes.FirstName} ${memberData.attributes.LastName}`
            }
            width={285}
            height={300}
          />
        </div>
      </div>
    </>
  );
};

export default StaffModal;
