import React from "react";
import {Composition} from "remotion";
import {KliqAtFilm} from "./KliqAtFilm";

export const Root: React.FC = () => (
  <Composition
    id="KliqAtFilm"
    component={KliqAtFilm}
    durationInFrames={600}
    fps={30}
    width={1920}
    height={1080}
  />
);
