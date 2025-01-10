import QueryString from "qs";
import ModalNew from "@/components/UI/ModalNew/ModalNew";
import StaffModal from "@/components/School/StaffModal/StaffModal";
import { fetchAPI } from "@/lib/api";

const getData = async (id) => {
  const staffsQuery = QueryString.stringify({
    filters: {
      id: {
        $eq: id,
      },
    },
    populate: { Image: { populate: "*" } },
  });

  const res = await Promise.all([fetchAPI(`/ps-staffs/?filters[id][$eq]=${id}&populate[Image][populate]=*`)]);
  return res;
};

const StaffMemberModal = async ({ params: { id } }) => {
  const [memberData] = await getData(id);

  return (
    <ModalNew>
      <StaffModal memberData={memberData.data[0]} />
    </ModalNew>
  );
};

export default StaffMemberModal;
