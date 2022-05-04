import FadeWhite from './FadeWhite';
import FadeBlack from './FadeBlack';

const Fade = props => {
  const { content, onTransitionEnd } = props;

  if (content) {
    switch(content) {
      case 'toWhite':
        return (
          <FadeWhite 
            content={content}
            onTransitionEnd={onTransitionEnd}
          />
        );
      case 'toBlack':
        return (
          <FadeBlack
            content={content}
            onTransitionEnd={onTransitionEnd}
          />
        )
    }
  }

  return null;
}

export default Fade;
