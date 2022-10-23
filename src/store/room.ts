import { defineStore } from 'pinia';
import { useApi } from './api';

export const useRoom = defineStore('rooms', {
  actions: {
    async createRoom(roomId: string) {
      const api = useApi();

      await api.request({
        path: `room`,
        method: 'POST',
        body: JSON.stringify({ id: roomId }),
      });
    },
    async destroyRoom(roomId: string) {
      const api = useApi();

      await api.request({
        path: `room`,
        method: 'DELETE',
        body: JSON.stringify({ id: roomId }),
      });
    },
  },
});
