"use client";

import ModalNew from "@/components/UI/ModalNew/ModalNew";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import classes from "./page.module.scss";

function Video() {
  const searchParams = useSearchParams();
  const videoURL = searchParams.get("url");

  return (
    <div className={classes.Video}>
      <video src={videoURL} controls autoPlay />
    </div>
  );
}

const VideoModal = () => {
  // const searchParams = useSearchParams();
  // const videoURL = searchParams.get("url");

  return (
    <Suspense>
      <ModalNew>
        {/* <div className={classes.Video}>
          <video src={videoURL} controls autoPlay />
        </div> */}
        <Video />
      </ModalNew>
    </Suspense>
  );
};

export default VideoModal;
