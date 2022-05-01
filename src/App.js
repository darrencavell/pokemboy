/** @jsxImportSource @emotion/react */

import { ApolloProvider } from '@apollo/client';
import { Global, css } from '@emotion/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './Home';

import apolloClient from './graphql/apolloClient';

const App = () => {
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
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App;
