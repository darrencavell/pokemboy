import { ENCOUNTER_POKEMON, MYPOKEMON, OVERWORLD, POKEDEX } from "./constant";

export const breakpoints = [0, 768];
export const mediaQueries = breakpoints.map(breakpoint => `@media (min-width: ${breakpoint}px)`);

export const getMapByGameType = gameType => {
  switch (gameType) {
    case ENCOUNTER_POKEMON:
      return {
        sizes: {
          width: 750,
          height: window.innerHeight
        },
        scale: 1,
        src: '/assets/catch-background.jpg'
      }
    case POKEDEX:
      return {
        sizes: {
          width: 750,
          height: window.innerHeight,
        },
        scale: 1,
        src: '/assets/pokedex.png'
      }
    case MYPOKEMON:
      return {
        sizes: {
          width: 320,
          height: 320,
        },
        scale: 4,
        src: '/assets/mypokemon.jpeg'
      }
    case OVERWORLD:
      return {
        sizes: {
          width: 320,
          height: 320
        },
        scale: 4,
        src: '/assets/lavaridge.png'
      }
    default:
      return {
        sizes: {
          width: 320,
          height: 320,
        },
        scale: 1,
        src: ''
      }
    }
}

export const getWildPokemon = (length) => {
  return Math.floor(Math.random() * length);
}