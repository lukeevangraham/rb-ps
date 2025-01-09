"use client";

import ModalNew from "@/components/UI/ModalNew/ModalNew";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import classes from "./page.module.scss";

const VideoModal = () => {
  const searchParams = useSearchParams();
  const videoURL = searchParams.get("url");

  return (
    <>
      <ModalNew>
        <div className={classes.Video}>
          <video src={videoURL} controls autoPlay />
        </div>
      </ModalNew>
    </>
  );
};

export default VideoModal;
