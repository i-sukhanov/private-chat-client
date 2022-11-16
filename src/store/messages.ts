import { defineStore } from 'pinia';
import type { Message } from '../types/Message';
import { useApi } from './api';
import { useNotifications } from '@composables/useNotifications';
import { useSocketIo, Actions } from '@composables/useSocketIo';

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
    loadMessages(roomId: string) {
      const { socket } = useSocketIo();
      const { showErrorMessage } = useNotifications();

      try {
        socket.emit(Actions.GET, { roomId }, (response: Message[]) => {
          this.messages = response;
        });
      } catch {
        showErrorMessage({
          description: 'We can not retrive the messages now',
        });
      }
    },
    sendMessage(message: Message) {
      const { socket } = useSocketIo();
      const { showErrorMessage } = useNotifications();

      try {
        socket.emit(Actions.CREATE, message);
      } catch {
        showErrorMessage({
          description: `We can't send a message now`,
        });
      }
    },
    subscribeToMessages(roomId: string) {
      const { socket } = useSocketIo();

      socket.on(`room-${roomId}`, (message: Message) => {
        this.messages.push(message);
      });
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
