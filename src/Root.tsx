import React from "react";
import {Composition} from "remotion";
import {KliqAtFilm} from "./KliqAtFilm";

export const Root: React.FC = () => (
<<<<<<< HEAD
  <>
    <Composition id="KliqAtFilm" component={KliqAtFilm} durationInFrames={600} fps={30} width={1920} height={1080} defaultProps={{prototype:false}} />
    <Composition id="KliqAtPrototype" component={KliqAtFilm} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={{prototype:true}} />
  </>
=======
  <Composition
    id="KliqAtFilm"
    component={KliqAtFilm}
    durationInFrames={600}
    fps={30}
    width={1920}
    height={1080}
  />
>>>>>>> a2ac62fdf9ca0d53a124d139aba7a0184d6b705f
);
