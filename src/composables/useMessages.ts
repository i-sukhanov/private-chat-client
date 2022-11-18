import { Message } from '@/types/Message';
import { nanoid } from 'nanoid';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMessages } from '@/store/messages';
import { useNotifications } from './useNotifications';

export const useRoomMessages = () => {
  const route = useRoute();
  const messagesStore = useMessages();
  const { showSuccessMessage } = useNotifications();

  const userId = localStorage.getItem('userId');

  const roomId = computed(() => {
    return Array.isArray(route.params.id)
      ? route.params.id[0]
      : route.params.id;
  });
  const messages = computed(() => messagesStore.getMessages);

  const loadMessages = () => {
    messagesStore.loadMessages(roomId.value);
  };

  const init = () => {
    if (!userId) {
      localStorage.setItem('userId', nanoid());

      showSuccessMessage({
        message: 'The room is created',
        description: 'You can start chatting',
      });
    }
    messagesStore.subscribeToRoom(roomId.value);
    loadMessages();
  };

  const send = (messageText: string) => {
    if (messageText.length === 0) return;
    const userId = localStorage.getItem('userId')!;

    const message: Message = {
      id: nanoid(),
      text: messageText.trim(),
      timeSent: Date.now(),
      userId,
      roomId: roomId.value,
    };

    messagesStore.sendMessage(message);
  };

  const destroy = () => {
    messagesStore.deleteMessagesInRoom(roomId.value);
    messagesStore.$dispose();
    localStorage.removeItem('userId');
  };

  return {
    init,
    send,
    destroy,
    messages,
  };
};
