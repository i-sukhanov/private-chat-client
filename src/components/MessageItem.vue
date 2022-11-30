<template>
  <div
    :class="{
      message: true,
      'message-right': message?.author,
    }"
    :data-value="message?.id"
    v-observe="readMessage"
  >
    <div class="message--content" v-html="message?.text" />
    <div class="message--footer">
      <i class="message--time">{{ messageTime }}</i>
      <read-indicator v-if="message.author" :read="message.read" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ReadIndicator from './ReadIndicator.vue';
import { Message } from '@/types/Message';
import { defineProps, PropType, computed } from 'vue';
import { useRoomMessages } from '@/composables/useMessages';

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
});

const { read, userId } = useRoomMessages();

const messageTime = computed(() => {
  const rawDate = new Date(props.message?.timeSent + '');

  return new Intl.DateTimeFormat('ru-RU', {
    timeStyle: 'short',
  }).format(rawDate.getTime());
});

const readMessage = () => {
  if (!props.message?.read && userId.value !== props.message?.userId) {
    read(props.message?.id);
  }
};
</script>

<style lang="scss" scoped>
.message {
  width: 90%;
  padding: 8px;
  margin: 4px 0;
  border-radius: 6px 6px 6px 0;
  border: 1px solid var(--border-color);
  background-color: var(--default-message-bg);

  &-right {
    border-radius: 6px 6px 0px 6px;
    border: 1px solid var(--border-color);
    background-color: var(--light-message-bg);
  }

  &--content {
    font-size: var(--fs-sm);
  }

  &--footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &--time {
    font-size: var(--fs-xs);
    margin-right: var(--space-xxs);
  }
}
</style>
