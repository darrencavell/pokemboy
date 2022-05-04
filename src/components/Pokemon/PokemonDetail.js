/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';
import { css } from '@emotion/react';

import Box from '../Box/Box';
import Modal from '../Modal';
import PokeMoves from './PokeMoves';
import PokeStats from './PokeStats';
import PokeTypes from './PokeTypes';

const PokemonDetail = props => {
  const {
    displayedPokemon,
    ownedPokemon,
    isOpen,
    onClose,
    onRelease
  } = props;

  if (!displayedPokemon || !ownedPokemon) return null;

  const total = useMemo(() => {
    return ownedPokemon.length > 0 && ownedPokemon.filter(ownPokemon => ownPokemon.name === displayedPokemon.name).length || 0;
  }, [displayedPokemon, ownedPokemon]);

  return (
    <Modal isVisible={isOpen}>
      <div css={css`
        position: relative;
        height: 100%;
      `}>
        <div css={css`
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 5;
          transform: ${isOpen ? 'translate(0)' : 'translate(-100%)'};
          transition: transform 0.5s ease;
          width: 250px;
          margin: auto;
          max-height: calc(100vh - 64px);
        `}>
          <div
            css={css`
              position: absolute;
              left: 100%;
              top: 10%;
              transform: translateY(-50%);
              display: flex;
              align-items: center;
              height: 100%;
              max-height: 96px;
            `}
            onClick={onClose}
          >
            <Box color="#ffffff">
              <div css={css`
                position: relative;
                background-color: #ffffff;
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 96px;
                width: 36px;
              `}>
                <div css={css`
                  transform: rotate(90deg);
                  text-transform: uppercase;
                  font-size: 12px;
                  font-weight: bold;
                `}>
                  Close
                </div>
              </div>
            </Box>
          </div>
          <Box
            overridenCss={css`
              height: 100%;
            `}
            color="#ffffff"
          >
            <div css={css`
              position: relative;
              height: 100%;
              z-index: 2;
              overflow-y: scroll;
              padding: 0 12px;
            `}>
              <div
                css={css`
                  display: flex;
                  justify-content: flex-end;
                `}
              >
                {total > 0 && typeof onRelease !== 'undefined' && (
                  <Box
                    overridenCss={css`
                      margin-top: 8px;
                    `}
                    color="#860000"
                  >
                    <div
                      css={css`
                        position: relative;
                        background-color: #860000;
                        z-index: 2;
                        padding: 2px 8px;
                        color: #ffffff;
                      `}
                      onClick={onRelease}
                    >
                      Release
                    </div>
                  </Box>
                )}
              </div>
              <img
                css={css`
                  width: 100%;
                `}
                src={displayedPokemon.image}
              />
              <PokeTypes pokemon={displayedPokemon} />
              <div css={css`
                text-transform: uppercase;
                font-weight: bold;
                margin-top: 18px;
              `}>
                {displayedPokemon.name}
              </div>
              <div css={css`
                text-transform: uppercase;
                font-weight: bold;
                font-size: 14px;
                color: #07bfdd;
              `}>
                Owned: {total}
              </div>
              <PokeStats pokemon={displayedPokemon} />
              <PokeMoves pokemon={displayedPokemon} />
            </div>
          </Box>
        </div>
      </div>
    </Modal>
  );
}

export default PokemonDetail;
