/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import { css } from '@emotion/react';

const PokeStats = props => {
  const { pokemonName, stats } = props;

  if (stats) {
    return (
      <>
        <div css={css`
          text-transform: uppercase;
          padding: 12px 0;
          font-weight: bold;
        `}>STATS</div>
        {stats.map(currentStat => {
          return (
            <div css={css`
              border-bottom: 1px solid #d6d6d6;
            `} key={`${pokemonName}-${currentStat.stat.name}`}>{currentStat.stat.name}: {currentStat.base_stat}</div>
          );
        })}
      </>
    );
  }

  return null;
}

export default memo(
  PokeStats,
  (prevProps, nextProps) => {
    JSON.stringify(prevProps.stats) === JSON.stringify(nextProps.stats)
  }
);
