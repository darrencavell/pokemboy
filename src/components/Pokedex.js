/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import { useStore } from '../lib/context';

import Pokemon from './Pokemon';
import Close from './Close';
import { EVENTS, FADE, GAME_TYPE, OVERWORLD } from '../lib/constant';

const Pokedex = props => {
  const { data, loading, onFetchMore } = props;

  const { store, dispatch } = useStore();

  const handleScroll = (event) => {
    const scrollWidth = event.target.scrollWidth;
    const screenWidth = window.innerWidth;

    const actualScreenWidth = scrollWidth - screenWidth;
    const scrollLeft = event.target.scrollLeft;

    const ratio = scrollLeft / actualScreenWidth;

    if (loading) return;
    if (ratio >= 1) {
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

  const renderPokemon = useMemo(() => {
    const result = [];
    data.map((pokemon, index) => {
      result.push(
        <div
          key={`${pokemon.name}-${index}`}
          css={css`
            position: relative;
            display: flex;
            width: 200px;
            height: 200px;

            &:first-of-type {
              margin-left: 30%;
            }
          `}
        >
          <Pokemon src={pokemon.image} />
          <h2 css={css`
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            text-transform: uppercase;
          `}>
            {pokemon.name}
          </h2>
        </div>
      );
    });
    return result;
  }, [data]);

  return (
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
          align-items: center;
          flex-shrink: 0;
          overflow-x: scroll;
          height: 100vh;
        `}
        onScroll={handleScroll}
      >
        {renderPokemon}
      </div>
    </div>
  )
}

export default Pokedex;
