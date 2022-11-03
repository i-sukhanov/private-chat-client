<template>
  <div class="welcome">
    <div>
      <h2 class="welcome--title">Welcome to Secret Chat</h2>
      <span>
        Create a room and invite your friend. All messages will be deleted after
        both of you leave a room.
      </span>
    </div>
    <a-button type="primary" class="welcome--enter-room" @click="enterRoom">
      Enter room
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid';
import { useRouter } from 'vue-router';

const router = useRouter();
const roomId = nanoid();

const enterRoom = () => {
  router.push(`/room/${roomId}`);
};
</script>

<style lang="scss" scoped>
.welcome {
  &--enter-room {
    display: block;
    margin-top: 32px;
    background-color: var(--action-blue);
    border: 1px solid var(--action-blue);
  }

  &--title {
    color: var(--text-color);
  }
}
</style>
