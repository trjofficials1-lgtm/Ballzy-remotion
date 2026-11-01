
import React from "react";
import { Composition } from "remotion";
import { BallzyPromo } from "./BallzyPromo";

export const RemotionRoot = () => (
  <Composition
    id="BallzyPromo"
    component={BallzyPromo}
    durationInFrames={1050}
    fps={30}
    width={1080}
    height={1920}
  />
);
