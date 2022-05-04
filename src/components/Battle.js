/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';

import Pokeball from './Pokeball';
import Pokemon from './Pokemon';
import Menu from './Menu';
import Form from './Form';
import { useStore } from '../lib/context';
import { EVENTS, FADE, GAME_TYPE, MAIN, OVERWORLD } from '../lib/constant';
import PokeStat from './PokeStat';
import PokeMove from './PokeMove';
import Modal from './Modal';
import Icon from './Icon';
import localStorage from '../lib/localStorage';

const Battle = props => {
  const { data, onFetch } = props;

  const descriptionRef = useRef();
  const timeoutRef = useRef();

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPokemonCaught, setIsPokemonCaught] = useState(false);
  const [form, setForm] = useState({
    username: '',
    error: ''
  });
  const [pokemonDetail, setPokemonDetail] = useState(false);
  const { store, dispatch } = useStore();

  const currentPokemon = store.app.graphql.pokemons.data[store.app.main.wildPokemonIndex] || {
    name: '',
    image: ''
  };

  const menus = [
    {
      id: 'catch',
      text: 'Catch Now',
      description: 'Catch a Pokémon with your own Pokéball, gonna catch them all!'
    },
    {
      id: 'pokemon-detail',
      text: 'See Pokemon Detail',
      description: 'Examine furthermore the Pokémon itself'
    }
  ];

  const handleCursorEnterMenu = (payload, index) => {
    setSelectedMenu(index);
    descriptionRef.current.innerText = payload.description;
  }

  const catchWildPokemon = () => {
    return Math.round(Math.random());
  }

  const handleClickMenu = (payload) => {
    switch (payload.id) {
      case 'catch':
        setIsAnimating(true);
        timeoutRef.current = setTimeout(() => {
          const isWildPokemonCaught = catchWildPokemon();
          if (isWildPokemonCaught) {
            setIsPokemonCaught(isWildPokemonCaught);
          } else {
            setIsAnimating(false);
          }

          clearTimeout(timeoutRef.current);
        }, 1000);
        break;
      case 'pokemon-detail':
        setPokemonDetail(true);
        break;
    }
  }

  const handleClosePokemonDetail = () => {
    setPokemonDetail(false);
  }

  const handleSetPokemonUsername = (username) => {
    setForm({ ...form, username });
  }

  const handleNavigateToOverworld = () => {
    const currentEvents = [...store.app.events];
    currentEvents.push({ type: GAME_TYPE, payload: OVERWORLD });
    currentEvents.push({ type: FADE, payload: 'toBlack' });
    dispatch({
      type: EVENTS,
      payload: currentEvents
    });
  }
  
  const handleAddPokemonToTeam = () => {
    if (form.username === '') {
      setForm({ ...form, error: 'Please give your pokemon a username' });
      return;
    }

    const myNewPokemon = store.app.main.myPokemons;
    myNewPokemon.push({
      ...currentPokemon,
      ...data,
      username: form.username
    });
    dispatch({
      type: MAIN,
      payload: {
        ...store.app.main,
        myPokemons: myNewPokemon
      }
    })
    handleNavigateToOverworld();
  }

  const handleReleasePokemonToWild = () => {
    handleNavigateToOverworld();
  }

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerText = menus[0].description;
    }
  }, [currentPokemon]);

  useEffect(() => {
    onFetch({
      variables: {
        name: currentPokemon.name
      }
    });
  }, []);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  if (!data) return null;

  return (
    <>
      <Pokemon
        isAnimating={isAnimating}
        src={currentPokemon.image}
        overridenCss={css`
          position: absolute;
          left: 50%;
          bottom: 325px;
          transform: translateX(-50%) scale(2);
        `}
      />
      <Modal isVisible={pokemonDetail}>
        <div css={css`
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          transition: tranform 0.5s ease;
          background: #ffffff;
          z-index: 5;
          overflow-y: auto;
          transform: ${pokemonDetail ? 'translate(0)' : 'translate(-100%)'} ;
          width: 250px;
        `}>
        <Icon src="/assets/pc.png" onClick={handleClosePokemonDetail} />
          <img src={currentPokemon.image} />
          <div css={css`
            text-transform: uppercase;
            font-weight: bold;
          `}>{currentPokemon.name}</div>
          <PokeMove moves={data.moves} />
          <PokeStat stats={data.stats} />
        </div>
      </Modal>
      <Pokeball isAnimating={isAnimating} />
      <Modal isVisible={isPokemonCaught}>
        <Form
          form={form}
          onInput={handleSetPokemonUsername}
          onOk={handleAddPokemonToTeam}
          onCancel={handleReleasePokemonToWild}
        />
      </Modal>
      <Menu
        descriptionOverridenCss={css`
          bottom: 230px !important;
        `}
        ref={descriptionRef}
        onClick={handleClickMenu}
        onCursorEnter={handleCursorEnterMenu}
        menus={menus}
        selectedMenu={selectedMenu}
        isAnimating={isAnimating}
      />
    </>
  );
}

export default Battle;