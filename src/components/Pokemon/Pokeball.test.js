import { render, screen } from '@testing-library/react';
import Pokeball from './Pokeball';

const props = {
  isAnimating: false
};

describe('Pokeball component tests', () => {
  it('should render correctly', () => {
    render(<Pokeball isAnimating={props.isAnimating} />);

    expect(screen.getByAltText('pokeball')).toBeInTheDocument();
  });
});
