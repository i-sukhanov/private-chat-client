import { defineStore } from 'pinia';
import type { Message } from '../types/Message';
import { useApi } from './api';
import { useNotifications } from '@composables/useNotifications';

type State = {
  messages: Message[];
};

const state = (): State => {
  return {
    messages: [],
  };
};

export const useMessages = defineStore('messages', {
  state,
  actions: {
    async loadMessages(roomId: string) {
      const api = useApi();
      const { showErrorMessage } = useNotifications();

      try {
        const messages: Message[] = await api.request({
          path: `messages/${roomId}`,
        });

        this.messages = messages;
      } catch {
        showErrorMessage({
          description: 'We can not retrive the messages now',
        });
      }
    },
    async sendMessage(message: Message) {
      const api = useApi();
      const { showErrorMessage } = useNotifications();

      try {
        await api.request({
          path: 'messages',
          method: 'POST',
          body: JSON.stringify(message),
        });
      } catch {
        showErrorMessage({
          description: `We can't send a message now`,
        });
      }
    },
    async deleteMessagesInRoom(roomId: string) {
      const api = useApi();
      const { showSuccessMessage } = useNotifications();

      await api.request({
        path: `messages/${roomId}`,
        method: 'DELETE',
      });

      showSuccessMessage({
        message: 'You left the room',
        description: 'All messages were erased',
      });
    },
  },
  getters: {
    getMessages(): Message[] {
      const userId = localStorage.getItem('userId');

      return this.messages.map((msg) => ({
        ...msg,
        author: userId == msg.userId,
      }));
    },
  },
});
