import { Message } from '@/types/Message';
import { nanoid } from 'nanoid';
import { ref } from 'vue';

export const useMessages = () => {
  const newMessage = ref('');

  const send = () => {
    // TODO: Add send logic
    if (newMessage.value.length === 0) return;

    const message: Message = {
      id: nanoid(),
      text: newMessage.value.trim(),
      timeSent: Date.now(),
    };
    newMessage.value = '';
  };

  return {
    newMessage,
    send,
  };
};
