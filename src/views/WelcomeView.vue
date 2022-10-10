<template>
  <div class="welcome">
    <div>
      <h2>Welcome to Secret Chat</h2>
      <span>
        Create a room and invite your friend. All messages will be deleted after
        both of you leave a room.
      </span>
    </div>
    <a-button type="primary" class="welcome--enter-room" @click="createRoom">
      Enter room
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid';
import { useRouter } from 'vue-router';
import { useRoom } from '@/store/room';

const router = useRouter();
const roomId = nanoid();
const roomStore = useRoom();

const createRoom = () => {
  roomStore.createRoom(roomId);
  router.push(`/room/${roomId}`);
};
</script>

<style lang="scss" scoped>
.welcome {
  &--enter-room {
    display: block;
    margin-top: 32px;
  }
}
</style>
