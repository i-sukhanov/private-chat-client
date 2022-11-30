<template>
  <div class="read_indicator">
    <check-outlined class="read_indicator--tick" />
    <check-outlined
      v-if="read"
      class="read_indicator--tick read_indicator--tick-last"
    />
  </div>
</template>

<script lang="ts" setup>
import { CheckOutlined } from '@ant-design/icons-vue';
import { PropType, defineProps } from 'vue';

defineProps({
  read: {
    type: Boolean as PropType<boolean>,
  },
});
</script>

<style scoped lang="scss">
.read_indicator {
  &--tick {
    &-last {
      transform: translateX(-8px);
    }
  }
}
</style>
