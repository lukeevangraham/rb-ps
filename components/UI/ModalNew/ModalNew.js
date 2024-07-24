"use client";

import Backdrop from "../Backdrop/Backdrop";

import { useRouter } from "next/navigation";

import classes from "./ModalNew.module.scss";

export default function ModalNew({ children }) {
  const router = useRouter();

  return (
    <>
      <Backdrop show={true} clicked={() => router.back()} />
      <div className={classes.Modal}>
        <fig
          className={classes.Modal__Close}
          onClick={() => {
            router.back();
          }}
        >
          &times;
        </fig>
        {/* <button
          onClick={() => {
            router.back();
          }}
        >
          Close Modal
        </button> */}
        {children}
      </div>
    </>
  );
}
