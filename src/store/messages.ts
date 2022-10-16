import { defineStore } from 'pinia';
import type { Message } from '../types/Message';
import { useApi } from './api';

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

      const messages: Message[] = await api.request({
        path: `messages/${roomId}`,
      });

      this.messages = messages;
    },
    async sendMessage(message: Message) {
      const api = useApi();

      await api.request({
        path: 'messages',
        method: 'POST',
        body: JSON.stringify(message),
      });
    },
  },
});
