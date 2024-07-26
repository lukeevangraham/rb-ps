import QueryString from "qs";
import { fetchAPI } from "@/lib/api";
import ParentAndChildClass from "@/components/School/ParentAndChildClass/ParentAndChildClass";

const ParentAndChildProgram = ({ params }) => (
  <ParentAndChildClass id={params.id} />
);

export default ParentAndChildProgram;
