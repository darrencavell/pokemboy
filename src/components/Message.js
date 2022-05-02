import TextMessage from './event/TextMessage';

const Message = props => {
  const { content } = props;

  if (content) {
    return <TextMessage content={content} />
  }

  return null;
}

export default Message;
