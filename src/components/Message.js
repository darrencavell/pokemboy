import TextMessage from './event/TextMessage';

const Message = props => {
  const { content, onClose } = props;

  if (content) {
    return (
      <TextMessage
        content={content}
        onClose={onClose}
      />
    );
  }

  return null;
}

export default Message;
