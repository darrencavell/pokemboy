import { ENCOUNTER_POKEMON, MYPOKEMON, OVERWORLD, POKEDEX } from "./constant";

export const breakpoints = [0, 768];
export const mediaQueries = breakpoints.map(breakpoint => `@media (min-width: ${breakpoint}px)`);

export const getWildPokemon = (length) => {
  return Math.floor(Math.random() * length);
}

export const touchDevice = ('ontouchstart' in document.documentElement);
