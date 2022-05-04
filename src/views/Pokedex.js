/** @jsxImportSource @emotion/react */

import { useEffect, useMemo, useRef, useState } from 'react';

import { css } from '@emotion/react';

import Close from '../components/Close';
import IndividualPokemon from '../components/Pokedex/IndividualPokemon';
import PokemonDetail from '../components/Pokemon/PokemonDetail';

import { useStore } from '../lib/context';
import { EVENTS, FADE, GAME_TYPE, OVERWORLD } from '../lib/constant';
import { usePrevious } from '../lib/hooks/usePrevious';

const Pokedex = props => {
  const { dataPokemon, dataPokemonDetail, loadingDataPokemon, loadingDataPokemonDetail, onFetchMore, onFetchDetail } = props;

  const prevData = usePrevious(dataPokemon);
  const isFetched = useRef(false);
  const { store, dispatch } = useStore();
  const [state, setState] = useState({
    isOpen: false,
    pokemon: null
  });

  const handleScroll = (event) => {
    const scrollWidth = event.target.scrollWidth;
    const screenWidth = window.innerWidth;

    const actualScreenWidth = scrollWidth - screenWidth;
    const scrollLeft = event.target.scrollLeft;

    const ratio = scrollLeft / actualScreenWidth;

    if (loadingDataPokemon || !dataPokemon?.next) return;
    if (ratio >= 0.99 && !isFetched.current) {
      isFetched.current = true;
      onFetchMore();
    }
  }

  const handleClose = () => {
    const currentEvents = [...store.app.events];
    currentEvents.push({ type: GAME_TYPE, payload: OVERWORLD });
    currentEvents.push({ type: FADE, payload: 'toBlack' });
    dispatch({
      type: EVENTS,
      payload: currentEvents
    });
  }

  const handleClickPokemon = (payload) => {
    setState({
      ...state,
      pokemon: {
        ...state.pokemon,
        ...payload,
      }
    });

    onFetchDetail({
      variables: {
        name: payload.name
      }
    });
  }

  const handleClosePokemonDetail = () => {
    setState({
      ...state,
      isOpen: false
    });
  }

  const renderPokemon = useMemo(() => {
    const result = [];
    dataPokemon?.results?.map(pokemon => {
      result.push(
        <IndividualPokemon
          key={pokemon.name}
          pokemon={pokemon}
          isOpen={state.isOpen}
          onClick={() => handleClickPokemon(pokemon)}
        />
      );
    });
    return result;
  }, [dataPokemon.results, state.isOpen]);

  useEffect(() => {
    if (prevData?.results?.length !== dataPokemon?.results?.length) {
      isFetched.current = false;
    }
  }, [dataPokemon.results]);

  useEffect(() => {
    if (dataPokemonDetail && !loadingDataPokemonDetail) {
      setState({
        ...state,
        isOpen: true,
        pokemon: {
          ...state.pokemon,
          ...dataPokemonDetail
        }
      });
    }
  }, [dataPokemonDetail]);

  return (
    <>
      <img
        css={css`
          background-position: bottom center;
          image-rendering: pixelated;
          object-fit: cover;
          height: 100vh;
          width: 100vw;
        `}
        src="/assets/pokedex.png"
      />
      <div css={css`
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `}>
        <Close onClose={handleClose} />
        <div
          css={css`
            position: relative;
            display: flex;
            align-items: flex-end;
            flex-shrink: 0;
            overflow-x: scroll;
            height: 100vh;
          `}
          onScroll={handleScroll}
        >
          {renderPokemon}
        </div>
        <PokemonDetail
          displayedPokemon={state.pokemon}
          isOpen={state.isOpen}
          ownedPokemon={store.app.main.myPokemons}
          onClose={handleClosePokemonDetail}
        />
      </div>
    </>
  )
}

export default Pokedex;
