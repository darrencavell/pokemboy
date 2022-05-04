/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import { css } from '@emotion/react';

const PokeStats = props => {
  const { pokemon } = props;

  const MAPPING = {
    hp: 'hp',
    attack: 'atk',
    defense: 'def',
    'special-attack': 'spatk',
    'special-defense': 'spdef',
    speed: 'spd'
  };

  if (pokemon.stats) {
    return (
      <>
        <div
          css={css`
            text-transform: uppercase;
            padding: 12px 0;
            font-weight: bold;
          `}
        >
          <span
            css={css`
              border-bottom: thick double #000000;
            `}
          >
            STATS
          </span>
        </div>
        {pokemon.stats.map(currentStat => {
          return (
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                text-transform: uppercase;
                font-weight: bold;
              `}
              key={`${pokemon.name}-${currentStat.stat.name}`}
            >
              <div>{MAPPING[currentStat.stat.name]}</div>
              <div
                css={css`
                  color: #07bfdd;
                `}
              >
                {currentStat.base_stat}
              </div>
            </div>
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
    JSON.stringify(prevProps.pokemon.stats) === JSON.stringify(nextProps.pokemon.stats)
  }
);
