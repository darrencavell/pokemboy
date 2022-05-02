import React, { useEffect, useRef } from 'react';

import { useQuery, gql } from '@apollo/client';

import { useStore } from './lib/context';
// import GameEngine from './lib/engine/GameEngine';
import GameEngine from './components/GameEngine';
import Background from './components/Background';
import OverworldWrapper from './components/OverworldWrapper';
import BattleWrapper from './components/BattleWrapper';
import Message from './components/Message';
import { ENCOUNTER_POKEMON, OVERWORLD } from './lib/constant';

const Home = () => {
  // const GET_POKEMONS = gql`
  //   query pokemons($limit: Int, $offset: Int) {
  //     pokemons(limit: $limit, offset: $offset) {
  //       count
  //       next
  //       previous
  //       status
  //       message
  //       results {
  //         url
  //         name
  //         image
  //       }
  //     }
  //   }
  // `;
  
  // const gqlVariables = {
  //   limit: 2,
  //   offset: 1,
  // };

  // const { loading, error, data } = useQuery(GET_POKEMONS, {
  //   variables: gqlVariables,
  // });

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // console.log('Response from server', data);
  // const canvasRef = useRef();

  const { store } = useStore();

  console.log('store', store);

  return (
    <>
      <Background />
      <GameEngine>
        {store.app.gameType === OVERWORLD && <OverworldWrapper />}
        {store.app.gameType === ENCOUNTER_POKEMON && <BattleWrapper />}
        <Message content={store.app.textMessage} />
      </GameEngine>
    </>
    // <>
    //   <canvas id="pokecanvas" ref={canvasRef} />
    // </>
  )
}

export default Home;
