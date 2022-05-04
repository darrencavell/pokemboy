/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';

import Pokeball from '../components/Pokemon/Pokeball';
import Pokemon from '../components/Pokemon/Pokemon';
import Menu from '../components/Menu';
import Form from '../components/Battle/Form';
import Modal from '../components/Modal';
import PokemonDetail from '../components/Pokemon/PokemonDetail';

import { useStore } from '../lib/context';
import { EVENTS, FADE, GAME_TYPE, MAIN, OVERWORLD, TEXT_MESSAGE } from '../lib/constant';

const Battle = props => {
  const { data, onFetch } = props;

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

  const [description, setDescription] = useState(menus[0].description);
  const descriptionRef = useCallback(node => {
    if (node) {
      node.innerText = description;
    }
  }, [description]);
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

  const [currentPokemon, setPokemon] = useState(store.app.graphql.pokemons.data[store.app.main.wildPokemonIndex] || {
    name: '',
    image: '',
  });

  useEffect(() => {
    setPokemon({
      ...currentPokemon,
      ...data
    });
  }, [data]);

  const handleCursorEnterMenu = (payload, index) => {
    if (store.app.events.length === 0) {
      setSelectedMenu(index);
      setDescription(payload.description);
    }
  }

  const catchWildPokemon = () => {
    return Math.round(Math.random());
  }

  const handleClickMenu = (payload) => {
    if (store.app.events.length === 0) {
      switch (payload.id) {
        case 'catch':
          setIsAnimating(true);
          timeoutRef.current = setTimeout(() => {
            const isWildPokemonCaught = catchWildPokemon();
            if (isWildPokemonCaught) {
              setIsPokemonCaught(isWildPokemonCaught);
            } else {
              setIsAnimating(false);
  
              const currentEvents = [...store.app.events];
              currentEvents.push({ type: TEXT_MESSAGE, payload: 'Oops the Pokemon break free!' })
              dispatch({
                type: EVENTS,
                payload: currentEvents
              });
            }
  
            clearTimeout(timeoutRef.current);
          }, 1000);
          break;
        case 'pokemon-detail':
          setPokemonDetail(true);
          break;
      }
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

    if (store.app.main.myPokemons.find(el => el.username === form.username)) {
      setForm({ ...form, error: 'Username is already taken, please give your pokemon another username!' });
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
    onFetch({
      variables: {
        name: currentPokemon.name
      }
    });
  }, []);

  if (!data) return null;

  return (
    <>
      <img
        css={css`
          height: 100vh;
          width: 100vw;
        `}
        src="/assets/catch-background.jpg"
      />
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
      <PokemonDetail
        displayedPokemon={currentPokemon}
        ownedPokemon={store.app.main.myPokemons}
        isOpen={pokemonDetail}
        onClose={handleClosePokemonDetail}
      />
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