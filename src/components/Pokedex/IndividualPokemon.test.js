import { render, screen } from '@testing-library/react';
import IndividualPokemon from './IndividualPokemon';

const props = {
  pokemon: {
    name: 'bulbasaur',
    src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  onClick: () => jest.fn()
};

describe('IndividualPokemon component tests', () => {
  it('should render correctly', () => {
    render(
      <IndividualPokemon
        pokemon={props.pokemon}
        onClick={props.onClick}
      />
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
});
