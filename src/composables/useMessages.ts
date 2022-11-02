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

  const userId = localStorage.getItem('userId');
  let interval: ReturnType<typeof setInterval>;

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
    if (userId) {
      roomStore.createRoom(roomId.value);
    } else {
      localStorage.setItem('userId', nanoid());
    }

    loadMessages();

    interval = setInterval(() => {
      loadMessages();
    }, 4000);
  };

  const send = async (messageText: string) => {
    if (messageText.length === 0) return;
    const userId = localStorage.getItem('userId')!;

    const message: Message = {
      id: nanoid(),
      text: messageText.trim(),
      timeSent: Date.now(),
      userId,
      roomId: roomId.value,
    };

    await messagesStore.sendMessage(message);
  };

  const destroy = () => {
    messagesStore.deleteMessagesInRoom(roomId.value);
    messagesStore.$dispose();
    clearInterval(interval);
  };

  return {
    init,
    send,
    loadMessages,
    destroy,
    messages,
  };
};
