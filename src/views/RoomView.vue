<template>
  <div class="chat">
    <div class="chat--messages" ref="messagesWrapper">
      <div ref="messagesContainer">
        <div
          :class="{
            'chat--message_container': true,
            'chat--message_container-right': message.author,
          }"
          v-for="message in messages"
          :key="message.id"
        >
          <div
            :class="{
              'chat--message': true,
              'chat--message-right': message.author,
            }"
            v-html="message.text"
          />
        </div>
      </div>
    </div>
    <form class="chat--bottom" @submit.prevent="sendMessage">
      <a-textarea
        v-model:value="newMessage"
        placeholder="Enter your message"
        :rows="4"
        class="chat--textarea"
      />
      <div class="chat--buttons">
        <a-button class="chat--send" type="primary" @click="sendMessage"
          >Send</a-button
        >
        <a-tooltip>
          <template #title
            >If you leave the room, all messages in this room will be deleted
          </template>
          <router-link to="/">
            <a-button class="chat--leave">Leave room</a-button>
          </router-link>
        </a-tooltip>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { useRoomMessages } from '@/composables/useMessages';
import { onBeforeRouteLeave } from 'vue-router';

const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();
const messagesWrapper = ref<HTMLElement>();
const { init, send, messages, destroy } = useRoomMessages();

const sendMessage = async () => {
  send(newMessage.value);

  newMessage.value = '';
};

onBeforeRouteLeave(destroy);

watch(
  messages,
  async (value) => {
    await nextTick();

    if (value.length) {
      messagesWrapper.value?.scroll({
        top: messagesContainer.value?.offsetHeight,
        behavior: 'smooth',
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

init();
</script>

<style lang="scss" scoped>
.chat {
  height: calc(100vh - 100px);
  position: relative;
  width: 100%;

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
    padding: 8px;
    margin: 4px 0;
    border-radius: 6px 6px 6px 0;
    border: 1px solid var(--border-color);
    font-size: 16px;
    background-color: var(--bg-color);

    &-right {
      border-radius: 6px 6px 0px 6px;
      background-color: rgba(123, 97, 255, 0.1);
      border: 1px solid var(--border-color);
      background-color: var(--lighter-bg);
    }
  }

  &--textarea {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
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
    background-color: var(--action-blue);
    border: 1px solid var(--action-blue);
  }

  &--leave {
    border: 1px solid var(--border-color);
    background-color: var(--bg-color);
    color: var(--text-color);
  }
}
</style>
