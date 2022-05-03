/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import AnimatedPerson from './canvas/AnimatedPerson';

import { useStore } from '../lib/context';
import UserController from './controller/UserController';

const Overworld = props => {
  const { store } = useStore();

  return (
    <>
      <UserController
        events={store.app.events}
      />
      <div css={css`
        position: relative;
      `}>
        <AnimatedPerson
          src="/assets/brendan.png"
          gameObject={store.app.main}
          scale={1}
        />
      </div>
    </>
  );
}

export default Overworld;
