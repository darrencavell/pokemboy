/** @jsxImportSource @emotion/react */

import { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';

import Close from '../components/Close';

import { useStore } from '../lib/context';
import { EVENTS, FADE, GAME_TYPE, MAIN, OVERWORLD, TEXT_MESSAGE } from '../lib/constant';
import Box from '../components/Box/Box';
import PokemonDetail from '../components/Pokemon/PokemonDetail';

const MyPokemon = props => {
  const {
    data,
    dataPokemonDetail,
    loadingDataPokemonDetail,
    onFetchDetail
  } = props;

  const { store, dispatch } = useStore();
  const [state, setState] = useState({
    isOpen: false,
    pokemon: null
  });

  const handleClose = () => {
    const currentEvents = [...store.app.events];
    currentEvents.push({ type: GAME_TYPE, payload: OVERWORLD });
    currentEvents.push({ type: FADE, payload: 'toBlack' });
    dispatch({
      type: EVENTS,
      payload: currentEvents
    });
  }

  const handleClickPokemonDetail = (payload) => {
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

  const handleReleasePokemon = () => {
    setState({
      ...state,
      isOpen: false
    });

    const newPokemons = store.app.main.myPokemons.filter(ownedPokemon => ownedPokemon.username !== state.pokemon.username);

    dispatch({
      type: MAIN,
      payload: {
        ...store.app.main,
        myPokemons: newPokemons
      }
    });

    const currentEvents = [...store.app.events];
    currentEvents.push({ type: TEXT_MESSAGE, payload: 'Your pokemon has been released to the wild!' });
    dispatch({
      type: EVENTS,
      payload: currentEvents
    });
  }

  const renderPokemon = useMemo(() => {
    const result = [];
    data.map((pokemon) => {
      result.push(
        <Box color="#ffffff" key={`${pokemon.name}-${pokemon.username}`}>
          <div
            css={css`
              position: relative;
              z-index: 2;
              text-align: center;
              background-color: #ffffff;
              padding: 8px;
            `}
            onClick={() => handleClickPokemonDetail(pokemon)}
          >
            <img src={pokemon.image} />
            <div
              css={css`
                text-transform: uppercase;
                font-weight: bold;
                color: #000000;
              `}
            >
              {pokemon.name}
            </div>
            <div
              css={css`
                text-transform: uppercase;
                font-weight: bold;
                color: #505050;
              `}
            >
              {pokemon.username}
            </div>
          </div>
        </Box>
      );
    });
    return result;
  }, [data, state.isOpen]);

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
          image-rendering: pixelated;
          height: 100vh;
          width: 100vw;
          object-fit: cover;
        `}
        src="/assets/mypokemon.png"
      />
      <div css={css`
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow-y: scroll;
      `}>
        <Close
          overridenCss={css`
            position: fixed;
            z-index: 1;
          `}
          onClose={handleClose}
        />
        {data.length === 0
          ? (
            <div
              css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              `}
            >
              <Box color="#ffffff">
                <div
                  css={css`
                    position: relative;
                    text-align: center;
                    background-color: #ffffff;
                    color: #000000;
                    z-index: 2;
                    padding: 12px 24px;
                  `}
                >
                  Oops... currently there is no pokemon in your bag!
                </div>
              </Box>
            </div>
          )
          : (
            <div
              css={css`
                position: relative;
                display: grid;
                gap: 12px;
                grid-template-columns: repeat(2, 1fr);
                padding: 112px 24px;
              `}
            >
              {renderPokemon}
            </div>
          )}
        <PokemonDetail
          displayedPokemon={state.pokemon}
          isOpen={state.isOpen}
          ownedPokemon={store.app.main.myPokemons}
          onClose={handleClosePokemonDetail}
          onRelease={handleReleasePokemon}
        />
      </div>
    </>
  )
}

export default MyPokemon;
