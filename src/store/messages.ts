import { defineStore } from 'pinia';
import type { Message } from '../types/Message';
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
    subscribeToRoom(roomId: string) {
      const { socket } = useSocketIo();

      socket.on(`message@${roomId}`, (message: Message) => {
        this.messages.push(message);
      });
      socket.on(`erase@${roomId}`, () => {
        this.messages = [];
      });
      socket.on(`read@${roomId}`, (message: Message) => {
        this.messages = this.messages.map<Message>((item: Message) =>
          message.id === item.id ? message : item
        );
      });
    },
    async deleteMessagesInRoom(roomId: string) {
      const { socket } = useSocketIo();
      const { showSuccessMessage } = useNotifications();

      socket.emit(Actions.DELETE, roomId);

      showSuccessMessage({
        message: 'You left the room',
        description: 'All messages were erased',
      });
    },
    async readMessage({
      messageId,
      roomId,
    }: {
      messageId: Message['id'];
      roomId: string;
    }) {
      const { socket } = useSocketIo();

      socket.emit(Actions.READ, { messageId, roomId });
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
