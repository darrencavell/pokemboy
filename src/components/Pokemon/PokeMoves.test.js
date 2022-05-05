import { render, screen } from '@testing-library/react';
import PokeMoves from './PokeMoves';

const props = {
  pokemon: {
    name: 'bulbasaur',
    moves: [
      { move: { name: 'tackle' }},
      { move: { name: 'splash' }}
    ]
  }
};

describe('Pokemon component tests', () => {
  it('should render correctly', () => {
    render(
      <PokeMoves
        pokemon={props.pokemon}
      />
    );

    expect(screen.getByText('splash')).toBeInTheDocument();
  });
});
