/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';
import { css } from '@emotion/react';

import Close from './Close';

import { useStore } from '../lib/context';
import { EVENTS, FADE, GAME_TYPE, OVERWORLD } from '../lib/constant';

const MyPokemon = props => {
  const { data } = props;

  const { store, dispatch } = useStore();

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
    if (data.length === 0) return 'Current you have not caught any pokemon';
    data.map((pokemon, index) => {
      result.push(
        <div
          css={css`
            text-align: center;
          `}
          key={`${pokemon.username}-${pokemon.name}-${index}`}
        >
          <img src={pokemon.image} />
          <div css={css`
            text-transform: uppercase;
            font-weight: bold;
            color: #000000;
          `}>{pokemon.name}</div>
          <div css={css`
            text-transform: uppercase;
            font-weight: bold;
            color: #d8d8d8;
          `}>{pokemon.username}</div>
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
      overflow-y: scroll;
    `}>
      <Close
        overridenCss={css`
          position: fixed;
        `}
        onClose={handleClose}
      />
      <div
        css={css`
          position: relative;
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, 1fr);
          height: 100vh;
          padding-top: 96px;
          padding-bottom: 96px;
        `}
      >
        {renderPokemon}
      </div>
    </div>
  )
}

export default MyPokemon;
