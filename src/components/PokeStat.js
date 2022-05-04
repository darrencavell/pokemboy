/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const PokeStat = props => {
  const { stats } = props;

  if (stats) {
    return (
      <>
        <div css={css`
          text-transform: uppercase;
          padding: 12px 0;
          font-weight: bold;
        `}>STATS</div>
        {stats.map((currentStat, index) => {
          console.log('stat', currentStat);
          return (
            <div css={css`
              border-bottom: 1px solid #d6d6d6;
            `} key={`${currentStat.stat.name}-${index}`}>{currentStat.stat.name}: {currentStat.base_stat}</div>
          );
        })}
      </>
    );
  }

  return null;
}

export default PokeStat;
