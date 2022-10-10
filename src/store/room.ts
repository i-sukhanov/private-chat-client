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

export const useRoom = defineStore('rooms', {
  state,
  actions: {
    async loadMessages(roomId: string) {
      const api = useApi();

      const messages: Message[] = await api.request({
        path: `room/${roomId}`,
      });

      this.messages = messages;
    },
    async createRoom(roomId: string) {
      const api = useApi();

      await api.request({
        path: `room`,
        method: 'POST',
        body: JSON.stringify({ id: roomId }),
      });
    },
  },
});
