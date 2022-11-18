<template>
  <div
    :class="{
      message: true,
      'message-right': message?.author,
    }"
  >
    <div class="message--content" v-html="message?.text" />
    <div class="message--footer">
      <i class="message--time">{{ messageTime }}</i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@/types/Message';
import { defineProps, PropType, computed } from 'vue';

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
  },
});

const messageTime = computed(() => {
  const rawDate = new Date(props.message?.timeSent + '');

  return new Intl.DateTimeFormat('ru-RU', {
    timeStyle: 'short',
  }).format(rawDate.getTime());
});
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
    background-color: rgba(123, 97, 255, 0.1);
    border: 1px solid var(--border-color);
    background-color: var(--light-message-bg);
  }

  &--content {
    font-size: var(--fs-sm);
  }
  &--footer {
    display: flex;
    justify-content: flex-end;
  }

  &--time {
    font-size: var(--fs-xs);
  }
}
</style>
