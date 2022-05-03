import { ENCOUNTER_POKEMON, OVERWORLD } from "./constant";

export const breakpoints = [0, 768];
export const mediaQueries = breakpoints.map(breakpoint => `@media (min-width: ${breakpoint}px)`);

export const getSrcByGameType = gameType => {
  switch (gameType) {
    case ENCOUNTER_POKEMON:
      return '/assets/catch-background.jpg';
    case OVERWORLD:
    default:
      return '/assets/lavaridge.png';
  }
}

export const getScaleByGameType = gameType => {
  switch (gameType) {
    case ENCOUNTER_POKEMON:
      return 1;
    case OVERWORLD:
    default:
      return 4;
  }
}

export const getSizesByGameType = gameType => {
  switch (gameType) {
    case ENCOUNTER_POKEMON:
      return { width: window.innerWidth, height: window.innerHeight };
    case OVERWORLD:
    default:
      return { width: 320, height: 320 };
  }
}