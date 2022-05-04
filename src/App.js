/** @jsxImportSource @emotion/react */

import { ApolloProvider } from '@apollo/client';
import { Global, css } from '@emotion/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './Home';

import { GameEnginerProvider } from './lib/context';
import { initialState } from './lib/store/app/reducer';
import apolloClient from './lib/graphql/apolloClient';
import localStorage from './lib/localStorage';

const App = () => {
  const state = JSON.parse(localStorage.get('pokemboy')) || initialState;
  return (
    <>
      <Global
        styles={css`
          body {
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <ApolloProvider client={apolloClient}>
        <GameEnginerProvider initialState={state}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
          </Router>
        </GameEnginerProvider>
      </ApolloProvider>
    </>
  )
}

export default App;
