import { io } from 'socket.io-client';

export enum Actions {
  CREATE = 'createMessage',
  GET = 'getAllMessages',
  DELETE = 'deleteAllMessages',
}

export const useSocketIo = () => {
  const socket = io('http://localhost:3000');

  return {
    socket,
  };
};
