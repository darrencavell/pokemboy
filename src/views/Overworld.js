/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import AnimatedPerson from '../components/CanvasMap/AnimatedPerson';
import MoveableMap from '../components/CanvasMap/MoveableMap';
import UserController from '../components/Controller/UserController';
import Navigation from '../components/Navigation';

import { useStore } from '../lib/context';

const Overworld = props => {
  const { store } = useStore();

  const map = {
    sizes: {
      width: 320,
      height: 320
    },
    scale: 4,
    src: '/assets/lavaridge.png'
  };

  return (
    <>
      <div css={css`
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}>
        <MoveableMap
          src="/assets/lavaridge.png"
          direction={store.app.directions[0]}
          main={store.app.main}
          sizes={map.sizes}
          scale={map.scale}
        />
      </div>
      <UserController
        events={store.app.events}
      />
      <Navigation />
      <AnimatedPerson
        src="/assets/brendan.png"
        gameObject={store.app.main}
        scale={1}
      />
    </>
  );
}

export default Overworld;
