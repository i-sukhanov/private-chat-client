<template>
  <div class="chat">
    <div class="chat--messages">
      <div
        :class="{
          'chat--message_container': true,
          'chat--message_container-right': message.fromMe,
        }"
        v-for="message in roomStore.messages"
        :key="message.id"
      >
        <div
          :class="{
            'chat--message': true,
            'chat--message-right': message.fromMe,
          }"
          v-html="message.text"
        />
      </div>
    </div>
    <div class="chat--bottom">
      <a-textarea
        v-model:value="newMessage"
        placeholder="Enter your message"
        :rows="4"
      />
      <div class="chat--buttons">
        <a-button class="chat--send" type="primary">Send</a-button>
        <router-link to="/">
          <a-button>Leave room</a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRoom } from '@/store/room';

const route = useRoute();
const roomStore = useRoom();
const newMessage = ref('');

const roomId = computed(() => {
  return Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
});

roomStore.loadMessages(roomId.value);
</script>

<style lang="scss" scoped>
.chat {
  height: calc(100vh - 100px);
  position: relative;

  &--messages {
    height: calc(100% - 140px);
    display: flex;
    flex-direction: column;
    align-self: start;
    overflow: auto;
    padding-bottom: 32px;
  }

  &--message_container {
    display: flex;
    width: 100%;

    &-right {
      justify-content: flex-end;
    }
  }

  &--message {
    width: 95%;
    padding: 8px 8px 8px 8px;
    margin: 4px 0;
    border-radius: 6px 6px 6px 0;
    border: 1px solid #e3e3e3;
    font-size: 16px;

    &-right {
      border-radius: 6px 6px 0px 6px;
      background-color: rgba(123, 97, 255, 0.1);
      border-color: transparent;
    }
  }

  &--buttons {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 16px;
  }

  &--bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &--send {
    font-size: 16px;
  }
}
</style>
