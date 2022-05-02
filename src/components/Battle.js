/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';

import Pokeball from './Pokeball';
import Pokemon from './Pokemon';
import Menu from './Menu';
import Form from './Form';
import { useStore } from '../lib/context';
import { EVENTS, GAME_TYPE, OVERWORLD } from '../lib/constant';

const Battle = props => {
  const descriptionRef = useRef();

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isAnimating, setIsAnimatinf] = useState(false);
  const [isPokemonCaught, setIsPokemonCaught] = useState(false);
  const [form, setForm] = useState({
    username: '',
    error: ''
  });
  const { store, dispatch } = useStore();

  const menus = [
    {
      id: 'catch',
      text: 'Catch Now',
      description: 'Catch a Pokémon with your own Pokéball, gonna catch them all!'
    },
    {
      id: 'pokedex',
      text: 'See My Pokédex',
      description: 'Take a look on your captured Pokémon'
    }
  ];

  const handleCursorEnter = (payload, index) => {
    setSelectedMenu(index);
    descriptionRef.current.innerText = payload.description;
  }

  const catchWildPokemon = () => {
    return Math.round(Math.random());
  }

  const handleClick = (payload) => {
    switch (payload.id) {
      case 'catch':
        setIsAnimatinf(true);
        setTimeout(() => {
          const isWildPokemonCaught = catchWildPokemon();
          console.log('isWildPokemonCaught', isWildPokemonCaught);
          if (isWildPokemonCaught) {
            setIsPokemonCaught(isWildPokemonCaught);
          } else {
            setIsAnimatinf(false);
          }
        }, 1000);
        break;
    }
  }

  const handleSetPokemonUsername = (username) => {
    setForm({ ...form, username });
  }

  const handleNavigateToOverworld = () => {
    const existingEvents = store.app.events;
    existingEvents.push({
      type: GAME_TYPE,
      payload: OVERWORLD
    });
    dispatch({ type: EVENTS, events: existingEvents });
  }
  
  const handleAddPokemonToTeam = () => {
    if (form.username === '') {
      setForm({ ...form, error: 'Please give your pokemon a username' });
      return;
    }
    handleNavigateToOverworld();
  }
  console.log('form', form);

  const handleReleasePokemonToWild = () => {
    console.log('click button cancel');
    handleNavigateToOverworld();
  }

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerText = menus[0].description;
    }
  }, []);

  return (
    <>
      <img
        src="/assets/catch-background.jpg"
        css={css`
          object-position: top;
          width: 100%;
          height: 100%;
        `}
      />
      <Pokemon
        isAnimating={isAnimating}
        />
      <Pokeball
        isAnimating={isAnimating}
      />
      <div css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        visibility: ${isPokemonCaught ? 'visible' : 'hidden'}
      `}>
        <div css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: ${isPokemonCaught ? '1' : '0'}
          filter: blur(4px);
        `}></div>
        <Form
          form={form}
          onInput={handleSetPokemonUsername}
          onOk={handleAddPokemonToTeam}
          onCancel={handleReleasePokemonToWild}
        />
      </div>
      <Menu
        ref={descriptionRef}
        onClick={handleClick}
        onCursorEnter={handleCursorEnter}
        menus={menus}
        selectedMenu={selectedMenu}
        isAnimating={isAnimating}
      />
    </>
  )
}

export default Battle;