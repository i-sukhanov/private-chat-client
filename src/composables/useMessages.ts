import { Message } from '@/types/Message';
import { nanoid } from 'nanoid';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoom } from '@/store/room';
import { useMessages } from '@/store/messages';

export const useRoomMessages = () => {
  const route = useRoute();
  const roomStore = useRoom();
  const messagesStore = useMessages();

  const roomId = computed(() => {
    return Array.isArray(route.params.id)
      ? route.params.id[0]
      : route.params.id;
  });
  const messages = computed(() => messagesStore.messages);

  const init = () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      roomStore.createRoom(roomId.value);
    } else {
      localStorage.setItem('userId', nanoid());
    }

    setInterval(() => {
      messagesStore.loadMessages(roomId.value);
    }, 2000);
  };

  const send = async (messageText: string) => {
    if (messageText.length === 0) return;
    const userId = localStorage.getItem('userId')!;

    const message: Message = {
      id: nanoid(),
      text: messageText.trim(),
      timeSent: Date.now(),
      userId,
    };

    await messagesStore.sendMessage(message);
  };

  const destroy = () => {
    messagesStore.$dispose();
    roomStore.destroyRoom(roomId.value);
  };

  return {
    init,
    send,
    destroy,
    messages,
  };
};
