import { render, screen } from '@testing-library/react';
import TextMessage from './TextMessage';

const props = {
  content: 'This is a message inside TextMessage',
  onClose: () => jest.fn()
};

describe('TextMessage component tests', () => {
  it('should render correctly', () => {
    render(
      <TextMessage
        content={props.content}
        onClose={props.onClose}
      />
    )

    expect(screen.getByText('This is a message inside TextMessage')).toBeInTheDocument();
  });
});
