import React, { useEffect, useRef } from 'react';

import { useQuery, gql } from '@apollo/client';

// import { GameEnginerProvider, useStore } from './lib/context';
// import GameEngine from './lib/engine/GameEngine';
import GameEngine from './components/GameEngine';
import Background from './components/Background';
import OverworldWrapper from './components/OverworldWrapper';

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

  useEffect(() => {
    // const canvas = canvasRef.current;
    // const context = canvas.getContext('2d');

    // const gameEngine = new GameEngine({ canvas, context });
    // gameEngine.initialize();

    // dispatch({
    //   type: INITIALIZE_CANVAS,
    //   payload: context
    // });
  }, []);

  return (
    // <GameEnginerProvider>
    <GameEngine>
      <Background />
      <OverworldWrapper />
    </GameEngine>
    // <>
    //   <canvas id="pokecanvas" ref={canvasRef} />
    // </>
    // </GameEnginerProvider>
  )
}

export default Home;
