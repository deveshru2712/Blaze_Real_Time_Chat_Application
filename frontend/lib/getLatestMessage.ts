export const getLatestMessage = (conversationArr?: Conversation[]) => {
  if (conversationArr && conversationArr.length > 0) {
    const latestConversation = conversationArr[0].messages;
    if (latestConversation && latestConversation.length > 0) {
      const message = latestConversation[0];
      const latestMessage = message.content;

      console.log(latestMessage);

      const time = message.createdAt;
      return {
        latestMessage,
        time,
      };
    }
  }

  return {
    latestMessage: "No message",
    time: null,
  };
};
