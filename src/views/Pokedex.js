/** @jsxImportSource @emotion/react */

import { useEffect, useMemo, useRef } from 'react';

import { css } from '@emotion/react';

import { useStore } from '../lib/context';
import { EVENTS, FADE, GAME_TYPE, OVERWORLD } from '../lib/constant';

import Close from '../components/Close';
import IndividualPokemon from '../components/Pokedex/IndividualPokemon';
import { usePrevious } from '../lib/hooks/usePrevious';

const Pokedex = props => {
  const { data, loading, onFetchMore } = props;

  const prevData = usePrevious(data);
  const isFetched = useRef(false);
  const { store, dispatch } = useStore();

  const handleScroll = (event) => {
    const scrollWidth = event.target.scrollWidth;
    const screenWidth = window.innerWidth;

    const actualScreenWidth = scrollWidth - screenWidth;
    const scrollLeft = event.target.scrollLeft;

    const ratio = scrollLeft / actualScreenWidth;

    console.log('handleScroll', ratio, loading, !data?.next);
    if (loading || !data?.next) return;
    if (ratio >= 0.99 && !isFetched.current) {
      isFetched.current = true;
      console.log('masuk fetcgh more');
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
    data?.results?.map(pokemon => {
      result.push(<IndividualPokemon key={pokemon.name} pokemon={pokemon} />)
    });
    return result;
  }, [data.results]);

  useEffect(() => {
    if (prevData?.results?.length !== data?.results?.length) {
      isFetched.current = false;
    }
  }, [data.results]);

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
