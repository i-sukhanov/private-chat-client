<template>
  <header class="header">
    <div class="container">
      <h1 class="header--title">
        Secret Chat
        <a-tooltip>
          <template #title
            >There is no encryption on this application. Please, do not provide
            any sensitive information here
          </template>
          <exclamation-circle-outlined :style="{ fontSize: '16px' }" />
        </a-tooltip>
      </h1>
    </div>
  </header>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  &--title {
    text-align: center;
  }
}

.container {
  max-width: 760px;
  margin: 0 auto;
}
</style>
